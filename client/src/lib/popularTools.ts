/* Paper + Pixel Atlas: the public layer prioritizes recognizable services people can use today. */
import { tools, type Tool } from "./tools";

const extras: Tool[] = [
  { id: 101, name: "Meta AI", category: "범용 AI", role: "Meta 앱 안에서 대화·이미지·아이디어를 돕는 AI assistant", summary: "WhatsApp·Instagram·Messenger와 연결되는 범용 AI", example: "SNS 대화에서 아이디어를 정리하고 이미지 초안 만들기", difficulty: "초급", tags: ["대화", "SNS", "이미지"], url: "https://www.meta.ai/" },
  { id: 102, name: "DeepSeek", category: "범용 AI", role: "추론·수학·코딩을 지원하는 대화형 AI", summary: "긴 질문과 코드 설명을 빠르게 처리하는 AI", example: "복잡한 문제를 단계별로 풀고 코드 오류 찾기", difficulty: "초급", tags: ["추론", "코딩", "리서치"], url: "https://chat.deepseek.com/" },
  { id: 103, name: "Qwen", category: "범용 AI", role: "문서·코딩·멀티모달 작업을 지원하는 Alibaba의 AI assistant", summary: "텍스트·이미지·코드 입력을 함께 다루는 범용 AI", example: "제품 자료를 요약하고 비교표 만들기", difficulty: "초급", tags: ["대화", "문서", "멀티모달"], url: "https://chat.qwen.ai/" },
  { id: 104, name: "Pi", category: "범용 AI", role: "대화와 생각 정리에 초점을 둔 개인형 AI", summary: "아이디어를 말로 풀고 다음 행동을 정리하는 AI", example: "막연한 아이디어를 질문으로 좁혀 실행 계획 만들기", difficulty: "초급", tags: ["대화", "아이디어", "학습"], url: "https://pi.ai/" },
  { id: 105, name: "Character.AI", category: "범용 AI", role: "캐릭터 기반 대화와 창작 롤플레이 플랫폼", summary: "캐릭터와 대화하며 스토리·아이디어를 발전시키는 서비스", example: "소설 속 인물과 대화하며 장면의 선택지 만들기", difficulty: "초급", tags: ["창작", "대화"], url: "https://character.ai/" },
  { id: 106, name: "Notion AI", category: "업무 생산성", role: "문서·프로젝트·지식베이스 안에서 작동하는 AI", summary: "회의록·문서·프로젝트 맥락을 한곳에서 정리하는 AI", example: "회의록에서 결정사항과 담당자만 추출하기", difficulty: "초급", tags: ["문서", "프로젝트", "지식관리"], url: "https://www.notion.so/product/ai" },
  { id: 107, name: "Slack AI", category: "업무 생산성", role: "대화 채널의 요약·검색·액션을 돕는 AI", summary: "흩어진 팀 대화에서 핵심과 다음 일을 찾는 AI", example: "지난주 프로젝트 채널의 결정사항 요약하기", difficulty: "초급", tags: ["협업", "요약", "업무"], url: "https://slack.com/features/ai" },
  { id: 108, name: "Zoom AI Companion", category: "회의·전사", role: "회의 요약·질문·후속 작업을 지원하는 AI", summary: "화상회의 중 핵심 내용과 다음 일을 정리하는 AI", example: "회의 종료 후 결정사항·할 일·미결 질문 정리하기", difficulty: "초급", tags: ["회의", "요약", "협업"], url: "https://www.zoom.com/en/ai-assistant/" },
  { id: 109, name: "Granola", category: "회의·전사", role: "회의 중 메모를 보강해 구조화하는 AI 메모 앱", summary: "실제 대화와 메모를 합쳐 회의록을 만드는 서비스", example: "고객 미팅 후 이슈·약속·후속 메일 초안 만들기", difficulty: "초급", tags: ["회의", "메모", "업무"], url: "https://www.granola.ai/" },
  { id: 110, name: "Wispr Flow", category: "음성·더빙", role: "말로 입력하고 AI가 문장을 다듬는 음성 입력 도구", summary: "키보드 대신 말로 이메일·문서를 작성하는 서비스", example: "이동 중 음성으로 긴 이메일 초안 작성하기", difficulty: "초급", tags: ["음성", "문서", "생산성"], url: "https://wispr.flow/" },
  { id: 111, name: "Superhuman", category: "업무 생산성", role: "AI 초안·분류·검색을 결합한 빠른 이메일 앱", summary: "반복적인 이메일 처리를 줄이는 업무용 메일 서비스", example: "긴 고객 메일을 요약하고 답장 초안 만들기", difficulty: "초급", tags: ["메일", "업무", "생산성"], url: "https://superhuman.com/" },
  { id: 112, name: "Motion", category: "업무 생산성", role: "일정·할 일·프로젝트를 자동 배치하는 AI 플래너", summary: "일정이 바뀌면 작업 순서를 다시 잡아주는 서비스", example: "마감일과 회의 시간을 기준으로 주간 일정 만들기", difficulty: "초급", tags: ["일정", "프로젝트", "자동화"], url: "https://www.usemotion.com/" },
  { id: 113, name: "Reclaim", category: "업무 생산성", role: "회의와 집중 시간을 자동으로 보호하는 일정 관리 AI", summary: "할 일을 캘린더 빈 공간에 배치하는 서비스", example: "매주 반복되는 운동·리서치·집중 시간 예약하기", difficulty: "초급", tags: ["일정", "집중", "자동화"], url: "https://reclaim.ai/" },
  { id: 114, name: "Asana Intelligence", category: "업무 생산성", role: "프로젝트 안에서 상태·요약·리스크를 분석하는 AI", summary: "팀 업무의 진행 상황과 막힘을 빠르게 파악하는 AI", example: "프로젝트 업데이트에서 위험 요소와 다음 일을 찾기", difficulty: "초급~중급", tags: ["프로젝트", "협업", "요약"], url: "https://asana.com/product/ai" },
  { id: 115, name: "ClickUp Brain", category: "업무 생산성", role: "문서·작업·프로젝트를 연결하는 업무 AI", summary: "팀 지식과 할 일을 한 공간에서 검색·작성하는 AI", example: "프로젝트 문서에서 관련 작업과 담당자 찾기", difficulty: "초급", tags: ["프로젝트", "문서", "협업"], url: "https://clickup.com/ai" },
  { id: 116, name: "Loom AI", category: "영상", role: "화면 녹화 영상의 요약·제목·챕터를 만드는 AI", summary: "설명 영상을 문서와 액션으로 바꾸는 서비스", example: "제품 데모 녹화에서 핵심 단계와 챕터 추출하기", difficulty: "초급", tags: ["영상", "회의", "문서"], url: "https://www.loom.com/ai" },
  { id: 117, name: "OpusClip", category: "영상", role: "긴 영상을 짧은 세로형 콘텐츠로 재구성하는 AI", summary: "웨비나·인터뷰에서 SNS 클립을 찾고 편집하는 서비스", example: "한 시간 강연에서 쇼츠 후보 5개 만들기", difficulty: "초급", tags: ["영상", "SNS", "편집"], url: "https://www.opus.pro/" },
  { id: 118, name: "VEED", category: "영상", role: "자막·더빙·편집을 한곳에서 처리하는 온라인 영상 도구", summary: "초보자도 브라우저에서 AI 영상 편집을 시작하는 서비스", example: "제품 소개 영상에 자동 자막과 번역 자막 넣기", difficulty: "초급", tags: ["영상", "자막", "SNS"], url: "https://www.veed.io/" },
  { id: 119, name: "Freepik AI", category: "디자인·이미지", role: "이미지·목업·배경을 만드는 디자인 플랫폼", summary: "광고와 SNS 시안에 쓸 시각 자료를 만드는 서비스", example: "캠페인 콘셉트에 맞는 썸네일 후보 만들기", difficulty: "초급", tags: ["이미지", "디자인", "마케팅"], url: "https://www.freepik.com/ai" },
  { id: 120, name: "Photoroom", category: "디자인·이미지", role: "상품 사진의 배경 제거·생성·보정을 자동화하는 앱", summary: "쇼핑몰과 SNS용 상품 이미지를 빠르게 만드는 서비스", example: "제품 사진의 배경을 브랜드 컬러 스튜디오로 바꾸기", difficulty: "초급", tags: ["이미지", "상품", "마케팅"], url: "https://www.photoroom.com/" },
  { id: 121, name: "Pixelcut", category: "디자인·이미지", role: "상품 이미지와 마케팅 소재를 만드는 AI 편집 도구", summary: "사진 한 장을 판매용 콘텐츠로 확장하는 서비스", example: "제품 컷을 여러 배경·비율의 광고 이미지로 변환하기", difficulty: "초급", tags: ["이미지", "상품", "SNS"], url: "https://www.pixelcut.ai/" },
  { id: 122, name: "Adobe Acrobat AI Assistant", category: "리서치·문서", role: "PDF 내용을 요약·질문·비교하는 문서 AI", summary: "긴 PDF에서 답과 근거를 빠르게 찾는 서비스", example: "계약서에서 의무·기한·주의 조항만 표로 정리하기", difficulty: "초급", tags: ["PDF", "문서", "리서치"], url: "https://www.adobe.com/acrobat/generative-ai-pdf.html" },
  { id: 123, name: "Dropbox Dash", category: "리서치·문서", role: "파일·문서·업무 앱을 가로질러 검색하는 AI", summary: "흩어진 팀 자료에서 필요한 답을 찾는 서비스", example: "프로젝트 이름으로 관련 파일·링크·회의 자료 모으기", difficulty: "초급", tags: ["검색", "문서", "지식관리"], url: "https://www.dropbox.com/dash" },
  { id: 124, name: "Komo AI", category: "브라우저·리서치", role: "대화형 검색과 리서치 보드를 제공하는 AI 검색 서비스", summary: "검색 결과를 질문과 탐색 흐름으로 이어가는 서비스", example: "새 시장을 질문 묶음으로 조사하고 출처 정리하기", difficulty: "초급", tags: ["검색", "리서치", "브레인스토밍"], url: "https://komo.ai/" },
  { id: 125, name: "Brave Leo", category: "브라우저·리서치", role: "Brave 브라우저 안에서 작동하는 개인 정보 중심 AI", summary: "웹페이지 요약·질문·번역을 브라우저 안에서 처리하는 AI", example: "긴 기사에서 주장과 근거를 분리해 메모하기", difficulty: "초급", tags: ["브라우저", "요약", "개인정보"], url: "https://brave.com/leo/" },
  { id: 126, name: "HubSpot AI", category: "콘텐츠·마케팅", role: "CRM·영업·마케팅 데이터를 활용하는 업무 AI", summary: "리드·고객 대화·콘텐츠 제작을 한 흐름으로 연결하는 AI", example: "문의 내용을 요약하고 다음 영업 액션 제안하기", difficulty: "중급", tags: ["CRM", "영업", "마케팅"], url: "https://www.hubspot.com/artificial-intelligence" },
  { id: 127, name: "Hootsuite OwlyWriter AI", category: "콘텐츠·마케팅", role: "SNS 게시물 아이디어와 카피를 만드는 마케팅 AI", summary: "브랜드 톤에 맞는 SNS 초안을 빠르게 만드는 서비스", example: "한 캠페인을 Instagram·LinkedIn 문구로 변환하기", difficulty: "초급", tags: ["SNS", "콘텐츠", "마케팅"], url: "https://www.hootsuite.com/platform/owlywriter-ai" },
  { id: 128, name: "Buffer AI Assistant", category: "콘텐츠·마케팅", role: "SNS 아이디어·문구·예약 발행을 돕는 AI", summary: "주간 SNS 콘텐츠 캘린더를 빠르게 구성하는 서비스", example: "신제품 특징을 채널별 게시물 5개로 재작성하기", difficulty: "초급", tags: ["SNS", "콘텐츠", "예약"], url: "https://buffer.com/ai-assistant" },
  { id: 129, name: "Pika", category: "영상", role: "텍스트·이미지로 짧은 영상을 만드는 생성형 영상 도구", summary: "SNS용 짧은 장면과 움직임을 빠르게 실험하는 서비스", example: "정지 제품 이미지에 5초 카메라 움직임 넣기", difficulty: "초급", tags: ["영상", "생성", "SNS"], url: "https://pika.art/" },
  { id: 130, name: "Hume AI", category: "음성·더빙", role: "감정과 표현을 반영하는 음성·대화 AI 플랫폼", summary: "자연스러운 음성 인터페이스와 대화 경험을 만드는 서비스", example: "고객 안내 음성의 톤과 감정 변화를 설계하기", difficulty: "중급", tags: ["음성", "대화", "API"], url: "https://www.hume.ai/" },
];

