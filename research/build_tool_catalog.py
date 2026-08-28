from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "research/data/expandedCatalog.snapshot.ts"
OUTPUT_PATH = ROOT / "client/src/lib/toolCatalog.ts"

text = CATALOG_PATH.read_text(encoding="utf-8")
start = text.index("export const expandedCatalog =")
start = text.index("[", start)
end = text.rfind("]") + 1
catalog = json.loads(text[start:end])

resource_categories = {
    "Related Awesome Lists", "Related Resources", "Related lists", "Articles", "Examples",
    "Overview", "Contributing to awesome-ai-tools",
}
resource_name_markers = (
    "awesome", "full list", "introduction", "course", "roadmap", "resources",
    "tutorial", "books", "how to learn", "landscape", "specialization",
    "stanford university", "prompt engineering guide", "cookbook",
)
model_categories = {"Models", "Model libraries", "Fully Free Providers"}
model_name_markers = ("llama", "mistral", "hermes", "glm-", "qwen", "gemma", "deepseek", "phi-", "mixtral", "gopher", "opt", "bloom", "vicuna", "beluga")

def is_resource(item: dict) -> bool:
    category = str(item.get("category", ""))
    name = str(item.get("name", "")).lower()
    return category in resource_categories or any(marker in name for marker in resource_name_markers)

def is_model(item: dict) -> bool:
    category = str(item.get("category", ""))
    name = str(item.get("name", "")).lower()
    return category in model_categories or any(marker in name for marker in model_name_markers)

category_meta = {
    "AI Voice Cloning": ("음성·더빙", "음성 생성·변환·더빙 작업", "짧은 대본 단위로 생성하고 발음·톤을 나눠 검수하세요."),
    "AI Music Generators": ("음악·사운드", "음악·배경음·사운드 제작", "곡 전체 설명보다 장르·길이·악기·구조를 짧은 항목으로 나누세요."),
    "Video": ("영상", "영상 생성·편집·자막 작업", "긴 장면 하나보다 짧은 컷과 명확한 수정 지시를 사용하세요."),
    "Speech": ("음성·더빙", "음성 인식·합성·전사", "긴 원문을 한 번에 넣지 말고 화자·구간·출력 형식을 먼저 고정하세요."),
    "Writing assistants": ("글쓰기", "글쓰기·편집·문체 개선", "원문 전체를 반복 전송하지 말고 수정할 문단과 변경 기준만 보내세요."),
    "Chatbots": ("챗봇", "대화형 AI·고객 응대", "시스템 규칙을 짧게 유지하고 대화 이력은 필요한 최근 맥락만 남기세요."),
    "Search engines": ("검색·리서치", "검색·출처 수집·리서치", "질문을 한 문장으로 좁히고 원하는 출처 형식과 기간을 먼저 지정하세요."),
    "Local search engines": ("검색·리서치", "로컬·내부 검색", "검색 범위와 반환할 필드 수를 제한해 불필요한 결과를 줄이세요."),
    "Developer tools": ("개발·코딩", "개발·테스트·배포 보조", "전체 저장소 대신 관련 파일·에러·완료 조건만 제공하세요."),
    "Code": ("개발·코딩", "코드 생성·분석·실행", "작은 함수와 테스트 단위로 요청하고 기존 코드를 매번 다시 붙이지 마세요."),
    "Code Assistant": ("개발·코딩", "코딩 보조·자동완성", "주석과 함수 시그니처를 먼저 확정해 반복 생성량을 줄이세요."),
    "Code completion": ("개발·코딩", "코드 자동완성", "현재 파일과 인접 타입만 열어두고 전체 프로젝트 컨텍스트는 필요할 때만 사용하세요."),
    "Code checking": ("개발·코딩", "코드 검사·품질 확인", "실패 로그의 핵심 구간과 기대 동작만 전달하세요."),
    "CLI tools": ("개발·자동화", "터미널·CLI 기반 작업", "명령어·입력·출력을 표준화해 재시도 때 같은 컨텍스트를 반복하지 마세요."),
    "Browser extensions": ("브라우저·리서치", "브라우저 작업·스크랩·검색 보조", "수집할 필드와 최대 결과 수를 먼저 지정하세요."),
    "Integrations": ("연결·자동화", "서비스 연결·워크플로", "트리거와 액션 사이에 전달할 필드만 선택해 페이로드를 줄이세요."),
    "Productivity": ("업무 생산성", "일정·메모·업무 정리", "출력 형식을 고정하고 중복된 배경 설명은 템플릿으로 치환하세요."),
    "Meeting assistants": ("회의·전사", "회의 녹음·전사·요약", "회의 전체보다 결정사항·액션·담당자·기한 필드만 요청하세요."),
    "Customer Support": ("고객지원", "고객 문의·응대 자동화", "FAQ와 답변 형식을 한 번 설정하고 문의별로 질문 본문만 전달하세요."),
    "Graphic design": ("디자인·이미지", "그래픽·브랜드·레이아웃 제작", "브랜드 규칙은 짧은 토큰으로 저장하고 매 요청에 반복하지 마세요."),
    "Image libraries": ("디자인·이미지", "이미지 검색·에셋 관리", "스타일·비율·사용처를 먼저 제한해 후보 수와 재검색을 줄이세요."),
    "Video": ("영상", "영상 생성·편집·자막 작업", "짧은 컷과 명확한 수정 지시를 사용하세요."),
    "AI Music Generators": ("음악·사운드", "음악·배경음·사운드 제작", "장르·길이·악기·구조를 항목으로 나누세요."),
    "Services": ("AI 서비스", "AI 기반 서비스·API", "요청 필드와 반환 필드만 명시해 불필요한 설명을 줄이세요."),
}

