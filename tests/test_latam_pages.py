import html
import json
import re
import unittest
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]

HOME_PAGES = {
    "index.html": ("en", "https://hzchemnitz.cn/"),
    "ru.html": ("ru", "https://hzchemnitz.cn/ru.html"),
    "ar.html": ("ar", "https://hzchemnitz.cn/ar.html"),
    "fr.html": ("fr", "https://hzchemnitz.cn/fr.html"),
    "es.html": ("es", "https://hzchemnitz.cn/es.html"),
}

COUNTRY_PAGES = {
    "es/peru.html": ("es-PE", "https://hzchemnitz.cn/es/peru.html"),
    "es/colombia.html": ("es-CO", "https://hzchemnitz.cn/es/colombia.html"),
    "es/chile.html": ("es-CL", "https://hzchemnitz.cn/es/chile.html"),
}

HOME_ALTERNATES = {
    "en": "https://hzchemnitz.cn/",
    "ru": "https://hzchemnitz.cn/ru.html",
    "ar": "https://hzchemnitz.cn/ar.html",
    "fr": "https://hzchemnitz.cn/fr.html",
    "es": "https://hzchemnitz.cn/es.html",
    "x-default": "https://hzchemnitz.cn/",
}

MODEL_PAGES = {
    "models.html": "https://hzchemnitz.cn/models.html",
    "models-ru.html": "https://hzchemnitz.cn/models-ru.html",
    "models-ar.html": "https://hzchemnitz.cn/models-ar.html",
    "models-fr.html": "https://hzchemnitz.cn/models-fr.html",
    "models-es.html": "https://hzchemnitz.cn/models-es.html",
}

MODEL_ALTERNATES = {
    "en": "https://hzchemnitz.cn/models.html",
    "ru": "https://hzchemnitz.cn/models-ru.html",
    "ar": "https://hzchemnitz.cn/models-ar.html",
    "fr": "https://hzchemnitz.cn/models-fr.html",
    "es": "https://hzchemnitz.cn/models-es.html",
    "x-default": "https://hzchemnitz.cn/models.html",
}


class HeadParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.html_attrs = {}
        self.links = []
        self.scripts = []
        self._json_ld = False
        self._buffer = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.html_attrs = attrs
        if tag == "link":
            self.links.append(attrs)
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self._json_ld = True
            self._buffer = []

    def handle_data(self, data):
        if self._json_ld:
            self._buffer.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self._json_ld:
            self.scripts.append("".join(self._buffer))
            self._json_ld = False
            self._buffer = []


def parse_page(relative_path):
    text = (ROOT / relative_path).read_text(encoding="utf-8")
    parser = HeadParser()
    parser.feed(text)
    return text, parser


def canonical(parser):
    values = [item.get("href") for item in parser.links if item.get("rel") == "canonical"]
    return values[0] if len(values) == 1 else None


def alternates(parser):
    return {
        item.get("hreflang"): item.get("href")
        for item in parser.links
        if item.get("rel") == "alternate" and item.get("hreflang")
    }


