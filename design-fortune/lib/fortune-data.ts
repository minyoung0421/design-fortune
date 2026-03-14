export interface ColorSwatch {
  hex: string
  name: string
}

export interface ColorPalette {
  name: string
  subtitle: string
  colors: ColorSwatch[]
  mood: string
  useCase: string
}

export interface FontRecommendation {
  headline: string
  body: string
  headlineDisplay: string
  bodyDisplay: string
  style: string
  description: string
}

export interface DesignerMeme {
  text: string
  emoji: string
}

export interface DesignerFortune {
  palette: ColorPalette
  font: FontRecommendation
  quote: { text: string; author: string }
  meme: DesignerMeme
  luckyElement: string
  energyLevel: number  // 1-5
}

/* ── Color Palettes ─────────────────────────────────────── */
const palettes: ColorPalette[] = [
  {
    name: '몽환적인 새벽',
    subtitle: 'Mystic Dawn',
    colors: [
      { hex: '#0B0B2A', name: 'Deep Void' },
      { hex: '#1A1A5E', name: 'Midnight Blue' },
      { hex: '#4B0082', name: 'Indigo Dream' },
      { hex: '#9B59B6', name: 'Mystic Purple' },
      { hex: '#F0E6FF', name: 'Lavender Mist' },
    ],
    mood: '신비롭고 깊은',
    useCase: '럭셔리 브랜딩, 명상 앱',
  },
  {
    name: '황금빛 일몰',
    subtitle: 'Golden Horizon',
    colors: [
      { hex: '#1C0A00', name: 'Dark Earth' },
      { hex: '#5C2A00', name: 'Deep Amber' },
      { hex: '#C0600E', name: 'Burnt Orange' },
      { hex: '#F5A623', name: 'Golden Hour' },
      { hex: '#FFF4D9', name: 'Soft Cream' },
    ],
    mood: '따뜻하고 에너제틱한',
    useCase: '푸드 브랜딩, 라이프스타일',
  },
  {
    name: '도시의 새벽빛',
    subtitle: 'Urban Aurora',
    colors: [
      { hex: '#001219', name: 'Deep Ocean' },
      { hex: '#005F73', name: 'Teal Depths' },
      { hex: '#0A9396', name: 'Aqua Glow' },
      { hex: '#94D2BD', name: 'Seafoam' },
      { hex: '#E9F8F4', name: 'Arctic Mist' },
    ],
    mood: '차갑고 미래지향적인',
    useCase: '테크 스타트업, 핀테크',
  },
  {
    name: '벚꽃 정원',
    subtitle: 'Cherry Bloom',
    colors: [
      { hex: '#2D0A16', name: 'Dark Rose' },
      { hex: '#7A1E3C', name: 'Deep Cherry' },
      { hex: '#C4627A', name: 'Blossom Pink' },
      { hex: '#F0A8BA', name: 'Petal Pink' },
      { hex: '#FFF0F3', name: 'Blush White' },
    ],
    mood: '낭만적이고 감성적인',
    useCase: '뷰티 브랜딩, 웨딩',
  },
  {
    name: '숲속의 마법',
    subtitle: 'Enchanted Forest',
    colors: [
      { hex: '#0A1A0A', name: 'Shadow Green' },
      { hex: '#1A3A1A', name: 'Deep Forest' },
      { hex: '#2D6A2D', name: 'Moss Green' },
      { hex: '#52B788', name: 'Mint Leaf' },
      { hex: '#D8F3DC', name: 'Morning Dew' },
    ],
    mood: '자연스럽고 생동감 넘치는',
    useCase: '친환경 브랜드, 웰니스',
  },
  {
    name: '사막의 노을',
    subtitle: 'Desert Dusk',
    colors: [
      { hex: '#1A1200', name: 'Dark Sand' },
      { hex: '#4A3000', name: 'Burnt Sienna' },
      { hex: '#9A6B00', name: 'Camel Brown' },
      { hex: '#D4A853', name: 'Sand Gold' },
      { hex: '#F7EDD5', name: 'Warm Linen' },
    ],
    mood: '차분하고 고급스러운',
    useCase: '패션 브랜딩, 인테리어',
  },
  {
    name: '오로라의 춤',
    subtitle: 'Aurora Borealis',
    colors: [
      { hex: '#050520', name: 'Polar Night' },
      { hex: '#0D2B6E', name: 'Arctic Blue' },
      { hex: '#1B8A4C', name: 'Northern Green' },
      { hex: '#6E3DB8', name: 'Violet Aurora' },
      { hex: '#C9F0D7', name: 'Ice Glow' },
    ],
    mood: '경이롭고 감동적인',
    useCase: '이벤트 기획, 여행 브랜딩',
  },
]