def meta(category: str):
    if category in category_meta:
        return category_meta[category]
    value = category.lower()
    if any(key in value for key in ["video"]):
        return ("영상", "영상 생성·편집·자막 작업", "긴 장면 하나보다 짧은 컷과 명확한 수정 지시를 사용하세요.")
    if any(key in value for key in ["speech", "voice", "phone call"]):
        return ("음성·더빙", "음성 생성·변환·전사", "화자·구간·출력 형식을 먼저 고정하고 필요한 오디오 구간만 처리하세요.")
    if any(key in value for key in ["music"]):
        return ("음악·사운드", "음악·배경음·사운드 제작", "장르·길이·악기·구조를 짧은 항목으로 나눠 요청하세요.")
    if any(key in value for key in ["graphic", "image", "stable diffusion"]):
        return ("이미지·디자인", "이미지·그래픽·에셋 제작", "스타일·비율·사용처를 먼저 고정하고 한 번에 한 변형만 요청하세요.")
    if any(key in value for key in ["developer", "code", "cli", "javascript", "python", "go", "building ai"]):
        return ("개발·코딩", "개발·테스트·배포 보조", "전체 저장소 대신 관련 파일·에러·완료 조건만 제공하세요.")
    if any(key in value for key in ["marketing", "copy", "lead", "customer support", "writing"]):
        return ("콘텐츠·마케팅", "카피·영업·SNS·고객 커뮤니케이션", "브랜드 규칙을 템플릿으로 고정하고 매 요청에 원문 전체를 반복하지 마세요.")
    if any(key in value for key in ["search", "academia", "meeting", "text generator", "chatbot"]):
        return ("리서치·문서", "검색·문서·회의·대화 정리", "질문 범위와 출력 필드를 제한해 불필요한 결과와 반복 요약을 줄이세요.")
    if any(key in value for key in ["productivity", "integration", "service", "bot", "app", "browser", "futurepedia"]):
        return ("업무·자동화", "업무 자동화·앱 연결·에이전트 작업", "트리거·입력 필드·액션·예외만 정의하고 불필요한 배경 설명은 줄이세요.")
    return ("AI 도구", f"{category} 분야의 AI 도구·서비스", "목표·입력·출력 형식을 짧게 고정하고 필요한 정보만 전달하세요.")

def slugify(name: str, idx: int) -> str:
    slug = re.sub(r"[^a-z0-9가-힣]+", "-", name.lower()).strip("-")
    return f"{slug or 'tool'}-{idx}"

seen = set()
items = []
for item in catalog:
    if is_resource(item) or is_model(item):
        continue
    name = str(item.get("name", "")).strip()
    if not name or name.lower() in seen:
        continue
    seen.add(name.lower())
    category = str(item.get("category", "기타"))
    audience_category, use_case, tip = meta(category)
    note = str(item.get("note", "")).strip()
    if note == "✅":
        note = f"{category} 분야에서 확인된 도구"
    tags = [audience_category, category]
    tags.extend([str(tag) for tag in item.get("tags", []) if str(tag) not in tags])
    items.append({
        "id": len(items) + 1,
        "slug": slugify(name, len(items) + 1),
        "name": name,
        "category": audience_category,
        "sourceCategory": category,
        "description": note,
        "useCase": use_case,
        "tokenTip": tip,
        "promptStarter": f"{name}에서 {use_case}를 진행해줘. 목표: [원하는 결과]. 입력: [자료]. 출력: [형식]. 불확실한 정보는 추측하지 말고 확인 질문으로 남겨줘.",
        "pricing": str(item.get("pricing", "확인 필요")),
        "source": str(item.get("source", "공개 기록")),
        "verifiedAt": str(item.get("verifiedAt", "2026-08-20")),
        "url": str(item.get("url", "")),
        "tags": tags[:6],
    })

output = "/* Generated from the repository's expanded public catalog; resource lists and model-only records are excluded. */\n"
output += "export type DirectoryTool = " + json.dumps(items[0], ensure_ascii=False, indent=2) + ";\n" if items else ""
# Replace the single example object with a typed array declaration while preserving readable JSON.
output = "/* Generated from the repository's expanded public catalog; resource lists and model-only records are excluded. */\n"
output += "export type DirectoryTool = { id:number; slug:string; name:string; category:string; sourceCategory:string; description:string; useCase:string; tokenTip:string; promptStarter:string; pricing:string; source:string; verifiedAt:string; url:string; tags:string[] };\n"
output += "export const directoryTools: DirectoryTool[] = " + json.dumps(items, ensure_ascii=False, indent=2) + ";\n"
output += "export const directoryToolCategories = ['전체', ...Array.from(new Set(directoryTools.map((tool) => tool.category))).sort()];\n"
OUTPUT_PATH.write_text(output, encoding="utf-8")
print(json.dumps({"generated": len(items), "output": str(OUTPUT_PATH)}, ensure_ascii=False))
