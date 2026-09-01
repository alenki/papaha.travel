import type { Tour } from "../types";

export const dzhilySu: Tour = {
  slug: "dzhily-su",
  index: 4,
  featured: true,
  kicker: { ru: "Северное Приэльбрусье", en: "Elbrus North Side" },
  title: {
    ru: "Джилы-Су: северный склон Эльбруса",
    en: "Dzhily-Su: the north face of Elbrus",
  },
  summary: {
    ru: "Сто километров серпантина ради поляны, где из земли бьёт тёплый нарзан, а над головой стоит Эльбрус без единой канатки.",
    en: "A hundred kilometres of switchbacks for a meadow where warm narzan comes out of the ground and Elbrus stands overhead with not one cable car on it.",
  },
  description: [
    {
      ru: "Северная сторона Эльбруса ощущается как совсем другая гора. Никаких подъёмников, отелей и очередей: только дорога, которую достроили сравнительно недавно, и урочище Джилы-Су на 2 400 метрах. «Джилы-Су» по-балкарски значит «тёплая вода»: из земли здесь выходят источники с температурой около +22°, и в них лезут в любую погоду.",
      en: "The north side of Elbrus is a different mountain. No lifts, no hotels, no queues: only a road finished comparatively recently, and the Dzhily-Su basin at 2 400 metres. 'Dzhily-Su' is Balkar for 'warm water': springs surface here at around +22°C, and people get into them in any weather.",
    },
    {
      ru: "Вокруг находятся водопад Султан, который падает с сорока метров прямо из ледникового языка, Калинов мост над каньоном Малки, каменные грибы и поляна Эммануэля, откуда в 1829 году вышла первая экспедиция на Эльбрус. Дорога сюда идёт через плато Шаджатмаз мимо обсерватории, на высоте больше двух тысяч почти всю вторую половину пути.",
      en: "Around it: the Sultan waterfall, dropping forty metres straight out of a glacier snout; the Kalinov bridge over the Malka canyon; the stone mushrooms; and the Emmanuel meadow, from which the first expedition to Elbrus set out in 1829. The road runs across the Shadzhatmaz plateau past the observatory, staying above two thousand metres for most of the second half.",
    },
  ],
  region: { ru: "КБР / Ставропольский край", en: "Kabardino-Balkaria / Stavropol Krai" },
  duration: { ru: "12–14 часов", en: "12–14 hours" },
  durationDays: 1,
  altitudeM: 2500,
  distanceKm: 380,
  priceFrom: 5400,
  pricePrivate: 24000,
  groupSize: { ru: "до 8 человек", en: "up to 8 people" },
  difficulty: 3,
  months: [6, 7, 8, 9, 10],
  seasonNote: {
    ru: "Только с июня по октябрь. Всё остальное время перевал закрыт снегом: это не осторожность, а физическая невозможность.",
    en: "June to October only. The rest of the year the pass is under snow: not caution, simple impossibility.",
  },
  format: ["day", "jeep", "photo"],
  highlights: [
    { ru: "Водопад Султан, 40 м", en: "The Sultan waterfall, 40 m" },
    { ru: "Тёплые нарзанные ванны", en: "The warm narzan baths" },
    { ru: "Поляна Эммануэля", en: "The Emmanuel meadow" },
    { ru: "Каньон Малки и Калинов мост", en: "The Malka canyon & Kalinov bridge" },
    { ru: "Плато Шаджатмаз, 2 100 м", en: "The Shadzhatmaz plateau, 2 100 m" },
  ],
  itinerary: [
    {
      time: "06:00",
      title: { ru: "Очень ранний выезд", en: "A very early start" },
      text: {
        ru: "Извиняться не будем: дорога длинная, и после полудня на плато обычно приходит облачность.",
        en: "No apologies: the road is long, and cloud usually arrives on the plateau after midday.",
      },
      altitudeM: 512,
    },
    {
      time: "08:00",
      title: { ru: "Кисловодск, короткая пауза", en: "Kislovodsk, a short pause" },
      text: {
        ru: "Кофе и последний нормальный туалет на ближайшие шесть часов. Дальше цивилизация заканчивается.",
        en: "Coffee, and the last proper lavatory for the next six hours. Civilisation stops here.",
      },
      altitudeM: 830,
    },
    {
      time: "09:30",
      title: { ru: "Плато Шаджатмаз", en: "The Shadzhatmaz plateau" },
      text: {
        ru: "Высокогорная астрономическая обсерватория и первый вид на Эльбрус с севера, совершенно непохожий на открыточный.",
        en: "The high-altitude observatory, and the first sight of Elbrus from the north, nothing like the postcard version.",
      },
      altitudeM: 2100,
    },
    {
      time: "11:00",
      title: { ru: "Каменные грибы и Калинов мост", en: "Stone mushrooms & the Kalinov bridge" },
      text: {
        ru: "Останавливаемся у выветренных останцов и у моста над каньоном, где Малка идёт в узкой щели далеко внизу.",
        en: "We stop at the wind-carved rock stacks and at the bridge over the canyon, where the Malka runs in a narrow slot far below.",
      },
      altitudeM: 2300,
    },
    {
      time: "12:00",
      title: { ru: "Джилы-Су: источники", en: "Dzhily-Su: the springs" },
      text: {
        ru: "Тёплые нарзанные ванны, купальня и «глазной» источник. Полотенце и сменное бельё возьмите: жалеть будете только те, кто не взял.",
        en: "The warm baths, the bathing hut and the 'eye' spring. Bring a towel and dry underwear: the only people who regret it are the ones who didn't.",
      },
      altitudeM: 2400,
    },
    {
      time: "13:30",
      title: { ru: "Водопад Султан", en: "The Sultan waterfall" },
      text: {
        ru: "Двадцать минут пешком вниз по тропе. Вода падает с ледникового обрыва, и в июле здесь всё равно холодно.",
        en: "Twenty minutes down the path on foot. The water falls off a glacial lip, and it is cold here even in July.",
      },
      altitudeM: 2380,
    },
    {
      time: "14:30",
      title: { ru: "Поляна Эммануэля", en: "The Emmanuel meadow" },
      text: {
        ru: "Обед из термосов на поляне, откуда в 1829-м вышла экспедиция генерала Эммануэля. Отсюда же сегодня начинают восхождение с севера.",
        en: "Lunch from flasks on the meadow the Emmanuel expedition left from in 1829. Northern ascents still start here.",
      },
      altitudeM: 2500,
    },
    {
      time: "16:00",
      title: { ru: "Обратная дорога", en: "The road back" },
      text: {
        ru: "Тот же серпантин в обратную сторону, но в вечернем свете. В Нальчике около 20:00.",
        en: "The same switchbacks in reverse, in evening light. Back in Nalchik around 20:00.",
      },
      altitudeM: 512,
    },
  ],
  included: [
    { ru: "Внедорожник с водителем-гидом", en: "A 4×4 with a driver-guide" },
    { ru: "Экосбор национального парка", en: "National park fee" },
    { ru: "Горячий обед из термосов на поляне", en: "A hot flask lunch on the meadow" },
    { ru: "Чай, вода, перекусы весь день", en: "Tea, water and snacks all day" },
    { ru: "Страховка", en: "Insurance" },
  ],
  excluded: [
    { ru: "Сувениры и травяные сборы", en: "Souvenirs and herb bundles" },
    { ru: "Личное снаряжение", en: "Personal kit" },
  ],
  bring: [
    { ru: "Полотенце и сменное бельё для источников", en: "Towel and dry underwear for the springs" },
    { ru: "Треккинговая обувь: к водопаду тропа крутая", en: "Trekking shoes: the waterfall path is steep" },
    { ru: "Ветрозащита: на плато всегда дует", en: "Windproofs: the plateau always blows" },
    { ru: "Таблетки от укачивания, если склонны", en: "Motion-sickness tablets if you are prone" },
    { ru: "Паспорт", en: "Your passport" },
  ],
  hero: {
    id: "dzhilysu-hero",
    alt: {
      ru: "Северный склон Эльбруса над урочищем Джилы-Су",
      en: "The north face of Elbrus above the Dzhily-Su basin",
    },
    caption: {
      ru: "Северная сторона. Ни одного подъёмника.",
      en: "The north side. Not one lift on it.",
    },
    ratio: 1.6,
    tone: "granite",
  },
  gallery: [
    {
      id: "dzhilysu-01",
      alt: { ru: "Водопад Султан", en: "The Sultan waterfall" },
      caption: { ru: "Сорок метров прямо из ледника", en: "Forty metres straight out of the glacier" },
      ratio: 0.75,
      tone: "glacier",
    },
    {
      id: "dzhilysu-02",
      alt: { ru: "Каменные грибы на плато", en: "Stone mushrooms on the plateau" },
      ratio: 1.5,
      tone: "clay",
    },
    {
      id: "dzhilysu-03",
      // The photograph is the spring outlet and its mineral pool, not the built
      // bathing pools, so the wording says spring rather than bath.
      alt: {
        ru: "Железистый нарзанный источник в Джилы-Су",
        en: "An iron-rich narzan spring at Dzhily-Su",
      },
      ratio: 1.5,
      tone: "clay",
    },
    {
      id: "dzhilysu-04",
      // Shot from above the valley rather than from the bridge, and nothing in
      // the source identifies the bridge as the Kalinov one.
      alt: {
        ru: "Каньон Малки на дороге в Джилы-Су",
        en: "The Malka canyon on the Dzhily-Su road",
      },
      ratio: 1,
      tone: "granite",
    },
  ],
  coords: { lat: 43.4406, lng: 42.5511 },
};
