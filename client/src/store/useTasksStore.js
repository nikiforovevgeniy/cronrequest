import { reactive, computed } from 'vue';
import axios from '@/axios.js';

const state = reactive({
  loading: {
    list: false,
    item: false,
    save: false,
    remove: false
  },
  list: [],
  item: {},
  search: ''
});

const getters = {
  loading: computed(() => state.loading),
  search: computed(() => state.search),
  list: computed(() => {
    return state.list.filter(item => item.name.includes(state.search));
  }),
  item: computed(() => state.item)
};

const actions = {
  async loadList() {
    try {
      state.loading.list = true;
      state.list = [];
      const { data: list } = await axios.get('/tasks');
      state.list = list;
    } finally {
      state.loading.list = false;
    }
  },
  async loadItem(id) {
    try {
      state.loading.item = true;
      state.item = {};
      const { data: item } = await axios.get(`/tasks/${id}`);
      state.item = item;
    } finally {
      state.loading.item = false;
    }
  },
  async saveItem() {
    try {
      const { id } = state.item;
      const method = id ? 'patch' : 'post';
      const url = id ? `/tasks/${id}` : '/tasks';
      state.loading.save = true;
      const { data: item } = await axios({
        method,
        url,
        data: state.item
      });
      state.item = item;
    } finally {
      state.loading.save = false;
    }
  },
  async removeItem() {
    try {
      const { id } = state.item;
      if (!id) throw new Error('Нет идентификатора');
      state.loading.remove = true;
      await axios.delete(`/tasks/${id}`);
      state.item = {};
    } finally {
      state.loading.remove = false;
    }
  },
  setItem(data) {
    state.item = data;
  },
  setSearch(value) {
    state.search = value;
  }
};

export default {
  ...getters,
  ...actions
};
