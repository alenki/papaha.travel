import type { Tour } from "../types";

export const chegem: Tour = {
  slug: "chegem-el-tyubyu",
  index: 1,
  featured: true,
  kicker: { ru: "Чегемское ущелье", en: "Chegem Gorge" },
  title: {
    ru: "Чегемские водопады и Эль-Тюбю",
    en: "Chegem Falls & El-Tyubyu",
  },
  summary: {
    ru: "Вода, падающая прямо из скалы, и село, где живые и мёртвые живут через дорогу.",
    en: "Water falling straight out of the cliff face, and a village where the living and the dead are neighbours.",
  },
  description: [
    {
      ru: "Чегемское ущелье начинается буднично, с садов, пасек и форелевых хозяйств, а затем без предупреждения сжимается до щели шириной в двадцать метров. Отвесные стены, между ними полоса неба, и вода, которая идёт не сверху, а прямо из камня: подземная река выходит на поверхность десятками струй по всей высоте скалы. Зимой всё это встаёт колоннами льда.",
      en: "The Chegem gorge starts unremarkably, with orchards, apiaries and trout farms, and then, with no warning at all, narrows to a slot twenty metres wide. Sheer walls, a strip of sky between them, and water that arrives not from above but straight out of the rock: an underground river surfacing in dozens of separate jets down the whole height of the cliff. In winter the entire thing freezes into columns.",
    },
    {
      ru: "Дальше дорога поднимается в Верхний Чегем, к Эль-Тюбю. Это село, которому больше тысячи лет, с родовыми башнями и «городом мёртвых»: восемью каменными склепами XII–XIV веков, стоящими на склоне прямо над домами. Сюда же приезжают парапланеристы со всей страны: восходящие потоки здесь такие, что можно висеть над ущельем часами.",
      en: "Beyond it the road climbs into Upper Chegem, to El-Tyubyu, a village over a thousand years old, with clan towers and a 'city of the dead': eight stone crypts from the 12th to 14th centuries standing on the slope directly above the houses. Paraglider pilots come here from across the country; the thermals are good enough to hold you over the gorge for hours.",
    },
  ],
  region: { ru: "Кабардино-Балкария", en: "Kabardino-Balkaria" },
  duration: { ru: "9–10 часов", en: "9–10 hours" },
  durationDays: 1,
  altitudeM: 1740,
  distanceKm: 170,
  priceFrom: 3600,
  pricePrivate: 15000,
  groupSize: { ru: "до 16 человек", en: "up to 16 people" },
  difficulty: 1,
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  seasonNote: {
    ru: "Круглый год. В мае–июне вода самая мощная, в январе–феврале водопады замерзают целиком.",
    en: "All year. May and June bring the most water; in January and February the falls freeze solid.",
  },
  format: ["day", "photo"],
  highlights: [
    { ru: "Су-Аузу: «вода из горла»", en: "Su-Auzu: 'water from the throat'" },
    { ru: "Теснина шириной 20 метров", en: "A gorge just 20 metres wide" },
    { ru: "Город мёртвых, XII век", en: "The city of the dead, 12th century" },
    { ru: "Греческая лестница", en: "The Greek Stairway" },
    { ru: "Парадром Эль-Тюбю", en: "The El-Tyubyu paraglider field" },
  ],
  itinerary: [
    {
      time: "08:00",
      title: { ru: "Выезд из Нальчика", en: "Departure from Nalchik" },
      text: {
        ru: "Забираем вас от гостиницы или из центра. Дальше час по долине: расскажем, чем кабардинцы отличаются от балкарцев и почему это не праздный вопрос.",
        en: "We collect you from your hotel or the centre. An hour down the valley: time enough to explain how Kabardians differ from Balkars, and why that is not an idle question.",
      },
      altitudeM: 512,
    },
    {
      time: "09:15",
      title: { ru: "Форелевое хозяйство", en: "The trout farm" },
      text: {
        ru: "Короткая остановка у прудов с ледяной родниковой водой. Здесь же первый кофе и, если проголодались, хычины со сметаной.",
        en: "A short stop at pools fed by ice-cold spring water. First coffee here, and khychiny with sour cream if you are already hungry.",
      },
      altitudeM: 780,
    },
    {
      time: "10:00",
      title: { ru: "Чегемские водопады", en: "Chegem Falls" },
      text: {
        ru: "Полтора часа в теснине. Смотровые площадки, лестница вдоль стены, ряды с шерстью и травами. Промокнуть здесь: часть программы.",
        en: "An hour and a half in the narrows. Viewing platforms, the stairway along the wall, stalls of raw wool and mountain herbs. Getting wet here is part of the itinerary.",
      },
      altitudeM: 1030,
    },
    {
      time: "12:00",
      title: { ru: "Греческая лестница", en: "The Greek Stairway" },
      text: {
        ru: "Вырубленные в скале ступени неизвестного возраста: по одной из версий, часть старой торговой тропы. Подъём короткий, но с видом на всё ущелье сразу.",
        en: "Steps cut into the rock, of disputed age: one account makes them part of an old trade path. The climb is short and opens the whole gorge at once.",
      },
      altitudeM: 1300,
    },
    {
      time: "13:00",
      title: { ru: "Обед в Эль-Тюбю", en: "Lunch at El-Tyubyu" },
      text: {
        ru: "Домашний стол в балкарском селе: шурпа, хычины трёх видов, айран. Готовят при вас, торопить бессмысленно.",
        en: "A home table in a Balkar village: shurpa, khychiny of three kinds, ayran. It is cooked in front of you, and there is no point hurrying it.",
      },
      altitudeM: 1740,
    },
    {
      time: "14:30",
      title: { ru: "Город мёртвых и башня Балкаруковых", en: "City of the dead & the Balkarukov tower" },
      text: {
        ru: "Восемь склепов на склоне, родовая башня XVII века и история Ахтугана, который украл невесту и построил башню, чтобы её удержать.",
        en: "Eight crypts on the hillside, a 17th-century clan tower, and the story of Akhtugan, who stole a bride and built the tower to keep her.",
      },
      altitudeM: 1740,
    },
    {
      time: "16:00",
      title: { ru: "Парадром", en: "The paraglider field" },
      text: {
        ru: "Смотрим на взлёты со стороны. При желании и подходящей погоде организуем полёт в тандеме: предупредите заранее, место надо бронировать.",
        en: "We watch the launches from the side. In suitable weather a tandem flight can be arranged: tell us in advance, the slots need booking.",
      },
      altitudeM: 1740,
    },
    {
      time: "18:00",
      title: { ru: "Возвращение", en: "Back to Nalchik" },
      text: {
        ru: "В Нальчике около 18:00–19:00 в зависимости от того, насколько трудно вас будет увести с парадрома.",
        en: "Back in Nalchik around 18:00–19:00, depending on how hard it proves to get you off the paraglider field.",
      },
      altitudeM: 512,
    },
  ],
  included: [
    { ru: "Транспорт с кондиционером", en: "Air-conditioned transport" },
    { ru: "Сопровождение гида весь день", en: "A guide with you all day" },
    { ru: "Входные билеты на водопады", en: "Entrance to the falls" },
    { ru: "Вода и горячий чай в машине", en: "Water and hot tea in the vehicle" },
    { ru: "Страховка на время экскурсии", en: "Insurance for the excursion" },
  ],
  excluded: [
    { ru: "Обед: около 900 ₽", en: "Lunch: around 900 ₽" },
    { ru: "Полёт на параплане: от 6 000 ₽", en: "Tandem paraglider flight: from 6 000 ₽" },
    { ru: "Сувениры и шерстяные изделия", en: "Souvenirs and wool goods" },
  ],
  bring: [
    { ru: "Обувь с нескользкой подошвой", en: "Shoes with grip" },
    { ru: "Ветровку: в теснине всегда мокро", en: "A windbreaker: the narrows are always wet" },
    { ru: "Тёплый слой: наверху на 8–10° холоднее", en: "A warm layer: it is 8–10° colder at the top" },
    { ru: "Наличные: в сёлах карты принимают не везде", en: "Cash: cards are not accepted everywhere in the villages" },
  ],
  hero: {
    id: "chegem-hero",
    alt: {
      ru: "Чегемские водопады: вода выходит струями прямо из отвесной скалы",
      en: "Chegem Falls: water jetting straight out of a sheer cliff",
    },
    // The photograph frames one section of the wall, so the caption describes
    // the water coming out of the rock rather than the full height of the cliff.
    caption: {
      ru: "Су-Аузу. Подземная река выходит прямо из скалы.",
      en: "Su-Auzu. An underground river breaking straight out of the rock face.",
    },
    ratio: 1.6,
    tone: "pine",
  },
  gallery: [
    {
      id: "chegem-01",
      alt: { ru: "Теснина Чегемского ущелья", en: "The Chegem narrows" },
      // The narrows close to about twenty metres, but not at the spot pictured.
      caption: { ru: "Местами стены сходятся до двадцати метров", en: "In places the walls close to twenty metres" },
      ratio: 0.75,
      tone: "pine",
    },
    {
      id: "chegem-02",
      alt: { ru: "Склепы города мёртвых в Эль-Тюбю", en: "Crypts of the city of the dead at El-Tyubyu" },
      // Eight at the site; about six are in the frame, so the caption describes
      // the site rather than appearing to count what you can see.
      caption: { ru: "Склепы XII–XIV века", en: "Crypts of the 12th to 14th century" },
      ratio: 1.5,
      tone: "granite",
    },
    {
      id: "chegem-03",
      alt: { ru: "Параплан над Верхним Чегемом", en: "A paraglider above Upper Chegem" },
      ratio: 1.5,
      tone: "dusk",
    },
    {
      id: "chegem-04",
      alt: { ru: "Хычины на домашнем столе", en: "Khychiny on a home table" },
      caption: { ru: "Хычины с картофелем и сыром", en: "Khychiny with potato and cheese" },
      ratio: 1,
      tone: "wool",
    },
  ],
  coords: { lat: 43.4547, lng: 43.2069 },
};
