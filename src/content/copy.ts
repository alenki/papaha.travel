import type { L } from "@/lib/i18n";
import type { Figure } from "@/content/types";

/**
 * The voice.
 *
 *  1. Say the true thing plainly. "Fourteen hours in the car" beats "an
 *     unforgettable journey".
 *  2. Never sell the mountain. It does not need help. Sell the fact that we
 *     are from here and you are not.
 *  3. Concrete numbers over adjectives: 5 642, 3 847, 279 metres deep.
 *  4. Warmth, not enthusiasm. No exclamation marks anywhere on this site.
 *  5. Admit the hard parts: the early starts, the dust, the deportation. It
 *     is what makes the rest believable.
 *
 * Russian is the source language. The English is a translation with the same
 * temperature, not a literal gloss.
 */

/* ── Hero ────────────────────────────────────────────────────────────────── */

export const HERO = {
  /**
   * The photograph behind the hero. Ours, which is the point: the one image a
   * visitor sees before anything else should be a road we have actually driven,
   * not a licensed view of a mountain.
   *
   * It runs full-bleed behind centred type. The crop is barely a crop, 3:2 to
   * 1.6, and the focal point sits just above centre so the track still runs out
   * of the bottom of the frame under the mark.
   *
   * `tone` is only read by the fallback plate, and it stays glacier for the
   * reason given at the Plate call site.
   */
  figure: {
    id: "site-hero",
    alt: {
      ru: "Грунтовая дорога через сосны, снежный гребень в верховьях долины",
      en: "A dirt track through the pines, a snow-streaked ridge at the head of the valley",
    },
    ratio: 1.6,
    tone: "glacier",
    focus: { x: 50, y: 45 },
  } satisfies Figure,

  /**
   * NOT RENDERED. The hero now sets the mark itself — "PAPAHA TRAVEL" — and
   * carries no headline, so nothing reads this. Kept because it is the best
   * sentence on the site and it will earn its place back the moment there is
   * a section that wants a claim rather than a name. Delete it if you have
   * decided otherwise; nothing will break.
   */
  headline: {
    ru: ["Кавказ,", "который показывают своим"],
    en: ["The Caucasus", "they show their own"],
  } satisfies L<string[]>,

  /** The one paragraph in the hero. Sits under the mark. Keep it to three
      lines: it is competing with a photograph. */
  lead: {
    ru: "Авторские маршруты из Нальчика. Малые группы, свои машины, гиды, которые здесь родились.",
    en: "Guided routes out of Nalchik. Small groups, our own vehicles, guides who were born here.",
  } satisfies L,

  /** The hero's single call to action. */
  cta: {
    ru: "Смотреть туры",
    en: "See the tours",
  } satisfies L,

  /** NOT RENDERED. The altitude readout moved out of the hero with everything
      else; AltitudeScale is where that argument is made now. */
  altimeterLabel: {
    ru: "Высота над уровнем моря",
    en: "Metres above sea level",
  } satisfies L,
} as const;

/* ── Section headings ────────────────────────────────────────────────────── */

