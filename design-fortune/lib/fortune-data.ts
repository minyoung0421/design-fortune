import type { PersonaKey } from '@/types/persona'

/* ── 공통 인터페이스 ──────────────────────────────────── */

export interface ColorSwatch   { hex: string; name: string }
export interface ColorPalette  { name: string; subtitle: string; colors: ColorSwatch[]; mood: string; useCase: string }
export interface FontRecommendation { headline: string; body: string; headlineDisplay: string; bodyDisplay: string; style: string; description: string }
export interface DesignerMeme  { text: string; emoji: string }
export interface DesignerFortune {
  palette:       ColorPalette
  font:          FontRecommendation
  quote:         { text: string; author: string }
  meme:          DesignerMeme
  luckyElement:  string
  energyLevel:   1 | 2 | 3 | 4 | 5
  fortuneMsg:    string   // 직군별 운세 예감 메시지
}

/* ── Color Palettes ──────────────────────────────────── */
const palettes: ColorPalette[] = [
  {
    name: '몽환적인 새벽', subtitle: 'Mystic Dawn',
    colors: [
      { hex: '#0B0B2A', name: 'Deep Void' }, { hex: '#1A1A5E', name: 'Midnight Blue' },
      { hex: '#4B0082', name: 'Indigo Dream' }, { hex: '#9B59B6', name: 'Mystic Purple' },
      { hex: '#F0E6FF', name: 'Lavender Mist' },
    ],
    mood: '신비롭고 깊은', useCase: '럭셔리 브랜딩, 명상 앱',
  },
  {
    name: '황금빛 일몰', subtitle: 'Golden Horizon',
    colors: [
      { hex: '#1C0A00', name: 'Dark Earth' }, { hex: '#5C2A00', name: 'Deep Amber' },
      { hex: '#C0600E', name: 'Burnt Orange' }, { hex: '#F5A623', name: 'Golden Hour' },
      { hex: '#FFF4D9', name: 'Soft Cream' },
    ],
    mood: '따뜻하고 에너제틱한', useCase: '푸드 브랜딩, 라이프스타일',
  },
  {
    name: '도시의 새벽빛', subtitle: 'Urban Aurora',
    colors: [
      { hex: '#001219', name: 'Deep Ocean' }, { hex: '#005F73', name: 'Teal Depths' },
      { hex: '#0A9396', name: 'Aqua Glow' }, { hex: '#94D2BD', name: 'Seafoam' },
      { hex: '#E9F8F4', name: 'Arctic Mist' },
    ],
    mood: '차갑고 미래지향적인', useCase: '테크 스타트업, 핀테크',
  },
  {
    name: '벚꽃 정원', subtitle: 'Cherry Bloom',
    colors: [
      { hex: '#2D0A16', name: 'Dark Rose' }, { hex: '#7A1E3C', name: 'Deep Cherry' },
      { hex: '#C4627A', name: 'Blossom Pink' }, { hex: '#F0A8BA', name: 'Petal Pink' },
      { hex: '#FFF0F3', name: 'Blush White' },
    ],
    mood: '낭만적이고 감성적인', useCase: '뷰티 브랜딩, 웨딩',
  },
  {
    name: '숲속의 마법', subtitle: 'Enchanted Forest',
    colors: [
      { hex: '#0A1A0A', name: 'Shadow Green' }, { hex: '#1A3A1A', name: 'Deep Forest' },
      { hex: '#2D6A2D', name: 'Moss Green' }, { hex: '#52B788', name: 'Mint Leaf' },
      { hex: '#D8F3DC', name: 'Morning Dew' },
    ],
    mood: '자연스럽고 생동감 넘치는', useCase: '친환경 브랜드, 웰니스',
  },
  {
    name: '사막의 노을', subtitle: 'Desert Dusk',
    colors: [
      { hex: '#1A1200', name: 'Dark Sand' }, { hex: '#4A3000', name: 'Burnt Sienna' },
      { hex: '#9A6B00', name: 'Camel Brown' }, { hex: '#D4A853', name: 'Sand Gold' },
      { hex: '#F7EDD5', name: 'Warm Linen' },
    ],
    mood: '차분하고 고급스러운', useCase: '패션 브랜딩, 인테리어',
  },
  {
    name: '오로라의 춤', subtitle: 'Aurora Borealis',
    colors: [
      { hex: '#050520', name: 'Polar Night' }, { hex: '#0D2B6E', name: 'Arctic Blue' },
      { hex: '#1B8A4C', name: 'Northern Green' }, { hex: '#6E3DB8', name: 'Violet Aurora' },
      { hex: '#C9F0D7', name: 'Ice Glow' },
    ],
    mood: '경이롭고 감동적인', useCase: '이벤트 기획, 여행 브랜딩',
  },
  {
    name: '네온 시티', subtitle: 'Neon City',
    colors: [
      { hex: '#0D0221', name: 'Night Cyber' }, { hex: '#1A0A3E', name: 'Deep Neon' },
      { hex: '#7B2FBE', name: 'Electric Violet' }, { hex: '#FF2D95', name: 'Neon Pink' },
      { hex: '#00F5FF', name: 'Cyber Aqua' },
    ],
    mood: '대담하고 미래적인', useCase: '게임, 테크 이벤트',
  },
  {
    name: '차분한 겨울', subtitle: 'Winter Calm',
    colors: [
      { hex: '#0A0E1A', name: 'Winter Night' }, { hex: '#1C2840', name: 'Slate Blue' },
      { hex: '#3D5A80', name: 'Steel' }, { hex: '#98C1D9', name: 'Ice Blue' },
      { hex: '#E8F4F8', name: 'Frost' },
    ],
    mood: '고요하고 집중되는', useCase: '미니멀 브랜딩, 헬스케어',
  },
]

