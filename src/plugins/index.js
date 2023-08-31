/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import store from "@/store";
import i18n from "@/i18n";

export function registerPlugins(app) {
	loadFonts();
	app.use(i18n).use(vuetify).use(router).use(store);
}
