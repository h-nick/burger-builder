import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://react-burger-udemy-nhd.firebaseio.com/'
});

export default axiosInstance;