export const SECTIONS = {
  manifesto: {
    kicker: { ru: "Кто мы", en: "Who we are" } satisfies L,
    title: {
      ru: "Мы возим туда, где выросли",
      en: "We take you where we grew up",
    } satisfies L,
    lead: {
      ru: "Не по списку достопримечательностей, а по ущельям, которые знаем с детства, и к людям, у которых потом обедаем. Разница чувствуется примерно на втором часу.",
      en: "Not down a list of sights, but through gorges we have known since childhood, and to the people whose table we then eat at. The difference makes itself felt around hour two.",
    } satisfies L,
  },

  tours: {
    kicker: { ru: "Туры", en: "Tours" } satisfies L,
    title: { ru: "Куда мы ездим", en: "Where we go" } satisfies L,
    lead: {
      ru: "Девять маршрутов: от полудня на рынке до восьми дней на Эльбрусе. Все проходили сами, все проходим до сих пор.",
      en: "Nine routes, from half a day at the market to eight days on Elbrus. We have walked every one, and we still do.",
    } satisfies L,
  },

  altitude: {
    kicker: { ru: "Высота", en: "Altitude" } satisfies L,
    title: {
      ru: "От Нальчика до вершины Европы",
      en: "From Nalchik to the roof of Europe",
    } satisfies L,
    lead: {
      ru: "Пять километров по вертикали умещаются в двести по горизонтали. Поэтому за один день здесь можно позавтракать среди абрикосов и замёрзнуть на леднике.",
      en: "Five vertical kilometres fit inside two hundred horizontal ones. Which is why you can breakfast among apricot trees and freeze on a glacier the same day.",
    } satisfies L,
  },

  seasons: {
    kicker: { ru: "Когда ехать", en: "When to come" } satisfies L,
    title: { ru: "У каждого месяца свои горы", en: "Every month has its own mountains" } satisfies L,
    lead: {
      ru: "Здесь нет мёртвого сезона: есть месяцы, в которые одни дороги закрыты, а другие как раз открываются.",
      en: "There is no dead season here. There are months when some roads are shut and others have just opened.",
    } satisfies L,
  },

  guides: {
    kicker: { ru: "Команда", en: "The team" } satisfies L,
    title: { ru: "Четверо, и все местные", en: "Four of us, all from here" } satisfies L,
    lead: {
      ru: "Небольшая команда означает не скромность, а принцип. Мы знаем всех, кто вас везёт и кормит, лично.",
      en: "A small team is a principle, not modesty. We personally know everyone who drives you and everyone who feeds you.",
    } satisfies L,
  },

  gallery: {
    kicker: { ru: "Галерея", en: "Gallery" } satisfies L,
    title: { ru: "Снято по дороге", en: "Shot on the way" } satisfies L,
    lead: {
      ru: "Никакого стока. Всё, что здесь есть, снято нашими гидами и гостями на наших маршрутах.",
      en: "No stock. Everything here was shot by our guides and our guests, on our routes.",
    } satisfies L,
  },

  testimonials: {
    kicker: { ru: "Отзывы", en: "Reviews" } satisfies L,
    title: { ru: "Что говорят потом", en: "What people say afterwards" } satisfies L,
  },

  faq: {
    kicker: { ru: "Вопросы", en: "Questions" } satisfies L,
    title: { ru: "Спрашивают чаще всего", en: "Most asked" } satisfies L,
  },

  cta: {
    kicker: { ru: "Связаться", en: "Get in touch" } satisfies L,
    title: {
      ru: "Напишите, и подберём маршрут",
      en: "Write to us and we will find your route",
    } satisfies L,
    lead: {
      ru: "Расскажите, сколько у вас дней и что вам интересно. Ответим в мессенджере обычно в течение часа.",
      en: "Tell us how many days you have and what interests you. We usually reply on a messenger within the hour.",
    } satisfies L,
  },
} as const;

/* ── Pull quotes ─────────────────────────────────────────────────────────── */
/*
 * PLACEHOLDER: attributions are given as broadly as we can defend them.
 * Have a native Kabardian or Balkar speaker check the wording and the
 * attribution before launch; getting a proverb wrong here would be worse than
 * not using one at all.
 */

export type Proverb = { text: L; source: L };

export const PROVERBS: Proverb[] = [
  {
    text: {
      ru: "Папаху носят не для тепла, а для чести.",
      en: "A papakha is not worn for warmth. It is worn for honour.",
    },
    source: { ru: "кавказская поговорка", en: "Caucasian saying" },
  },
  {
    text: {
      ru: "Если голова цела, папаха найдётся.",
      en: "If the head is still there, a papakha will be found.",
    },
    source: { ru: "кавказская поговорка", en: "Caucasian saying" },
  },
  {
    text: {
      ru: "Гость есть посланник Бога.",
      en: "A guest is a messenger of God.",
    },
    source: { ru: "кабардинская пословица", en: "Kabardian proverb" },
  },
  {
    text: {
      ru: "В доме, куда не приходит гость, не приходит и счастье.",
      en: "Into a house no guest enters, no happiness enters either.",
    },
    source: { ru: "кабардинская пословица", en: "Kabardian proverb" },
  },
  {
    text: {
      ru: "Дорога, пройденная с другом, короче.",
      en: "A road walked with a friend is a shorter road.",
    },
    source: { ru: "балкарская пословица", en: "Balkar proverb" },
  },
  {
    text: {
      ru: "Гора не идёт к человеку. Человек поднимается сам.",
      en: "The mountain does not come down. You go up.",
    },
    source: { ru: "балкарская поговорка", en: "Balkar saying" },
  },
];

