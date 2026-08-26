import json
from pathlib import Path

ROOT = Path('/home/ubuntu/ai-tools-directory')
source = json.loads((ROOT / 'research/verified_skills.json').read_text())

repo_order = [
    'anthropics/skills',
    'obra/superpowers',
    'vercel-labs/agent-skills',
    'K-Dense-AI/claude-scientific-skills',
    'ComposioHQ/awesome-claude-skills',
    'travisvn/awesome-claude-skills',
    'BehiSecc/awesome-claude-skills',
]

def classify(name: str):
    n = name.lower()
    if any(k in n for k in ['frontend', 'ui', 'ux', 'design', 'canvas', 'brand', 'theme', 'web-artifact']):
        return 'UI/UX·디자인'
    if any(k in n for k in ['pdf', 'docx', 'xlsx', 'pptx', 'document', 'slides', 'spreadsheet', 'word']):
        return '문서·파일'
    if any(k in n for k in ['test', 'debug', 'review', 'refactor', 'code', 'development', 'git', 'branch', 'commit']):
        return '개발·품질'
    if any(k in n for k in ['research', 'scientific', 'literature', 'paper', 'data', 'academic']):
        return '리서치·데이터'
    if any(k in n for k in ['mcp', 'api', 'browser', 'automation', 'agent', 'parallel', 'dispatch']):
        return '에이전트·자동화'
    if any(k in n for k in ['write', 'communication', 'comms', 'email', 'copy', 'blog']):
        return '글쓰기·커뮤니케이션'
    if any(k in n for k in ['brainstorm', 'plan', 'planning', 'execute', 'workflow', 'methodology']):
        return '기획·프로세스'
    return '업무 생산성'

def korean_name(name: str):
    return name.replace('-', ' ').replace('_', ' ')

def detail(name: str, category: str):
    pretty = korean_name(name)
    if category == 'UI/UX·디자인':
        return (
            f'{pretty} 관련 디자인 작업을 AI가 일정한 규칙으로 돕는 스킬입니다.',
            '요청 → 참고 자료와 제약 입력 → 시안 또는 코드 생성 → 스크린샷으로 검토 → 수정 지시의 순서로 사용합니다.',
            f'“{pretty} 기준으로 모바일 홈페이지의 히어로·CTA·푸터를 설계하고 접근성 체크리스트도 만들어줘.”'
        )
    if category == '문서·파일':
        return (
            f'{pretty} 형식의 문서·파일 작업을 반복 가능한 절차로 정리하는 스킬입니다.',
            '파일을 먼저 업로드하거나 작업 폴더를 지정하고, 결과 형식·출처·검수 기준을 명확히 적은 뒤 생성 결과를 확인합니다.',
            f'“{pretty}를 사용해 이 자료를 표준 양식으로 변환하고 누락된 항목을 표시해줘.”'
        )
    if category == '개발·품질':
        return (
            f'{pretty} 개발 작업을 단계별로 수행하거나 검수하는 스킬입니다.',
            '작업 범위와 테스트 명령을 먼저 정하고, AI에게 계획을 보여 달라고 한 뒤 작은 변경·테스트·리뷰 순서로 적용합니다.',
            f'“{pretty} 방식으로 이 기능을 수정하고 변경 파일·테스트 결과·남은 위험을 요약해줘.”'
        )
    if category == '리서치·데이터':
        return (
            f'{pretty} 기반 조사·데이터 작업을 출처와 함께 정리하는 스킬입니다.',
            '질문·자료 범위·출처 표기 규칙을 지정하고, 사실·추론·미확인 내용을 분리해서 결과를 받습니다.',
            f'“{pretty} 절차로 이 주제를 조사하고 원문 링크와 확인 날짜를 표로 정리해줘.”'
        )
    if category == '에이전트·자동화':
        return (
            f'{pretty}를 활용해 여러 단계의 작업이나 외부 도구 연결을 구조화하는 스킬입니다.',
            '입력·처리 단계·사람 확인 지점·실패 시 복구 방법을 먼저 적고, 민감한 전송이나 삭제 작업은 자동 실행하지 않습니다.',
            f'“{pretty}를 사용해 문의 메일을 분류하고, 발송 전에는 내가 승인하도록 워크플로를 설계해줘.”'
        )
    if category == '글쓰기·커뮤니케이션':
        return (
            f'{pretty} 방식으로 업무 글쓰기와 커뮤니케이션 결과를 일정한 톤으로 만드는 스킬입니다.',
            '독자·목적·톤·금지 표현·길이를 지정하고 초안과 검수 포인트를 분리해 요청합니다.',
            f'“{pretty} 기준으로 고객에게 보낼 공손한 안내문 3개와 선택 기준을 만들어줘.”'
        )
    if category == '기획·프로세스':
        return (
            f'{pretty}를 활용해 아이디어를 실행 계획과 검증 가능한 작업으로 바꾸는 스킬입니다.',
            '목표·제약·완료 조건을 적고, AI가 질문을 먼저 하게 한 뒤 단계별 체크리스트로 진행합니다.',
            f'“{pretty} 방식으로 초보자용 여행 웹앱의 2주 제작 계획과 매일의 완료 조건을 만들어줘.”'
        )
    return (
        f'{pretty}를 업무 문제에 적용하기 위한 재사용 가능한 작업 지침입니다.',
        '목적과 입력 자료를 설명하고, 원하는 결과 형식과 사람이 확인해야 할 부분을 함께 지정합니다.',
        f'“{pretty}를 사용해 이 업무를 초보자도 반복할 수 있는 5단계 절차로 바꿔줘.”'
    )

