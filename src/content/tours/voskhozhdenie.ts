import type { Tour } from "../types";

export const voskhozhdenie: Tour = {
  slug: "voskhozhdenie-elbrus",
  index: 9,
  kicker: { ru: "Восхождение", en: "Ascent" },
  title: {
    ru: "Эльбрус, 5 642: с юга, за восемь дней",
    en: "Elbrus, 5 642: south route, eight days",
  },
  summary: {
    ru: "Технически несложно. Физически честно. Отказаться от вершины здесь считается нормальным решением, и мы вам это скажем первыми.",
    en: "Technically straightforward. Physically honest. Turning back short of the summit is a normal decision here, and we will be the first to say so.",
  },
  description: [
    {
      ru: "Классический маршрут с юга не требует альпинистского опыта, но требует акклиматизации, и именно на ней экономят те, у кого потом ничего не выходит. Восемь дней в программе стоят не просто так: пять из них вы ходите вверх-вниз, набирая и сбрасывая высоту, пока организм не согласится работать на пяти тысячах.",
      en: "The classic south route asks for no climbing experience, but it does ask for acclimatisation, and that is exactly what the people who fail have skimped on. The eight days in this programme are not padding: five of them you spend walking up and back down, gaining and shedding altitude until your body agrees to function at five thousand metres.",
    },
    {
      ru: "Мы работаем группами до шести человек на двух гидов. Ночёвки на приюте на 3 900, выход на вершину в час ночи, ратрак до Пастухова по желанию. У нас нет плана «дотащить любой ценой»: если гид говорит «вниз», группа идёт вниз. Статистика по региону такая, что этот принцип не обсуждается.",
      en: "We run groups of up to six with two guides. Nights in the huts at 3 900, summit push at one in the morning, snowcat to the Pastukhov Rocks if you want it. There is no drag-them-up-at-any-cost plan: if a guide says down, the group goes down. The regional statistics are such that this is not open for discussion.",
    },
  ],
  region: { ru: "Приэльбрусье", en: "Elbrus region" },
  duration: { ru: "8 дней / 7 ночей", en: "8 days / 7 nights" },
  durationDays: 8,
  altitudeM: 5642,
  distanceKm: 260,
  priceFrom: 118000,
  groupSize: { ru: "до 6 человек на двух гидов", en: "up to 6 people, two guides" },
  difficulty: 5,
  months: [5, 6, 7, 8, 9],
  seasonNote: {
    ru: "Май–сентябрь. Лучшее окно: с середины июля по конец августа. В мае много снега и выше лавинная опасность.",
    en: "May to September. The best window runs mid-July to late August. May holds more snow and higher avalanche risk.",
  },
  format: ["trek", "multiday"],
  highlights: [
    { ru: "Западная вершина, 5 642 м", en: "The west summit, 5 642 m" },
    { ru: "Пять акклиматизационных выходов", en: "Five acclimatisation rotations" },
    { ru: "Два гида на группу до шести", en: "Two guides per group of six" },
    { ru: "Приют на 3 900 м", en: "Huts at 3 900 m" },
    { ru: "Прокат снаряжения включён", en: "Equipment hire included" },
  ],
  itinerary: [
    {
      label: { ru: "День 1", en: "Day 1" },
      title: { ru: "Заезд, Терскол", en: "Arrival, Terskol" },
      text: {
        ru: "Трансфер из Минеральных Вод. Проверка снаряжения, брифинг, первая прогулка на 2 500 для разминки.",
        en: "Transfer from Mineralnye Vody. Kit check, briefing, and an easy first walk to 2 500 to loosen up.",
      },
      altitudeM: 2100,
    },
    {
      label: { ru: "День 2", en: "Day 2" },
      title: { ru: "Чегет, 3 050", en: "Cheget, 3 050" },
      text: {
        ru: "Первый акклиматизационный выход. Смотрим на Эльбрус целиком: полезно понимать, с чем предстоит иметь дело.",
        en: "First acclimatisation walk. We look at the whole of Elbrus: it helps to understand what you are dealing with.",
      },
      altitudeM: 3050,
    },
    {
      label: { ru: "День 3", en: "Day 3" },
      title: { ru: "Обсерватория и Девичьи Косы, 3 200", en: "Observatory & Maiden's Braids, 3 200" },
      text: {
        ru: "Длинный день пешком с набором около 1 100 метров. Ночёвка по-прежнему внизу: набрал и сбросил.",
        en: "A long day on foot with around 1 100 m of gain. You still sleep low: climb high, sleep low.",
      },
      altitudeM: 3200,
    },
    {
      label: { ru: "День 4", en: "Day 4" },
      title: { ru: "Переезд на приюты, 3 900", en: "Up to the huts, 3 900" },
      text: {
        ru: "Канатка до Гара-Баши, заселение в приют. Занятия с кошками и ледорубом на склоне.",
        en: "Cable car to Gara-Bashi and into the hut. Crampon and ice-axe practice on the slope.",
      },
      altitudeM: 3900,
    },
    {
      label: { ru: "День 5", en: "Day 5" },
      title: { ru: "Скалы Пастухова, 4 700", en: "Pastukhov Rocks, 4 700" },
      text: {
        ru: "Ключевой акклиматизационный выход. Здесь становится понятно, кто идёт на вершину.",
        en: "The key rotation. This is where it becomes clear who is going to the top.",
      },
      altitudeM: 4700,
    },
    {
      label: { ru: "День 6", en: "Day 6" },
      title: { ru: "Отдых на приюте", en: "Rest day at the hut" },
      text: {
        ru: "Ничего не делаем намеренно. Едим, пьём, спим. Вечером нас ждёт брифинг по штурму и ранний отбой.",
        en: "Deliberately nothing. Eat, drink, sleep. Summit briefing in the evening and an early night.",
      },
      altitudeM: 3900,
    },
    {
      label: { ru: "День 7", en: "Day 7" },
      title: { ru: "Штурм вершины", en: "Summit day" },
      text: {
        ru: "Выход в 01:00. Косая полка, седловина, взлёт на Западную. Наверху около 10:00, если всё идёт по плану. Спуск на приют к 15:00.",
        en: "Away at 01:00. The traverse, the saddle, the final rise to the west summit. On top around 10:00 if it goes to plan. Back at the hut by 15:00.",
      },
      altitudeM: 5642,
    },
    {
      label: { ru: "День 8", en: "Day 8" },
      title: { ru: "Спуск и выезд", en: "Down and out" },
      text: {
        ru: "Вниз на канатке, баня в Терсколе, трансфер в аэропорт. Резервный день на случай плохой погоды заложен в 7-й.",
        en: "Down on the cable car, banya in Terskol, transfer to the airport. A weather reserve day is built into day 7.",
      },
      altitudeM: 2100,
    },
  ],
  included: [
    { ru: "Два сертифицированных гида на группу", en: "Two certified guides per group" },
    { ru: "7 ночей: отель в Терсколе + приют на 3 900", en: "7 nights: hotel in Terskol plus the hut at 3 900" },
    { ru: "Трёхразовое питание на приюте", en: "Three meals a day at the hut" },
    { ru: "Прокат кошек, ледоруба, обвязки, каски", en: "Crampons, axe, harness and helmet hire" },
    { ru: "Все канатные дороги по программе", en: "All cable cars in the programme" },
    { ru: "Трансферы из/в аэропорт", en: "Airport transfers both ways" },
    { ru: "Страховка с покрытием высотных работ до 6 000 м", en: "Insurance covering activity to 6 000 m" },
  ],
  excluded: [
    { ru: "Авиабилеты", en: "Flights" },
    { ru: "Ратрак до 4 700: от 6 000 ₽", en: "Snowcat to 4 700: from 6 000 ₽" },
    { ru: "Личное снаряжение: ботинки, пуховка, термобельё", en: "Personal kit: boots, down jacket, base layers" },
    { ru: "Ужины в Терсколе в дни 1–3", en: "Dinners in Terskol on days 1–3" },
  ],
  bring: [
    { ru: "Двойные высотные ботинки (прокат по запросу)", en: "Double high-altitude boots (hire on request)" },
    { ru: "Пуховая куртка на −20°", en: "A down jacket rated to −20°C" },
    { ru: "Маска и очки категории 4", en: "Goggles and category-4 sunglasses" },
    { ru: "Термобельё, флис, мембрана", en: "Base layers, fleece, hardshell" },
    { ru: "Медицинская справка о допуске", en: "A medical clearance certificate" },
  ],
  hero: {
    id: "ascent-hero",
    // The photograph is midday above Garabashi, low on the route. The text used
    // to promise a pre-dawn line at 5 100; no such photograph exists under a
    // free licence, so the wording follows the picture instead.
    alt: {
      ru: "Восходители на снегу над Гарабаши, обе вершины Эльбруса выше",
      en: "Climbers on the snow above Garabashi, both Elbrus summits above them",
    },
    caption: {
      ru: "Начало маршрута. Выход на вершину бывает в час ночи.",
      en: "The bottom of the route. The summit day itself starts at one in the morning.",
    },
    ratio: 1.6,
    tone: "glacier",
  },
  gallery: [
    {
      id: "ascent-01",
      // The бочки sit at about 3 800, which is what the photograph shows.
      alt: { ru: "Бочки на 3 800 метрах", en: "The barrel huts at 3 800 metres" },
      ratio: 1.5,
      tone: "glacier",
    },
    {
      id: "ascent-02",
      // A roped party rather than a training drill, and the Alps rather than the
      // Caucasus: Commons has no crampon-skills photograph from either.
      alt: {
        ru: "Связка на снежном склоне: кошки, ледорубы, верёвка",
        en: "A roped party on a snow slope: crampons, axes and rope",
      },
      ratio: 1.5,
      tone: "granite",
    },
    {
      id: "ascent-03",
      // Documented as the sunrise shadow from the southern slope. Nothing puts
      // it on the saddle, so the wording names the phenomenon, not an altitude.
      alt: {
        ru: "Тень Эльбруса на рассвете",
        en: "The shadow of Elbrus at sunrise",
      },
      caption: {
        ru: "На рассвете гора кладёт свою тень на хребет.",
        en: "At sunrise the mountain throws its own shadow across the range.",
      },
      ratio: 0.75,
      tone: "dusk",
    },
    {
      id: "ascent-04",
      alt: { ru: "Западная вершина, 5 642", en: "The west summit, 5 642" },
      ratio: 1,
      tone: "glacier",
    },
  ],
  coords: { lat: 43.3499, lng: 42.4453 },
};