/* ── The story ───────────────────────────────────────────────────────────── */

export const ABOUT = {
  kicker: { ru: "О нас", en: "About" } satisfies L,
  title: {
    ru: "Началось с того, что некому было показать",
    en: "It started because there was nobody to show them",
  } satisfies L,

  story: [
    {
      ru: "В 2016 году к Аслану приехали друзья из Москвы и попросили «показать что-нибудь». Он повёз их на Чегемские водопады, потом в Эль-Тюбю, потом они три дня не могли уехать. Через месяц приехали их друзья. Ещё через полгода стало понятно, что это уже не гостеприимство, а работа.",
      en: "In 2016 friends came down from Moscow and asked Aslan to 'show them something'. He drove them to the Chegem falls, then to El-Tyubyu, and then they could not be persuaded to leave for three days. A month later their friends arrived. Six months after that it was clear this had stopped being hospitality and become a job.",
    },
    {
      ru: "У «Папахи» по-прежнему четыре человека и три машины. Мы сознательно не растём: как только маршрутов становится больше, чем можно пройти самому, начинаешь продавать то, чего не видел. Все девять программ на этом сайте мы ведём лично.",
      en: "Papaha is still four people and three vehicles. We are deliberately not growing: the moment you have more routes than you can personally walk, you start selling things you have not seen. All nine programmes on this site are run by us.",
    },
    {
      ru: "Название выбрано без иронии. Папаху на Кавказе не снимают перед чужим и не теряют: считается, что вместе с ней теряют лицо. Нам показалось, что это подходящее обещание для компании, которая берёт с людей деньги и увозит их в горы.",
      en: "The name was not chosen ironically. In the Caucasus a papakha is not removed in front of a stranger and is not lost: losing it is held to mean losing face. That seemed a fitting promise for a company that takes people's money and drives them into the mountains.",
    },
    {
      ru: "[PLACEHOLDER: добавьте здесь абзац о лицензии, страховке и членстве в реестре туроператоров, когда документы будут готовы.]",
      en: "[PLACEHOLDER: add a paragraph here about licensing, insurance and tour-operator registry membership once the paperwork is in place.]",
    },
  ] satisfies L[],

  /** Short promises, shown as a numbered list on the About page. */
  principles: [
    {
      title: { ru: "Малые группы", en: "Small groups" } satisfies L,
      text: {
        ru: "До шестнадцати человек на однодневных маршрутах и до шести на восхождении. Автобусов на пятьдесят мест у нас нет и не будет.",
        en: "Up to sixteen on day routes and up to six on the ascent. We do not own a fifty-seat coach and we are not going to.",
      } satisfies L,
    },
    {
      title: { ru: "Свой транспорт", en: "Our own vehicles" } satisfies L,
      text: {
        ru: "Три машины, которые мы обслуживаем сами. Мы знаем, что у них под днищем, потому что сами туда лазим.",
        en: "Three vehicles we service ourselves. We know what is underneath them because we are the ones underneath them.",
      } satisfies L,
    },
    {
      title: { ru: "Честная погода", en: "Honest weather" } satisfies L,
      text: {
        ru: "Если ехать нельзя, мы говорим об этом накануне и возвращаем деньги. Испорченный день дороже предоплаты.",
        en: "If the trip should not run, we say so the day before and refund you. A ruined day costs more than a deposit.",
      } satisfies L,
    },
    {
      title: { ru: "Местные партнёры", en: "Local partners" } satisfies L,
      text: {
        ru: "Обеды, ночёвки и лошади мы берём у семей в сёлах, а не в сетевых заведениях. Деньги остаются в ущелье.",
        en: "Lunches, beds and horses come from families in the villages, not from chains. The money stays in the gorge.",
      } satisfies L,
    },
  ],
} as const;

/* ── Small recurring strings ─────────────────────────────────────────────── */

