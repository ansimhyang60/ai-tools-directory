import json, re
from pathlib import Path
import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
research = ROOT / 'research'
HEADERS = {'User-Agent': 'AI-100-directory-research/1.0 (public catalog snapshot)'}

def clean(text: str) -> str:
    return re.sub(r'[*_`#>]', '', text).strip()

def pricing_from(text: str) -> str:
    low = text.lower()
    if 'contact for pricing' in low: return '문의형 가격'
    if 'free trial' in low: return '무료 체험'
    if 'freemium' in low: return '프리미엄'
    if re.search(r'\bfree\b', low) or '무료' in low: return '무료/무료 티어 가능'
    if 'paid' in low or '$' in low or '/mo' in low: return '유료 옵션 또는 요금제 있음'
    return '확인 필요'

def parse_github(path: Path, source_name: str):
    out=[]; section='AI 도구'
    for raw in path.read_text(errors='ignore').splitlines():
        line=raw.strip()
        if line.startswith('### '): section=clean(line[4:])
        elif line.startswith('## '): section=clean(line[3:])
        m=re.match(r'^(?:[-*]\s+)?\[([^\]]+)\]\((https?://[^)]+)\)\s*(?:[-–:]\s*)?(.*)$', line)
        if not m: continue
        name,url,desc=m.groups(); name=clean(name); desc=clean(desc)
        if not name or name.lower() in {'website','support','learn more','home'}: continue
        if any(x in url for x in ['shields.io','camo.githubusercontent.com']): continue
        out.append({'name':name,'url':url,'category':section[:50],'pricing':pricing_from(line+' '+desc),'note':desc[:220] if desc else '공개 목록에 등재된 AI 관련 도구·프로젝트','source':source_name})
    return out

def parse_futurepedia(url: str):
    response=requests.get(url,headers=HEADERS,timeout=30); response.raise_for_status()
    soup=BeautifulSoup(response.text,'html.parser'); out=[]
    for a in soup.select('a[href*="/tool/"]'):
        href=a.get('href',''); name=' '.join(a.get_text(' ',strip=True).split())
        if not name or len(name)>90: continue
        card=a.find_parent(['article','li','div'])
        text=' '.join(card.get_text(' ',strip=True).split()) if card else name
        # avoid rating/profile links and repeated nested anchors
        if 'Rated' in name or name.lower() in {'visit','add bookmark'}: continue
        full=href if href.startswith('http') else 'https://www.futurepedia.io'+href
        out.append({'name':name,'url':full,'category':'Futurepedia AI tools','pricing':pricing_from(text),'note':text[:220],'source':'Futurepedia public directory'})
    return out

items=[]
for file_name,source in [('free-ai-tools.md','GitHub · free-ai-tools'),('awesome-chatgpt.md','GitHub · awesome-chatgpt'),('awesome-ai-tools-mahseema.md','GitHub · mahseema/awesome-ai-tools'),('awesome-ai-tools-nanogiants.md','GitHub · nanogiants/awesome-ai-tools')]:
    path=research/file_name
    if path.exists(): items += parse_github(path,source)
for page in ['https://www.futurepedia.io/ai-tools/business','https://www.futurepedia.io/ai-tools/productivity','https://www.futurepedia.io/ai-tools/code','https://www.futurepedia.io/ai-tools/image']:
    try: items += parse_futurepedia(page)
    except Exception as exc: print('futurepedia_skip',page,exc)

seen=set(); unique=[]
for item in items:
    key=(item['name'].lower(),item['url'].split('?')[0].rstrip('/'))
    if key in seen: continue
    seen.add(key); unique.append(item)
for i,item in enumerate(unique,1):
    item['id']=i; item['verifiedAt']='2026-08-20'; item['tags']=[item['category']]

out_path=ROOT/'research/data/expandedCatalog.snapshot.ts'
out_path.write_text('export type CatalogTool = { id:number; name:string; url:string; category:string; pricing:string; note:string; source:string; verifiedAt:string; tags:string[] };\n\nexport const expandedCatalog = '+json.dumps(unique,ensure_ascii=False,indent=2)+' as const;\n',encoding='utf-8')
print(f'items={len(items)} unique={len(unique)} output={out_path}')
