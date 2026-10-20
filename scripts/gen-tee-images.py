"""Generate Acne-inspired editorial SVGs for the Cefiro Essentials Tee."""
import sys, os

OUT = sys.argv[1]

SKIN, SKIN_SH, SKIN_HI = '#A9785A', '#8E5F45', '#BD8C6C'
HAIR = '#1B1714'
TEE, TEE_FOLD, TEE_HI = '#17191C', '#0E1012', '#24272B'
PANT, PANT_SH = '#C3C9CF', '#AEB5BC'
SHOE, SHOE_SH = '#F4F5F6', '#D5D9DD'
LOGO = '#9AA1A8'


def backdrop(gid):
    # Seamless studio cyc: wall fades into floor
    return f'''
  <defs>
    <linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#E9ECEF"/>
      <stop offset="0.72" stop-color="#E1E5E9"/>
      <stop offset="0.86" stop-color="#D6DBE0"/>
      <stop offset="1" stop-color="#CED4DA"/>
    </linearGradient>
    <radialGradient id="{gid}-shadow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#14171B" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#14171B" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="{gid}-tee" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{TEE_FOLD}"/>
      <stop offset="0.35" stop-color="{TEE_HI}"/>
      <stop offset="0.7" stop-color="{TEE}"/>
      <stop offset="1" stop-color="{TEE_FOLD}"/>
    </linearGradient>
    <linearGradient id="{gid}-pant" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{PANT_SH}"/>
      <stop offset="0.4" stop-color="{PANT}"/>
      <stop offset="1" stop-color="{PANT_SH}"/>
    </linearGradient>
    <linearGradient id="{gid}-skin" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{SKIN_SH}"/>
      <stop offset="0.45" stop-color="{SKIN_HI}"/>
      <stop offset="1" stop-color="{SKIN_SH}"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="1000" fill="url(#{gid})"/>
  <ellipse cx="500" cy="928" rx="190" ry="22" fill="url(#{gid}-shadow)"/>'''


def legs_and_shoes(gid):
    return f'''
  <!-- Wide-leg trousers -->
  <path d="M386,536 L614,536 L622,600 L646,900 L512,904 L500,640 L488,904 L354,900 L378,600 Z" fill="url(#{gid}-pant)"/>
  <path d="M500,560 L500,640" stroke="{PANT_SH}" stroke-width="2"/>
  <path d="M430,620 Q424,760 410,898" stroke="{PANT_SH}" stroke-width="2" fill="none" opacity="0.7"/>
  <path d="M572,620 Q578,760 592,898" stroke="{PANT_SH}" stroke-width="2" fill="none" opacity="0.7"/>
  <!-- Chunky white shoes -->
  <path d="M362,896 L488,900 Q494,918 486,930 L352,930 Q326,928 330,912 Q338,898 362,896 Z" fill="{SHOE}"/>
  <path d="M340,922 L488,924 L486,932 L350,932 Z" fill="{SHOE_SH}"/>
  <path d="M512,900 L638,896 Q662,898 670,912 Q674,928 648,930 L514,930 Q506,918 512,900 Z" fill="{SHOE}"/>
  <path d="M512,924 L660,922 L650,932 L514,932 Z" fill="{SHOE_SH}"/>'''


def arms(gid):
    # Left arm hangs straight; right arm slightly out — a deadpan, slightly off pose
    return f'''
  <path d="M318,410 L376,418 L370,592 Q360,602 348,600 L334,594 Z" fill="url(#{gid}-skin)"/>
  <ellipse cx="350" cy="614" rx="20" ry="28" fill="{SKIN}"/>
  <path d="M626,418 L688,410 L676,500 L604,566 L586,540 L640,486 Z" fill="url(#{gid}-skin)"/>
  <path d="M584,536 L606,566 L596,576 L578,552 Z" fill="{SKIN_SH}"/>
  <path d="M572,560 Q590,548 604,566" stroke="{PANT_SH}" stroke-width="3" fill="none"/>'''


def neck(back=False):
    return f'''
  <path d="M474,182 L526,182 L532,258 L468,258 Z" fill="{SKIN_SH}"/>
  <path d="M478,196 Q500,214 522,196 L522,206 Q500,224 478,206 Z" fill="#7A5039" opacity="{0 if back else 0.5}"/>'''


TEE_BODY = 'M455,230 L360,248 Q332,262 326,300 L306,420 L380,430 L382,546 Q500,552 618,546 L620,430 L694,420 L674,300 Q668,262 640,248 L545,230 Q500,262 455,230 Z'
TEE_BACK = TEE_BODY.replace('Q500,262 455,230', 'Q500,240 455,230')


