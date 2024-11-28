<template>
    <section class="main-page">
        <div class="main-page-text">
            <h1 class="main-page-text-1">Мои заметки</h1>
            <h3 class="main-page-text-2">Не забывай о важном, храни его в облаке.</h3>
        </div>
        <img class="main-page-img" src="/src/assets/main-img.png">
    </section>
</template>

<style scoped>
.main-page {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 1919px) {
    .main-page {
        justify-content: center;
    }
}

@media (max-width: 1365px) {
    .main-page {
        flex-direction: column;
    }
}

.main-page-text {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 642px;
}

@media (max-width: 1365px) {
    .main-page-text {
        justify-items: center;
        align-items: center;
        text-align: center;
    }
}

@media (max-width: 767px) {
    .main-page-text {
        width: 320px;
        gap: 0;
    }
}

.main-page-text-1 {
    width: 488px;
    font-size: 104px;
    font-weight: 900;
    line-height: 104px;
    color: #FFFFFF;
}

@media (max-width: 767px) {
    .main-page-text-1 {
        width: 320px;
        font-size: 60px;
        line-height: 64px;
    }
}

.main-page-text-2 {
    width: 394px;
    font-size: 32px;
    font-weight: 400;
    line-height: 48px;
    color: #9DA5AF;
}

@media (max-width: 1365px) {
    .main-page-text-2 {
        width: 100%;
    }
}

@media (max-width: 767px) {
    .main-page-text-2 {
        font-size: 24px;
        line-height: 36px;
    }
}

.main-page-img {
    max-height: 864px;
    min-height: 604px;
    max-width: calc(100% - 642px);
    width: auto;
    height: auto;
    object-fit: contain;
}

@media (max-width: 1919px) {
    .main-page-img {
        min-height: 604px;
    }
}

@media (max-width: 1365px) {
    .main-page-img {
        min-height: 540px;
        max-width: 100%;
    }
}

@media (max-width: 767px) {
    .main-page-img {
        min-height: 287px;
    }
}
</style>