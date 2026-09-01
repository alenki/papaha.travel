import type { Tour } from "../types";

export const vesKavkaz: Tour = {
  slug: "ves-kavkaz-5-dney",
  index: 7,
  featured: true,
  kicker: { ru: "Пять дней · четыре республики", en: "Five days · four republics" },
  title: {
    ru: "Весь Кавказ за пять дней",
    en: "The whole Caucasus in five days",
  },
  summary: {
    ru: "Кабардино-Балкария, Осетия, Ингушетия, Чечня. Одна машина, один гид, ни одной пересадки.",
    en: "Kabardino-Balkaria, Ossetia, Ingushetia, Chechnya. One vehicle, one guide, no transfers.",
  },
  description: [
    {
      ru: "Северный Кавказ: не одно место, а семь республик, которые различаются между собой сильнее, чем иные страны Европы. За пять дней мы проходим четыре из них: от ледников Приэльбрусья через осетинские склепы Даргавса и ингушские боевые башни Вовнушек до Грозного и озера Кезеной-Ам.",
      en: "The North Caucasus is not one place but seven republics, which differ from one another more than some European countries do. In five days we cross four of them: from the glaciers of Elbrus through the Ossetian crypts of Dargavs and the Ingush fighting towers of Vovnushki to Grozny and Lake Kezenoy-Am.",
    },
    {
      ru: "Это не марафон по галочкам. Каждый день заканчивается в гостинице с горячим душем, каждый обед проходит за настоящим столом, и в каждой республике есть человек, который встречает нас лично. Именно эти встречи вы будете вспоминать, а не километраж.",
      en: "This is not a tick-box marathon. Every day ends in a hotel with a hot shower, every lunch happens at a real table, and in each republic there is someone who meets us personally. Those meetings are what you will remember, not the mileage.",
    },
  ],
  region: {
    ru: "КБР · Северная Осетия · Ингушетия · Чечня",
    en: "Kabardino-Balkaria · North Ossetia · Ingushetia · Chechnya",
  },
  duration: { ru: "5 дней / 4 ночи", en: "5 days / 4 nights" },
  durationDays: 5,
  altitudeM: 3847,
  distanceKm: 1450,
  priceFrom: 62000,
  groupSize: { ru: "6–14 человек", en: "6–14 people" },
  difficulty: 2,
  months: [4, 5, 6, 7, 8, 9, 10],
  seasonNote: {
    ru: "Апрель–октябрь. Лучшие даты: конец мая и весь сентябрь. В это время зелено, ясно и без толп.",
    en: "April to October. The best dates are late May and all of September: green, clear and uncrowded.",
  },
  format: ["multiday", "photo"],
  highlights: [
    { ru: "Эльбрус и канатка на 3 847", en: "Elbrus and the cable car to 3 847" },
    { ru: "Даргавс, город мёртвых", en: "Dargavs, the city of the dead" },
    { ru: "Вовнушки и Эрзи", en: "Vovnushki and Erzi" },
    { ru: "Грозный и мечеть «Сердце Чечни»", en: "Grozny and the Heart of Chechnya mosque" },
    { ru: "Кезеной-Ам, 1 869 м", en: "Kezenoy-Am, 1 869 m" },
  ],
  itinerary: [
    {
      label: { ru: "День 1", en: "Day 1" },
      title: { ru: "От Нальчика до Приэльбрусья", en: "From Nalchik to Elbrus" },
      text: {
        ru: "Встреча в аэропорту Минеральных Вод или Нальчика. Баксанское ущелье, поляна Нарзанов, подъём на Гара-Баши (3 847 м), Чегет. Ночь в Терсколе.",
        en: "We meet you at Mineralnye Vody or Nalchik airport. The Baksan gorge, the Narzan meadow, up to Gara-Bashi (3 847 m), then Cheget. Night in Terskol.",
      },
      altitudeM: 3847,
    },
    {
      label: { ru: "День 2", en: "Day 2" },
      title: { ru: "От Чегема до Верхней Балкарии", en: "From Chegem to Upper Balkaria" },
      text: {
        ru: "Чегемские водопады, Эль-Тюбю с городом мёртвых и парадромом, перевал Актопрак, Голубые озёра. Обед в балкарской семье. Ночь в Нальчике.",
        en: "The Chegem falls, El-Tyubyu with its crypts and paraglider field, the Aktoprak pass, the Blue Lakes. Lunch with a Balkar family. Night in Nalchik.",
      },
      altitudeM: 2015,
    },
    {
      label: { ru: "День 3", en: "Day 3" },
      title: { ru: "Северная Осетия", en: "North Ossetia" },
      text: {
        ru: "Куртатинское и Кармадонское ущелья, Даргавс с 95 склепами на склоне, Фиагдон, Аланский монастырь. Осетинские пироги там, где их придумали. Ночь во Владикавказе.",
        en: "The Kurtat and Karmadon gorges, Dargavs with its 95 crypts on a hillside, Fiagdon and the Alanian monastery. Ossetian pies where they were invented. Night in Vladikavkaz.",
      },
      altitudeM: 1800,
    },
    {
      label: { ru: "День 4", en: "Day 4" },
      title: { ru: "Ингушетия", en: "Ingushetia" },
      text: {
        ru: "Джейрахское ущелье: башенные комплексы Вовнушки, Эрзи, Таргим, храм Тхаба-Ерды VIII века. Это самая плотная концентрация средневековой архитектуры на Кавказе. Ночь в Магасе или Грозном.",
        en: "The Dzheyrakh gorge: the tower complexes of Vovnushki, Erzi and Targim, and the 8th-century Thaba-Yerdy church. This is the densest concentration of medieval architecture in the Caucasus. Night in Magas or Grozny.",
      },
      altitudeM: 1200,
    },
    {
      label: { ru: "День 5", en: "Day 5" },
      title: { ru: "Чечня, Кезеной-Ам, выезд", en: "Chechnya, Kezenoy-Am, departure" },
      text: {
        ru: "Грозный: «Сердце Чечни», Грозный-Сити, проспект Путина. Дальше в горы к Кезеной-Ам, самому большому и глубокому озеру Кавказа. Трансфер в аэропорт вечером.",
        en: "Grozny: the Heart of Chechnya mosque, Grozny City, Putin Avenue. Then up into the mountains to Kezenoy-Am, the largest and deepest lake in the Caucasus. Airport transfer in the evening.",
      },
      altitudeM: 1869,
    },
  ],
  included: [
    { ru: "4 ночи в гостиницах 3★ с завтраками", en: "4 nights in 3★ hotels with breakfast" },
    { ru: "Весь транспорт, включая трансферы из аэропорта", en: "All transport, including airport transfers" },
    { ru: "Гид на все пять дней", en: "A guide for all five days" },
    { ru: "Все обеды по программе", en: "Every lunch in the programme" },
    { ru: "Все входные билеты и экосборы", en: "All entrance and conservation fees" },
    { ru: "Страховка", en: "Insurance" },
  ],
  excluded: [
    { ru: "Авиабилеты до Минеральных Вод или Нальчика", en: "Flights to Mineralnye Vody or Nalchik" },
    { ru: "Канатные дороги в Приэльбрусье, около 3 200 ₽", en: "Elbrus cable cars, around 3 200 ₽" },
    { ru: "Ужины, от 800 ₽", en: "Dinners, from 800 ₽" },
    { ru: "Одноместное размещение: доплата 14 000 ₽", en: "Single occupancy: 14 000 ₽ supplement" },
  ],
  bring: [
    { ru: "Паспорт: пересекаем границы республик и погранзоны", en: "Passport: we cross republic borders and border zones" },
    { ru: "Одежда слоями: за день перепад до 25°", en: "Layers: the daily range reaches 25°C" },
    { ru: "Треккинговая обувь", en: "Trekking shoes" },
    { ru: "Закрытая одежда для мечети (платок для женщин)", en: "Modest dress for the mosque (a headscarf for women)" },
    { ru: "Powerbank: розеток в дороге мало", en: "A power bank: sockets are scarce on the road" },
  ],
  hero: {
    id: "kavkaz-hero",
    alt: {
      ru: "Ингушские боевые башни Вовнушки на скальных гребнях",
      en: "The Ingush fighting towers of Vovnushki on their rock spurs",
    },
    caption: {
      ru: "Вовнушки. Башни стоят на отдельных скалах, соединённых когда-то навесным мостом.",
      en: "Vovnushki. The towers stand on separate crags, once joined by a rope bridge.",
    },
    ratio: 1.6,
    tone: "dusk",
  },
  gallery: [
    {
      id: "kavkaz-01",
      alt: { ru: "Даргавс, город мёртвых в Осетии", en: "Dargavs, the Ossetian city of the dead" },
      caption: { ru: "95 склепов на одном склоне", en: "95 crypts on a single hillside" },
      ratio: 1.5,
      tone: "granite",
    },
    {
      id: "kavkaz-02",
      alt: { ru: "Мечеть «Сердце Чечни» в Грозном", en: "The Heart of Chechnya mosque, Grozny" },
      ratio: 0.75,
      tone: "dusk",
    },
    {
      id: "kavkaz-03",
      alt: { ru: "Озеро Кезеной-Ам", en: "Lake Kezenoy-Am" },
      caption: { ru: "Самое глубокое озеро Кавказа", en: "The deepest lake in the Caucasus" },
      ratio: 1.5,
      tone: "glacier",
    },
    {
      id: "kavkaz-04",
      // One pie in the frame, not the traditional stack of three.
      alt: { ru: "Осетинский пирог с сыром", en: "An Ossetian cheese pie" },
      ratio: 1,
      tone: "wool",
    },
  ],
  coords: { lat: 42.8, lng: 44.8 },
};
