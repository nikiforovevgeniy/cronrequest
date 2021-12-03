import { reactive, computed } from 'vue';
import axios from '@/axios.js';

const state = reactive({
  user: null
});

const getters = {
  user: computed(() => state.user)
};

const actions = {
  login({ email, password }) {
    state.user = null;
    return axios.post('/auth/login', {
      email,
      password
    });
  },
  logout() {
    state.user = null;
    return axios.post('/auth/logout');
  },
  async getMe() {
    if (state.user !== null) return;
    try {
      const { data: user } = await axios.post('/auth/me');
      state.user = user;
    } catch (error) {
      state.user = false;
    }
  }
};

export default {
  ...getters,
  ...actions
};