def tee(gid, back=False):
    collar = ('<path d="M462,232 Q500,240 538,232" stroke="#2C3035" stroke-width="5" fill="none"/>' if back else
              '<path d="M455,230 Q500,268 545,230" fill="none" stroke="#2C3035" stroke-width="6"/>'
              '')
    print_ = ('<text x="500" y="300" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" '
              f'font-size="13" letter-spacing="6" fill="{LOGO}">CEFIRO STUDIOS</text>' if back else
              f'<circle cx="548" cy="296" r="11" fill="none" stroke="{LOGO}" stroke-width="1.5"/>'
              f'<text x="548" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="{LOGO}">CS</text>')
    return f'''
  <!-- Oversized heavyweight tee, dropped shoulders -->
  <path d="{TEE_BACK if back else TEE_BODY}" fill="url(#{gid}-tee)"/>
  <path d="M380,330 Q384,380 382,430" stroke="{TEE_FOLD}" stroke-width="3" fill="none"/>
  <path d="M620,330 Q616,380 620,430" stroke="{TEE_FOLD}" stroke-width="3" fill="none"/>
  <path d="M430,440 Q470,470 450,540" stroke="{TEE_HI}" stroke-width="3" fill="none" opacity="0.8"/>
  <path d="M560,420 Q540,480 566,544" stroke="{TEE_FOLD}" stroke-width="3" fill="none"/>
  <path d="M382,538 L618,538" stroke="{TEE_FOLD}" stroke-width="3"/>
  {collar}
  {print_}'''


def head(back=False):
    if back:
        return f'''
  <ellipse cx="500" cy="142" rx="44" ry="54" fill="{SKIN_SH}"/>
  <path d="M456,140 Q456,84 500,84 Q544,84 544,140 Q544,170 532,184 L468,184 Q456,170 456,140 Z" fill="{HAIR}"/>
  <ellipse cx="455" cy="146" rx="6" ry="12" fill="{SKIN_SH}"/>
  <ellipse cx="545" cy="146" rx="6" ry="12" fill="{SKIN_SH}"/>'''
    return f'''
  <ellipse cx="455" cy="148" rx="7" ry="13" fill="{SKIN_SH}"/>
  <ellipse cx="545" cy="148" rx="7" ry="13" fill="{SKIN_SH}"/>
  <ellipse cx="500" cy="144" rx="44" ry="56" fill="{SKIN}"/>
  <ellipse cx="488" cy="128" rx="20" ry="30" fill="{SKIN_HI}" opacity="0.45"/>
  <!-- Close crop -->
  <path d="M456,134 Q454,86 500,84 Q546,86 544,134 Q536,108 500,106 Q464,108 456,134 Z" fill="{HAIR}"/>
  <!-- Deadpan features -->
  <path d="M473,131 Q482,128 491,131" stroke="{HAIR}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M509,131 Q518,128 527,131" stroke="{HAIR}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="482" cy="143" rx="6" ry="3.5" fill="#EDE6E0"/><circle cx="483" cy="143" r="3" fill="#1E1612"/>
  <ellipse cx="518" cy="143" rx="6" ry="3.5" fill="#EDE6E0"/><circle cx="519" cy="143" r="3" fill="#1E1612"/>
  <path d="M475,140 Q482,137 489,140" stroke="{SKIN_SH}" stroke-width="1.5" fill="none"/>
  <path d="M511,140 Q518,137 525,140" stroke="{SKIN_SH}" stroke-width="1.5" fill="none"/>
  <path d="M497,148 Q494,162 496,166 Q500,169 506,166" fill="none" stroke="{SKIN_SH}" stroke-width="2" stroke-linecap="round"/>
  <path d="M489,180 L511,180" stroke="#6E4534" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M492,184 Q500,186 508,184" stroke="{SKIN_HI}" stroke-width="1.5" fill="none"/>'''


def model(gid, back=False):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{{VB}}" width="1000" height="1000">'
            + backdrop(gid) + legs_and_shoes(gid)
            + (f'<g transform="translate(1000 0) scale(-1 1)">{arms(gid)}</g>' if back else arms(gid))
            + neck(back) + tee(gid, back) + head(back)
            + '\n</svg>\n')


def flat():
    gid = 'f'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">'
            + backdrop(gid).replace('cy="928" rx="190" ry="22"', 'cy="895" rx="300" ry="24"')
            + f'''
  <g transform="translate(-550 -290) scale(2.1)">
    <path d="{TEE_BODY}" fill="url(#{gid}-tee)"/>
    <path d="M455,230 Q500,268 545,230" fill="none" stroke="#2C3035" stroke-width="5"/>
    <path d="M455,230 Q500,262 545,230 Q500,240 455,230 Z" fill="#0B0C0E"/>
    <path d="M380,330 Q384,380 382,430" stroke="{TEE_FOLD}" stroke-width="2" fill="none"/>
    <path d="M620,330 Q616,380 620,430" stroke="{TEE_FOLD}" stroke-width="2" fill="none"/>
    <path d="M382,538 L618,538" stroke="{TEE_FOLD}" stroke-width="2"/>
    <path d="M308,410 L380,420" stroke="{TEE_FOLD}" stroke-width="2"/>
    <path d="M620,420 L692,410" stroke="{TEE_FOLD}" stroke-width="2"/>
    <circle cx="548" cy="296" r="11" fill="none" stroke="{LOGO}" stroke-width="1.5"/>
    <text x="548" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="{LOGO}">CS</text>
  </g>
</svg>
''')


files = {
    'tee-flat.svg': flat(),
    'tee-model-front.svg': model('mf').replace('{VB}', '0 0 1000 1000'),
    'tee-model-back.svg': model('mb', back=True).replace('{VB}', '0 0 1000 1000'),
    # Close crop of the same front shot: chest, collar, logo
    'tee-model-detail.svg': model('md').replace('{VB}', '400 190 260 260'),
}
for name, svg in files.items():
    with open(os.path.join(OUT, name), 'w') as f:
        f.write(svg)
    print('wrote', name)
