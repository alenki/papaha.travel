import type { Tour } from "../types";

export const bezengi: Tour = {
  slug: "bezengi",
  index: 6,
  kicker: { ru: "Безенгийское ущелье", en: "Bezengi Gorge" },
  title: {
    ru: "Безенги: маленькие Гималаи",
    en: "Bezengi: the little Himalaya",
  },
  summary: {
    ru: "Тринадцать километров сплошной пятитысячной стены: самое серьёзное, что есть на Кавказе.",
    en: "Thirteen kilometres of unbroken five-thousand-metre wall: the most serious thing in the Caucasus.",
  },
  description: [
    {
      ru: "Безенгийская стена: участок Главного Кавказского хребта длиной тринадцать километров, ниже 4 800 метров не опускающийся нигде. На нём стоят Шхара (5 203), Джангитау (5 085), Катынтау и пик Пушкина. Альпинисты называют этот район маленькими Гималаями без всякой иронии: здесь погибло больше людей, чем в любой другой точке Кавказа.",
      en: "The Bezengi Wall is a thirteen-kilometre section of the Main Caucasus Range that never drops below 4 800 metres. Shkhara (5 203), Dzhangitau (5 085), Katyntau and Pushkin Peak all stand on it. Climbers call this the little Himalaya without any irony: more people have died here than anywhere else in the Caucasus.",
    },
    {
      ru: "Мы не ведём вас на стену. Мы довозим до альплагеря на 2 200 метрах, откуда её видно целиком, и проходим короткий треккинг к языку Безенгийского ледника, одного из самых длинных на Кавказе. Этого достаточно, чтобы понять масштаб. Дорога сюда идёт через Черекское ущелье, а последние тридцать километров она грунтовая.",
      en: "We do not take you onto the wall. We drive to the alpine camp at 2 200 metres, from which you see the whole of it, and walk a short trek to the snout of the Bezengi glacier, one of the longest in the Caucasus. That is enough to understand the scale. The road comes up the Cherek gorge and the last thirty kilometres are unsurfaced.",
    },
  ],
  region: { ru: "Кабардино-Балкария", en: "Kabardino-Balkaria" },
  duration: { ru: "11–12 часов", en: "11–12 hours" },
  durationDays: 1,
  altitudeM: 2200,
  distanceKm: 240,
  priceFrom: 5800,
  pricePrivate: 25000,
  groupSize: { ru: "до 7 человек", en: "up to 7 people" },
  difficulty: 3,
  months: [5, 6, 7, 8, 9, 10],
  seasonNote: {
    ru: "Май–октябрь. В июле–августе на поляне цветёт всё сразу; в сентябре чище воздух и лучше видно стену.",
    en: "May to October. In July and August the meadow flowers all at once; September gives cleaner air and a better view of the wall.",
  },
  format: ["day", "jeep", "trek", "photo"],
  highlights: [
    { ru: "Безенгийская стена, 13 км", en: "The Bezengi Wall, 13 km" },
    { ru: "Шхара, 5 203 м", en: "Shkhara, 5 203 m" },
    { ru: "Язык Безенгийского ледника", en: "The Bezengi glacier snout" },
    { ru: "Альплагерь 1959 года", en: "The 1959 alpine camp" },
    { ru: "Погранзона: нужен паспорт", en: "Border zone: passport required" },
  ],
  itinerary: [
    {
      time: "07:00",
      title: { ru: "Выезд", en: "Departure" },
      text: {
        ru: "Через Черекское ущелье на юг. Проверяем документы заранее: дальше погранзона.",
        en: "South through the Cherek gorge. We check documents in advance: the border zone starts beyond.",
      },
      altitudeM: 512,
    },
    {
      time: "09:00",
      title: { ru: "Погранпост", en: "The border post" },
      text: {
        ru: "Формальность на десять минут, но без паспорта дальше не пустят. Иностранным гражданам пропуск нужно оформлять заранее: предупредите нас за 45 дней.",
        en: "A ten-minute formality, but without a passport you go no further. Foreign nationals need a permit arranged in advance: tell us 45 days ahead.",
      },
      altitudeM: 1100,
    },
    {
      time: "10:30",
      title: { ru: "Альплагерь «Безенги»", en: "The Bezengi alpine camp" },
      text: {
        ru: "Работает с 1959 года и выглядит соответствующе, в самом хорошем смысле слова. Отсюда стена видна целиком.",
        en: "Operating since 1959 and looking it, in the best sense. The whole wall is visible from here.",
      },
      altitudeM: 2200,
    },
    {
      time: "11:30",
      title: { ru: "Треккинг к леднику", en: "Trek to the glacier" },
      text: {
        ru: "Два-три часа по морене в обе стороны. Тропа несложная, но на высоте и по камням, поэтому темп спокойный.",
        en: "Two to three hours on the moraine, there and back. The path is not technical, but it is at altitude and over rock, so the pace stays easy.",
      },
      altitudeM: 2400,
    },
    {
      time: "14:00",
      title: { ru: "Обед на поляне", en: "Lunch on the meadow" },
      text: {
        ru: "Горячее из термосов под стеной. Это лучший обед в нашей программе, и дело не в еде.",
        en: "Something hot from flasks, under the wall. It is the best lunch we serve, and it is not about the food.",
      },
      altitudeM: 2200,
    },
    {
      time: "16:00",
      title: { ru: "Обратный путь", en: "The way back" },
      text: {
        ru: "С остановкой в селе Безенги. В Нальчике к 19:00.",
        en: "With a stop in Bezengi village. Back in Nalchik by 19:00.",
      },
      altitudeM: 512,
    },
  ],
  included: [
    { ru: "Внедорожник с водителем-гидом", en: "A 4×4 with driver-guide" },
    { ru: "Сопровождение на треккинге", en: "A guide on the trek" },
    { ru: "Горячий обед и чай", en: "Hot lunch and tea" },
    { ru: "Оформление в погранзону для граждан РФ", en: "Border zone paperwork for Russian citizens" },
    { ru: "Страховка", en: "Insurance" },
  ],
  excluded: [
    { ru: "Пропуск в погранзону для иностранцев", en: "Border permit for foreign nationals" },
    { ru: "Ночёвка в альплагере, если захотите остаться", en: "A night at the camp, if you decide to stay" },
  ],
  bring: [
    { ru: "Паспорт: без него не пропустят", en: "Your passport: you will not be let through without it" },
    { ru: "Треккинговые ботинки", en: "Trekking boots" },
    { ru: "Тёплый и ветрозащитный слой", en: "Warm and windproof layers" },
    { ru: "Солнцезащитный крем и очки", en: "Sunscreen and sunglasses" },
    { ru: "Свой рюкзак на день", en: "A daypack" },
  ],
  hero: {
    id: "bezengi-hero",
    alt: {
      ru: "Безенгийская стена: сплошной снежный хребет над мореной",
      en: "The Bezengi Wall: an unbroken snow ridge above the moraine",
    },
    caption: {
      ru: "Тринадцать километров, нигде не ниже 4 800.",
      en: "Thirteen kilometres, nowhere below 4 800.",
    },
    ratio: 1.78,
    tone: "granite",
  },
  gallery: [
    {
      id: "bezengi-01",
      // The ablation zone rather than the terminus, so not "the snout".
      alt: { ru: "Лёд и морена Безенгийского ледника", en: "Ice and moraine on the Bezengi glacier" },
      ratio: 1.5,
      tone: "glacier",
    },
    {
      id: "bezengi-02",
      // The camp sits kilometres down-valley of the wall, which is not in frame.
      alt: { ru: "Альплагерь в Безенгийском ущелье", en: "The alpine camp in the Bezengi valley" },
      caption: { ru: "Работает с 1959 года", en: "In operation since 1959" },
      ratio: 1.5,
      tone: "granite",
    },
    {
      id: "bezengi-03",
      // A grassy terrace beside a meltwater tarn, not bare moraine rubble.
      alt: {
        ru: "Цветы у ледникового озерца в Безенги",
        en: "Flowers beside a meltwater tarn at Bezengi",
      },
      ratio: 0.75,
      tone: "pine",
    },
    {
      id: "bezengi-04",
      // The source names no individual summit, so neither do we: calling an
      // unidentified peak Shkhara would be a guess dressed as a fact.
      alt: { ru: "Безенгийская стена в вечернем свете", en: "The Bezengi Wall in evening light" },
      ratio: 1,
      tone: "dusk",
    },
  ],
  coords: { lat: 43.1006, lng: 43.1281 },
};