records = []
seen = set()
# User-requested reference skill first.
records.append({
    'id': 1,
    'name': 'UI/UX Pro Max',
    'slug': 'ui-ux-pro-max-skill',
    'category': 'UI/UX·디자인',
    'summary': '전문적인 웹·앱 UI/UX를 설계하고 디자인 시스템을 적용하는 스킬',
    'guide': 'ui-ux-pro-max는 디자인 방향을 정하고, UI 요소·스타일·컴포넌트·접근성 기준을 함께 검토하는 디자인 지식 계층입니다. Claude Code, Antigravity, Codex CLI 등 저장소를 읽는 코딩 에이전트에서 프로젝트 지침으로 활용할 수 있습니다.',
    'howTo': 'npm install -g ui-ux-pro-max-cli 후 프로젝트 폴더에서 uipro init --ai claude, uipro init --ai antigravity, uipro init --ai codex 또는 uipro init --ai all을 실행합니다. ChatGPT에서는 설치 대신 아래 프롬프트 예시를 규칙으로 붙여 사용할 수 있습니다.',
    'example': '“모바일 우선 SaaS 랜딩페이지를 설계하고, 색상·폰트·간격·CTA·WCAG 대비·반응형 브레이크포인트를 먼저 제안한 뒤 구현해줘.”',
    'compatible': ['Claude Code', 'Antigravity', 'Codex CLI', 'Cursor', 'Windsurf', 'Gemini CLI', 'Manus', 'ChatGPT(프롬프트 적용)'],
    'license': 'MIT',
    'licenseNote': 'README의 LICENSE 표기 확인',
    'source': 'nextlevelbuilder/ui-ux-pro-max-skill',
    'sourceUrl': 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    'importUrl': 'https://manus.im/app#settings/skills/import?githubUrl=https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    'verifiedAt': '2026-08-20',
    'tags': ['UI/UX', '웹사이트', '디자인 시스템', '접근성', '반응형']
})

for repo in repo_order:
    block = source.get('repositories', {}).get(repo, {})
    for item in block.get('skills', []):
        name = item.get('name', '').strip()
        if not name or name.lower() in seen or len(records) >= 100:
            continue
        seen.add(name.lower())
        category = classify(name)
        summary, how_to, example = detail(name, category)
        repo_slug = repo.split('/')[-1]
        records.append({
            'id': len(records) + 1,
            'name': name,
            'slug': name,
            'category': category,
            'summary': summary,
            'guide': summary + ' 공식 저장소의 원문 지침을 우선 확인하고, 프로젝트에 필요한 범위만 복사해 적용하세요.',
            'howTo': how_to,
            'example': example,
            'compatible': ['Claude Code', 'Cursor', 'Windsurf', 'Codex CLI', 'Manus', 'ChatGPT(프롬프트 적용)'],
            'license': '확인 필요',
            'licenseNote': '저장소 LICENSE 파일을 사용 전 확인',
            'source': repo,
            'sourceUrl': item.get('github_url', block.get('url', '')),
            'importUrl': item.get('import_url', ''),
            'verifiedAt': '2026-08-20',
            'tags': [category, repo_slug]
        })

out = ROOT / 'client/src/lib/skills.ts'
lines = [
    'export type SkillEntry = { id:number; name:string; slug:string; category:string; summary:string; guide:string; howTo:string; example:string; compatible:string[]; license:string; licenseNote:string; source:string; sourceUrl:string; importUrl:string; verifiedAt:string; tags:string[] };',
    '',
    'export const skills: SkillEntry[] = ' + json.dumps(records, ensure_ascii=False, indent=2) + ';',
    '',
    'export const skillCategories = ["전체", ...Array.from(new Set(skills.map((skill) => skill.category)))];',
]
out.write_text('\n'.join(lines) + '\n')
print(f'generated {len(records)} skills at {out}')
