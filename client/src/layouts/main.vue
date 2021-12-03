<template>
  <div class="flex flex-col min-h-screen">
    <div class="header">
      <button class="button-icon" @click="isVisibleDrawer = true">
        <i class="icon-burger"></i>
      </button>
      <div class="flex-grow overflow-hidden">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="flex-grow bg-gray-100 p-4">
      <slot></slot>
    </div>
  </div>

  <drawer v-model="isVisibleDrawer" class="app-drawer w-full">
    <div class="divide-y p-4">
      <router-link custom to="/hooks" v-slot="{ href, navigate, isActive }">
        <a
          :href="href"
          class="block py-2"
          :class="{ 'text-blue-500': isActive }"
          @click="navigate"
        >
          Hooks
        </a>
      </router-link>
      <router-link custom to="/tasks" v-slot="{ href, navigate, isActive }">
        <a
          :href="href"
          class="block py-2"
          :class="{ 'text-blue-500': isActive }"
          @click="navigate"
        >
          Tasks
        </a>
      </router-link>
    </div>
  </drawer>
</template>

<script>
import drawer from '@/components/ui/drawer.vue';

import useUserStore from '@/store/useUserStore.js';

const { logout } = useUserStore;

export default {
  components: {
    drawer
  },
  data() {
    return {
      isVisibleDrawer: false
    };
  },
  watch: {
    '$route.path'() {
      this.isVisibleDrawer = false;
    }
  },
  methods: {
    async onClickLogout() {
      await logout();
      this.$router.push({
        name: 'login'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  min-height: 70px;
}
::v-global(.app-drawer) {
  max-width: 300px;
}
</style>

<style lang="postcss" scoped>
.header {
  @apply flex items-center sticky top-0 shadow-md bg-blue-500 text-white gap-3 px-4;
}
</style>
