<template>
    <form class="modal-registration" @submit.prevent="registrationUser" novalidate>
        <div class="modal-registration-form" v-for="(input, input_id) in reg_form" :key="input_id">
            <note_name 
                :input_id="input.id"
                :input_value="input.value"
                :input_required="input.required"
                :input_type="input.type"
                :placeholder="input.placeholder"
                :input_title="input.input_title"
                :input_error="input.error"
                @set_input="setUserData"
                @blur="validCheck(input)"
            />
            <div class="modal-registration-form-eye"  @click="togglePassVisibility(input)">
                <img v-if="input.type === 'password'" src="/src/assets/show-password.svg">
                <img v-if="input.type === 'text'" src="/src/assets/hide-password.svg">
            </div>
        </div>
        <div class="modal-registration-info">
            <span class="modal-registration-info-text">У вас есть аккаунт? <a class="modal-registration-info-text-link" @click="openAuthModal">Войдите</a></span>
            <note_btn 
                class="modal-registration-info-btn"
                :text="'Зарегистрироваться'"
                type="submit"
            />
            <span v-if="error_message.length" class="modal-registration-info-error">{{ error_message }}</span>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import note_name from '../components-note-create/note-name.vue';
import note_btn from '../components-note-create/note-btn.vue';
import { useStoreModal } from '../stores/modal';
import { registerUser } from '../api';

const storeModal = useStoreModal();

const reg_form = ref([
    {
        id: 'email',
        type: 'email',
        value: '',
        required: true,
        placeholder: 'Введите Email',
        valid: false,
        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
        input_title: 'Email',
        error: ''
    },
    {
        id: 'password',
        type: 'password',
        value: '',
        required: true,
        placeholder: 'Введите пароль',
        pattern: /^[A-Za-z0-9!@#$%^&*()_+{}:"<>?|[\]\/.,\-`~]*$/,
        valid: false,
        input_title: 'Пароль',
        error: ''
    },
    {
        id: 'confirm_password',
        type: 'password',
        value: '',
        required: true,
        placeholder: 'Введите пароль',
        pattern: /^[A-Za-z0-9!@#$%^&*()_+{}:"<>?|[\]\/.,\-`~]*$/,
        valid: false,
        input_title: 'Пароль ещё раз',
        error: ''
    },
]);

const setUserData = (value) => {
    for (let i = 0; i < reg_form.value.length; i++) {
        if (reg_form.value[i].id === value.id) {
            reg_form.value[i].value = value.value;
        }
    }
};

const validCheck = (input) => {
    const regExp = new RegExp(input.pattern, 'i');

    if (input.value) {
        if (input.id === 'email' && !regExp.test(input.value)) {
            input.error = 'Введите корректный email';
            return false;
        } else if (!regExp.test(input.value)) {
            input.error = 'Поле может содержать только латиницу, цифры и пробел';
            return false;
        } else if ((input.id === 'password' || input.id === 'confirm_password') && (input.value.length < 4 || input.value.length > 12)) {
            input.error = 'Длина пароля от 4 до 12 символов';
            return false;
        } else if (input.value.length > 255) {
            input.error = 'Максимальная длина поля 255 символов';
            return false;
        } else {
            input.error = "";
            return true;
        }
    } else if (!input.value.length && input.required) {
        input.error = 'Поле обязательно к заполнению';
        return false;
    }
    return true;
};

const error_message = ref('');

const registrationUser = async () => {
    let user_valid = true;
    const user_data = {
        email: '',
        password: '',
        confirm_password: ''
    };

    for (let input of reg_form.value) {
        validCheck(input);
        if (input.error) {
            user_valid = false;
        }
    }

    if (!user_valid) {
        console.log('Форма содержит ошибки, исправьте их перед отправкой.');
        return;
    }

    for (let item of reg_form.value) {
        user_data[item.id] = item.value;
    }

    try {
        await registerUser(user_data);
        storeModal.closeModal();
    } catch (error) {
        if (error instanceof Error) {
            error_message.value = error.message;
        }
    }
};

const openAuthModal = () => {
    storeModal.openModal({
        activeModal: 'modalAuthCmp',
        modalTitle: 'Вход в ваш аккаунт',
    });
};

const togglePassVisibility = (input) => {
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
};
</script>

<style scoped>
.modal-registration {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

@media (max-width: 767px) {
    .modal-registration {
        gap: 16px;
    }
}

.modal-registration-form {
    position: relative;
}

.modal-registration-form-eye {
    position: absolute;
    top: 58px;
    right: 22px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.modal-registration-info {
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 28px;
    align-items: center;
}

@media (max-width: 767px) {
    .modal-registration-info {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}

.modal-registration-info-text {
    grid-column: 1 / 2;
    grid-row: 1;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    color: #9DA5AF;
}

@media (max-width: 767px) {
    .modal-registration-info-text {
        font-size: 14px;
    }
}

.modal-registration-info-text-link {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
    color: #B1C909;
    cursor: pointer;
    transition: all 0.2s;
}

.modal-registration-info-text-link:hover {
    color: #FFFFFF;
}

@media (max-width: 767px) {
    .modal-registration-info-text-link {
        font-size: 14px;
    }
}

.modal-registration-info-btn {
    grid-column: 2 / 3;
    grid-row: 1;
}

@media (max-width: 767px) {
    .modal-registration-info-btn {
        order: -1;
        width: 100%;
    }
}

.modal-registration-info-error {
    grid-column: 1 / -1;
    grid-row: 2;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    color: #FF7461;
    border-radius: 24px;
    background-color: #FF74611A;
    padding: 8px 0 8px 20px;
    width: 100%;
}

@media (max-width: 767px) {
    .modal-registration-info-error {
        font-size: 14px;
        padding: 6px 20px;
    }
}
</style>