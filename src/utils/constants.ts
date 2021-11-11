import { Platform } from "react-native";

// ants for URLs
export const tvizioLogo = require("../icons/tvizio_logo.png");
export const BASE_URL = "https://www.tvizio.bg/";
export const BASE_API_URL = "https://www.tvizio.bg/php/api.php?path=";
export default {
    SIGN_IN_URL: BASE_API_URL + "user/login_box",
    CHANNEL_LIST_API_URL: BASE_API_URL + "tv/on",
    CHANNEL_RECORDINGS_LIST_API_URL: BASE_API_URL + "tv/rec",
    CHANNEL_PROGRAMME_LIST_API_URL: BASE_API_URL + "tv/eod",
    CHANNEL_URL_API_URL: BASE_API_URL + "tv/ch",
    GET_RECORDING_API_URL: BASE_API_URL + "tv/bid",
    SEND_USER_STATISTICS_API_URL: BASE_API_URL + "user/stats",
    SEND_APP_DESC_AND_EMAIL_API_URL: BASE_API_URL + "app/acc",
    CHECK_DUPLICATE_SESSION_API_URL: BASE_API_URL + "app/dup",
    ADD_TO_HISTORY_API_URL: BASE_API_URL + "tv/store_bid",
    HISTORY_LIST_API_URL: BASE_API_URL + "tv/get_bids",
    SEARCH_ARCHIVE: BASE_API_URL + "tv/search",
    CHECK_SUBSCRIPTION_API_URL: BASE_API_URL + "user/paying",
    CHECK_PERSONAL_ANNOUNCEMENTS: BASE_API_URL + "user/announce",
    CHECK_GLOBAL_ANNOUNCEMENTS: BASE_API_URL + "app/announce",
    GET_NEXT_BID: BASE_API_URL + "tv/next_bid",
    GET_CURRENT_DATE_IN_SOFIA_API_URL: "https://www.tvizio.bg/php/time_to_json.php",
    GET_MILLISECONDS_SINCE_UNIX_EPOCH_API_URL: "https://www.tvizio.bg/php/time_to_json2.php",
    GET_DURATION_OF_DVR: "https://www.tvizio.bg/smarttv/dvrlenght.html",
    DEFAULT_DURATION_OF_DVR: 9000 * 1000, // 2.5 hours in milliseconds
    // - Screenshot на запис (https://www.tvizio.bg/caps/rec_multi/1_4055438_1.png - https://www.tvizio.bg/caps/rec_multi/{cid}_{bid}_1.png)
    REWIND_FAST_FORWARD_DEFAULT_STEP_IN_MS: 10000,
    DATA_UPDATE_PERIOD_IN_SECONDS: 5 * 60 * 1000,	// 5 minutes
    // DATA_UPDATE_PERIOD_IN_SECONDS : 30 * 1000,	// 30 seconds - for testing
    MESSAGE_DISPLAY_DURATION: 4000,
    LONG_PRESS_DETECT_DURATION: 650,
    AUTO_HIDE_SEEKBAR_DURATION: 3000,
    DUPLICATE_SESSION_CHECK_PERIOD: 5 * 60 * 1000,	// 5 minutes
    CHECK_SUBSCRIPTION_PERIOD: 5 * 60 * 1000,	// 5 minutes
    SEND_USER_STATISTICS_PERIOD: 5 * 60 * 1000,		// 5 minutes
    // SEND_USER_STATISTICS_PERIOD : 30 * 1000,		// 30 seconds - for testing
    SEND_APP_DESC_AND_EMAIL_PERIOD: 10 * 60 * 1000,	// 10 minutes
    DURATION_TO_CHECK_BETWEEEN_NUMERIC_KEY_PRESSES: 1500,
    REWINDING_TO_LAST_SHOW_OFFSET: 10000,    //10 seconds
    NETWORK_TIMEOUT_TIME: 30000, //30 seconds


    //User code. Only for debugging
    USER_CODE: "181458571341",
    //

    //FILE PATHS
    PAUSE_ICON: "images/icons/pause.svg",
    PLAY_ICON: "images/icons/play.svg",
    FORWARD_ICON: "images/icons/fast-forward.svg",
    REWIND_ICON: "images/icons/rewind.svg",
    //

    APP_NAME: Platform.OS,
    APP_VERSION: "1.0.0",

    MAX_DESCRIPTION_LENGTH: 187,
    DEFAULT_SIZE_OF_PAGES: 5,
    TVIZIO_LOGO: -1,

    THHRESHOLD_FOR_NOT_ADDING_TO_HISTORY: 98,
    HELP_DIALOG_CONTENT_1: "    Ново в тази версия:\n\n \
Добавено е по-високо качество на програмите, при които при стартиране се появява индикатор &quot;Качество: \
ниско/високо&quot;. Можете да избирате между двете качества с бутон 8 на дистанционното.\n\n \
Моля имайте предвид, че за високото качество се изисква по-бърза и по-стабилна интернет връзка. \
Ако картината ви прекъсва, моля изберете ниско качество.",
    RECORDING_AVAILABLE: "&#8592; На запис",
    PROGRAMME_AVAILABLE: "Програма &#8594;",
    NO_ENTRIES_FOR_THE_CHANNEL: "Няма записи за този канал",
    NO_PROGRAMME_FOR_THE_CHANNEL: "В момента няма програма за този канал.",
    DUPLICATE_SESSION_MESSAGE: "В момента друг потребител е влязъл с този профил от друг адрес. Съгласно \
	\"Условията за ползване\" можете да гледате едновременно на няколко устройства, свързани към една и съща интернет \
	линия (на един адрес). <BR /><BR /> Моля уверете се, че: <BR /><BR /> \
	1. Не сте предоставяли профила си на друг потребител. <BR /> \
	2. В момента не използвате устройство, което получава интернет от друг доставчик. Пример: гледане от мобилен телефон с \
	мобилен интернет и едновременно с това гледане от компютър през домашен интернет. <BR /> 3. Не използвате VPN на \
	някое от устройствата си.<BR /><BR /> Ако не откривате проблема в горните препоръки, моля сменете паролата си от меню \
	ПРОФИЛ на tvizio.bg или ни пишете от меню КОНТАКТ.",
    SIGN_IN_CODE_INCORRECT_LENGTH: "Кодът се състои от 12 цифри",
    SIGN_IN_CODE_NOT_FOUND: "Грешен код. Mоля проверете кода в меню Профил -> Устройства на сайта tvizio.bg",
    SIGN_IN_MODAL_TITLE: "Моля въведете 12-цифрения код за достъп, който можете да намерите на сайта в меню Профил -> Устройства",
    SUBSCRIPTION_REQUIRED: "Този канал изисква абонамент. Моля абонирайте се на tvizio.bg или гледайте безплатните канали.",
    INTERNET_CONNECTION_LOST: "Няма интернет връзка, моля настройте интернет връзката от менюто на телевизора",
    INTERNET_RECONNECTED: "интернет връзката е възстановена",
    NO_OTHER_STREAMS_IN_DIFFERENT_QUALITIES: "Този канал все още не се излъчва в различни качества",
    ERROR_OPENING_STREAM: "Грешка при зареждане на предаването.",
    EXIT_DIALOG_MESSAGE: "Искате ли да излезете от приложението?",
    NO_CONNECTION_TO_SERVER: "Няма връзка със сървъра. Моля опитайте по-късно."
}