import axios from 'axios';
import router from '@/router';
import userStore from '@/store/useUserStore.js';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
});

// instance.interceptors.request.use(function (config) {
//   return config;
// });

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const status = error.response?.status;
    if (status === 401) {
      await userStore.logout();
      router.push({
        name: 'login'
      });
    }
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
);

export default instance;
