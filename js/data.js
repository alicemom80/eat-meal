// 단어 데이터: [그림 파일 이름, 영어, 한글, (읽을 소리: 영어와 다를 때만)]
// 출처: 앱/먹고입어요/기획서.md 3장 (테마와 단어), 5장 (테마별 게임 배정)
// games: [게임 id, 단계 1·2·3] 배정. mission: 놀이 끝에 보여 주는 화면 밖 미션.
// 주제 하나에 단어 5의 배수를 넣는 것이 원칙이다. 지금은 주제 6개 × 20개 = 120개 (묶음 4개씩, 묶음마다 5개).
window.A = window.A || {};

// 모든 주제가 같은 게임 8개를 같은 순서로 쓴다 (카드는 맨 위, 묻고 답하기는 맨 아래 가로 한 줄)
const ALL_GAMES = [
  ['card', 1], ['pick', 1], ['balloon', 1], ['match', 1],
  ['ox', 2], ['scratch', 2], ['maze', 3], ['qa', 3],
];

// 복수형 단어: "These are ..." 로 말한다 (기획서 4-4장)
const PLURAL_IDS = new Set([
  'grapes', 'chopsticks', 'beans', 'jeans', 'shorts', 'socks', 'sneakers',
  'boots', 'clothes', 'glasses', 'gloves', 'balletshoes', 'cherries',
]);

// 관사(a/an)를 붙이지 않는 단어: 색깔("This is red.")과 셀 수 없는 말("This is milk.")
const COLOR_IDS = new Set([
  'redcircle', 'orangecircle', 'yellowcircle', 'greencircle', 'bluecircle',
  'purplecircle', 'pinkcircle', 'browncircle', 'blackcircle', 'whitecircle',
]);
const NO_ART_IDS = new Set([
  ...COLOR_IDS,
  'broccoli', 'corn', 'garlic', 'ginger', 'salad', 'lettuce',             // 채소
  'chocolate', 'popcorn', 'honey', 'cheese', 'bread', 'icecream', 'shavedice',   // 간식
  'rice', 'soup', 'bacon', 'curryrice', 'spaghetti', 'milk', 'juice', 'tea', 'hotdrink', 'sushi',  // 식사·음료
]);

const FOOD_MISSION = '오늘 먹은 음식 하나를 영어로 말해 보기';
const CLOTHES_MISSION = '오늘 입은 옷 이름을 영어로 말해 보기';

A.THEMES = [
  { id: 'meal', ko: '식사·음료', en: 'Meals & Drinks', icon: '🍚', cover: 'pizza', color: '#ffd3b0',
    games: ALL_GAMES,
    mission: FOOD_MISSION,
    words: [
      ['rice', 'rice', '밥'], ['spoon', 'spoon', '숟가락'], ['chopsticks', 'chopsticks', '젓가락'], ['soup', 'soup', '국'], ['bacon', 'bacon', '베이컨'],
      ['curryrice', 'curry rice', '카레라이스'], ['spaghetti', 'spaghetti', '스파게티'], ['pizza', 'pizza', '피자'], ['hamburger', 'hamburger', '햄버거'], ['sandwich', 'sandwich', '샌드위치'],
      ['hotdog', 'hot dog', '핫도그'], ['sushi', 'sushi', '초밥'], ['dumpling', 'dumpling', '만두'], ['egg', 'egg', '달걀'], ['friedshrimp', 'shrimp', '새우튀김'],
      ['lunchbox', 'lunch box', '도시락'], ['milk', 'milk', '우유'], ['juice', 'juice', '주스'], ['hotdrink', 'hot drink', '따뜻한 음료'], ['tea', 'tea', '차'],
    ] },
];

// 5개씩 묶음으로 나누기 (맨 끝 묶음은 5개보다 적을 수 있음)
A.GROUP_SIZE = 5;
A.THEMES.forEach(t => {
  t.words = t.words.map(([id, en, ko, say]) => ({
    id, en, ko, say: say || en,
    art: NO_ART_IDS.has(id) ? '' : (/^[aeiou]/i.test(en) ? 'an' : 'a'),
    plural: PLURAL_IDS.has(id),
  }));
  t.groups = [];
  for (let i = 0; i < t.words.length; i += A.GROUP_SIZE) {
    t.groups.push(t.words.slice(i, i + A.GROUP_SIZE));
  }
});
