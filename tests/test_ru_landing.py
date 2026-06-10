from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_ru_homepage_targets_russian_dealer_inquiries():
    text = (ROOT / "ru.html").read_text(encoding="utf-8")

    assert "для дилеров и импортёров в России" in text
    assert "Получить актуальный список авто в WhatsApp" in text
    assert "Модель, количество, город назначения" in text
    assert "FOB или CIF" in text


def test_sitemap_prioritizes_ru_homepage_not_separate_russia_page():
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")

    assert "<loc>https://hzchemnitz.cn/ru.html</loc><changefreq>weekly</changefreq><priority>0.9</priority>" in sitemap
    assert "https://hzchemnitz.cn/russia.html" not in sitemap