const familiarNames = new Set([
  "ChatGPT", "Claude", "Gemini", "Grok", "Perplexity", "Microsoft Copilot", "Google AI Studio", "NotebookLM", "Poe", "Mistral Le Chat",
  "Manus", "Zapier AI", "Make", "n8n", "Relevance AI", "Bardeen", "OpenAI Codex", "Claude Code", "Cursor", "Windsurf", "GitHub Copilot", "Replit Agent", "Lovable", "Bolt.new",
  "Canva", "Figma AI", "Framer AI", "Uizard", "Relume", "v0", "Midjourney", "Adobe Firefly", "Ideogram", "Leonardo AI", "DALL·E", "Runway", "Google Veo", "Sora", "Kling AI", "Pika", "Luma Dream Machine", "Synthesia", "HeyGen", "CapCut", "ElevenLabs", "Suno", "Udio", "Gamma", "Beautiful.ai", "Elicit", "Consensus", "Otter.ai", "Fireflies.ai", "Fathom", "Julius AI", "Microsoft Excel Copilot", "Jasper", "Copy.ai", "Grammarly", "QuillBot", "HubSpot AI", "Hootsuite OwlyWriter AI", "Buffer AI Assistant",
]);
const extraFamiliarNames = new Set([
  "Meta AI", "DeepSeek", "Qwen", "Pi", "Character.AI", "Notion AI", "Slack AI", "Zoom AI Companion", "Granola", "Wispr Flow", "Superhuman", "Motion", "Reclaim", "Asana Intelligence", "ClickUp Brain", "Loom AI", "OpusClip", "VEED", "Freepik AI", "Photoroom", "Pixelcut", "Adobe Acrobat AI Assistant", "Dropbox Dash", "Komo AI", "Brave Leo", "Hume AI", "HubSpot AI", "Hootsuite OwlyWriter AI", "Buffer AI Assistant",
]);
const combined = [...tools.filter((tool) => familiarNames.has(tool.name)), ...extras.filter((tool) => extraFamiliarNames.has(tool.name))];
const normalizeCategory = (category: string) => ({
  "업무자동화": "업무·생산성",
  "업무 생산성": "업무·생산성",
  "업무·생산성": "업무·생산성",
  "에이전트": "자동화·에이전트",
  "자동화": "자동화·에이전트",
  "SNS·업무 자동화": "자동화·에이전트",
  "코딩": "개발·코딩",
  "앱개발": "개발·코딩",
  "디자인": "디자인·이미지",
  "디자인·이미지": "디자인·이미지",
  "이미지": "디자인·이미지",
  "문서": "문서·리서치",
  "문서·리서치": "문서·리서치",
  "리서치": "문서·리서치",
  "리서치·문서": "문서·리서치",
  "브라우저·리서치": "문서·리서치",
  "마케팅": "마케팅·SNS",
  "콘텐츠·마케팅": "마케팅·SNS",
  "음성": "음성·음악",
  "음성·더빙": "음성·음악",
  "음악": "음성·음악",
  "데이터": "데이터 분석",
  "회의": "회의·전사",
  "회의·전사": "회의·전사",
  "영상": "영상",
  "슬라이드": "슬라이드·발표",
}[category] || category);
const seen = new Set<string>();
export const popularTools: Tool[] = combined.filter((tool) => {
  const key = tool.name.toLowerCase();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
}).map((tool, index) => ({ ...tool, id: index + 1, category: normalizeCategory(tool.category) }));

export const popularToolCategories = ["전체", ...Array.from(new Set(popularTools.map((tool) => tool.category)))];
