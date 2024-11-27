<template>
    <div class="modal">
        <div @click="closeModal()" class="modal-shadow"></div>
        <div class="modal-container">
            <h2 class="modal-container-title">{{ storeModal.modalTitle }}</h2>
            <noteBtn 
                class="modal-container-close-btn"
                :btn_type="'_cross'"
                @click="closeModal()"
            />
            <div class="modal-container-content">
                <component :is="storeModal.currentComponent"></component>
            </div>
        </div>
    </div>
</template>

<script setup>
import noteBtn from '@/components/components-note-create/note-btn.vue';
import { useStoreModal } from '@/stores/modal';
import { onUnmounted } from 'vue';

const storeModal = useStoreModal();

const closeModal = () => {
    storeModal.closeModal();
};

onUnmounted(() => {
    storeModal.$reset();
});
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-shadow {
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgba(10, 31, 56, 0.5);
}

.modal-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 780px;
    padding: 80px;
    border-radius: 40px;
    background-color: #1B2F46;
    z-index: 1;
    position: relative;
}

@media (max-width: 1919px) {
    .modal-container {
        width: 594px;
        padding: 56px;
    }
}

@media (max-width: 1365px) {
    .modal-container {
        width: 688px;
    }
}

@media (max-width: 767px) {
    .modal-container {
        width: 352px;
        gap: 28px;
        padding: 24px 16px;
        max-height: calc(100% - 8px);
        justify-content: center;
    }
}

.modal-container-title {
    font-size: 48px;
    font-weight: 600;
    line-height: 72px;
    color: #FFFFFF;
}

@media (max-width: 1919px) and (min-width: 1366px) {
    .modal-container-title {
        width: 482px;
    }
}

@media (max-width: 767px) {
    .modal-container-title {
        font-size: 32px;
        line-height: 36px;
    }
}

.modal-container-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
}

@media (max-width: 767px) {
    .modal-container-close-btn {
        top: 12px;
        right: 12px;
    }
}
</style>