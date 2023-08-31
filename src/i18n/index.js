import { createI18n } from "vue-i18n";
import ptBr from "./ptBr";

const messages = {
	ptBr,
};

const i18n = createI18n({
	legacy: false,
	locale: "ptBr",
	fallbackLocale: "ptBr",
	messages,
});

export default i18n;
