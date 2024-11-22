<script setup>
    import TheHeader from './TheHeader.vue'
    
</script>

<template>
    <TheHeader />
    <main>
        <button type="button" class="btn-add-note" @click="showForm">
            <img src="../assets/plus.svg">
        </button>
    </main>
</template>

<style scoped>
    .btn-add-note {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(177, 201, 9, 1);
        border-radius: 32px;
        border-style: none;
        color: white;
        width: 56px;
        height: 56px;
        position: fixed;
        bottom: 24px;
        right: 24px;
    }

    .btn-add-note:hover {
        background-color: rgba(151, 171, 13, 1);
    }

    .btn-add-note:active {
        background-color: rgba(129, 148, 0, 1);
    }
</style>