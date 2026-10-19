import json
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]

LEGACY_REDIRECTS = {
    "model_hyundai_elantra.html": "vehicle-config-elantra.html",
    "model_toyota_corolla_cross.html": "vehicle-config-corolla-cross.html",
    "model_toyota_rav4.html": "vehicle-config-rav4.html",
    "model_mazda_cx5.html": "models.html",
    "model_kia_kx1.html": "vehicle-config-kx1.html",
    "model_toyota_corolla.html": "vehicle-config-corolla.html",
    "model_vw_teramont.html": "vehicle-config-teramont.html",
}

CATALOGS = (
    "models.html",
    "models-ru.html",
    "models-ar.html",
    "models-fr.html",
    "models-es.html",
)

HOME_PAGES = ("index.html", "ru.html", "ar.html", "fr.html", "es.html")

PUBLIC_PAGES = (
    "index.html",
    "ru.html",
    "ar.html",
    "fr.html",
    "es.html",
    "es/peru.html",
    "es/colombia.html",
    "es/chile.html",
    "es/modelos/toyota-camry-2026.html",
    "es/modelos/toyota-rav4-2026.html",
    "es/modelos/toyota-corolla-cross-2026.html",
    *CATALOGS,
)

ORGANIZATION_ID = "https://hzchemnitz.cn/#organization"
CONTACTS = {"Chloe", "Natalie", "Darwin", "Zeeshan", "Jacky"}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.metas = []
        self.anchors = []
        self.json_ld = []
        self.model_cards = []
        self._json_buffer = None
        self._card_depth = 0
        self._card_links = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link":
            self.links.append(attrs)
        elif tag == "meta":
            self.metas.append(attrs)
        elif tag == "a":
            href = attrs.get("href")
            if href:
                self.anchors.append(href)
                if self._card_links is not None:
                    self._card_links.append(href)

        if tag == "script" and attrs.get("type") == "application/ld+json":
            self._json_buffer = []

        if tag == "div":
            classes = attrs.get("class", "").split()
            if self._card_links is None and "model-card" in classes:
                self._card_links = []
                self._card_depth = 1
            elif self._card_links is not None:
                self._card_depth += 1

    def handle_data(self, data):
        if self._json_buffer is not None:
            self._json_buffer.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self._json_buffer is not None:
            self.json_ld.append("".join(self._json_buffer))
            self._json_buffer = None

        if tag == "div" and self._card_links is not None:
            self._card_depth -= 1
            if self._card_depth == 0:
                self.model_cards.append(self._card_links)
                self._card_links = None


def parse(relative_path):
    parser = PageParser()
    parser.feed((ROOT / relative_path).read_text(encoding="utf-8"))
    return parser


