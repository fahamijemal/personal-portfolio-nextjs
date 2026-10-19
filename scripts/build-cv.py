"""Rebuild the public CV: python scripts/build-cv.py (requires reportlab)."""
from pathlib import Path
import re
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, PageBreak

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path('/usr/share/fonts/truetype/dejavu')
for name, file in [('CV', 'DejaVuSans.ttf'), ('CV-Bold', 'DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / file)))
pdfmetrics.registerFontFamily('CV', normal='CV', bold='CV-Bold', italic='CV', boldItalic='CV-Bold')
INK = colors.HexColor('#202b24')
GREEN = colors.HexColor('#365441')
styles = {
 'body': ParagraphStyle('body',fontName='CV',fontSize=9,leading=13,textColor=INK,spaceAfter=5),
 'name': ParagraphStyle('name',fontName='CV-Bold',fontSize=25,leading=29,textColor=INK,spaceAfter=8),
 'section': ParagraphStyle('section',fontName='CV-Bold',fontSize=10.5,leading=15,textColor=GREEN,spaceBefore=11,spaceAfter=6,keepWithNext=True),
 'project': ParagraphStyle('project',fontName='CV-Bold',fontSize=9.5,leading=14,textColor=INK,spaceBefore=5,spaceAfter=3,keepWithNext=True),
 'link': ParagraphStyle('link',fontName='CV',fontSize=8,leading=11,textColor=GREEN,spaceAfter=5),
 'bullet': ParagraphStyle('bullet',fontName='CV',fontSize=9,leading=13,textColor=INK,leftIndent=10,firstLineIndent=-9,spaceAfter=4),
}
def markup(text):
    text=escape(text)
    text=re.sub(r'\*\*(.*?)\*\*',r'<b>\1</b>',text)
    return re.sub(r'https://[^\s<]+',lambda m: f'<link href="{m.group()}" color="#365441">{m.group()}</link>',text)

def footer(canvas,doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#d7ddd8'))
    canvas.line(43,39,A4[0]-43,39)
    canvas.setFont('CV',7)
    canvas.setFillColor(colors.HexColor('#58635b'))
    canvas.drawString(43,26,'Fahami Jemal Harun | Full-Stack Developer')
    canvas.drawRightString(A4[0]-43,26,f'{doc.page}')
    canvas.restoreState()

story=[]
for line in (ROOT/'content/fahami-jemal-harun-cv.md').read_text().splitlines():
    if not line: continue
    if line=='---PAGE---': story.append(PageBreak()); continue
    kind='body'
    if line.startswith('# '): kind='name'; line=line[2:]
    elif line.startswith('## '): kind='section'; line=line[3:].upper()
    elif line.startswith('### '): kind='project'; line=line[4:]
    elif line.startswith('- '): kind='bullet'; line='• '+line[2:]
    elif line.startswith('https://'): kind='link'
    story.append(Paragraph(markup(line),styles[kind]))
output=ROOT/'public/resume/Fahami-Jemal-Harun-CV.pdf'
output.parent.mkdir(parents=True,exist_ok=True)
doc=SimpleDocTemplate(str(output),pagesize=A4,rightMargin=43,leftMargin=43,topMargin=37,bottomMargin=52,title='Fahami Jemal Harun — Full-Stack Developer CV',author='Fahami Jemal Harun',subject='Full-stack development, agentic AI, MCP, and software engineering',pageCompression=1)
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(output)
