import { createStore } from "vuex";
import { api } from "./services";

export default createStore({
	strict: true,
	state: {
		address: {
			id: "",
			name: "",
			cep: "",
			createdAt: "",
			modifiedAt: "",
		},
		addresses: null,
	},
	mutations: {
		CREATE_ADDRESS(state, payload) {
			state.addresses.unshift(payload);
		},
		UPDATE_ADDRESS(state, payload) {
			state.addresses = payload;
		},
	},
	actions: {
		getAddresses(context, query) {
			api.get(`/address${query ? `?q=${query}` : ""}`).then(
				(response) => {
					context.commit("UPDATE_ADDRESS", response.data);
				}
			);
		},
	},
});
