import type { Tour } from "../types";

export const gastro: Tour = {
  slug: "vkus-kavkaza",
  index: 8,
  kicker: { ru: "Гастротур", en: "Food tour" },
  title: {
    ru: "Вкус Кавказа: хычины, сыр и айран",
    en: "The taste of it: khychiny, cheese and ayran",
  },
  summary: {
    ru: "Полдня на то, чтобы понять, почему здесь нельзя отказаться от второй тарелки.",
    en: "Half a day to understand why refusing a second plate is not really an option here.",
  },
  description: [
    {
      ru: "Кабардинская и балкарская кухня не про специи и не про сложность. Она про качество трёх-четырёх продуктов и про то, сколько времени вы готовы им уделить. Хычин представляет собой тонкую лепёшку с картофелем, сыром или мясом, и раскатать его правильно учатся годами. Айран здесь делают из молока, которое было в вымени этим утром.",
      en: "Kabardian and Balkar cooking is not about spice or complexity. It is about the quality of three or four ingredients and how much time you are prepared to give them. A khychin is a thin flatbread with potato, cheese or meat, and rolling one properly takes years to learn. Ayran here is made from milk that was in the udder this morning.",
    },
    {
      ru: "Мы начинаем на Зелёном рынке Нальчика, где покупаем всё, что понадобится. Дальше едем в село в предгорьях, где хозяйка учит вас лепить хычины своими руками, а хозяин показывает сыроварню. Заканчиваем застольем с тостами, потому что без них нельзя.",
      en: "We start at Nalchik's Green Market, buying everything we need. Then out to a village in the foothills, where the woman of the house teaches you to make khychiny with your own hands and her husband shows you the cheese room. It ends at the table with toasts, because it cannot end without them.",
    },
  ],
  region: { ru: "Нальчик и предгорья", en: "Nalchik and the foothills" },
  duration: { ru: "6 часов", en: "6 hours" },
  durationDays: 1,
  altitudeM: 900,
  distanceKm: 70,
  priceFrom: 4800,
  pricePrivate: 16000,
  groupSize: { ru: "до 10 человек", en: "up to 10 people" },
  difficulty: 1,
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  seasonNote: {
    ru: "Круглый год. Осенью на рынке заметно интереснее.",
    en: "All year. The market is noticeably more interesting in autumn.",
  },
  format: ["gastro", "day"],
  highlights: [
    { ru: "Зелёный рынок Нальчика", en: "Nalchik's Green Market" },
    { ru: "Мастер-класс по хычинам", en: "A khychin masterclass" },
    { ru: "Сыроварня в предгорьях", en: "A foothill cheese room" },
    { ru: "Дегустация айрана и калмыцкого чая", en: "Ayran and Kalmyk tea tasting" },
    { ru: "Застолье с тостами", en: "A proper table, with toasts" },
  ],
  itinerary: [
    {
      time: "10:00",
      title: { ru: "Зелёный рынок", en: "The Green Market" },
      text: {
        ru: "Час среди сыров, специй, сушёного кизила и людей, которые обязательно дадут вам всё попробовать. Покупаем продукты на мастер-класс.",
        en: "An hour among cheeses, spices, dried cornel and people who will insist you taste everything. We buy what the masterclass needs.",
      },
      altitudeM: 512,
    },
    {
      time: "11:15",
      title: { ru: "Дорога в село", en: "Out to the village" },
      text: {
        ru: "Сорок минут в предгорья. По дороге вас ждёт короткая история о том, почему у кабардинцев и балкарцев кухни похожие, а языки совершенно разные.",
        en: "Forty minutes into the foothills, with a short account of why Kabardians and Balkars share a cuisine and share no language at all.",
      },
      altitudeM: 700,
    },
    {
      time: "12:00",
      title: { ru: "Сыроварня", en: "The cheese room" },
      text: {
        ru: "Смотрим весь цикл: от утреннего молока до копчёного круга. Пробуем четыре вида, включая тот, что вызревал в бурдюке.",
        en: "The whole cycle, from morning milk to a smoked wheel. Four kinds to taste, including one aged in a skin.",
      },
      altitudeM: 900,
    },
    {
      time: "13:00",
      title: { ru: "Мастер-класс: хычины", en: "Masterclass: khychiny" },
      text: {
        ru: "Раскатываете сами. У всех получается плохо, и это нормально: хозяйка делает это сорок лет.",
        en: "You roll them yourself. Everyone does it badly, which is fine: your host has been at it for forty years.",
      },
      altitudeM: 900,
    },
    {
      time: "14:30",
      title: { ru: "Застолье", en: "The table" },
      text: {
        ru: "Едим то, что сделали, плюс шурпа, жау бауур и лакумы. Тамада объяснит правила: их немного, но они настоящие.",
        en: "We eat what we made, plus shurpa, zhau bauur and lakumy. The tamada explains the rules: there are few, and they are real.",
      },
      altitudeM: 900,
    },
    {
      time: "16:00",
      title: { ru: "Возвращение", en: "Back to Nalchik" },
      text: {
        ru: "В Нальчике к 16:00. Ужин вам сегодня не понадобится.",
        en: "Back in Nalchik by 16:00. You will not be needing dinner.",
      },
      altitudeM: 512,
    },
  ],
  included: [
    { ru: "Транспорт", en: "Transport" },
    { ru: "Гид и сопровождение на рынке", en: "A guide, including at the market" },
    { ru: "Все продукты для мастер-класса", en: "All ingredients for the masterclass" },
    { ru: "Дегустация сыров и напитков", en: "Cheese and drink tasting" },
    { ru: "Полноценное застолье", en: "A full sit-down meal" },
  ],
  excluded: [
    { ru: "Покупки на рынке для себя", en: "Anything you buy at the market for yourself" },
    { ru: "Алкоголь", en: "Alcohol" },
  ],
  bring: [
    { ru: "Аппетит: это не шутка", en: "An appetite: this is not a joke" },
    { ru: "Наличные на рынок", en: "Cash for the market" },
    { ru: "Сумку для сыра, который вы точно купите", en: "A bag for the cheese you will certainly buy" },
    { ru: "Фартук не нужен, всё выдадим", en: "No apron needed, we provide them" },
  ],
  hero: {
    id: "gastro-hero",
    alt: {
      ru: "Стопка свежих хычинов на деревянном столе",
      en: "A stack of fresh khychiny on a wooden table",
    },
    caption: {
      ru: "Хычины с картофелем и сыром, топлёное масло сверху.",
      en: "Khychiny with potato and cheese, clarified butter over the top.",
    },
    ratio: 1.5,
    tone: "wool",
  },
  gallery: [
    {
      id: "gastro-01",
      // A Georgian stall, so the wording does not name the Nalchik market.
      alt: { ru: "Сырный прилавок на кавказском рынке", en: "A cheese counter at a Caucasian market" },
      ratio: 1.5,
      tone: "wool",
    },
    {
      id: "gastro-02",
      alt: { ru: "Раскатывание теста для хычинов", en: "Rolling dough for khychiny" },
      ratio: 0.75,
      tone: "wool",
    },
    {
      id: "gastro-03",
      // A home smokehouse in Svaneti: rounds over the smoke, not an ageing room.
      alt: { ru: "Круги сыра коптятся над огнём", en: "Rounds of cheese smoking over a fire" },
      ratio: 1,
      tone: "clay",
    },
    {
      id: "gastro-04",
      // A constructed still life, not a real yard: the mountains behind it are
      // a backdrop and the light is studio light. Worth having, but the wording
      // must not sell it as a photograph of somebody's actual table.
      alt: {
        ru: "Натюрморт: кавказский стол, сыр, хлеб, гранаты",
        en: "A still life of a Caucasian table: cheese, bread, pomegranates",
      },
      ratio: 1.5,
      tone: "dusk",
    },
  ],
  coords: { lat: 43.4845, lng: 43.6071 },
};