/* ── Font Recommendations ─────────────────────────────── */
const fonts: FontRecommendation[] = [
  { headline: 'Playfair Display', body: 'DM Sans',             headlineDisplay: 'Aa Bb', bodyDisplay: 'The quick brown fox', style: '우아한 에디토리얼',   description: '클래식한 헤드라인과 모던한 본문의 완벽한 조화. 잡지와 럭셔리 브랜딩에 최적.' },
  { headline: 'Cormorant Garamond', body: 'Jost',              headlineDisplay: 'Aa Bb', bodyDisplay: 'The quick brown fox', style: '시적이고 감성적',      description: '얇고 우아한 세리프체와 기하학적 산세리프의 시적 대비. 아트 & 문화 프로젝트에 추천.' },
  { headline: 'Cinzel', body: 'Raleway',                       headlineDisplay: 'Aa Bb', bodyDisplay: 'The quick brown fox', style: '고전적 권위감',        description: '로마 비문에서 영감받은 대문자체와 우아한 산세리프. 프리미엄 브랜딩에 탁월.' },
  { headline: 'Space Grotesk', body: 'Inter',                  headlineDisplay: 'Aa Bb', bodyDisplay: 'The quick brown fox', style: '미래지향적 테크',     description: '독특한 문자 형태의 모던 그로테스크와 완벽한 가독성. 테크 & SaaS 제품에 최적.' },
  { headline: 'Fraunces', body: 'Libre Baskerville',           headlineDisplay: 'Aa Bb', bodyDisplay: 'The quick brown fox', style: '장인 정신',           description: '특유의 틸트와 광학 변형이 인상적인 세리프 페어링. 크래프트 브랜딩에 개성 부여.' },
  { headline: 'Clash Display', body: 'Cabinet Grotesk',        headlineDisplay: 'Aa Bb', bodyDisplay: 'The quick brown fox', style: '대담한 표현주의',     description: '기하학적 구조와 강렬한 개성의 조합. 패션, 음악, 아트 디렉션에 강렬한 인상.' },
  { headline: 'Instrument Serif', body: 'Instrument Sans',     headlineDisplay: 'Aa Bb', bodyDisplay: 'The quick brown fox', style: '균형 잡힌 모던',      description: '브랜딩과 UI를 동시에 소화하는 완벽한 중립적 페어링. 스타트업 아이덴티티에 적합.' },
  { headline: 'Bebas Neue', body: 'Source Sans Pro',           headlineDisplay: 'Aa Bb', bodyDisplay: 'The quick brown fox', style: '강인한 임팩트',        description: '임팩트 있는 디스플레이체와 가독성 높은 본문의 대비. 스포츠, 음악 브랜딩에 최적.' },
]

