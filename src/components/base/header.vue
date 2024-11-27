<template>
    <header class="header">
        <img v-if="window_width < 768 && !storeNotes.notes.length && storeAuth.isAuth" src="@/assets/logo.svg"/>
        <img v-else src="@/assets/logo.svg" :class="{ 'header-logo': window_width < 768 && storeNotes.notes.length || window_width < 768&& !storeAuth.isAuth }"/>
        <note_btn 
            v-if="!is_loading && !storeAuth.$state.isAuth"
            :text="'Вход'"
            :btn_type="'_auth'"
            @click="openAuthModal"
        />
        <div v-if="!is_loading && storeAuth.$state.isAuth" class="header-profile">
            <span v-if="window_width > 767 || (window_width < 768 && !storeNotes.notes.length)" class="header-profile-email">{{ storeAuth.email }}</span>
            <img class="header-profile-avatar" src="@/assets/icon-profile.svg" @click="toggleLogout">
            <div class="header-profile-logout-box" v-if="is_logout_visible">
                <span class="header-profile-logout-box-link" @click="logout">Выйти</span>
            </div>
        </div>
    </header>
</template>

<script setup>
import note_btn from '@/components/components-note-create/note-btn.vue';
import { defineProps, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStoreModal } from '@/components/stores/modal';
import { useStoreAuth } from '@/components/stores/auth';
import { useNotesStore } from '@/components/stores/notes';
import { logoutUser } from '@/api';
import { useRouter } from 'vue-router';

defineProps({
    is_loading: {
        type: Boolean,
        default: true
    }
});

const storeModal = useStoreModal();
const storeAuth = useStoreAuth();
const storeNotes = useNotesStore();

const router = useRouter();

const is_logout_visible = ref(false);
const window_width = ref(window.innerWidth);

const updateWindowWidth = () => {
    window_width.value = window.innerWidth;
};

const openAuthModal = () => {
    storeModal.openModal({
        activeModal: 'modalAuthCmp',
        modalTitle: 'Вход в ваш аккаунт',
    });
};

const logout = async () => {
    try {
        await logoutUser();
        storeAuth.logOut();
        is_logout_visible.value = false;
        router.push('/');
    } catch (error) {
        console.error('Ошибка при выходе:', error);
    }
};

const toggleLogout = () => {
    is_logout_visible.value = !is_logout_visible.value;
};

const handleClickOutside = (event) => {
    const logout_element = document.querySelector('.header-profile-logout-box');
    const avatar_element = document.querySelector('.header-profile-avatar');
    if (logout_element && !logout_element.contains(event.target) && avatar_element && !avatar_element.contains(event.target)) {
        is_logout_visible.value = false;
    }
};

onMounted(() => {
    window.addEventListener('resize', updateWindowWidth);
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWindowWidth);
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 43px 0px;
}

@media (max-width: 1919px) {
    .header {
        padding: 23px 0px;
    }
}

@media (max-width: 767px) {
    .header {
        padding: 20px 0px;
    }
}

@media (max-width: 767px) {
    .header-logo {
        width: 154px;
        height: 36px;
    }
}

.header-profile {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
}

.header-profile-email {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.header-profile-avatar {
    cursor: pointer;
}

@media (max-width: 767px) {
    .header-profile-avatar {
        width: 36px;
        height: 36px;
    }
}

.header-profile-logout-box {
    position: absolute;
    top: 135%;
    right: -4%;
    background-color: #1B2F46;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);
    border-radius: 12px;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.header-profile-logout-box::before {
    content: '';
    position: absolute;
    top: -10px;
    right: 20px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #1B2F46;
}

.header-profile-logout-box-link {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
    cursor: pointer;
    color: #B1C909;
    transition: all 0.2s;
}

.header-profile-logout-box-link:hover {
    color: #FFFFFF;
}
</style>