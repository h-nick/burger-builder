import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://burger-builder-520ab.firebaseio.com/'
});

export default axiosInstance;