def nested_nodes(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from nested_nodes(child)
    elif isinstance(value, list):
        for child in value:
            yield from nested_nodes(child)


class SiteIntegrityTest(unittest.TestCase):
    def test_legacy_urls_have_crawlable_compatibility_redirects(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        for old_path, target_path in LEGACY_REDIRECTS.items():
            with self.subTest(old_path=old_path):
                self.assertTrue((ROOT / target_path).is_file())
                page = ROOT / old_path
                self.assertTrue(page.is_file())
                text = page.read_text(encoding="utf-8")
                parser = parse(old_path)

                canonical = [
                    item.get("href")
                    for item in parser.links
                    if item.get("rel") == "canonical"
                ]
                self.assertEqual(canonical, [f"https://hzchemnitz.cn/{target_path}"])

                robots = [
                    item.get("content", "").replace(" ", "").lower()
                    for item in parser.metas
                    if item.get("name", "").lower() == "robots"
                ]
                self.assertEqual(robots, ["index,follow"])

                refresh = [
                    item.get("content", "")
                    for item in parser.metas
                    if item.get("http-equiv", "").lower() == "refresh"
                ]
                self.assertEqual(refresh, [f"0; url=/{target_path}"])
                self.assertIn(f'href="/{target_path}"', text)
                self.assertIn("window.location.search+window.location.hash", text)
                self.assertNotIn(f"https://hzchemnitz.cn/{old_path}", sitemap)

    def test_every_catalog_card_has_a_crawlable_configuration_link(self):
        for catalog_path in CATALOGS:
            with self.subTest(catalog=catalog_path):
                parser = parse(catalog_path)
                self.assertEqual(len(parser.model_cards), 46)
                for position, card_links in enumerate(parser.model_cards, start=1):
                    config_links = [
                        href for href in card_links
                        if urlsplit(href).path.startswith("vehicle-config-")
                    ]
                    self.assertTrue(
                        config_links,
                        f"{catalog_path} card {position} needs a static vehicle configuration link",
                    )
                    for href in config_links:
                        self.assertTrue(
                            (ROOT / urlsplit(href).path).is_file(),
                            f"Broken catalog link: {catalog_path} -> {href}",
                        )

    def test_public_pages_define_one_current_organization(self):
        for relative_path in PUBLIC_PAGES:
            with self.subTest(page=relative_path):
                parser = parse(relative_path)
                schemas = [json.loads(raw) for raw in parser.json_ld]
                organizations = [
                    node
                    for schema in schemas
                    for node in nested_nodes(schema)
                    if node.get("@type") == "Organization"
                ]
                self.assertEqual(
                    len(organizations),
                    1,
                    f"{relative_path} must expose one authoritative Organization entity",
                )
                organization = organizations[0]
                self.assertEqual(organization.get("@id"), ORGANIZATION_ID)
                self.assertEqual(
                    {contact.get("name") for contact in organization.get("contactPoint", [])},
                    CONTACTS,
                )
                self.assertNotIn("+86-137-5822-9513", json.dumps(organization))

    def test_vehicle_pages_expose_static_machine_readable_details(self):
        vehicle_pages = sorted(ROOT.glob("vehicle-config-*.html"))
        self.assertEqual(len(vehicle_pages), 47)

        for page in vehicle_pages:
            with self.subTest(page=page.name):
                text = page.read_text(encoding="utf-8")
                parser = parse(page.name)
                schemas = [json.loads(raw) for raw in parser.json_ld]
                nodes = [node for schema in schemas for node in nested_nodes(schema)]
                vehicle_nodes = [
                    node
                    for node in nodes
                    if isinstance(node.get("@type"), list)
                    and {"Product", "Vehicle"}.issubset(node["@type"])
                ]
                self.assertEqual(len(vehicle_nodes), 1)
                self.assertTrue(any(node.get("@type") == "BreadcrumbList" for node in nodes))
                self.assertNotIn("offers", vehicle_nodes[0])
                self.assertIn("not a final export offer", json.dumps(vehicle_nodes[0]))
                image_url = vehicle_nodes[0].get("image", "")
                self.assertTrue(image_url.startswith("https://hzchemnitz.cn/images/thumbs/"))
                self.assertTrue((ROOT / urlsplit(image_url).path.lstrip("/")).is_file())
                self.assertIn(f'<meta property="og:image" content="{image_url}">', text)
                self.assertIn(f'<meta name="twitter:image" content="{image_url}">', text)
                self.assertIn('data-page-type="vehicle_config"', text)
                self.assertIn('id="quote-disclaimer"', text)
                self.assertNotIn('/#models', text)
                self.assertRegex(text, r"<h1\b")

    def test_ai_discovery_files_are_public_and_factual(self):
        robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        llms = (ROOT / "llms.txt").read_text(encoding="utf-8")

        for crawler in ("OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot"):
            self.assertIn(f"User-agent: {crawler}", robots)
        self.assertIn("Sitemap: https://hzchemnitz.cn/sitemap.xml", robots)
        for path in (
            "https://hzchemnitz.cn/",
            "https://hzchemnitz.cn/models.html",
            "https://hzchemnitz.cn/es/peru.html",
            "https://hzchemnitz.cn/es/colombia.html",
            "https://hzchemnitz.cn/es/chile.html",
        ):
            self.assertIn(path, llms)
        self.assertIn("not a final export offer", llms)

    def test_card_thumbnails_exist_and_public_pages_use_current_analytics(self):
        checked_pages = (*PUBLIC_PAGES, *(page.name for page in ROOT.glob("vehicle-config-*.html")))
        for relative_path in checked_pages:
            with self.subTest(page=relative_path):
                text = (ROOT / relative_path).read_text(encoding="utf-8")
                self.assertNotIn("analytics-events.js?v=20260924b", text)
                if "analytics-events.js" in text:
                    self.assertIn("analytics-events.js?v=20261009a", text)

        for catalog_path in CATALOGS:
            text = (ROOT / catalog_path).read_text(encoding="utf-8")
            thumbnails = re.findall(r"background-image:url\(['\"]?(images/thumbs/[^'\")]+)", text)
            self.assertEqual(len(thumbnails), 46)
            for thumbnail in thumbnails:
                self.assertTrue((ROOT / thumbnail).is_file(), thumbnail)

    def test_catalog_configuration_tracking_keeps_the_selected_spec(self):
        for catalog_path in CATALOGS:
            with self.subTest(catalog=catalog_path):
                text = (ROOT / catalog_path).read_text(encoding="utf-8")
                self.assertIn("vehicle_spec_id: trim && trim.specid", text)
                self.assertIn("entry_surface: 'model_catalog'", text)
                self.assertIn('data-vehicle-spec-id="', text)

    def test_home_catalog_links_use_the_current_release_version(self):
        for page_path in HOME_PAGES:
            with self.subTest(page=page_path):
                text = (ROOT / page_path).read_text(encoding="utf-8")
                self.assertNotIn("?v=20260702#models", text)

    def test_custom_not_found_page_keeps_visitors_in_the_funnel(self):
        text = (ROOT / "404.html").read_text(encoding="utf-8")
        parser = parse("404.html")
        robots = [
            item.get("content", "").replace(" ", "").lower()
            for item in parser.metas
            if item.get("name", "").lower() == "robots"
        ]
        self.assertEqual(robots, ["noindex,follow"])
        self.assertIn('href="/models.html"', text)
        self.assertIn('href="/"', text)


if __name__ == "__main__":
    unittest.main()
