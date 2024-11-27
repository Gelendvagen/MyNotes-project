<template>
    <div class="note">
        <div class="note-header">
            <h4 class="note-header-title">{{ title }}</h4>
        </div>
        <div class="note-content">
            <div class="note-content-text">{{ text }}</div>
            <note_btn 
                class="note-content-btn"
                :text="'Удалить'"
                :btn_type="'_delete'"
                @click="handleDelete" 
            />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { deleteNote } from '@/vue-mynotes/api';
import note_btn from './note-btn.vue';
import { useNotesStore } from '@/vue-mynotes/stores/notes';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        default: 'Заголовок'
    },
    text: {
        type: String,
        default: 'Текст'
    }
});

const storeNotes = useNotesStore();

const handleDelete = async () => {
    try {
        await deleteNote(props.id);
        storeNotes.removeNote(props.id);
    } catch (error) {
        console.error('Ошибка при удалении заметки:', error);
    }
};
</script>

<style scoped>
.note {
    width: 100%;
    color: #FFFFFF;
}

.note-header {
    border-radius: 8px 0 0 0;
    background-color: #B1C909;
    clip-path: polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0% 100%);
    position: relative;
}

.note-header::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background-color: #A5BB0C;
    border-bottom-left-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.note-header-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    padding: 20px 56px 20px 28px;
}

@media (max-width: 767px) {
    .note-header-title {
        font-size: 20px;
        line-height: 26px;
    }
}

.note-content {
    display: flex;
    flex-direction: column;
    background-color: #B1C909;
    border-radius: 0 0 8px 8px;
    box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.9);
}

.note-content-text {
    padding: 20px 28px 28px;
    border-top: 1px solid #97AB0D;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
}

@media (max-width: 767px) {
    .note-content-text {
        font-size: 16px;
        line-height: 24px;
    }
}

.note-content-btn {
    margin: 8px 8px 8px auto;
}
</style>