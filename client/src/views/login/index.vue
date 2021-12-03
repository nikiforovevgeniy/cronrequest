<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Email"
        class="field"
        v-model="userData.email"
        :disabled="loading"
      />
      <input
        type="password"
        placeholder="Password"
        class="field"
        v-model="userData.password"
        :disabled="loading"
      />
      <div class="flex">
        <button class="button" :disabled="loading" @click="onClickLogin">
          Вход
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useUserStore from '@/store/useUserStore.js';

const { login } = useUserStore;

export default {
  data() {
    return {
      loading: false,
      userData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    onClickLogin() {
      this.loading = true;
      login(this.userData)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          alert(error.message);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.field {
  width: 350px;
}
</style>

<style lang="postcss" scoped>
.field {
  @apply border block outline-none p-2;
}
.button {
  @apply bg-blue-400 text-white active:bg-blue-600 disabled:opacity-50 disabled:cursor-default py-2 px-4;
}
</style>
