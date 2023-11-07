export const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
export const URL_REGEX = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/;

export const PAGES = [
	"index",
	"contact",
	"store",
	"review",
	"about-us",
];

export const LOGGED_USER_LS_KEY = 'userLogged';

export const PRODUCT_CATEGORIES = [
  "MIEL",
  "HIGIENE",
  "SALUD",
  "COSMETICO",
  "DULCE",
  "HORNEADOS",
  "OTROS"
]

export const BE_URL = import.meta.env.VITE_BE_URL;