export const UI = {
  from: { ru: "от", en: "from" } satisfies L,
  perPerson: { ru: "с человека", en: "per person" } satisfies L,
  perVehicle: { ru: "за машину", en: "per vehicle" } satisfies L,
  duration: { ru: "Длительность", en: "Duration" } satisfies L,
  altitude: { ru: "Максимальная высота", en: "Highest point" } satisfies L,
  distance: { ru: "Расстояние", en: "Distance" } satisfies L,
  group: { ru: "Группа", en: "Group" } satisfies L,
  difficulty: { ru: "Сложность", en: "Difficulty" } satisfies L,
  season: { ru: "Сезон", en: "Season" } satisfies L,
  included: { ru: "Что включено", en: "What's included" } satisfies L,
  excluded: { ru: "Оплачивается отдельно", en: "Paid separately" } satisfies L,
  bring: { ru: "Что взять с собой", en: "What to bring" } satisfies L,
  itinerary: { ru: "Программа по часам", en: "Hour by hour" } satisfies L,
  highlights: { ru: "Главное на маршруте", en: "The high points" } satisfies L,
  book: { ru: "Забронировать", en: "Book this" } satisfies L,
  enquire: { ru: "Задать вопрос", en: "Ask a question" } satisfies L,
  allTours: { ru: "Все туры", en: "All tours" } satisfies L,
  relatedTours: { ru: "Похожие туры", en: "Related tours" } satisfies L,
  readMore: { ru: "Читать", en: "Read" } satisfies L,
  backToTours: { ru: "Ко всем турам", en: "Back to all tours" } satisfies L,
  writeUs: { ru: "Написать нам", en: "Write to us" } satisfies L,
  menu: { ru: "Меню", en: "Menu" } satisfies L,
  close: { ru: "Закрыть", en: "Close" } satisfies L,
  filterAll: { ru: "Все", en: "All" } satisfies L,
  nothingFound: {
    ru: "По этому фильтру пока ничего. Снимите его, или напишите нам, соберём маршрут отдельно.",
    en: "Nothing under that filter yet. Clear it, or write to us and we will put a route together for you.",
  } satisfies L,
  minutes: { ru: "мин чтения", en: "min read" } satisfies L,
  km: { ru: "км", en: "km" } satisfies L,
  days: { ru: "дней", en: "days" } satisfies L,
} as const;

/* ── The enquiry form ────────────────────────────────────────────────────── */
/*
 * Field set is deliberately short. We do not ask for email, city, date of
 * birth or "how did you hear about us": each one is both a conversion drag and
 * a 152-ФЗ liability, and none of them is needed to answer the question.
 *
 * Dates are free text on purpose: a date-range picker measurably kills mobile
 * conversion, and "ещё выбираем" is a perfectly good answer.
 */

export const FORM = {
  title: {
    ru: "Расскажите, что задумали",
    en: "Tell us what you have in mind",
  } satisfies L,

  name: {
    label: { ru: "Имя", en: "Name" } satisfies L,
    placeholder: { ru: "Как к вам обращаться", en: "What should we call you" } satisfies L,
    error: { ru: "Напишите, как к вам обращаться.", en: "Tell us what to call you." } satisfies L,
  },

  phone: {
    label: { ru: "Телефон", en: "Phone" } satisfies L,
    placeholder: { ru: "+7 (___) ___-__-__", en: "+7 (___) ___-__-__" } satisfies L,
    error: {
      ru: "Без телефона мы до вас не дозвонимся.",
      en: "Without a number we cannot reach you.",
    } satisfies L,
  },

  channel: {
    label: { ru: "Куда написать", en: "Where to reply" } satisfies L,
  },

  tour: {
    label: { ru: "Маршрут", en: "Route" } satisfies L,
    placeholder: { ru: "Ещё выбираем", en: "Still deciding" } satisfies L,
  },

  dates: {
    label: { ru: "Когда планируете", en: "When you're coming" } satisfies L,
    placeholder: { ru: "12–15 июля или «ещё выбираем»", en: "12–15 July, or 'still deciding'" } satisfies L,
  },

  pax: {
    label: { ru: "Сколько человек", en: "How many of you" } satisfies L,
    adults: { ru: "взрослых", en: "adults" } satisfies L,
    children: { ru: "детей", en: "children" } satisfies L,
  },

  message: {
    label: { ru: "Что уже видели, чего хочется", en: "What you've seen, what you want" } satisfies L,
    placeholder: {
      ru: "Необязательно, но помогает",
      en: "Optional, but it helps",
    } satisfies L,
  },

  consentError: {
    ru: "Без согласия мы не имеем права обрабатывать заявку.",
    en: "We are not permitted to process the enquiry without this.",
  } satisfies L,

  submit: { ru: "Отправить", en: "Send" } satisfies L,
  submitting: { ru: "Отправляем", en: "Sending" } satisfies L,

  successTitle: { ru: "Получили", en: "Got it" } satisfies L,
  successAgain: { ru: "Отправить ещё одну", en: "Send another" } satisfies L,

  failure: {
    ru: "Не отправилось. Напишите нам в Telegram: так надёжнее.",
    en: "That didn't send. Message us on Telegram: it's more reliable.",
  } satisfies L,

  orWrite: { ru: "Или сразу в мессенджер", en: "Or go straight to a messenger" } satisfies L,
} as const;

