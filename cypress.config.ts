import { defineConfig } from "cypress";
import cypress_localstorage_plugin from "cypress-localstorage-commands/plugin";

export default defineConfig({
	component: {
		devServer: {
			framework: "react",
			bundler: "vite"
		}
	},
	e2e: {
		baseUrl: "http://127.0.0.1:5173/react-contacts/",
		setupNodeEvents(on, config) {
			cypress_localstorage_plugin(on, config);
			return config;
		}
	}
});
