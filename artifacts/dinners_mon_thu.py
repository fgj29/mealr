from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

out = "/home/workdir/artifacts/Mon-Thu_Dinners_Carson_Sprouts.pdf"
c = canvas.Canvas(out, pagesize=letter)
W, H = letter
GREEN = HexColor("#2F6B3A")
DARK = HexColor("#1A1A1A")
GRAY = HexColor("#555555")
BOX = HexColor("#E8F0E6")

def check(x, y, text, size=10):
    c.setStrokeColor(GREEN)
    c.setLineWidth(1)
    c.rect(x, y - 2, 9, 9, stroke=1, fill=0)
    c.setFillColor(DARK)
    c.setFont("Helvetica", size)
    c.drawString(x + 14, y, text)

y = H - 0.55 * inch
c.setFillColor(GREEN)
c.setFont("Helvetica-Bold", 16)
c.drawString(0.6 * inch, y, "Mon–Thu dinners  •  2 adults  •  Carson Sprouts")
y -= 16
c.setFillColor(GRAY)
c.setFont("Helvetica", 9)
c.drawString(0.6 * inch, y, "Week of Sep 21, 2026  •  under 30 min  •  uses this week’s ad proteins")
y -= 22

c.setFillColor(GREEN)
c.setFont("Helvetica-Bold", 11)
c.drawString(0.6 * inch, y, "MENU")
y -= 16

meals = [
    ("MON  Mexican turkey skillet", "~480 cal/serving  •  20 min",
     "1 lb 93% turkey, onion, bell pepper, 1 can black beans, cumin/chili, salsa, avocado, microwave jasmine rice."),
    ("TUE  Greek chicken thighs + cucumber salad", "~520 cal/serving  •  25 min",
     "1 lb boneless thighs, olive oil, oregano, garlic, lemon. Side: cucumber, tomato, red onion, feta, olive oil."),
    ("WED  Garlic-ginger shrimp stir-fry", "~430 cal/serving  •  20 min",
     "1 lb EZ-peel shrimp, broccoli, bell pepper, garlic, ginger, soy + splash fish sauce. Rice pouch."),
    ("THU  Sheet-pan salmon + corn + potatoes", "~560 cal/serving  •  25 min",
     "2 salmon portions, small potatoes (halved), 2 ears corn or kernels, olive oil, lemon, parsley."),
]
for title, meta, how in meals:
    c.setFillColor(DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(0.6 * inch, y, title)
    c.setFont("Helvetica", 8)
    c.setFillColor(GRAY)
    c.drawString(3.55 * inch, y, meta)
    y -= 13
    c.setFillColor(DARK)
    c.setFont("Helvetica", 8.5)
    c.drawString(0.7 * inch, y, how)
    y -= 16

y -= 4
c.setStrokeColor(HexColor("#C5D5C3"))
c.setLineWidth(0.6)
c.line(0.6 * inch, y, W - 0.6 * inch, y)
y -= 18

c.setFillColor(GREEN)
c.setFont("Helvetica-Bold", 11)
c.drawString(0.6 * inch, y, "ONE-TRIP LIST  —  Carson Sprouts (University & Avalon)")
y -= 14
c.setFillColor(GRAY)
c.setFont("Helvetica", 8)
c.drawString(0.6 * inch, y, "Check pantry first: olive oil, salt, pepper, cumin, chili powder, oregano, garlic powder.")
y -= 18

cols = [
    (0.55 * inch, "PRODUCE", [
        "1 yellow onion",
        "1 red onion (small)",
        "2 bell peppers (any color)",
        "1 head broccoli or 1 bag florets",
        "2 cucumbers (ad item)",
        "2 tomatoes or 1 pint cherry",
        "1 avocado (bagged BOGO 50%)",
        "1 lemon + 1 lime",
        "1 bunch cilantro or parsley",
        "1 small piece fresh ginger",
        "2 ears sweet corn (5/$2) or 1 bag frozen",
        "1.5–2 lb small red/gold potatoes (organic bag BOGO 50%)",
        "2–3 garlic cloves (or jar minced)",
    ]),
    (4.15 * inch, "MEAT & SEAFOOD  (this week’s ad)", [
        "1 lb Old Tyme 93% ground turkey",
        "1 lb all-natural boneless skinless chicken thighs",
        "1 lb large EZ-peel shrimp",
        "2 Atlantic salmon fillets (~6 oz each)",
    ]),
]
for x, head, items in cols:
    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x, y, head)
    yy = y - 14
    for it in items:
        check(x, yy, it, 8.5)
        yy -= 13
    if x < 3 * inch:
        left_bottom = yy

y2 = y - 14 - 13 * 4 - 8
c.setFillColor(GREEN)
c.setFont("Helvetica-Bold", 9)
c.drawString(4.15 * inch, y2, "DAIRY")
y2 -= 14
for it in ["4 oz feta (block or crumble)", "Optional: salsa if you don’t have it"]:
    check(4.15 * inch, y2, it, 8.5)
    y2 -= 13

y3 = y2 - 8
c.setFillColor(GREEN)
c.setFont("Helvetica-Bold", 9)
c.drawString(4.15 * inch, y3, "BULK")
y3 -= 14
for it in ["Jasmine rice (bulk) OR 2 microwave pouches"]:
    check(4.15 * inch, y3, it, 8.5)
    y3 -= 13

y4 = left_bottom - 10
c.setFillColor(GREEN)
c.setFont("Helvetica-Bold", 9)
c.drawString(0.55 * inch, y4, "GROCERY AISLES")
y4 -= 14
for it in [
    "Sprouts black beans, 15 oz can",
    "Soy sauce (or tamari)",
    "Fish sauce if on shelf (skip if not)",
    "Salsa (mild or medium), 12–16 oz",
    "Olive oil if you’re out",
]:
    check(0.55 * inch, y4, it, 8.5)
    y4 -= 13

c.setFillColor(GREEN)
c.setFont("Helvetica-Bold", 9)
c.drawString(4.15 * inch, y4 + 13 * 2, "FROZEN")
check(4.15 * inch, y4 + 13, "Skip unless corn is gone — then frozen corn", 8.5)

y4 -= 18
c.setFillColor(GRAY)
c.setFont("Helvetica", 7.5)
c.drawString(0.55 * inch, 0.45 * inch, "Calories are estimates for 1 of 2 adult servings. Thighs and salmon on sale this week (ad 9/16–9/22). Next ad starts Wed 9/23.")
c.save()
print("wrote", out)
