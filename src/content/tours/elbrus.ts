import type { Tour } from "../types";

export const elbrus: Tour = {
  slug: "prielbrusie",
  index: 3,
  featured: true,
  kicker: { ru: "Баксанское ущелье", en: "Baksan Gorge" },
  title: {
    ru: "Приэльбрусье: канатка на 3 847",
    en: "Elbrus: the cable car to 3 847",
  },
  summary: {
    ru: "За сорок минут от поляны Азау до высоты, на которой уже нечем толком дышать.",
    en: "Forty minutes from the Azau meadow to an altitude where breathing stops being automatic.",
  },
  description: [
    {
      ru: "Эльбрус не гора, а два потухших вулкана на одном основании и высшая точка Европы. Снизу он редко виден целиком: его почти всегда закрывает Донгуз-Орун и собственная погода. Поэтому первым делом мы смотрим прогноз, и если утро ясное, гоним к первой очереди без остановок.",
      en: "Elbrus is not a mountain but two extinct volcanoes on a shared base, and the highest point in Europe. From below you rarely see all of it: Donguz-Orun and its own weather usually get in the way. So the first thing we do is check the forecast, and if the morning is clear we drive straight to the first cable car without stopping.",
    },
    {
      ru: "Три очереди канатной дороги поднимают на станцию Гара-Баши, 3 847 метров, самая высокогорная станция в Европе. Здесь снег лежит в июле, воздух разрежен на треть, и с площадки видно Главный Кавказский хребет от края до края. На обратном пути: Чегет, откуда открывается лучший вид на сам Эльбрус, и кафе «Ай», где с 1960-х сидели альпинисты и барды.",
      en: "Three cable car stages lift you to Gara-Bashi, 3 847 metres, the highest station in Europe. There is snow here in July, the air is a third thinner, and from the platform the Main Caucasus Range runs from edge to edge. On the way back: Cheget, which gives the best view of Elbrus itself, and the Ay café, where climbers and songwriters have been sitting since the 1960s.",
    },
  ],
  region: { ru: "Кабардино-Балкария", en: "Kabardino-Balkaria" },
  duration: { ru: "10–12 часов", en: "10–12 hours" },
  durationDays: 1,
  altitudeM: 3847,
  distanceKm: 260,
  priceFrom: 4200,
  pricePrivate: 18000,
  groupSize: { ru: "до 16 человек", en: "up to 16 people" },
  difficulty: 2,
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  seasonNote: {
    ru: "Круглый год. Июль–сентябрь: самое ясное небо; декабрь–март: лыжи и полностью белое всё.",
    en: "All year. July to September gives the clearest skies; December to March, skis and total white.",
  },
  format: ["day", "ski", "photo"],
  highlights: [
    { ru: "Гара-Баши, 3 847 м", en: "Gara-Bashi, 3 847 m" },
    { ru: "Поляна Азау", en: "The Azau meadow" },
    { ru: "Чегет и кафе «Ай»", en: "Cheget and the Ay café" },
    { ru: "Поляна Нарзанов", en: "The Narzan meadow" },
    { ru: "Водопад Девичьи Косы", en: "The Maiden's Braids waterfall" },
  ],
  itinerary: [
    {
      time: "07:30",
      title: { ru: "Ранний выезд", en: "Early departure" },
      text: {
        ru: "Выезжаем рано намеренно: к полудню вершину почти всегда затягивает. Два с половиной часа по Баксанскому ущелью.",
        en: "We leave early on purpose: by midday the summit is almost always in cloud. Two and a half hours up the Baksan gorge.",
      },
      altitudeM: 512,
    },
    {
      time: "09:00",
      title: { ru: "Поляна Нарзанов", en: "The Narzan meadow" },
      text: {
        ru: "Остановка у железистых источников. Вода рыжая, кислая и очень холодная: попробовать обязательно, допивать необязательно.",
        en: "A stop at the iron springs. The water is rust-coloured, sour and extremely cold: trying it is compulsory, finishing it is not.",
      },
      altitudeM: 1650,
    },
    {
      time: "10:15",
      title: { ru: "Поляна Азау, первая очередь", en: "Azau meadow, first stage" },
      text: {
        ru: "Берём билеты, надеваем всё тёплое, что взяли. Подъём тремя очередями с пересадками на «Кругозоре» и «Мире».",
        en: "Tickets, and everything warm you brought goes on. Three stages up, changing at Krugozor and Mir.",
      },
      altitudeM: 2350,
    },
    {
      time: "11:00",
      title: { ru: "Гара-Баши, 3 847 м", en: "Gara-Bashi, 3 847 m" },
      text: {
        ru: "Полтора часа наверху. Ратрак может подбросить ещё выше, до 4 100: за отдельную плату и только если вы нормально переносите высоту.",
        en: "An hour and a half at the top. A snowcat can take you higher still, to 4 100: extra cost, and only if the altitude is sitting well with you.",
      },
      altitudeM: 3847,
    },
    {
      time: "13:00",
      title: { ru: "Обед в Терсколе", en: "Lunch in Terskol" },
      text: {
        ru: "Спускаемся и едим внизу: на высоте аппетита обычно нет. Шурпа, шашлык, горячий чай с чабрецом.",
        en: "We come down to eat: appetite rarely survives 3 800 m. Shurpa, shashlik, hot thyme tea.",
      },
      altitudeM: 2100,
    },
    {
      time: "14:30",
      title: { ru: "Чегет", en: "Cheget" },
      text: {
        ru: "Подъём на кресельной канатке. Отсюда Эльбрус виден целиком, а с Азау этого вида нет. Наверху то самое кафе «Ай».",
        en: "Up on the chairlift. From here you see the whole of Elbrus, a view you cannot get from Azau. The Ay café is at the top.",
      },
      altitudeM: 3050,
    },
    {
      time: "16:30",
      title: { ru: "Девичьи Косы (по погоде)", en: "Maiden's Braids (weather permitting)" },
      text: {
        ru: "Если остались силы, короткий выход к водопаду, который действительно похож на расчёсанные волосы.",
        en: "If there is anything left in the legs, a short walk to a waterfall that genuinely does look like combed hair.",
      },
      altitudeM: 2800,
    },
    {
      time: "19:00",
      title: { ru: "Возвращение", en: "Back to Nalchik" },
      text: {
        ru: "В Нальчике к 19:00–20:00. День длинный, но иначе Эльбрус не посмотреть.",
        en: "Back in Nalchik by 19:00–20:00. It is a long day, but Elbrus does not do short ones.",
      },
      altitudeM: 512,
    },
  ],
  included: [
    { ru: "Транспорт с кондиционером", en: "Air-conditioned transport" },
    { ru: "Гид на весь маршрут", en: "A guide for the whole route" },
    { ru: "Экосбор нацпарка «Приэльбрусье»", en: "Elbrus National Park fee" },
    { ru: "Вода и горячий чай", en: "Water and hot tea" },
    { ru: "Страховка", en: "Insurance" },
  ],
  excluded: [
    { ru: "Канатная дорога до 3 847 м: около 2 000 ₽", en: "Cable car to 3 847 m: around 2 000 ₽" },
    { ru: "Канатка на Чегет: около 1 200 ₽", en: "Cheget chairlift: around 1 200 ₽" },
    { ru: "Ратрак до 4 100 м: от 2 500 ₽", en: "Snowcat to 4 100 m: from 2 500 ₽" },
    { ru: "Обед: около 1 200 ₽", en: "Lunch: around 1 200 ₽" },
    { ru: "Прокат тёплой одежды на Азау", en: "Warm clothing hire at Azau" },
  ],
  bring: [
    { ru: "Пуховик или тёплая куртка: наверху бывает −10° в июле", en: "A down or heavy jacket: it can be −10°C up there in July" },
    { ru: "Шапка и перчатки, без вариантов", en: "Hat and gloves, no exceptions" },
    { ru: "Солнцезащитные очки: снег отражает жёстко", en: "Sunglasses: the snow glare is brutal" },
    { ru: "Крем от солнца SPF 50", en: "SPF 50 sunscreen" },
    { ru: "Паспорт: погранзона рядом", en: "Your passport: the border zone is close" },
  ],
  hero: {
    id: "elbrus-hero",
    alt: {
      ru: "Двуглавый Эльбрус над облаками, снежные склоны в утреннем свете",
      en: "The twin summits of Elbrus above cloud, snow slopes in morning light",
    },
    caption: {
      ru: "Западная вершина: 5 642 метров, высшая точка Европы.",
      en: "5 642 m. The west summit is the highest point in Europe.",
    },
    ratio: 1.6,
    tone: "glacier",
  },
  gallery: [
    {
      id: "elbrus-01",
      // The photograph is the cable car itself with both summits behind, not
      // the station building, so the wording describes the line.
      alt: {
        ru: "Канатка Мир — Гара-Баши, обе вершины Эльбруса позади",
        en: "The Mir to Gara-Bashi cable car, both Elbrus summits behind",
      },
      caption: { ru: "Наверху 3 847 м: самая высокая станция в Европе", en: "It ends at 3 847 m, the highest station in Europe" },
      ratio: 1.5,
      tone: "glacier",
    },
    {
      id: "elbrus-02",
      alt: { ru: "Главный Кавказский хребет с высоты", en: "The Main Caucasus Range from altitude" },
      ratio: 1.78,
      tone: "granite",
    },
    {
      id: "elbrus-03",
      // No free photograph of the Ay cafe exists, so this is the Cheget
      // chairlift instead. The cafe still earns its line in the itinerary.
      alt: { ru: "Подъём на кресельной канатке Чегета", en: "Riding the Cheget chairlift" },
      caption: { ru: "Кресло, сосны и снег: с шестидесятых почти без изменений", en: "Chair, pines and snow, barely changed since the sixties" },
      ratio: 0.75,
      tone: "dusk",
    },
    {
      id: "elbrus-04",
      alt: { ru: "Нарзанный источник на поляне", en: "A narzan spring on the meadow" },
      ratio: 1,
      tone: "clay",
    },
  ],
  coords: { lat: 43.3499, lng: 42.4453 },
};
