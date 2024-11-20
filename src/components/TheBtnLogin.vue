<script setup>

</script>

<template>
    <button type="button" class="btn-login">
        <img src="../assets/icon-btnlogin.svg">
        <span>Вход</span>
    </button>
</template>

<style scoped>
    .btn-login {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #B1C909;
        border-radius: 32px;
        border-style: none;
        color: white;
        width: 144px;
        height: 56px;
        font-size: 20px;
        font-family: 'Montserrat';
        margin-right: 160px;
    }

    .btn-login:hover {
        background-color: rgba(151, 171, 13, 1);
    }

    .btn-login:active {
        background-color: rgba(129, 148, 0, 1);
    }

    .btn-login:disabled {
        background-color: rgba(157, 165, 175, 1);
        cursor: not-allowed;
    }

    img {
        padding-right: 12px;
    }
</style>