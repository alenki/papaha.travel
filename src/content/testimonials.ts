import type { Testimonial } from "./types";

/**
 * PLACEHOLDER: these are written, not collected. Before launch, replace with
 * real reviews pulled from Яндекс.Карты, 2ГИС and the Telegram channel, and
 * keep the source link so the AggregateRating in the JSON-LD stays honest.
 */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: { ru: "Екатерина Л.", en: "Ekaterina L." },
    city: { ru: "Москва", en: "Moscow" },
    tourSlug: "chegem-el-tyubyu",
    date: { ru: "Сентябрь 2025", en: "September 2025" },
    rating: 5,
    text: {
      ru: "Ехали без ожиданий, вернулись с ощущением, что нас приняли в семью. Аслан по дороге рассказал столько, что я потом полгода читала про адыгов. Отдельно: нас не тащили по точкам ради галочек, а если было интересно, стояли дольше.",
      en: "We went with no expectations and came back feeling like we had been taken into a family. Aslan told us so much on the drive that I spent the next six months reading about the Circassians. And separately: we were never dragged from sight to sight for the sake of it; when something was interesting, we stayed longer.",
    },
  },
  {
    id: "t2",
    name: { ru: "Дмитрий и Ольга", en: "Dmitry & Olga" },
    city: { ru: "Санкт-Петербург", en: "St Petersburg" },
    tourSlug: "ves-kavkaz-5-dney",
    date: { ru: "Май 2025", en: "May 2025" },
    rating: 5,
    text: {
      ru: "Пять дней, четыре республики, и ни одного момента, когда было бы непонятно, что происходит. Логистика выстроена так, что ты просто садишься в машину и всё случается. Гостиницы простые, но чистые; нас предупредили заранее, и это как раз то, чего ждёшь от честной компании.",
      en: "Five days, four republics, and not one moment where it was unclear what was happening. The logistics are arranged so that you simply get in the vehicle and it all occurs. The hotels are plain but clean; we were told that in advance, which is exactly what you want from an honest operator.",
    },
  },
  {
    id: "t3",
    name: { ru: "Артём С.", en: "Artyom S." },
    city: { ru: "Екатеринбург", en: "Yekaterinburg" },
    tourSlug: "voskhozhdenie-elbrus",
    date: { ru: "Август 2025", en: "August 2025" },
    rating: 5,
    text: {
      ru: "Вершину я не взял: развернули на 5 100 из-за погоды и моего пульса. Пишу отзыв именно поэтому. Гид принял решение спокойно и объяснил его так, что спорить не хотелось. Через год пойду снова и только с ними.",
      en: "I did not get the summit: they turned me around at 5 100 because of the weather and my heart rate. That is precisely why I am writing this. The guide made the call calmly and explained it in a way that left nothing to argue with. I will go again next year and only with them.",
    },
  },
  {
    id: "t4",
    name: { ru: "Ирина В.", en: "Irina V." },
    city: { ru: "Краснодар", en: "Krasnodar" },
    tourSlug: "vkus-kavkaza",
    date: { ru: "Ноябрь 2025", en: "November 2025" },
    rating: 5,
    text: {
      ru: "Думала, будет туристическая постановка. Оказалось, что это обычный дом, обычная кухня и хозяйка, которой действительно интересно, получится у меня хычин или нет. Не получился. Съели всё равно.",
      en: "I expected a tourist performance. What I got was an ordinary house, an ordinary kitchen and a host genuinely interested in whether my khychin would work. It did not. We ate it anyway.",
    },
  },
  {
    id: "t5",
    name: { ru: "Сергей П.", en: "Sergey P." },
    city: { ru: "Новосибирск", en: "Novosibirsk" },
    tourSlug: "dzhily-su",
    date: { ru: "Июль 2025", en: "July 2025" },
    rating: 5,
    text: {
      ru: "Четырнадцать часов в дороге, и ни разу не пожалел. Северная сторона Эльбруса совсем другая гора, чем с Азау. Тимур вёз аккуратно, на серпантине никого не укачало. Термосы с обедом кажутся мелочью, но решают многое.",
      en: "Fourteen hours on the road and not one regret. The north side of Elbrus is a completely different mountain from the Azau side. Timur drove carefully and nobody got sick on the switchbacks. The flask lunch is a small detail that decides a lot.",
    },
  },
  {
    id: "t6",
    name: { ru: "Анна и Марк", en: "Anna & Mark" },
    city: { ru: "Тбилиси", en: "Tbilisi" },
    tourSlug: "verkhnyaya-balkaria",
    date: { ru: "Октябрь 2025", en: "October 2025" },
    rating: 5,
    text: {
      ru: "Мы просили гида, который говорит по-английски и может объяснить историю депортации не в двух словах. Получили Залину. Это был самый содержательный день за всю поездку по России.",
      en: "We asked for a guide who spoke English and could explain the deportation in more than a sentence. We got Zalina. It was the most substantial day of our entire trip through Russia.",
    },
  },
];

export const RATING = {
  value: 4.9,
  count: 214,
  /** PLACEHOLDER: link to the real review page so the rating is verifiable. */
  sourceUrl: "https://yandex.ru/maps/",
  sourceLabel: { ru: "Яндекс.Карты", en: "Yandex Maps" },
} as const;
