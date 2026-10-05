import fitz
from PIL import Image, ImageDraw
from pathlib import Path

pdf_path = r"C:\Users\it.BHORUKAPARK\Downloads\Bhoruka Tech Park Building 2 Presentation.pdf"
out = Path(__file__).parent
doc = fitz.open(pdf_path)
rows = []
thumbs = []
for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(0.32, 0.32), alpha=False)
    path = out / f"page-{index + 1:02d}.jpg"
    pix.save(path)
    im = Image.open(path).convert("RGB")
    im.thumbnail((300, 170))
    thumb = Image.new("RGB", (320, 205), "white")
    thumb.paste(im, ((320-im.width)//2, 24))
    ImageDraw.Draw(thumb).text((8, 5), f"Page {index + 1}", fill="black")
    thumbs.append(thumb)
    for info in page.get_images(full=True):
        xref = info[0]
        image = doc.extract_image(xref)
        rows.append((index + 1, xref, image["width"], image["height"], len(image["image"]), image["ext"]))

cols = 4
sheet = Image.new("RGB", (cols*320, ((len(thumbs)+cols-1)//cols)*205), "#ddd")
for i, thumb in enumerate(thumbs):
    sheet.paste(thumb, ((i%cols)*320, (i//cols)*205))
sheet.save(out / "pages-contact-sheet.jpg", quality=90)
(out / "image-map.tsv").write_text("page\txref\twidth\theight\tbytes\text\n" + "\n".join("\t".join(map(str,r)) for r in rows), encoding="utf-8")
print(f"{len(doc)} pages, {len(rows)} page-image references")
