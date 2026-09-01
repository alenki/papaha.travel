import type { Tour } from "../types";

export const balkaria: Tour = {
  slug: "verkhnyaya-balkaria",
  index: 2,
  featured: true,
  kicker: { ru: "Черекское ущелье", en: "Cherek Gorge" },
  title: {
    ru: "Верхняя Балкария и Голубые озёра",
    en: "Upper Balkaria & the Blue Lakes",
  },
  summary: {
    ru: "Озеро, у которого до сих пор не нашли дна, и долина, из которой народ однажды выселили целиком.",
    en: "A lake whose bottom nobody has found, and a valley whose people were once deported to the last man.",
  },
  description: [
    {
      ru: "Церик-Кёль, Нижнее Голубое озеро, держит температуру +9° круглый год и не замерзает никогда. Вода в нём насыщена сероводородом, поэтому она такого цвета: не голубая от неба, а голубая сама по себе. Официальная глубина: 279 метров, но дайверы уходили глубже и дна не достали. У балкарцев на этот счёт есть своё объяснение, и оно вам понравится больше научного.",
      en: "Tserik-Kyol, the Lower Blue Lake, holds +9°C the year round and has never frozen. Its water is saturated with hydrogen sulphide, which is why it is that colour: not blue from the sky, but blue in itself. The official depth is 279 metres, but divers have gone deeper and found no bottom. The Balkars have their own account of this, and you will like it better than the scientific one.",
    },
    {
      ru: "Дальше начинается Черекская теснина: дорога, вырубленная в отвесной стене над рекой, и старая тропа под ней, по которой ходили до 1940-х. Наверху открывается Верхняя Балкария: широкая солнечная долина, руины родовых башен и совершенно пустые склоны. Пустые не случайно: в 1944 году всё балкарское население депортировали в Среднюю Азию, и вернуться людям разрешили только через тринадцать лет. Об этом здесь говорят спокойно и прямо, и это часть того, зачем сюда стоит ехать.",
      en: "Then comes the Cherek narrows: a road cut into a vertical wall above the river, with the old path still visible below it, walked until the 1940s. At the top Upper Balkaria opens out: a wide, sunlit valley, the ruins of clan towers, and completely empty hillsides. Empty for a reason: in 1944 the entire Balkar population was deported to Central Asia, and people were not permitted to return for thirteen years. It is spoken about here plainly and without drama, and it is part of why the place is worth the drive.",
    },
  ],
  region: { ru: "Кабардино-Балкария", en: "Kabardino-Balkaria" },
  duration: { ru: "9–10 часов", en: "9–10 hours" },
  durationDays: 1,
  altitudeM: 1740,
  distanceKm: 190,
  priceFrom: 3600,
  pricePrivate: 15000,
  groupSize: { ru: "до 16 человек", en: "up to 16 people" },
  difficulty: 1,
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  seasonNote: {
    ru: "Круглый год. Лучше всего в сентябре–октябре, когда долина становится золотой.",
    en: "All year. Best in September and October, when the valley turns gold.",
  },
  format: ["day", "photo"],
  highlights: [
    { ru: "Церик-Кёль, +9° круглый год", en: "Tserik-Kyol, +9°C year-round" },
    { ru: "Черекская теснина", en: "The Cherek narrows" },
    { ru: "Башня Абаевых", en: "The Abaev tower" },
    { ru: "Крепость Зылгы", en: "The Zylgy fortress" },
    { ru: "Обед в балкарском доме", en: "Lunch in a Balkar home" },
  ],
  itinerary: [
    {
      time: "08:30",
      title: { ru: "Выезд из Нальчика", en: "Departure from Nalchik" },
      text: {
        ru: "Час по предгорьям на восток, мимо садов и кукурузных полей Черекского района.",
        en: "An hour east through the foothills, past the orchards and maize fields of the Cherek district.",
      },
      altitudeM: 512,
    },
    {
      time: "09:45",
      title: { ru: "Нижнее Голубое озеро", en: "The Lower Blue Lake" },
      text: {
        ru: "Обходим озеро по кромке. Здесь работает дайв-центр, и иногда можно застать погружение. Купаться нельзя, и вы поймёте почему, как только подойдёте.",
        en: "We walk the rim. There is a dive centre here and you may catch a descent. Swimming is not allowed, and you will understand why the moment you get close.",
      },
      altitudeM: 809,
    },
    {
      time: "11:00",
      title: { ru: "Верхние озёра", en: "The Upper Lakes" },
      text: {
        ru: "Короткий подъём к Секретному и Сухому озёрам. Сухое представляет собой карстовый провал глубиной 180 метров, в котором почти нет воды. Смотреть в него сверху странно.",
        en: "A short climb to the Secret and Dry lakes. The Dry lake is a karst sinkhole 180 metres deep with almost no water in it. Looking down into it is a strange feeling.",
      },
      altitudeM: 950,
    },
    {
      time: "12:00",
      title: { ru: "Черекская теснина", en: "The Cherek narrows" },
      text: {
        ru: "Останавливаемся на самом узком участке. Внизу видна старая тропа, по которой в ущелье ходили пешком и с вьюками до постройки дороги.",
        en: "We stop at the tightest section. Below you can still see the old path, walked on foot and with pack animals before the road existed.",
      },
      altitudeM: 1100,
    },
    {
      time: "13:00",
      title: { ru: "Обед в Верхней Балкарии", en: "Lunch in Upper Balkaria" },
      text: {
        ru: "Домашняя кухня в семье: жау бауур, хычины, свежий сыр, айран. Хозяева говорят по-русски и охотно рассказывают о депортации, если спросите.",
        en: "A family kitchen: zhau bauur, khychiny, fresh cheese, ayran. Our hosts speak Russian and will talk about the deportation willingly, if you ask.",
      },
      altitudeM: 1200,
    },
    {
      time: "14:30",
      title: { ru: "Башни и крепость Зылгы", en: "Towers & the Zylgy fortress" },
      text: {
        ru: "Башня Абаевых, руины Амирхан-Кала и укрепление Зылгы на скальном выступе. Поднимаемся к тем, до которых можно дойти.",
        en: "The Abaev tower, the ruins of Amirkhan-Kala, and the Zylgy stronghold on its rock spur. We walk up to the ones that can be reached.",
      },
      altitudeM: 1400,
    },
    {
      time: "16:00",
      title: { ru: "Верхний Балкарский цирк", en: "The upper cirque" },
      text: {
        ru: "Едем до конца асфальта, откуда открывается вид на верховья Черека и снежные вершины Безенгийского района.",
        en: "We drive to the end of the tarmac, where the head of the Cherek and the snow peaks of the Bezengi massif come into view.",
      },
      altitudeM: 1740,
    },
    {
      time: "18:30",
      title: { ru: "Возвращение", en: "Back to Nalchik" },
      text: {
        ru: "В Нальчике к 18:30–19:30.",
        en: "Back in Nalchik by 18:30–19:30.",
      },
      altitudeM: 512,
    },
  ],
  included: [
    { ru: "Транспорт с кондиционером", en: "Air-conditioned transport" },
    { ru: "Гид на весь маршрут", en: "A guide for the whole route" },
    { ru: "Экосбор на Голубых озёрах", en: "Blue Lakes conservation fee" },
    { ru: "Вода и чай", en: "Water and tea" },
    { ru: "Страховка", en: "Insurance" },
  ],
  excluded: [
    { ru: "Обед: около 1 000 ₽", en: "Lunch: around 1 000 ₽" },
    { ru: "Погружение с аквалангом: от 5 000 ₽", en: "A scuba descent: from 5 000 ₽" },
    { ru: "Конная прогулка: от 2 000 ₽", en: "Horse riding: from 2 000 ₽" },
  ],
  bring: [
    { ru: "Удобная обувь для коротких подъёмов", en: "Comfortable shoes for short climbs" },
    { ru: "Головной убор: в долине солнце жёсткое", en: "A hat: the valley sun is harsh" },
    { ru: "Тёплый слой на вечер", en: "A warm layer for the evening" },
    { ru: "Наличные на обед и сыр в дорогу", en: "Cash for lunch and cheese to take home" },
  ],
  hero: {
    id: "balkaria-hero",
    alt: {
      ru: "Церик-Кёль, Нижнее Голубое озеро, бирюзовая вода в кольце скал",
      en: "Tserik-Kyol, the Lower Blue Lake, turquoise water ringed by cliffs",
    },
    caption: {
      ru: "Церик-Кёль. Дно так и не нашли.",
      en: "Tserik-Kyol. The bottom has never been found.",
    },
    ratio: 1.6,
    tone: "glacier",
  },
  gallery: [
    {
      id: "balkaria-01",
      alt: { ru: "Черекская теснина сверху", en: "The Cherek narrows from above" },
      caption: { ru: "Дорога вырублена в стене", en: "The road is cut into the wall" },
      ratio: 0.75,
      tone: "granite",
    },
    {
      id: "balkaria-02",
      alt: { ru: "Башня Абаевых в Верхней Балкарии", en: "The Abaev tower, Upper Balkaria" },
      ratio: 1.5,
      tone: "granite",
    },
    {
      id: "balkaria-03",
      alt: { ru: "Осенняя долина Верхней Балкарии", en: "The Upper Balkaria valley in autumn" },
      // Shot on 11 October, but the gold is in the dry grass and the slopes:
      // the irrigated valley floor is still green, so the caption says so.
      caption: {
        ru: "Октябрь. Склоны выгорели, огороды внизу ещё зелёные.",
        en: "October. The slopes have burned off; the plots below are still green.",
      },
      ratio: 1.5,
      tone: "clay",
    },
    {
      id: "balkaria-04",
      alt: { ru: "Айран и свежий сыр на столе", en: "Ayran and fresh cheese on the table" },
      ratio: 1,
      tone: "wool",
    },
  ],
  coords: { lat: 43.1667, lng: 43.4333 },
};
