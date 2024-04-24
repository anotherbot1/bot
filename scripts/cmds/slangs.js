const axios = require('axios');

module.exports = {
  config: {
    name: 'slangs',
    version: '1.0',
    author: 'Zeroday',
    countDown: 5,
    role: 0,
    category: '𝗙𝗨𝗡',
    shortDescription: {
      en: 'Tells a random slangs to bully someone.'
    },
    longDescription: {
      en: 'use this cmd to bully a member'
    },
    guide: {
      en: '{pn} gali @mention'
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      const mention = Object.keys(event.mentions);

      if (mention.length !== 1) {
        api.sendMessage('Please mention one member to bully.', event.threadID, event.messageID);
        return;
      }
      const mentionName = event.mentions[mention[0]].replace('@',
      const slangs = ["শুয়োরেরবাচ্চা কুত্তারবাচ্ছা হারামিরবাচ্চা হারামি হারামজাদা হারামখোর খাঙ্কিরপোলা খান্কি মাগিরপোলা চোদনা চুদিরভাই চুতমারানি"," চুদির পোলা  তর মায়রে চুদি তর মায়রে চুদি তর মায়রে বাপ  শালা শালার পো শালা  হুমুন্দির পুত  মাঙ্গির পুত নাটকির পো ল্যাউড়ার পুত হাউয়ার পো হাউয়ার নাতি চুদানির পো ভুদার বেটা লটির পো লটির বেটা ভেড়াচ্চোদা মাউড়া চোদা গুয়ার ভিতরে ভইড়া দিমু হোগার ভিতরে ভইড়া দিমু  ঠ্যাঁঙ কাইট্টা পুটকি দা ভইরা দিমু","হালা ল্যাওড়া চোদা বানচোত  কুত্তাচোদা তর পুটকিত ধান ছড়াইয়া চড়ুই উকুন তোর হউরিরে ডিগবাজী আল বদর  তোর জাঙ্গীয়া খুইল্যা আগুন লাগায় দিমু বাল ফালায়া খালে নামানো বাল ফালায়া আটিঁ বান্ধা বালে বালে গিট্টু গোলাম আযম","মইত্যা নিজামী গেলমান তিনকোনা মহাবুবস্ বাপের আগে বাল ফালায় ভোদাই ভোদার বাল ধোনের বাল ধোন হোল টেংরি ভাইংগা হাতে ধরায়া দিমু নটি মাগি"," নটি মাগির পোলা নটি মাগির ঝি গুদের বাল মাগিবাজ মাইগ্যা বাল ফালাইয়া আটি বান বেশ্যা মাগী ভৈরব মাগী পুকটি মারা খা গাড় মারা খা","ভইরা দিমু মাঙ্গের পোলা উপ্তা কইরা চুদমু মাঙ্গের নাতি  চুদনা মাগী ভাতার চুদা  মীরজাফর নীজামী  গরম ডিম দিমু উপ্তা কইরা চুদা দিমু","গোস্তের লাঠি সাটামু ধোন কাইট্টা কুত্তা দিয়া খাওয়ামু লেওরা নিবীর্জ চুতমারানীর পোলা তর মায়েরে চিচিং ফাক কান্দে ফালাইয়া তর মায়েরে চুদি পুটকিতে বাশ দিমু চামড়া ছুইল্লা লবণ লাগামু লাথ্থি দিমু উষ্টা খা ইউনুস (সুদখোর গুদির ব্যাটা কাঠ্ঠির বেট্যা","ল্যাদানী হোলচাটা মাহফুজ সাহেব বাইনচোদ মাদার চোদ হোগা চাটা ১ ইঞ্চি নিজামী চোদা মুজাহিদের বউ কুত্তার হোল মাসিকের রক্ত হোল টাইনা পুকটিতে ভর আবাল চোদা বোকা আচোদা (যাদের বোকারাও চোদে না) খবিশ চোদা (যাদের শুধু খবিশরা চোদে) ভুস্কি মাগির পোলা  তর ভোদায় বিলাই হ্যাচড়া লম্বা শীষ তর মার ভোদা পাব্লিক টয়লেট","তর মায়েরে চুদায় পোকা তর বাপপের হোল তর বউয়ের ভোদাতে তর মায়েরে বিছাতু পাতা তোগোরে ফাসিতে লটকাইয়া চুদমু তোগোর ধোন টাইনা তোগোর পিছন দিয়া ঢুকামু জং ধরা লোহা তোদের পিছন দিয়া ঢুকামু তর মায়েরে ভোদা শিরিষ কাগজ দিয়া ঘইষা দিমু তর মায়েরে ভোদা বোম্বাই মরিচ দিয়া চুদামু  তর হোগায় ইনপুট, তর মায়েরে ভোদাতে আউটপুট তর বাপের পুটকির ফুটা দিয়া কাডল ঢুকামু নিজামীর গোয়ার কৃমি  তর বাপের ধন দিয়া ডাংগুলি খেলুম তর বাপের বিচি বেইচা কটকটি খামু  তর বৌয়ের ভোদায় মাগুর মাছ চাষ করুম  তর ধন দিয়া মাটি খুড়ুম ফাটা কন্ডমের ফসল","হাতির ল্যাওড়া দিয়া তর মায়েরে চুদুম","তর মায়েরে ভোদা ছিল্লা লবণ লাগায় দিমু তর বাপের হোগা দিয়া ট্রেন ভইরা দিমু তরে গোআ দিয়া চুদামু এক কানে লেওরা ভইরা আরেক কান দিয়া বাইর করমু তোর লেওরা ভাজি কইরা তোরেই খাওয়ামু কুত্তার পুকটি চাটামু মাসিকের ত্যানা তোর নাকে হাইগ্যা দিমু তোর বাপ গাইড়্যা","মোবাইল ভাইব্রেশন কইরা তুর পুকটিতে ভরবো তোর বউয়ের মুসলমানি দিমু তোর বাপে তোর নানা গুদ এ আলতো করে ঢুকাবো ড্রাইগোন চোদা ১২ চুদা ব্যাসাচুদা হেদার তার ছিড়া মাগি চুদা খা চুদা খাওয়া মাগি গুদ চাটো শেটা চিরা","রোহিঙ্গা চোদা মাগি তুমি আমার ব্লাক হোল আমি তোমার বাশ তল্লা দেব পাচা দিয়ে খাসা দেব গুদ দিয়ে চেটে দেব মধুর মতো তোমার গুদ খানি নক আউট বক চোদা মাগি গুদ এ দেবো থয় থয় করবা তুমি হয় হয় ছেড়া কনডমের মাল হাটু উচ্চা করা গুদ মাগি আগুন ঢুকা তর ব্লাক হোলে  গুদ উবদো কর মাগি আমি আয়তেছি ডাবল হোল চোদা ত্রিপল হোল চোদা","ডেন্ডি হোলের ভিতর ধুকা বাইনচোদ চুদিয়ে লাল করে দিবো ছেলেব্রেটি চোদা নিজের  দুদ চাটা পোলা তর পাচায় খারা বারি","Madarchod!! Bokachoda Khankir chele Gud marani Puud marani Rendi'r chele Bichir baal Guuder chal !! Thuachoda Banchod","Bessha magi KuttachodaHati chodaDinosaur choda!!Angel chodaVirus chodaUtt khankir dimPanty chorCondom chorGudir chele!!","Classical chodaMobile chodaChalak chodaShuar chodaTepon magiRendi magir gud!!Digital khankiChodon 420 Pagla choda Chodo","vuskir pola tor maye re chudi tor nani r pukti chudi kutta diya khanki chodanir pola tor bap er leura kaitta kutta re chodai tor maye re diya","tor dadi pornhub e tor bap er loge chode tor ma tor loge chode tora family choda khankir magi tor boin re dis chuida vuda fatay dimu tarpor oi rokto chaita khais tor boin re sukh dis magi choda"];
      const randomIndex = Math.floor(Math.random() * slangs.length);
      const randomSlang = slangs[randomIndex];
      api.sendMessage(`${mentionName}, ${randomSlang}`, event.threadID);
    } catch (error) {
      console.error('Error in onStart:', error);
    }
  }
};
