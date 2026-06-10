from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_russia_landing_page_exists_with_whatsapp_inquiry_cta():
    page = ROOT / "russia.html"
    text = page.read_text(encoding="utf-8")

    assert "Автомобили из Китая для России" in text
    assert "Получить актуальный список авто в WhatsApp" in text
    assert "https://wa.me/8613826126147" in text
    assert "Модель, количество, город назначения" in text


def test_sitemap_includes_russia_landing_page():
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")

    assert "<loc>https://hzchemnitz.cn/russia.html</loc>" in sitemap
