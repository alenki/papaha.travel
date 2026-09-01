import type { Guide } from "./types";

/**
 * PLACEHOLDER: names, portraits and biographical details are invented.
 * Replace with the real team before launch; the structure stays as-is.
 * Portraits go in /public/media and get referenced via `portrait.src`.
 */

export const GUIDES: Guide[] = [
  {
    slug: "aslan",
    name: { ru: "Аслан Шогенов", en: "Aslan Shogenov" },
    role: { ru: "Основатель, горный гид", en: "Founder, mountain guide" },
    since: 2011,
    languages: [
      { ru: "русский", en: "Russian" },
      { ru: "кабардинский", en: "Kabardian" },
      { ru: "английский", en: "English" },
    ],
    bio: [
      {
        ru: "Вырос в Нальчике, первый раз поднялся на Эльбрус в девятнадцать: за компанию, без снаряжения и без понимания, во что ввязался. Спустился и понял, что теперь это надолго.",
        en: "Grew up in Nalchik and first climbed Elbrus at nineteen, tagging along, without kit, and without any idea what he had got into. Came down understanding it was going to be a long-term problem.",
      },
      {
        ru: "Работал в спасательном отряде, водил коммерческие группы с 2011 года, в 2016-м собрал «Папаху». Сорок с лишним восхождений на Эльбрус, из них четырнадцать с севера. Считает, что хороший гид отличается от плохого умением развернуть группу.",
        en: "Served with the rescue service, has been leading commercial groups since 2011, and put Papaha together in 2016. Forty-odd Elbrus summits, fourteen of them from the north. Holds that what separates a good guide from a bad one is the willingness to turn a group around.",
      },
    ],
    quote: {
      ru: "Гора никуда не денется. А вот вы можете.",
      en: "The mountain will still be here. You might not be.",
    },
    portrait: {
      id: "guide-aslan",
      alt: { ru: "Портрет гида Аслана", en: "Portrait of the guide Aslan" },
      ratio: 0.8,
      tone: "granite",
    },
    peakM: 5642,
  },
  {
    slug: "zalina",
    name: { ru: "Залина Кучукова", en: "Zalina Kuchukova" },
    role: { ru: "Гид-этнограф", en: "Guide, ethnographer" },
    since: 2017,
    languages: [
      { ru: "русский", en: "Russian" },
      { ru: "балкарский", en: "Balkar" },
      { ru: "английский", en: "English" },
      { ru: "турецкий", en: "Turkish" },
    ],
    bio: [
      {
        ru: "Родом из Верхней Балкарии, по образованию историк. Её прабабушку депортировали в 1944-м в Киргизию, вернулась семья только в 1957-м, и об этом Залина рассказывает без надрыва, но и без умолчаний.",
        en: "From Upper Balkaria, a historian by training. Her great-grandmother was deported to Kyrgyzstan in 1944 and the family only came back in 1957, something Zalina recounts without melodrama and without leaving anything out.",
      },
      {
        ru: "Ведёт маршруты по Черекскому и Чегемскому ущельям, знает, в каком доме в каком селе лучше кормят, и умеет договориться, чтобы вас пустили посмотреть родовую башню изнутри.",
        en: "Runs the Cherek and Chegem routes, knows which house in which village feeds people best, and can arrange for you to be let inside a clan tower.",
      },
    ],
    quote: {
      ru: "Башни строили не от красоты. Их строили от страха, и это видно.",
      en: "The towers were not built for beauty. They were built out of fear, and you can see it.",
    },
    portrait: {
      id: "guide-zalina",
      alt: { ru: "Портрет гида Залины", en: "Portrait of the guide Zalina" },
      ratio: 0.8,
      tone: "clay",
    },
  },
  {
    slug: "timur",
    name: { ru: "Тимур Геккиев", en: "Timur Gekkiev" },
    role: { ru: "Водитель-гид, джип-туры", en: "Driver-guide, jeep tours" },
    since: 2014,
    languages: [
      { ru: "русский", en: "Russian" },
      { ru: "балкарский", en: "Balkar" },
    ],
    bio: [
      {
        ru: "Двадцать лет за рулём в этих горах, из них десять на грунте. Собственный УАЗ, перебранный своими руками столько раз, что Тимур перестал считать.",
        en: "Twenty years driving in these mountains, ten of them off tarmac. His own UAZ, rebuilt by hand more times than he has bothered to count.",
      },
      {
        ru: "Знает Актопрак, Тызыл и дорогу на Джилы-Су в любую погоду и, что важнее, знает, когда туда ехать не надо. Молчалив ровно до первого перевала.",
        en: "Knows Aktoprak, Tyzyl and the Dzhily-Su road in any weather and, more usefully, knows when not to attempt them. Silent right up until the first pass.",
      },
    ],
    quote: {
      ru: "Машина проедет. Вопрос, что от неё останется.",
      en: "The car will get through. The question is what will be left of it.",
    },
    portrait: {
      id: "guide-timur",
      alt: { ru: "Портрет водителя-гида Тимура", en: "Portrait of the driver-guide Timur" },
      ratio: 0.8,
      tone: "dusk",
    },
  },
  {
    slug: "marina",
    name: { ru: "Марьяна Балкарова", en: "Maryana Balkarova" },
    role: { ru: "Координатор, гастромаршруты", en: "Coordinator, food routes" },
    since: 2019,
    languages: [
      { ru: "русский", en: "Russian" },
      { ru: "кабардинский", en: "Kabardian" },
      { ru: "английский", en: "English" },
    ],
    bio: [
      {
        ru: "Отвечает за то, чтобы вас встретили, накормили и разместили именно там, где обещали. Ведёт гастрономические маршруты и переписку в мессенджерах, так что, скорее всего, вам ответит она.",
        en: "Responsible for you being met, fed and housed exactly where you were promised. Runs the food routes and the messenger inbox, so in all likelihood she is who replies to you.",
      },
      {
        ru: "Считает, что застолье на Кавказе не про еду, а про то, в каком порядке говорят люди за столом.",
        en: "Maintains that a Caucasian table is not about the food but about the order in which people at it are allowed to speak.",
      },
    ],
    quote: {
      ru: "Второй раз отказываться уже невежливо.",
      en: "Refusing a second time is where it starts being rude.",
    },
    portrait: {
      id: "guide-maryana",
      alt: { ru: "Портрет координатора Марьяны", en: "Portrait of the coordinator Maryana" },
      ratio: 0.8,
      tone: "wool",
    },
  },
];
