# Generates the ESPHome Hunter logo (original artwork: water drop + chip, not the Hunter Industries logo).
# Usage: pip install fonttools resvg_py pillow; run from docs/img/ (writes the SVGs and PNGs there).
# Font: Roboto (Apache-2.0); text is converted to paths so the SVGs need no font.
import math, resvg_py
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
G1,G2='#2BD47D','#0A8FD8'
A=(300,78); Cc=(300,372); R=168; SW=22
d=Cc[1]-A[1]; phi=math.acos(R/d)
tr=(Cc[0]+R*math.sin(phi), Cc[1]-R*math.cos(phi)); tl=(Cc[0]-R*math.sin(phi), tr[1])
drop=f'M{A[0]} {A[1]}L{tr[0]:.1f} {tr[1]:.1f}A{R} {R} 0 1 1 {tl[0]:.1f} {tl[1]:.1f}Z'
# chip
cx,cy,cs=300,402,128
chip=f'<rect x="{cx-cs/2}" y="{cy-cs/2}" width="{cs}" height="{cs}" rx="20" fill="#fff"/>'
pins=[]
for k in (-1,0,1):
    o=k*38
    pins.append(f'M{cx-cs/2-6} {cy+o}H{cx-cs/2-30}')
    pins.append(f'M{cx+cs/2+6} {cy+o}H{cx+cs/2+30}')
    pins.append(f'M{cx+o} {cy+cs/2+6}V{cy+cs/2+28}')
top=cy-cs/2
tr_=[f'M{cx} {top-6}V{top-80}', f'M{cx-38} {top-6}V{top-34}L{cx-78} {top-74}', f'M{cx+38} {top-6}V{top-34}L{cx+78} {top-74}']
rings=[(cx,top-80-15,15),(cx-78-10,top-74-10,13),(cx+78+10,top-74-10,13)]
# small drop inside the chip
a2=(cx,cy-40); c2=(cx,cy+14); r2=30; d2=c2[1]-a2[1]; p2=math.acos(r2/d2)
q1=(c2[0]+r2*math.sin(p2),c2[1]-r2*math.cos(p2)); q2=(c2[0]-r2*math.sin(p2),q1[1])
mini=f'M{a2[0]} {a2[1]}L{q1[0]:.1f} {q1[1]:.1f}A{r2} {r2} 0 1 1 {q2[0]:.1f} {q2[1]:.1f}Z'
body=f'''<defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{G1}"/><stop offset="1" stop-color="{G2}"/></linearGradient></defs>
<rect width="600" height="600" rx="128" fill="url(#hg)"/>
<path d="{drop}" fill="none" stroke="#fff" stroke-width="{SW}" stroke-linejoin="round"/>
<g stroke="#fff" stroke-linecap="round" stroke-linejoin="round" fill="none"><path stroke-width="14" d="{''.join(pins)}"/><path stroke-width="14" d="{''.join(tr_)}"/></g>
{chip}
<g fill="url(#hg)" stroke="#fff" stroke-width="10">{''.join(f'<circle cx="{x}" cy="{y}" r="{r}"/>' for x,y,r in rings)}</g>
<path d="{mini}" fill="url(#hg)"/>'''
icon=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">{body}</svg>'
open('icon.svg','w').write(icon)
import os; src=os.environ.get('ROBOTO','Roboto-VariableFont_wdth,wght.ttf')
def mk(w):
    f=instancer.instantiateVariableFont(TTFont(src),{'wght':w,'wdth':100}); return f.getGlyphSet(),f.getBestCmap(),f['head'].unitsPerEm
FB=mk(700); FR=mk(400)
def tp(F,s,size,x0,base):
    gs,cmap,upm=F; sc=size/upm; x=0; pen=SVGPathPen(gs)
    for ch in s:
        g=cmap[ord(ch)]; gs[g].draw(TransformPen(pen,(sc,0,0,-sc,x0+x*sc,base))); x+=gs[g].width
    return pen.getCommands(), x*sc
NAME='ESPHome Hunter'
_,TW=tp(FB,NAME,140,0,0)
def full(color):
    W=max(860,TW+40); ox=(W-600)/2; tx=(W-TW)/2
    t,_=tp(FB,NAME,140,tx,745)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} 780" width="{W:.0f}" height="780"><g transform="translate({ox:.1f} 0)">{body}</g><path fill="{color}" d="{t}"/></svg>'
open('logo-light.svg','w').write(full('#0B2A1F'))
open('logo-dark.svg','w').write(full('#FFFFFF'))
W,H=1280,640; s=0.55; ix=70; iy=(H-600*s)/2; tx=ix+600*s+60
t,_=tp(FB,NAME,86,tx,280)
l1,_=tp(FR,'Hunter X-Core irrigation in Home Assistant',36,tx,350)
l2,_=tp(FR,'Plug in, click Install, done. No YAML.',36,tx,398)
l3,_=tp(FR,'Hunter_LS board by Luís Soares  ·  ESPHome  ·  Local',26,tx,470)
soc=f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#062A22"/><stop offset="1" stop-color="#06304D"/></linearGradient></defs>
<rect width="{W}" height="{H}" fill="url(#bg)"/><g transform="translate({ix} {iy}) scale({s})">{body}</g>
<path fill="#FFFFFF" d="{t}"/><path fill="#CFF5E4" d="{l1}{l2}"/><path fill="{G1}" d="{l3}"/></svg>'''
open('social-preview.svg','w').write(soc)
def png(svgtxt,out,w=None,h=None):
    data=resvg_py.svg_to_bytes(svg_string=svgtxt,width=w,height=h) if w else resvg_py.svg_to_bytes(svg_string=svgtxt)
    open(out,'wb').write(bytes(data))
png(icon,'icon-512.png',512,512); png(icon,'icon.png',256,256); png(icon,'apple-touch-icon.png',180,180)
png(icon,'favicon-32.png',32,32); png(icon,'favicon-16.png',16,16); png(icon,'favicon-48.png',48,48)
png(full('#0B2A1F'),'logo-light.png',512,None) if False else None
png(soc,'social-preview.png',W,H)
print('ok',TW)
