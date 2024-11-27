<template>
    <div class="textarea">
        <span class="textarea-title">{{ textarea_title }}</span>
        <textarea
            class="textarea-field"
            :class="{ '_fill-textarea': textarea_field_value.value.length }"
            v-model="textarea_field_value.value"
            @input="setValue"
            v-bind="$attrs"
            :placeholder="placeholder"
            :maxlength="500"
        />
        <div class="textarea-message">
            <span v-if="textarea_error.length" class="textarea-message-error">{{ textarea_error }}</span>
            <span class="textarea-message-counter">{{ counter }}/500</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch, computed } from 'vue';

const props = defineProps({
    textarea_title: {
        type: String,
        default: 'Введите значение'
    },
    textarea_value: {
        type: String,
        default: ''
    },
    textarea_error: {
        type: String,
        default: 'Сообщение об ошибке'
    },
    placeholder: {
        type: String,
        default: 'Введите значение'
    }
});

const emit = defineEmits(['set_textarea']);

const textarea_field_value = reactive({
    value: props.textarea_value
});

const counter = computed(() => textarea_field_value.value.length);

watch(() => props.textarea_value,
    (value) => {
        textarea_field_value.value = value;
    }
);

const setValue = () => {
    emit('set_textarea', textarea_field_value.value);
};
</script>

<style scoped>
.textarea {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: 400;
    gap: 8px;
    line-height: 28px;
    width: 100%;
    height: 316px;
}

@media (max-width: 1919px) {
    .textarea {
        height: 240px;
    }
}

.textarea-title {
    color: #9DA5AF;
    padding: 0px 24px;
}

.textarea-field {
    width: 100%;
    height: 280px;
    padding: 16px 28px;
    border-radius: 36px;
    font-size: 18px;
    color: #0A1F38;
    transition: all 0.2s;
    border: 2px solid #FFFFFF;
    resize: none;
    overflow: auto;
    clip-path: inset(0 round 36px);
}

.textarea-field._fill-textarea {
    color: #0A1F38;
}

.textarea-field:hover,
.textarea-field:focus {
    border-color: #B1C909;
}

.textarea-message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px 24px;
}

@media (max-width: 767px) {
    .textarea-message {
        font-size: 14px;
    }
}

.textarea-message-error {
    color: #FF7461;
}

.textarea-message-counter {
    color: #9DA5AF;
    margin-left: auto;
}
</style>