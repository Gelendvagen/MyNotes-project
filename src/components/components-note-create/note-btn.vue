<template>
    <button class="btn" :class="btn_type" :disabled="disabled">
      <img v-if="btn_type === '_auth'" src="@/assets/icon-btnlogin.svg">
      <img v-if="btn_type === '_cross' || btn_type === '_delete'" src="@/assets/cross.svg">
      <img v-if="btn_type === '_plus'" src="@/assets/plus.svg">
      <span v-if="btn_type === '_primary' || btn_type === '_delete' || btn_type === '_auth'" class="btn-text">{{ text }}</span>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    text: {
        type: String,
        default: "Button",
    },
    btn_type: {
        type: String,
        default: "_primary", // _primary // _cross // _plus // _delete //_auth
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>

<style>
.btn {
    padding: 12px 24px;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
    height: 56px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background-color: #B1C909;
}

.btn-text {
    color: #FFFFFF;
}

.btn._cross,
.btn._plus {
    padding: 0px;
    width: 56px;
}

.btn._plus {
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.6);
}

.btn:hover {
    background-color: #97AB0D;
}

.btn:active {
    background-color: #819400;
}

.btn._delete:hover,
.btn._delete:active {
    background-color: #B1C909;
}

.btn._delete:hover .btn-text,
.btn._delete:active .btn-text,
.btn._delete:hover img,
.btn._delete:active img {
    transition: all 0.2s;
    opacity: 0.7;
}

.btn:disabled {
    pointer-events: none;
    background-color: #9DA5AF;
    transition: all 0.2s;
}
</style>