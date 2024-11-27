<template>
    <form class="modal-note" @submit.prevent="handleSubmit" novalidate>
        <note_name 
            :input_id="input.id"
            :input_value="input.value"
            :input_required="input.required"
            :input_type="input.type"
            :placeholder="input.placeholder"
            :input_title="input.input_title"
            :input_error="input.error"
            :maxlength="input.maxlength"
            @set_input="setInput"
        />
        <note_text 
            :placeholder="textarea.placeholder"
            :textarea_title="textarea.textarea_title"
            :textarea_error="textarea.textarea_error"
            @set_textarea="setTextarea"
        />
        <div class="modal-note-info">
            <note_btn 
                class="modal-note-info-btn"
                :text="'Добавить'"
                type="submit"
            />
            <span v-if="error_message.length" class="modal-note-info-error">{{ error_message }}</span>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import note_name from '@/components/components-note-create/note-name.vue';
import note_text from '@/components/components-note-create/note-text.vue';
import note_btn from '@/components/components-note-create/note-btn.vue';
import { useStoreModal } from '@/components/stores/modal';
import { useNotesStore } from '@/components/stores/notes';
import { createNote } from '@/api';

const storeModal = useStoreModal();
const storeNotes = useNotesStore();

const input = ref({
    id: 'title',
    type: 'text',
    value: '',
    required: true,
    placeholder: 'Введите название',
    valid: false,
    input_title: 'Название заметки',
    error: '',
    maxlength: 100,
});

const textarea = ref({
    id: 'text',
    type: 'text',
    value: '',
    required: true,
    placeholder: 'Введите текст',
    valid: false,
    textarea_title: 'Текст заметки',
    textarea_error: '',
});

const error_message = ref('');

const setInput = (payload) => {
    input.value.value = payload.value;
};

const setTextarea = (value) => {
    textarea.value.value = value;
};

const handleSubmit = async () => {
    let isValid = true;

    if (!input.value.value) {
        input.value.error = 'Введите название заметки';
        isValid = false;
    } else {
        input.value.error = '';
    }

    if (!textarea.value.value) {
        textarea.value.textarea_error = 'Введите текст заметки';
        isValid = false;
    } else {
        textarea.value.textarea_error = '';
    }

    if (!isValid) return;

    try {
        const new_note = await createNote(input.value.value, textarea.value.value);
        console.log(new_note, 'input.value.value, textarea.value.value');
        storeNotes.addNote(new_note);
        storeModal.closeModal();
        input.value.value = '';
        textarea.value.value = '';
    } catch (error) {
        if (error instanceof Error) {
            error_message.value = error.message;
        }
    }
};
</script>


<style scoped>
.modal-note {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

@media (max-width: 767px) {
    .modal-note {
        gap: 16px;
    }
}

.modal-note-info {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

@media (max-width: 767px) {
    .modal-note-info {
        margin-top: 12px;
        gap: 12px;
    }
}

.modal-note-info-btn {
    margin-left: auto;
}

@media (max-width: 767px) {
    .modal-note-info-btn {
        margin-left: 0;
        width: 100%;
    }
}

.modal-note-info-error {
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    color: #FF7461;
    border-radius: 24px;
    background-color: #FF74611A;
    padding: 8px 0 8px 20px;
    width: 100%;
}

@media (max-width: 767px) {
    .modal-note-info-error {
        font-size: 14px;
        padding: 6px 20px;
    }
}
</style>
