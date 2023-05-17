import axios from "axios";

const clientRequest = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'https://itbee-gitlab/api/vi/'
});

clientRequest.interceptors.request.use(
	async (config) => {
		return config;
	},
	(error) => Promise.reject(error)
);

clientRequest.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default clientRequest;