/* ── Designer Quotes ──────────────────────────────────── */
const quotes = [
  { text: '디자인은 단순히 무언가를 어떻게 보이게 하는가가 아닙니다. 어떻게 작동하는가입니다.', author: 'Steve Jobs' },
  { text: '좋은 디자인은 가능한 한 적게 디자인하는 것이다.', author: 'Dieter Rams' },
  { text: '모든 색에는 개성이 있고, 우리는 그것을 발견해야 한다.', author: 'Goethe' },
  { text: '공간 속의 공간—여백은 그 자체로 하나의 디자인 요소다.', author: 'Jan Tschichold' },
  { text: '색상은 직접 영혼에 영향을 미치는 힘이다.', author: 'Wassily Kandinsky' },
  { text: '단순함은 궁극적인 세련됨이다.', author: 'Leonardo da Vinci' },
  { text: '창의성은 점들을 연결하는 것이다.', author: 'Steve Jobs' },
  { text: '타이포그래피는 목소리의 시각적 언어다.', author: 'Tobias Frere-Jones' },
  { text: '완벽함은 더 이상 제거할 것이 없을 때 달성된다.', author: 'Saint-Exupéry' },
  { text: '제약이 있어야 창의성이 꽃핀다.', author: 'T.S. Eliot' },
  { text: '훌륭한 디자인은 보이지 않는다. 단지 느껴질 뿐이다.', author: 'Paul Rand' },
  { text: '사용자가 틀린 게 아니라 디자인이 틀린 것이다.', author: 'Don Norman' },
  { text: '형태는 기능을 따른다.', author: 'Louis Sullivan' },
  { text: '최고의 인터페이스는 인터페이스가 없는 것이다.', author: 'Golden Krishna' },
]

/* ── Persona-specific Memes ──────────────────────────── */
const personaMemes: Record<PersonaKey, DesignerMeme[]> = {
  pm: [
    { emoji: '🗺️', text: '스프린트 계획이 오늘도 수정될 예감' },
    { emoji: '📋', text: '회의가 회의를 낳는 무한 루프의 하루' },
    { emoji: '🔄', text: '로드맵 3번째 전면 개편이 다가오고 있다' },
    { emoji: '⏱️', text: '"이거 금방 되죠?" 시즌이 다시 찾아왔다' },
    { emoji: '📊', text: '이해관계자 정렬 5연속 실패 예감' },
    { emoji: '🎯', text: '오늘의 우선순위: 모든 것이 최우선' },
    { emoji: '💬', text: '"그냥 간단하게 추가하면 되잖아요"의 날' },
    { emoji: '📅', text: '데드라인을 당기자는 제안이 들어올 예감' },
    { emoji: '🤝', text: '모두가 동의했지만 아무도 기억 못 하는 결정' },
    { emoji: '📈', text: 'KPI가 다시 재정의되는 날' },
  ],
  designer: [
    { emoji: '🔄', text: '클라이언트의 무한 피드백이 다가오고 있다' },
    { emoji: '🔍', text: '폰트 크기 1px 전쟁이 오늘도 시작된다' },
    { emoji: '😱', text: '자고 일어나니 어제 디자인이 이상해 보임' },
    { emoji: '⭕', text: '"둥글게, 근데 덜 둥글게 해주세요"' },
    { emoji: '🗂️', text: '레이어 이름: "레이어 1 복사본 (3)"' },
    { emoji: '⏰', text: '"이거 5분이면 되죠?" 라는 말을 들을 예감' },
    { emoji: '🌊', text: '핀터레스트 레퍼런스와 내 결과물 사이 어딘가' },
    { emoji: '💀', text: '저장 안 하고 닫아버린 Figma 파일' },
    { emoji: '🤡', text: '"좀 더 팝하게, 근데 심플하게 해주세요"' },
    { emoji: '🌈', text: '컬러 시스템 완성 후 브랜드 컬러가 교체됨' },
    { emoji: '📐', text: '4px 그리드 위반이 오늘도 눈에 밟힌다' },
    { emoji: '✏️', text: '"좀 더 젊은 느낌으로, 근데 클래식하게"' },
  ],
  developer: [
    { emoji: '🐛', text: '고친 버그가 새 버그 3마리를 낳았다' },
    { emoji: '☕', text: '커피 없이는 배포 못 한다는 신체 경고' },
    { emoji: '🔥', text: '프로덕션 긴급 패치의 향기가 풍겨온다' },
    { emoji: '💭', text: '"다음에 리팩토링하지 뭐"의 무한 루프' },
    { emoji: '🕰️', text: '"이 코드 내가 짰나?" 의 날' },
    { emoji: '📦', text: 'npm install 후 모든 것이 작동을 멈춘다' },
    { emoji: '🔒', text: 'git blame이 본인을 가리키고 있다' },
    { emoji: '💻', text: '"로컬에서는 됐는데요"의 날이 왔다' },
    { emoji: '🌀', text: '무한 로딩의 원인을 찾는 여정이 시작된다' },
    { emoji: '📜', text: '주석 없는 레거시 코드와 마주하는 날' },
  ],
  qa: [
    { emoji: '🔍', text: '아무도 못 찾던 버그를 오늘도 발견할 예감' },
    { emoji: '📝', text: '재현 불가 버그를 재현시키는 QA의 날' },
    { emoji: '😤', text: '"테스트 완료" 후 날아온 버그 리포트' },
    { emoji: '🚨', text: '릴리즈 전날 크리티컬 이슈 발견 예감' },
    { emoji: '🎯', text: '100개 테케 중 99개가 실패하는 날' },
    { emoji: '📸', text: '버그 스크린샷 폴더가 또 꽉 찼다' },
    { emoji: '🕵️', text: '개발자가 "재현이 안 된다"고 할 예감' },
    { emoji: '✅', text: '"완료" 체크 후 다시 열리는 티켓의 날' },
    { emoji: '🧪', text: '테스트 환경이 프로덕션과 다른 이유를 찾는 날' },
    { emoji: '⚡', text: '배포 직전 발견된 P0 버그의 기운이 온다' },
  ],
}

