var availableLocales = ['en', 'am', 'ar', 'bg', 'ca', 'cs', 'da', 'de', 'el', 'en_GB', 'es', 'es_419', 'et', 'fa', 'fi', 'fil', 'fr', 'hi', 'hr', 'hu', 'id', 'it', 'iw', 'ja', 'ko', 'lt', 'lv', 'ms', 'nl', 'no', 'pl', 'pt_BR', 'pt_PT', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'sw', 'th', 'tr', 'uk', 'vi', 'zh_CN', 'zh_TW']; var availableRtlLocales = ['ar', 'fa', 'iw']; var prefix = 'keep'; _docs_flag_initialData={"n_k":"AIzaSyA0jbBGjv0Uv6ckvcM1z8y2YPSYs-3rvuw","n_s":"https://www.googleapis.com/auth/memento","n_v":"v1","n_c":"88342781362-adcdm61rp1tu7llref8jdrvnt1kvpak1","n_cv":true,"n_eal":false,"n_eetm":false,"n_eom":false,"n_imb":10485760,"n_la":"https://maps.googleapis.com/maps/api/place/","n_iu":"https://drive.google.com/keep/media/","n_nmri":5000,"n_nib":5000,"n_nmb":1800000,"n_oe":true,"n_sit":["image/jpeg","image/png","image/gif"],"n_t":true,"n_tc":1032,"n_tu":"https://client-channel.google.com/client-channel/channel","n_tsu":"https://clients4.google.com/invalidation/lcs/request","n_ts":1032,"n_ur":"edit","n_ugat":false,"n_uo":true,"n_uo2":true,"n_uv2n":false,"n_wfp":false,"n_wh5n":false,"n_wur":true,"n_wuu":true};
var langSynonyms = {
  'he': 'iw',
}
var locale = window.navigator.language;
if (langSynonyms[locale]) {
  locale = langSynonyms[locale];
}

var jsbundle = availableRtlLocales.indexOf(locale) >= 0 ?
    'app_rtl.js' : 'app_ltr.js';
var jsel = document.createElement('script');
jsel.setAttribute('type', 'text/javascript');
jsel.setAttribute('src', prefix + jsbundle);

var cssBundle = availableRtlLocales.indexOf(locale) >= 0 ?
    'rtl.css' : 'ltr.css';
var cssEl = document.createElement('link');
cssEl.setAttribute('rel', 'stylesheet');
cssEl.setAttribute('href', prefix + cssBundle);

var symbolsBundle = availableLocales.indexOf(locale) >= 0 ? locale : 'en';
var symbolsEl = document.createElement('script');
symbolsEl.setAttribute('type', 'text/javascript');
symbolsEl.setAttribute('src', 'i18n/symbols_' + symbolsBundle + '.js');

var head = document.getElementsByTagName('head')[0];
head.appendChild(symbolsEl);
head.appendChild(cssEl);
head.appendChild(jsel);

jsel.onload = function() {
  initNotesApp(true);
};
