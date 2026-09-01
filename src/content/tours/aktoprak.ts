import type { Tour } from "../types";

export const aktoprak: Tour = {
  slug: "aktoprak-tyzyl",
  index: 5,
  kicker: { ru: "Джип-тур", en: "Jeep tour" },
  title: {
    ru: "Актопрак и Тызыл: красная глина",
    en: "Aktoprak & Tyzyl: the red clay",
  },
  summary: {
    ru: "Грунтовый перевал между двумя ущельями, где горы вдруг перестают быть серыми и становятся ржавыми.",
    en: "A dirt pass between two gorges, where the mountains stop being grey and turn rust-red.",
  },
  description: [
    {
      ru: "Актопрак, старая перевальная дорога, связывающая Чегемское и Баксанское ущелья. Асфальта на ней нет и не будет. Зато есть глиняные холмы всех оттенков охры, ржавчины и почти пурпурного: цвет меняется в зависимости от того, под каким углом на них падает свет, и к вечеру становится совсем неприличным.",
      en: "Aktoprak is an old pass road linking the Chegem and Baksan gorges. There is no tarmac on it and there never will be. What there is instead: clay hills in every shade of ochre, rust and near-purple: the colour shifts with the angle of the light, and by evening it becomes frankly indecent.",
    },
    {
      ru: "Тызыльское ущелье рядом, узкое, малолюдное и совершенно другое: сосны, скальные останцы, каменные грибы и стада, которые перегоняют по той же дороге, что и вас. Это самый «дикий» из наших однодневных маршрутов и лучший для тех, кто уже видел открыточные места и хочет посмотреть, что за ними.",
      en: "The Tyzyl gorge next door is narrow, thinly populated and completely different: pines, rock stacks, stone mushrooms, and flocks driven along the same road you are on. This is the wildest of our day routes and the best one for people who have already seen the postcard places and want to know what is behind them.",
    },
  ],
  region: { ru: "Кабардино-Балкария", en: "Kabardino-Balkaria" },
  duration: { ru: "10 часов", en: "10 hours" },
  durationDays: 1,
  altitudeM: 2015,
  distanceKm: 210,
  priceFrom: 6200,
  pricePrivate: 26000,
  groupSize: { ru: "до 6 человек в машине", en: "up to 6 per vehicle" },
  difficulty: 3,
  months: [4, 5, 6, 7, 8, 9, 10, 11],
  seasonNote: {
    ru: "Апрель–ноябрь. После сильных дождей перевал может стать непроезжим: тогда мы честно переносим дату.",
    en: "April to November. After heavy rain the pass can become impassable, in which case we move your date, and say so plainly.",
  },
  format: ["jeep", "photo", "day"],
  highlights: [
    { ru: "Перевал Актопрак, 2 015 м", en: "The Aktoprak pass, 2 015 m" },
    { ru: "Глиняные холмы", en: "The clay hills" },
    { ru: "Тызыльское ущелье", en: "The Tyzyl gorge" },
    { ru: "Озеро Гижгит", en: "Lake Gizhgit" },
    { ru: "Каменные грибы", en: "The stone mushrooms" },
  ],
  itinerary: [
    {
      time: "08:00",
      title: { ru: "Выезд, пересадка в внедорожник", en: "Departure, transfer to the 4×4" },
      text: {
        ru: "Едем на подготовленных УАЗах или Mitsubishi Delica. Обычной машине здесь делать нечего.",
        en: "We travel in prepared UAZs or a Mitsubishi Delica. An ordinary car has no business on this road.",
      },
      altitudeM: 512,
    },
    {
      time: "09:30",
      title: { ru: "Вход в Чегемское ущелье", en: "Into the Chegem gorge" },
      text: {
        ru: "Проезжаем водопады без остановки: сегодня они не главные. Сворачиваем на грунт у Нижнего Чегема.",
        en: "We pass the falls without stopping: they are not the point today. The tarmac ends at Lower Chegem.",
      },
      altitudeM: 900,
    },
    {
      time: "10:30",
      title: { ru: "Подъём на Актопрак", en: "Up to Aktoprak" },
      text: {
        ru: "Серпантин по глине с остановками там, где вам захочется. Захочется часто.",
        en: "Switchbacks through clay, stopping wherever you want to. You will want to often.",
      },
      altitudeM: 2015,
    },
    {
      time: "12:00",
      title: { ru: "Перевал", en: "The pass" },
      text: {
        ru: "Наверху открывается вид на Главный хребет и на обе долины сразу. Чай из термоса, ветер, никого вокруг.",
        en: "At the top, the Main Range and both valleys at once. Tea from a flask, wind, nobody else.",
      },
      altitudeM: 2015,
    },
    {
      time: "13:00",
      title: { ru: "Спуск в Баксанское ущелье", en: "Down into the Baksan gorge" },
      text: {
        ru: "Другая сторона перевала выглядит так, будто это другая страна: зелень вместо охры.",
        en: "The far side of the pass looks like a different country: green instead of ochre.",
      },
      altitudeM: 1400,
    },
    {
      time: "14:00",
      title: { ru: "Озеро Гижгит", en: "Lake Gizhgit" },
      text: {
        ru: "Бирюзовое озеро у Былыма. История его происхождения промышленная и не самая романтичная: расскажем на месте, вид от этого хуже не становится.",
        en: "A turquoise lake near Bylym. Its origin is industrial and not especially romantic: we will explain on the spot; the view survives the explanation.",
      },
      altitudeM: 1250,
    },
    {
      time: "15:00",
      title: { ru: "Тызыльское ущелье", en: "The Tyzyl gorge" },
      text: {
        ru: "Заезжаем настолько далеко, насколько позволит дорога и ваше терпение. Каменные грибы, сосны, тишина.",
        en: "We drive in as far as the road and your patience allow. Stone mushrooms, pines, silence.",
      },
      altitudeM: 1800,
    },
    {
      time: "18:00",
      title: { ru: "Возвращение", en: "Back to Nalchik" },
      text: {
        ru: "В Нальчике к 18:00–19:00, в пыли и очень довольные.",
        en: "Back in Nalchik by 18:00–19:00, covered in dust and extremely pleased.",
      },
      altitudeM: 512,
    },
  ],
  included: [
    { ru: "Подготовленный внедорожник с водителем-гидом", en: "A prepared 4×4 with driver-guide" },
    { ru: "Полевой обед и чай", en: "A field lunch and tea" },
    { ru: "Экосбор", en: "Conservation fee" },
    { ru: "Страховка", en: "Insurance" },
  ],
  excluded: [
    { ru: "Ужин в Нальчике", en: "Dinner in Nalchik" },
    { ru: "Личное снаряжение", en: "Personal kit" },
  ],
  bring: [
    { ru: "Одежда, которую не жалко запылить", en: "Clothes you do not mind dusting" },
    { ru: "Buff или платок на лицо", en: "A buff or scarf for your face" },
    { ru: "Солнцезащитные очки", en: "Sunglasses" },
    { ru: "Камера: свет здесь лучший во второй половине дня", en: "A camera: the light here is best after midday" },
  ],
  hero: {
    id: "aktoprak-hero",
    // Geotagged 8 km northwest of the pass itself, in the Bylym basin the road
    // crosses. Same clay country, so the wording says road rather than pass.
    alt: {
      ru: "Охристые глиняные холмы на актопракской дороге",
      en: "The ochre clay hills along the Aktoprak road",
    },
    caption: {
      ru: "Актопрак. По-балкарски это «белая земля», что явно неточно.",
      en: "Aktoprak. Balkar for 'white earth', which is plainly inaccurate.",
    },
    ratio: 1.6,
    tone: "clay",
  },
  gallery: [
    {
      id: "aktoprak-01",
      alt: { ru: "Грунтовый серпантин на перевал", en: "The dirt switchbacks up to the pass" },
      ratio: 1.5,
      tone: "clay",
    },
    {
      id: "aktoprak-02",
      alt: { ru: "Озеро Гижгит", en: "Lake Gizhgit" },
      // The photograph is a March one and the reservoir is still part frozen,
      // so the caption places it rather than promising the summer turquoise.
      caption: { ru: "У посёлка Былым, в марте", en: "Near the village of Bylym, in March" },
      ratio: 1.5,
      tone: "glacier",
    },
    {
      id: "aktoprak-03",
      alt: { ru: "Каменные грибы Тызыла", en: "The Tyzyl stone mushrooms" },
      ratio: 0.75,
      tone: "clay",
    },
    {
      id: "aktoprak-04",
      // The photograph is genuinely North Caucasus but was taken in southern
      // Dagestan, not on this pass, so the wording does not claim the place.
      alt: {
        ru: "Чабаны перегоняют отару, Северный Кавказ",
        en: "Shepherds moving a flock, North Caucasus",
      },
      ratio: 1,
      tone: "pine",
    },
  ],
  coords: { lat: 43.4083, lng: 43.0722 },
};