class LatamPagesTest(unittest.TestCase):
    def test_country_pages_have_correct_locale_canonical_and_json_ld(self):
        for relative_path, (locale, expected_canonical) in {**HOME_PAGES, **COUNTRY_PAGES}.items():
            with self.subTest(page=relative_path):
                text, parser = parse_page(relative_path)
                self.assertEqual(parser.html_attrs.get("lang"), locale)
                self.assertEqual(canonical(parser), expected_canonical)
                self.assertNotIn("es-419", text)
                for raw_schema in parser.scripts:
                    json.loads(raw_schema)

    def test_home_hreflang_cluster_is_reciprocal(self):
        for relative_path in HOME_PAGES:
            with self.subTest(page=relative_path):
                _, parser = parse_page(relative_path)
                self.assertEqual(alternates(parser), HOME_ALTERNATES)

    def test_country_guides_do_not_claim_translation_equivalence(self):
        for relative_path in COUNTRY_PAGES:
            with self.subTest(page=relative_path):
                _, parser = parse_page(relative_path)
                self.assertEqual(alternates(parser), {})

    def test_model_hreflang_cluster_includes_spanish(self):
        for relative_path, expected_canonical in MODEL_PAGES.items():
            with self.subTest(page=relative_path):
                _, parser = parse_page(relative_path)
                self.assertEqual(canonical(parser), expected_canonical)
                self.assertEqual(alternates(parser), MODEL_ALTERNATES)

    def test_spanish_hub_and_catalog_links(self):
        spanish = (ROOT / "es.html").read_text(encoding="utf-8")
        for target in ("es/peru.html", "es/colombia.html", "es/chile.html", "models-es.html"):
            self.assertIn(target, spanish)

        catalog = (ROOT / "models-es.html").read_text(encoding="utf-8")
        self.assertEqual(catalog.count('class="model-card"'), 46)
        self.assertIn("from=models-es&lang=es", catalog)
        self.assertIn('"numberOfItems": 46', catalog)

    def test_country_faq_schema_questions_are_visible(self):
        for relative_path in ("es/peru.html", "es/colombia.html", "es/chile.html"):
            with self.subTest(page=relative_path):
                text, parser = parse_page(relative_path)
                visible = html.unescape(re.sub(r"<[^>]+>", " ", text))
                schemas = [json.loads(raw) for raw in parser.scripts]
                graph = schemas[0].get("@graph", [])
                faq = next(node for node in graph if node.get("@type") == "FAQPage")
                for item in faq["mainEntity"]:
                    self.assertIn(item["name"], visible)
                    self.assertIn(item["acceptedAnswer"]["text"], visible)

    def test_country_local_resources_exist(self):
        pattern = re.compile(r'(?:href|src)="([^"]+)"')
        for relative_path in ("es/peru.html", "es/colombia.html", "es/chile.html"):
            text = (ROOT / relative_path).read_text(encoding="utf-8")
            base = (ROOT / relative_path).parent
            for reference in pattern.findall(text):
                parsed = urlsplit(reference)
                if parsed.scheme or reference.startswith(("#", "//")):
                    continue
                target = (base / parsed.path).resolve()
                with self.subTest(page=relative_path, resource=reference):
                    self.assertTrue(target.exists(), str(target))

    def test_sitemap_contains_all_localized_pages_and_clusters(self):
        tree = ET.parse(ROOT / "sitemap.xml")
        root = tree.getroot()
        ns = {
            "sm": "http://www.sitemaps.org/schemas/sitemap/0.9",
            "xhtml": "http://www.w3.org/1999/xhtml",
        }
        entries = {}
        for node in root.findall("sm:url", ns):
            loc = node.findtext("sm:loc", namespaces=ns)
            entries[loc] = {
                link.attrib["hreflang"]: link.attrib["href"]
                for link in node.findall("xhtml:link", ns)
            }
        for url in list(HOME_ALTERNATES.values()) + list(MODEL_ALTERNATES.values()):
            self.assertIn(url, entries)
        for url in set(HOME_ALTERNATES.values()):
            self.assertEqual(entries[url], HOME_ALTERNATES)
        for url in set(MODEL_ALTERNATES.values()):
            self.assertEqual(entries[url], MODEL_ALTERNATES)
        for _, country_url in COUNTRY_PAGES.values():
            self.assertIn(country_url, entries)
            self.assertEqual(entries[country_url], {})

        for config_page in ROOT.glob("vehicle-config-*.html"):
            config_url = f"https://hzchemnitz.cn/{config_page.name}"
            self.assertIn(config_url, entries)

    def test_configuration_pages_are_crawlable_and_linked(self):
        catalog = (ROOT / "models-es.html").read_text(encoding="utf-8")
        for config_page in ROOT.glob("vehicle-config-*.html"):
            with self.subTest(page=config_page.name):
                _, parser = parse_page(config_page.name)
                self.assertEqual(canonical(parser), f"https://hzchemnitz.cn/{config_page.name}")
                self.assertIn(config_page.name, catalog)

    def test_spanish_configuration_returns_to_spanish_catalog(self):
        script = (ROOT / "vehicle-config-page.js").read_text(encoding="utf-8")
        self.assertIn("es:{home:'es.html#featured-models',models:'models-es.html#models'}", script)
        self.assertIn("'models-es.html':'models-es.html#models'", script)
        self.assertIn("preserveMarket", script)

    def test_model_buttons_do_not_expose_third_party_fallbacks(self):
        for relative_path in (
            "index.html", "ru.html", "es.html", "models.html",
            "models-ru.html", "models-fr.html", "models-ar.html", "models-es.html",
        ):
            with self.subTest(page=relative_path):
                text = (ROOT / relative_path).read_text(encoding="utf-8")
                self.assertNotIn("autocatalogarchive.com", text)

    def test_analytics_preserves_locale_market_and_page_type(self):
        script = (ROOT / "analytics-events.js").read_text(encoding="utf-8")
        for key in ("page_locale", "target_market", "page_type", "market_select", "catalog_open", "country_cta_click", "queryMarket"):
            self.assertIn(key, script)
        config_script = (ROOT / "vehicle-config-page.js").read_text(encoding="utf-8")
        self.assertIn("data-page-type','vehicle_config", config_script)

    def test_latam_markets_prioritize_jacky_on_whatsapp(self):
        country_script = (ROOT / "latam-country.js").read_text(encoding="utf-8")
        contacts_block = country_script.split("var contacts = [", 1)[1].split("];", 1)[0]
        self.assertLess(contacts_block.index("name: 'Jacky'"), contacts_block.index("name: 'Chloe'"))

        catalog = (ROOT / "models-es.html").read_text(encoding="utf-8")
        self.assertIn("function orderedWhatsappContacts()", catalog)
        self.assertIn("/^(PE|CO|CL)$/.test(market)", catalog)

        config_script = (ROOT / "vehicle-config-page.js").read_text(encoding="utf-8")
        self.assertIn("var latamContactOrder=['8613826126147'", config_script)
        self.assertIn("/^(PE|CO|CL)$/.test(targetMarket)", config_script)

        legacy_config = (ROOT / "vehicle-config-sylphy.html").read_text(encoding="utf-8")
        self.assertIn("/^(PE|CO|CL)$/.test(sylphyMarket)", legacy_config)
        self.assertIn("insertBefore(sylphyJacky", legacy_config)


if __name__ == "__main__":
    unittest.main()
