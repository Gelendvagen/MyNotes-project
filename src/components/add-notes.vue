<template>
    <section class="notes-main">
        <div class="notes-board">
            <note_create 
                v-for="(note, index) in notes" 
                :key="index" 
                :title="note.title" 
                :text="note.content" 
                :id="note.id"
            />
        </div>
        <note_btn 
            class="notes-btn"
            :btn_type="'_plus'"
            @click="openAddNoteModal"
        />
    </section>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStoreModal } from '@/stores/modal';
import { useNotesStore } from '@/stores/notes';
import note_create from '@/components/vue-mynotes/components-note-create/note-created.vue';
import note_btn from '@/components/vue-mynotes/components-note-create/note-btn.vue';
import { getNotes } from '@/api';

const storeModal = useStoreModal();
const storeNotes = useNotesStore();

const notes = computed(() => storeNotes.notes);

const loadNotes = async () => {
    try {
        const notes_data = await getNotes();
        storeNotes.setNotes(notes_data);
    } catch (error) {
        console.error('Ошибка загрузки заметок:', error);
    }
};

const openAddNoteModal = () => {
    storeModal.openModal({
        activeModal: 'modalNoteCmp',
        modalTitle: 'Добавление заметки',
    });
};

onMounted(() => {
    loadNotes();
});
</script>

<style scoped>
.notes-main {
    position: relative;
}

.notes-board {
    display: grid;
    grid-template-columns: repeat(3, minmax(320px, 1fr));
    gap: 40px;
}

@media (max-width: 1919px) {
    .notes-board {
        gap: 28px;
    }
}

@media (max-width: 1365px) {
    .notes-board {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}

.notes-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
}

@media (max-width: 1919px) {
    .notes-btn {
        right: 12px;
    }
}

@media (max-width: 1365px) {
    .notes-btn {
        right: 8px;
    }
}
</style>