<script setup>
import Header from '@/vue-mynotes/base/header.vue';
import modalCmp from '@/vue-mynotes/base/modal-entry.vue';
import { useStoreModal } from '@/vue-mynotes/stores/modal';
import { useStoreAuth } from '@/vue-mynotes/stores/auth';
import { onMounted, ref } from 'vue';
import { checkServerStatus } from '@/vue-mynotes/api';
import { getUserInfo } from '@/vue-mynotes/api';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
const storeModal = useStoreModal();
const storeAuth = useStoreAuth();

const is_loading = ref(true);

const checkAuthStatus = async () => {
    try {
        const token = cookies.get('accessToken');

        if (!token) {
            storeAuth.logOut();
            is_loading.value = false;
            return;
        }

        const user_info = await getUserInfo();
        storeAuth.logIn(user_info.email);

    } catch (error) {
        console.error('Ошибка при проверке авторизации:', error);
        storeAuth.logOut();
    } finally {
        is_loading.value = false;
    }
};

async function pingServer() {
    try {
        await checkServerStatus();
        console.log('Сервер доступен');
    } catch (error) {
        console.error('Сервер недоступен:', error);
    }
}

onMounted(() => {
    checkAuthStatus();
    pingServer();
});
</script>

<template>
  <main class="note-app">
		<Header :is_loading="is_loading"/>
		<div class="note-app__container">
      <router-view v-if="!is_loading"></router-view>
		</div>
      <modalCmp v-if="storeModal.currentComponent"/>
	</main>
</template>

<style scoped>
.note-app {
  margin: 0 auto;
  font-weight: normal;
  padding: 0 160px;
}

.note-app__container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 24px;
}

@media (max-width: 1919px) {
  .note-app {
    padding: 0 80px;
  }
}

@media (max-width: 1365px) {
  .note-app {
    padding: 0 40px;
  }
}

@media (max-width: 767px) {
  .note-app {
    padding: 0 20px;
  }
}
</style>