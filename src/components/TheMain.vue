<template>
    <div class="main-page">
        <div class="main-text">
            <h1>Мои<br>заметки</h1>
            <h3>Не забывай о важном,<br>
                храни его в облаке.</h3>
        </div>
        <div class="main-img">
            <img src="../assets/main-img.png" alt="Картинка с заметками">
        </div>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 50px;
    }

    .main-text {
        flex-direction: column;
        gap: 40px;
        padding-left: 160px;
        padding-top: 245px; /* ?????? */
        justify-content: start;
    }

    h1 {
        color: white;
        font-family: 'Montserrat';
        font-size: 104px;
        font-weight: 900;
        line-height: 104px;
        margin-bottom: 0;
    }

    h3 {
        color: #9DA5AF;
        font-family: 'Montserrat';
        font-size: 32px;
        font-weight: 400;
        line-height: 48px;
        margin-top: 0;
    }

    .main-img {
        width: 897.37px;
        height: 864px;
        padding-right: 160px;
    }
</style>