/* ── Font Recommendations ───────────────────────────────── */
const fonts: FontRecommendation[] = [
  {
    headline: 'Playfair Display',
    body: 'DM Sans',
    headlineDisplay: 'Aa Bb',
    bodyDisplay: 'The quick brown fox',
    style: '우아한 에디토리얼',
    description: '클래식한 헤드라인과 모던한 본문의 완벽한 조화. 잡지와 럭셔리 브랜딩에 최적.',
  },
  {
    headline: 'Cormorant Garamond',
    body: 'Jost',
    headlineDisplay: 'Aa Bb',
    bodyDisplay: 'The quick brown fox',
    style: '시적이고 감성적',
    description: '얇고 우아한 세리프체와 기하학적 산세리프의 시적 대비. 아트 & 문화 프로젝트에 추천.',
  },
  {
    headline: 'Cinzel',
    body: 'Raleway',
    headlineDisplay: 'Aa Bb',
    bodyDisplay: 'The quick brown fox',
    style: '고전적 권위감',
    description: '로마 비문에서 영감받은 대문자체와 우아한 산세리프. 프리미엄 브랜딩에 탁월.',
  },
  {
    headline: 'Space Grotesk',
    body: 'Inter',
    headlineDisplay: 'Aa Bb',
    bodyDisplay: 'The quick brown fox',
    style: '미래지향적 테크',
    description: '독특한 문자 형태의 모던 그로테스크와 완벽한 가독성. 테크 & SaaS 제품에 최적.',
  },
  {
    headline: 'Fraunces',
    body: 'Libre Baskerville',
    headlineDisplay: 'Aa Bb',
    bodyDisplay: 'The quick brown fox',
    style: '장인 정신',
    description: '특유의 틸트와 광학 변형이 인상적인 세리프 페어링. 크래프트 브랜딩에 개성 부여.',
  },
  {
    headline: 'Clash Display',
    body: 'Cabinet Grotesk',
    headlineDisplay: 'Aa Bb',
    bodyDisplay: 'The quick brown fox',
    style: '대담한 표현주의',
    description: '기하학적 구조와 강렬한 개성의 조합. 패션, 음악, 아트 디렉션에 강렬한 인상.',
  },
]

/* ── Designer Quotes ──────────────────────────────────────── */
const quotes = [
  { text: '디자인은 단순히 무언가를 어떻게 보이게 하는가가 아닙니다. 어떻게 작동하는가입니다.', author: 'Steve Jobs' },
  { text: '좋은 디자인은 가능한 한 적게 디자인하는 것이다.', author: 'Dieter Rams' },
  { text: '모든 색에는 개성이 있고, 우리는 그것을 발견해야 한다.', author: 'Johann Wolfgang von Goethe' },
  { text: '공간 속의 공간—여백은 그 자체로 하나의 디자인 요소다.', author: 'Jan Tschichold' },
  { text: '색상은 직접 영혼에 영향을 미치는 힘이다.', author: 'Wassily Kandinsky' },
  { text: '단순함은 궁극적인 세련됨이다.', author: 'Leonardo da Vinci' },
  { text: '창의성은 점들을 연결하는 것이다.', author: 'Steve Jobs' },
  { text: '디자이너는 아이디어를 현실로 만드는 마법사다.', author: 'Massimo Vignelli' },
  { text: '타이포그래피는 목소리의 시각적 언어다.', author: 'Tobias Frere-Jones' },
  { text: '완벽함은 더 이상 추가할 것이 없을 때가 아닌, 더 이상 제거할 것이 없을 때 달성된다.', author: 'Antoine de Saint-Exupéry' },
  { text: '제약이 있어야 창의성이 꽃핀다.', author: 'T.S. Eliot' },
  { text: '훌륭한 디자인은 보이지 않는다. 단지 느껴질 뿐이다.', author: 'Paul Rand' },
]

/* ── Designer Memes ──────────────────────────────────────── */
const memes: DesignerMeme[] = [
  { emoji: '🔄', text: '클라이언트의 무한 피드백이 다가오고 있다' },
  { emoji: '🔍', text: '폰트 크기 1px 전쟁이 오늘도 시작된다' },
  { emoji: '😱', text: '자고 일어나니 어제 디자인이 이상해 보임' },
  { emoji: '⭕', text: '"둥글게, 근데 덜 둥글게 해주세요"' },
  { emoji: '🗂️', text: '레이어 이름: "레이어 1 복사본 (3)"' },
  { emoji: '⏰', text: '"이거 5분이면 되죠?" 라는 말을 들을 예감' },
  { emoji: '🌊', text: '핀터레스트 레퍼런스와 내 결과물 사이 어딘가' },
  { emoji: '💀', text: '저장 안 하고 닫아버린 Figma 파일' },
  { emoji: '🤡', text: '"좀 더 팝하게, 근데 심플하게 해주세요"' },
  { emoji: '📜', text: '폰트 라이선스 확인의 늪에 빠지는 오늘' },
  { emoji: '🔁', text: '완성됐다 생각한 순간 날아온 수정 요청' },
  { emoji: '🎭', text: '"레퍼런스는 없는데 딱 그런 느낌이요"' },
  { emoji: '🧩', text: '컴포넌트 하나 바꿨더니 모든 게 틀어짐' },
  { emoji: '🌑', text: '다크모드 대응하다 빛을 잃어버린 영혼' },
]

const luckyElements = [
  '곡선', '여백', '그라디언트', '비대칭', '텍스처', '대비', '반복',
  '흐름', '빛', '그림자', '레이어링', '균형', '리듬', '강조점',
]

/* ── Generator ──────────────────────────────────────────── */
export function generateFortune(): DesignerFortune {
  const today = new Date()
  // Deterministic seed per day (same fortune all day)
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

  const pick = <T>(arr: T[], offset = 0): T => arr[(seed + offset) % arr.length]

  return {
    palette:      pick(palettes, 0),
    font:         pick(fonts, 3),
    quote:        pick(quotes, 7),
    meme:         pick(memes, 13),
    luckyElement: pick(luckyElements, 11),
    energyLevel:  ((seed % 5) + 1) as 1 | 2 | 3 | 4 | 5,
  }
}
