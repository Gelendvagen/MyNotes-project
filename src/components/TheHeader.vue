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
        height: 112px;
    }

    @media screen and (max-width: 1366px) {
        .header {
            height: 96px;
        }
    }

    
</style>