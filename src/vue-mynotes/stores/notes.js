import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
    state: () => ({
        notes: [],
    }),
    actions: {
        setNotes(newNotes) {
            this.notes = newNotes;
        },
        addNote(newNote) {
            this.notes.push(newNote);
        },
        removeNote(noteId) {
            this.notes = this.notes.filter((note) => note.id !== noteId);
        },
    },
    getters: {
        allNotes(state) {
            return state.notes;
        },
    },
});