/* ── Getting here ────────────────────────────────────────────────────────── */
/*
 * Russian tour sites always carry this and Western ones rarely do. It removes
 * the single biggest unknown for someone deciding whether the trip is even
 * logistically possible.
 */

export const GETTING_HERE = {
  title: { ru: "Как добраться до Нальчика", en: "Getting to Nalchik" } satisfies L,
  routes: [
    {
      mode: { ru: "Самолётом", en: "By air" } satisfies L,
      text: {
        ru: "Аэропорт Нальчик (NAL): прямые рейсы из Москвы, около 2 ч 40 мин. До центра десять минут на такси. Альтернатива: Минеральные Воды (MRV), рейсов заметно больше и они дешевле, но до Нальчика ещё два часа по хорошей дороге. Владикавказ (OGZ) находится в 2,5 часах.",
        en: "Nalchik airport (NAL): direct from Moscow, about 2 h 40 min, ten minutes from the centre by taxi. The alternative is Mineralnye Vody (MRV): many more flights and cheaper, but a further two hours by road on good tarmac. Vladikavkaz (OGZ) is 2.5 hours away.",
      } satisfies L,
    },
    {
      mode: { ru: "Поездом", en: "By rail" } satisfies L,
      text: {
        ru: "Прямой поезд из Москвы в Нальчик идёт около 34 часов. Вокзал в центре города, оттуда до большинства гостиниц десять минут.",
        en: "The direct Moscow–Nalchik train takes about 34 hours. The station is central, ten minutes from most hotels.",
      } satisfies L,
    },
    {
      mode: { ru: "На машине", en: "By car" } satisfies L,
      text: {
        ru: "Из Москвы: М4 «Дон» и Р-217 «Кавказ», примерно 1 750 км и полтора-два дня. Из Минеральных Вод: два часа, асфальт всю дорогу.",
        en: "From Moscow: the M4 and R-217, roughly 1 750 km and a day and a half to two days. From Mineralnye Vody, two hours on tarmac the whole way.",
      } satisfies L,
    },
    {
      mode: { ru: "Мы встретим", en: "We'll meet you" } satisfies L,
      text: {
        ru: "Трансфер стоит 3 500 ₽ из Нальчика и 6 500 ₽ из Минеральных Вод за машину до четырёх человек. Пришлите номер рейса: водитель будет в зале прилёта и дождётся, даже если рейс задержат.",
        en: "Transfer from Nalchik 3 500 ₽, from Mineralnye Vody 6 500 ₽ per vehicle for up to four people. Send us your flight number: the driver will be in arrivals and will wait, delay or no delay.",
      } satisfies L,
    },
  ],
} as const;

/* ── Service screens ─────────────────────────────────────────────────────── */

export const NOT_FOUND = {
  code: "404",
  title: { ru: "Такой дороги у нас нет", en: "There's no such road here" } satisfies L,
  lead: {
    ru: "Зато есть девять других: все проверенные, все проезжие.",
    en: "There are nine others, though. All checked, all passable.",
  } satisfies L,
} as const;
