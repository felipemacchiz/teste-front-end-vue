import { createI18n } from "vue-i18n";
import ptBr from "./ptBr";
import en from "./en";

const messages = {
	ptBr,
	en,
};

const i18n = createI18n({
	legacy: false,
	locale: localStorage.getItem("locale") || "ptBr",
	fallbackLocale: "ptBr",
	messages,
});

export default i18n;
