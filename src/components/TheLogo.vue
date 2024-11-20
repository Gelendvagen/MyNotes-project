<template>
    <a href="/">
        <img src="../assets/logo.svg" alt="Логотип" class="logo" />
    </a>
</template>

<style scoped>
    .logo {
        padding-left: 160px;
    }

    @media screen and (max-width: 1366px) and (min-width: 769px) {
        .logo {
            padding-left: 80px;
        }
    }

    @media screen and (max-width: 768px) and (min-width: 361px) {
        .logo {
            padding-left: 40px;
        }
    }

    @media screen and (max-width: 360px) {
        .logo {
            padding-left: 10px;
            width: 154px;
            height: 36px;
        }
    }
</style>