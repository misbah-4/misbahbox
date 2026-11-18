"""Turns the linear-format case studies into misbahbox's projects.js (sections of heading, body, image).

Usage: python scripts/case-studies-to-projects.py "C:/Users/tidesofArt/Documents/tideofArt/Projects/Case Studies" src/data/projects.js
"""
import io, json, re, sys

SRC = sys.argv[1]
OUT = sys.argv[2]
STUDIES = [
    ('placeam', 'placeam-overview.md'),
    ('placeam-ai-studio', 'placeam-ai-studio-non-technical-users.md'),
    ('placeam-cut-and-shape', 'placeam-cut-tool.md'),
    ('placeam-pen', 'placeam-pencil-tool.md'),
    ('placeam-order-several', 'placeam-bulk-variants.md'),
    ('fleetkit', 'fleetkit.md'),
    ('acemyx', 'acemyx.md'),
]
# Images that already exist in the portfolio, matched by the file named in the placeholder.
REAL = {
    'image-1.webp': {'src': '/images/project/image-1.webp', 'alt': 'Fleetkit wordmark on violet', 'bg': '#d9d9d9'},
    'image-2.webp': {'src': '/images/project/image-2.webp', 'alt': 'Three Fleetkit mobile screens', 'tight': True},
}

def short(show):
    # A placeholder label: the first clause of what the picture shows.
    first = show.split(', ', 1)[0].strip()
    return first if len(first) <= 90 else first[:88].rsplit(' ', 1)[0] + '...'

def convert(path):
    text = io.open(path, encoding='utf-8').read().replace('\r\n', '\n')
    _, front, body = text.split('---\n', 2)
    title = re.search(r'^title: (.+)$', front, re.M).group(1).strip()
    sections, cur = [], {'body': []}
    for block in [b.strip() for b in body.split('\n\n') if b.strip()]:
        if block.startswith('[ADD:'):
            continue
        block = re.sub(r'\s*\[ADD:[^\]]*\]', '', block).strip()
        if not block:
            continue
        m = re.match(r'^\[IMAGE:\s*(.*?)\s*\|\s*Use:\s*(.*)\]$', block, re.S)
        if m:
            show, use = m.group(1), m.group(2)
            real = next((v for k, v in REAL.items() if k in use), None)
            cur['image'] = dict(real) if real else {'alt': show, 'placeholder': short(show)}
            sections.append(cur)
            cur = {'body': []}
            continue
        if block.startswith('## '):
            if cur['body'] or cur.get('heading'):
                sections.append(cur)
            cur = {'heading': block[3:].strip(), 'body': []}
            continue
        cur['body'].append(re.sub(r'\s*\n\s*', ' ', block))
    if cur['body'] or cur.get('heading'):
        sections.append(cur)
    # An image that opens a section with no text of its own joins the section before it.
    out = []
    for s in sections:
        if not s['body'] and not s.get('heading') and out and 'image' not in out[-1]:
            out[-1]['image'] = s['image']
        else:
            out.append(s)
    return title, out

projects = {}
for slug, f in STUDIES:
    title, sections = convert(f'{SRC}/{f}')
    projects[slug] = {'title': title, 'hero': '/images/project/hero.svg', 'sections': sections}

js = ('// Generated from the case studies in Projects/Case Studies (linear format). Edit the studies, then run scripts/case-studies-to-projects.py.\n'
      '// An image with `placeholder` and no `src` shows a neutral box until the real screen is captured.\n'
      'export const projects = ' + json.dumps(projects, indent=2, ensure_ascii=False) + '\n')
io.open(OUT, 'w', encoding='utf-8', newline='\n').write(js)
for slug, p in projects.items():
    imgs = [s['image'] for s in p['sections'] if 'image' in s]
    print(slug, len(p['sections']), 'sections,', len(imgs), 'images,', sum(1 for i in imgs if 'src' in i), 'real')