/* ── Persona-specific Fortune Messages ───────────────── */
const fortuneMessages: Record<PersonaKey, string[]> = {
  pm: [
    '기획자의 별자리가 불안정합니다. 요구사항의 파도를 대비하세요.',
    '오늘은 이해관계자의 기운이 활발합니다. 소통이 당신을 이끕니다.',
    '스프린트의 기운이 당신을 감싸고 있습니다. 우선순위를 신뢰하세요.',
    '데이터의 별이 빛납니다. 결정을 믿고 나아가세요.',
    '오늘은 로드맵의 파도가 잠잠합니다. 좋은 기획의 날입니다.',
  ],
  designer: [
    '디자이너의 영감 기운이 흐릅니다. 컬러가 당신에게 말을 건네고 있어요.',
    '오늘 창의의 신이 당신 곁에 있습니다. 펜을 놓지 마세요.',
    '시각의 기운이 강합니다. 여백 속에서 답을 찾으세요.',
    '오늘의 색채 에너지가 당신의 작업을 이끌어 줄 거예요.',
    '픽셀의 별자리가 정렬되어 있습니다. 오늘은 영감의 날입니다.',
  ],
  developer: [
    '코드의 기운이 맑습니다. 오늘은 버그가 당신을 피해갑니다.',
    '빌드가 성공할 운세입니다. 자신의 로직을 믿으세요.',
    '스택의 기운이 복잡합니다. 한 번에 하나씩 풀어나가세요.',
    '오늘 리팩토링의 운이 강합니다. 기술 부채를 청산하세요.',
    '디버깅의 신이 오늘 당신 편입니다. 침착하게 추적하세요.',
  ],
  qa: [
    '집중력의 별이 빛납니다. 오늘은 버그를 찾는 운이 최고조입니다.',
    '품질의 기운이 당신을 감싸고 있습니다. 디테일을 놓치지 마세요.',
    '테스트 케이스의 흐름이 원활합니다. 오늘은 순조로운 배포의 날.',
    '관찰력의 에너지가 강합니다. 아무도 못 찾는 것을 당신이 찾을 거예요.',
    '오늘은 완벽한 커버리지의 날입니다. 꼼꼼함이 팀을 지킵니다.',
  ],
}

/* ── Lucky Elements per Persona ──────────────────────── */
const luckyElements: Record<PersonaKey, string[]> = {
  pm:       ['명확한 목표', '구조', '소통', '신뢰', '방향성', '데이터', '협업', '일관성'],
  designer: ['곡선', '여백', '그라디언트', '비대칭', '텍스처', '대비', '반복', '흐름', '빛', '균형'],
  developer:['캡슐화', '추상화', '최적화', '모듈성', '단순함', '테스트', '문서화', '반복'],
  qa:       ['꼼꼼함', '재현성', '체크리스트', '관찰력', '패턴', '검증', '일관성', '세밀함'],
}

/* ── Generator ──────────────────────────────────────── */
export function generateFortune(persona: PersonaKey = 'designer'): DesignerFortune {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

  const pick = <T>(arr: T[], offset = 0): T => arr[(seed + offset) % arr.length]

  const memes = personaMemes[persona]
  const msgs  = fortuneMessages[persona]
  const lucky = luckyElements[persona]

  return {
    palette:      pick(palettes, 0),
    font:         pick(fonts, 3),
    quote:        pick(quotes, 7),
    meme:         pick(memes, 5),
    luckyElement: pick(lucky, 11),
    energyLevel:  ((seed % 5) + 1) as 1 | 2 | 3 | 4 | 5,
    fortuneMsg:   pick(msgs, 2),
  }
}
