import { defineStore } from 'pinia';
import modalAuthCmp from '@/vue-mynotes/base/authorization.vue';
import modalRegistrationCmp from '@/vue-mynotes/base/registration.vue';
import modalNoteCmp from '@/vue-mynotes/base/modal-add-note.vue';

const modalComponents = {
    modalAuthCmp,
    modalRegistrationCmp,
    modalNoteCmp
};

export const useStoreModal = defineStore('modal', {
    state: () => ({
        activeModal: undefined,
        modalTitle: null,
    }),
    getters: {
        currentComponent(state) {
            return state.activeModal ? modalComponents[state.activeModal] : null;
        },
    },
    actions: {
        openModal(payload) {
            this.modalTitle = payload.modalTitle;
            this.activeModal = payload.activeModal;
        },
        closeModal() {
            this.modalTitle = null;
            this.activeModal = undefined;
        }
    }
});