const HTML_PROTOCOL = 'http://';
const WS_PROTOCOL = 'ws://';

const API_BASE_URL = 'api.deepspace.onl:5555/';

const API_LOGIN_URL = WS_PROTOCOL + API_BASE_URL + 'login/';
const API_CONFIRM_URL = HTML_PROTOCOL + API_BASE_URL + 'confirm/';
const CONFIRM_TIMEOUT = 2000;
const API_GET_LOCATION_URL = HTML_PROTOCOL + API_BASE_URL + 'get/';
const API_REGISTER_URL = HTML_PROTOCOL + API_BASE_URL + 'register/';
const API_SEARCH_URL = HTML_PROTOCOL + API_BASE_URL + 'search/';

const BASE_URL = HTML_PROTOCOL + 'v2.xtrm-sports.com/';

const DEFAULT_CARD_WIDTH = 350;

const ACTION_LINK = 'link';

const MAX_DIFFICULTY = 10;

var TAGS = ['con', 'cou', 'reg', 'spo', 'dis'];
var TAG_NAME = '$';
var TAG_VAL_START = '(';
var TAG_VAL_END = ')';
