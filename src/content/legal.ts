import type { L } from "@/lib/i18n";

/**
 * ⚠ NOT LEGAL ADVICE.
 *
 * These are structurally complete working drafts in the standard Russian form
 * (152-ФЗ on personal data, 2300-1 on consumer rights, 132-ФЗ on tourism), with
 * every company-specific value marked [PLACEHOLDER]. Have them reviewed by a
 * lawyer and fill in the real entity details before the site goes live. An
 * offer published with placeholder requisites is worse than no offer at all.
 */

export type LegalBlock =
  | { kind: "p"; text: L }
  | { kind: "h2"; text: L }
  | { kind: "list"; items: L[] };

export type LegalDoc = {
  slug: "privacy" | "offer" | "consent";
  title: L;
  standfirst: L;
  updated: L;
  body: LegalBlock[];
};

const UPDATED: L = {
  ru: "Редакция от [PLACEHOLDER: дата] 2026 г.",
  en: "Revision of [PLACEHOLDER: date] 2026",
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy",
    title: {
      ru: "Политика в отношении обработки персональных данных",
      en: "Personal data processing policy",
    },
    standfirst: {
      ru: "Какие данные мы собираем, зачем, сколько храним и как их удалить.",
      en: "What we collect, why, how long we keep it, and how to have it deleted.",
    },
    updated: UPDATED,
    body: [
      {
        kind: "h2",
        text: { ru: "1. Общие положения", en: "1. General provisions" },
      },
      {
        kind: "p",
        text: {
          ru: "Настоящая Политика определяет порядок обработки персональных данных Оператором, а именно [PLACEHOLDER: ИП Фамилия Имя Отчество], ИНН [PLACEHOLDER], ОГРНИП [PLACEHOLDER], адрес: [PLACEHOLDER] (далее именуемым «Оператор»), и составлена во исполнение требований Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».",
          en: "This Policy sets out how personal data is processed by the Operator, namely [PLACEHOLDER: sole trader, full name], TIN [PLACEHOLDER], State registration number [PLACEHOLDER], address: [PLACEHOLDER] (the 'Operator'), and is drawn up pursuant to Federal Law No. 152-FZ of 27 July 2006 'On Personal Data'.",
        },
      },
      {
        kind: "p",
        text: {
          ru: "Использование сайта papaha.travel означает согласие Пользователя с настоящей Политикой. В случае несогласия Пользователь обязан прекратить использование сайта.",
          en: "Use of papaha.travel constitutes the User's agreement to this Policy. A User who does not agree must stop using the site.",
        },
      },
      {
        kind: "h2",
        text: { ru: "2. Какие данные обрабатываются", en: "2. What data is processed" },
      },
      {
        kind: "list",
        items: [
          {
            ru: "Фамилия и имя, указанные Пользователем в форме заявки",
            en: "Surname and given name as entered in the enquiry form",
          },
          {
            ru: "Номер телефона и адрес электронной почты",
            en: "Telephone number and email address",
          },
          {
            ru: "Предпочтительный мессенджер для связи",
            en: "Preferred messenger for contact",
          },
          {
            ru: "Содержание сообщения, включая даты поездки и состав группы",
            en: "The content of the message, including travel dates and party composition",
          },
          {
            ru: "Обезличенные данные веб-аналитики: IP-адрес, cookie, тип устройства, источник перехода",
            en: "Anonymised analytics data: IP address, cookies, device type, referral source",
          },
        ],
      },
      {
        kind: "p",
        text: {
          ru: "Оператор не обрабатывает специальные категории персональных данных (расовая принадлежность, политические взгляды, состояние здоровья, интимная жизнь) и биометрические персональные данные. Исключение: сведения о состоянии здоровья, добровольно сообщённые Пользователем для обеспечения безопасности на маршруте, обрабатываются исключительно с его отдельного письменного согласия.",
          en: "The Operator does not process special categories of personal data (racial origin, political opinions, health, sexual life) or biometric data. Exception: health information volunteered by the User for safety on a route is processed solely with their separate written consent.",
        },
      },
      {
        kind: "h2",
        text: { ru: "3. Цели обработки", en: "3. Purposes of processing" },
      },
      {
        kind: "list",
        items: [
          { ru: "Ответ на заявку и подбор маршрута", en: "Replying to the enquiry and proposing a route" },
          { ru: "Заключение и исполнение договора об оказании услуг", en: "Concluding and performing the services contract" },
          { ru: "Информирование о статусе бронирования", en: "Informing you about the status of a booking" },
          { ru: "Улучшение работы сайта на основании обезличенной статистики", en: "Improving the site on the basis of anonymised statistics" },
        ],
      },
      {
        kind: "h2",
        text: { ru: "4. Правовые основания", en: "4. Legal bases" },
      },
      {
        kind: "p",
        text: {
          ru: "Обработка осуществляется на основании согласия субъекта персональных данных (п. 1 ч. 1 ст. 6 152-ФЗ), а также в целях исполнения договора, стороной которого является субъект (п. 5 ч. 1 ст. 6 152-ФЗ).",
          en: "Processing is carried out on the basis of the data subject's consent (art. 6(1)(1) of 152-FZ) and for the performance of a contract to which the subject is a party (art. 6(1)(5) of 152-FZ).",
        },
      },
      {
        kind: "h2",
        text: { ru: "5. Сроки и хранение", en: "5. Retention and storage" },
      },
      {
        kind: "p",
        text: {
          ru: "Персональные данные хранятся не дольше, чем этого требуют цели обработки: данные заявок хранятся 3 года с момента последнего обращения; для данных по заключённым договорам срок хранения составляет 5 лет в соответствии с требованиями бухгалтерского учёта. Базы данных, содержащие персональные данные граждан РФ, размещаются на серверах, находящихся на территории Российской Федерации (ч. 5 ст. 18 152-ФЗ).",
          en: "Personal data is kept no longer than the purposes require: enquiry data for 3 years from last contact; contract data for 5 years under accounting requirements. Databases containing personal data of Russian citizens are held on servers located within the Russian Federation (art. 18(5) of 152-FZ).",
        },
      },
      {
        kind: "h2",
        text: { ru: "6. Права пользователя", en: "6. Your rights" },
      },
      {
        kind: "p",
        text: {
          ru: "Пользователь вправе получить сведения об обработке своих данных, потребовать их уточнения, блокирования или уничтожения, а также отозвать согласие в любой момент. Для этого достаточно направить обращение на [PLACEHOLDER: e-mail]. Оператор обязан ответить в течение 30 дней. Пользователь также вправе обжаловать действия Оператора в Роскомнадзоре.",
          en: "You may obtain information about the processing of your data, require its correction, blocking or destruction, and withdraw consent at any time. Send a request to [PLACEHOLDER: email]. The Operator must respond within 30 days. You may also complain about the Operator's actions to Roskomnadzor.",
        },
      },
      {
        kind: "h2",
        text: { ru: "7. Cookie", en: "7. Cookies" },
      },
      {
        kind: "p",
        text: {
          ru: "Сайт использует технические cookie, необходимые для его работы, и аналитические cookie сервиса [PLACEHOLDER: Яндекс.Метрика / иной]. Пользователь может отключить cookie в настройках браузера; часть функций сайта при этом может работать некорректно.",
          en: "The site uses technical cookies necessary for its operation and analytics cookies from [PLACEHOLDER: Yandex.Metrica / other]. You may disable cookies in your browser; some site functions may then not work correctly.",
        },
      },
    ],
  },

  {
    slug: "offer",
    title: { ru: "Публичная оферта", en: "Public offer" },
    standfirst: {
      ru: "Условия оказания экскурсионных и туристских услуг. Бронируя тур, вы принимаете эти условия.",
      en: "Terms on which excursion and tourism services are provided. Booking a tour means accepting them.",
    },
    updated: UPDATED,
    body: [
      { kind: "h2", text: { ru: "1. Предмет", en: "1. Subject" } },
      {
        kind: "p",
        text: {
          ru: "[PLACEHOLDER: ИП Фамилия Имя Отчество], ИНН [PLACEHOLDER] (далее именуемый «Исполнитель»), предлагает любому дееспособному физическому лицу (далее именуемое «Заказчик») заключить договор на оказание экскурсионных услуг на условиях, изложенных ниже. Настоящий документ является публичной офертой в соответствии со ст. 437 ГК РФ.",
          en: "[PLACEHOLDER: sole trader, full name], TIN [PLACEHOLDER] (the 'Provider'), offers any legally capable individual (the 'Client') a contract for excursion services on the terms below. This document constitutes a public offer under art. 437 of the Russian Civil Code.",
        },
      },
      {
        kind: "p",
        text: {
          ru: "Акцептом оферты считается внесение Заказчиком предоплаты или письменное подтверждение бронирования в мессенджере либо по электронной почте.",
          en: "The offer is accepted when the Client pays a deposit or confirms the booking in writing by messenger or email.",
        },
      },
      { kind: "h2", text: { ru: "2. Стоимость и оплата", en: "2. Price and payment" } },
      {
        kind: "list",
        items: [
          {
            ru: "Стоимость указана на страницах маршрутов и действует на дату бронирования",
            en: "Prices are shown on the route pages and hold as at the date of booking",
          },
          {
            ru: "Предоплата составляет 30% и закрепляет дату выезда",
            en: "A 30% deposit secures the departure date",
          },
          {
            ru: "Оставшаяся часть вносится в день начала оказания услуг",
            en: "The balance is paid on the day services begin",
          },
          {
            ru: "Способы оплаты: перевод по СБП, банковской картой или наличными",
            en: "Payment by SBP transfer, bank card or cash",
          },
        ],
      },
      { kind: "h2", text: { ru: "3. Отмена и перенос", en: "3. Cancellation and rescheduling" } },
      {
        kind: "list",
        items: [
          {
            ru: "При отмене более чем за 7 суток предоплата возвращается полностью",
            en: "If cancelled more than 7 days ahead, the deposit is refunded in full",
          },
          {
            ru: "При отмене от 3 до 7 суток возвращается 50% предоплаты",
            en: "If cancelled 3 to 7 days ahead, 50% of the deposit is refunded",
          },
          {
            ru: "При отмене менее чем за 3 суток предоплата не возвращается, но дата может быть перенесена один раз без доплаты",
            en: "If cancelled under 3 days ahead, the deposit is not refunded, but the date may be moved once at no charge",
          },
          {
            ru: "При отмене по инициативе Исполнителя (погодные условия, состояние дорог, недобор группы) возвращается 100% внесённых средств",
            en: "If the Provider cancels (weather, road conditions, insufficient group size) 100% of sums paid are returned",
          },
        ],
      },
      { kind: "h2", text: { ru: "4. Обязанности сторон", en: "4. Obligations" } },
      {
        kind: "p",
        text: {
          ru: "Исполнитель обязуется оказать услуги в объёме, указанном на странице маршрута, обеспечить исправность транспорта и сопровождение квалифицированным гидом. Исполнитель вправе изменить программу без изменения стоимости, если этого требуют безопасность, погодные условия или состояние дорог.",
          en: "The Provider undertakes to deliver the services described on the route page, to keep vehicles roadworthy and to supply a qualified guide. The Provider may alter the programme without changing the price where safety, weather or road conditions require it.",
        },
      },
      {
        kind: "p",
        text: {
          ru: "Заказчик обязуется сообщить достоверные сведения о состоянии здоровья, влияющие на безопасность, иметь при себе документы, необходимые для прохождения погранзон, и выполнять указания гида на маршруте. Невыполнение указаний гида, повлёкшее причинение вреда, снимает с Исполнителя ответственность в соответствующей части.",
          en: "The Client undertakes to disclose health information bearing on safety, to carry documents required for border zones, and to follow the guide's instructions on the route. Failure to follow the guide's instructions that results in harm relieves the Provider of liability to that extent.",
        },
      },
      { kind: "h2", text: { ru: "5. Ответственность", en: "5. Liability" } },
      {
        kind: "p",
        text: {
          ru: "Исполнитель не несёт ответственности за неоказание услуг вследствие обстоятельств непреодолимой силы, включая закрытие дорог, объявление лавинной опасности, ограничения органов власти и погодные условия, делающие проезд невозможным. В этих случаях применяется п. 3 настоящей оферты.",
          en: "The Provider is not liable for non-performance caused by force majeure, including road closures, declared avalanche danger, restrictions imposed by authorities, and weather making passage impossible. In such cases clause 3 above applies.",
        },
      },
      { kind: "h2", text: { ru: "6. Реквизиты", en: "6. Details" } },
      {
        kind: "p",
        text: {
          ru: "[PLACEHOLDER: полное наименование, ИНН, ОГРНИП, юридический адрес, расчётный счёт, банк, БИК, телефон, e-mail]",
          en: "[PLACEHOLDER: full legal name, TIN, registration number, registered address, bank account, bank, BIC, telephone, email]",
        },
      },
    ],
  },

  {
    slug: "consent",
    title: {
      ru: "Согласие на обработку персональных данных",
      en: "Consent to personal data processing",
    },
    standfirst: {
      ru: "Текст согласия, которое вы даёте, отправляя форму на этом сайте.",
      en: "The consent you give by submitting a form on this site.",
    },
    updated: UPDATED,
    body: [
      {
        kind: "p",
        text: {
          ru: "Отправляя форму на сайте papaha.travel, я, субъект персональных данных, свободно, своей волей и в своём интересе даю согласие [PLACEHOLDER: ИП Фамилия Имя Отчество], ИНН [PLACEHOLDER], адрес: [PLACEHOLDER], именуемому в дальнейшем «Оператор», на обработку моих персональных данных на следующих условиях.",
          en: "By submitting a form on papaha.travel I, the data subject, freely and in my own interest give consent to [PLACEHOLDER: sole trader, full name], TIN [PLACEHOLDER], address: [PLACEHOLDER] (the Operator) to process my personal data on the following terms.",
        },
      },
      {
        kind: "h2",
        text: { ru: "Перечень данных", en: "Data covered" },
      },
      {
        kind: "p",
        text: {
          ru: "Фамилия, имя; номер телефона; адрес электронной почты; предпочтительный способ связи; содержание сообщения, включая планируемые даты поездки и состав группы.",
          en: "Surname and given name; telephone number; email address; preferred contact method; the content of the message, including intended travel dates and party composition.",
        },
      },
      {
        kind: "h2",
        text: { ru: "Перечень действий", en: "Actions covered" },
      },
      {
        kind: "p",
        text: {
          ru: "Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), блокирование, удаление, уничтожение, как с использованием средств автоматизации, так и без них.",
          en: "Collection, recording, systematisation, accumulation, storage, correction (updating, amendment), retrieval, use, transfer (provision, access), blocking, deletion and destruction, whether by automated means or otherwise.",
        },
      },
      {
        kind: "h2",
        text: { ru: "Цель", en: "Purpose" },
      },
      {
        kind: "p",
        text: {
          ru: "Обратная связь по заявке, подбор и бронирование экскурсионных услуг, заключение и исполнение договора.",
          en: "Responding to the enquiry, selecting and booking excursion services, and concluding and performing the contract.",
        },
      },
      {
        kind: "h2",
        text: { ru: "Срок и отзыв", en: "Term and withdrawal" },
      },
      {
        kind: "p",
        text: {
          ru: "Согласие действует до достижения целей обработки либо до его отзыва. Отзыв осуществляется направлением письменного заявления на [PLACEHOLDER: e-mail]. Оператор прекращает обработку в течение 30 дней с момента получения отзыва, за исключением данных, хранение которых предписано законом.",
          en: "This consent remains in force until the purposes are achieved or until it is withdrawn. Withdrawal is effected by sending a written request to [PLACEHOLDER: email]. The Operator will cease processing within 30 days of receipt, other than data whose retention is required by law.",
        },
      },
    ],
  },
];

/** The checkbox label on every form. Links to the two documents. */
export const CONSENT_CHECKBOX: L = {
  ru: "Я согласен(а) на обработку персональных данных и принимаю условия",
  en: "I consent to the processing of my personal data and accept the terms of",
};

export const CONSENT_LINK_PRIVACY: L = {
  ru: "политики конфиденциальности",
  en: "the privacy policy",
};

export const CONSENT_LINK_OFFER: L = {
  ru: "публичной оферты",
  en: "the public offer",
};

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((doc) => doc.slug === slug);
}
