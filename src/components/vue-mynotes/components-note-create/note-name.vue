<template>
    <div class="input">
        <span class="input-title">{{ input_title }}</span>
        <input
            class="input-field"
            :class="{ '_fill-input': input_field_value.value.length }"
            :type="input_type"
            v-model="input_field_value.value"
            @input="setValue"
            v-bind="$attrs"
            :placeholder="placeholder"
            :maxlength="maxlength"
        />
        <div v-if="input_error.length || input_id === 'title'" class="input-message">
            <span v-if="input_error.length" class="input-message-error">{{ input_error }}</span>
            <span v-if="input_id === 'title'" class="input-message-counter">{{ counter }}/100</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch, computed } from 'vue';

const props = defineProps({
    input_id: {
        type: String
    },
    input_type: {
        type: String,
        default: 'text' // password //text
    },
    input_value: {
        type: String,
        default: ''
    },
    input_error: {
        type: String,
        default: 'Сообщение об ошибке'
    },
    placeholder: {
        type: String,
        default: 'Введите значение'
    },
    input_title: {
        type: String,
        default: 'Введите значение'
    },
    maxlength: {
        type: Number,
        default: 255
    },
});

const emit = defineEmits(['set_input']);

const input_field_value = reactive({
    value: props.input_value
});

const counter = computed(() => input_field_value.value.length);

watch(() => props.input_value, (value) => {
    input_field_value.value = value;
});

const setValue = () => {
    emit('set_input', { value: input_field_value.value, id: props.input_id });
};
</script>

<style scoped>
.input {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    width: 100%;
    position: relative;
}

.input-title {
    color: #9DA5AF;
    padding: 0px 24px;
}

.input-field {
    width: 100%;
    padding: 20px 58px 20px 28px;
    border-radius: 36px;
    font-size: 18px;
    color: #0A1F38;
    transition: all 0.2s;
    border: 2px solid #FFFFFF;
}

.input-field._fill-input {
    color: #0A1F38;
}

.input-field:hover,
.input-field:focus {
    border-color: #B1C909;
}

.input-message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px 24px;
}

@media (max-width: 767px) {
    .input-message {
        font-size: 14px;
    }
}

.input-message-error {
    color: #FF7461;
}

.input-message-counter {
    color: #9DA5AF;
    margin-left: auto;
}
</style>