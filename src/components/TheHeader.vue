<script setup>
    import TheLogo from './TheLogo.vue'
    import TheBtnLogin from './TheBtnLogin.vue'
</script>

<template>
    <header class="header">
        <TheLogo />
        <TheBtnLogin />
    </header>
</template>

<style scoped>
    .header {
        position: sticky;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem;
        height: 112px;
    }
</style>