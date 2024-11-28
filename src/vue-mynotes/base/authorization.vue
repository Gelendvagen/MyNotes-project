<template>
    <form class="modal-auth" @submit.prevent="authorizationUser" novalidate>
        <div class="modal-auth-form" v-for="(input, input_id) in auth_form" :key="input_id">
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
            <div class="modal-auth-form-eye"  @click="togglePassVisibility(input)">
                <img v-if="input.type === 'password'" src="/src/assets/show-password.svg">
                <img v-if="input.type === 'text'" src="/src/assets/hide-password.svg">
            </div>
        </div>
        <div class="modal-auth-info">
            <span class="modal-auth-info-text">У вас нет аккаунта? <span class="modal-auth-info-text-link" @click="openRegistrationModal">Зарегистрируйтесь</span></span>
            <note_btn 
                class="modal-auth-info-btn"
                :text="'Войти'"
                type="submit"
            />
            <span v-if="error_message.length" class="modal-auth-info-error">{{ error_message }}</span>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import note_name from '../components-note-create/note-name.vue';
import note_btn from '../components-note-create/note-btn.vue';
import { useStoreModal } from '../stores/modal.js';
import { authUser, getUserInfo } from '../api.js';
import { useStoreAuth } from '../stores/auth.js';

const storeModal = useStoreModal();
const storeAuth = useStoreAuth();
const router = useRouter();

const auth_form = ref([
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
        pattern: '',
        valid: false,
        input_title: 'Пароль',
        error: ''
    },
]);

const error_message = ref('');

const setUserData = (value) => {
    for (let i = 0; i < auth_form.value.length; i++) {
        if (auth_form.value[i].id === value.id) {
            auth_form.value[i].value = value.value;
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
        } else if (input.id === 'password' && (input.value.length < 4 || input.value.length > 12)) {
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

const authorizationUser = async () => {
    let user_valid = true;
    const user_data = {
        email: '',
        password: ''
    };

    for (let input of auth_form.value) {
        validCheck(input);
        if (input.error) {
            user_valid = false;
        }
    }

    if (!user_valid) {
        console.log('Форма содержит ошибки, исправьте их перед отправкой.');
        return;
    }

    for (let item of auth_form.value) {
        user_data[item.id] = item.value;
    }

    try {
        await authUser(user_data);
        const user_info = await getUserInfo();
        storeAuth.logIn(user_info.email);
        storeModal.closeModal();
        router.push('/noteboard');
    } catch (error) {
        if (error instanceof Error) {
            error_message.value = error.message;
        }
    }
};

const openRegistrationModal = () => {
    storeModal.openModal({
        activeModal: 'modalRegistrationCmp',
        modalTitle: 'Регистрация',
    });
};

const togglePassVisibility = (input) => {
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
};
</script>

<style scoped>
.modal-auth {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

@media (max-width: 767px) {
    .modal-auth {
        gap: 16px;
    }
}

.modal-auth-form {
    position: relative;
}

.modal-auth-form-eye {
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

.modal-auth-info {
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 28px;
    align-items: center;
}

@media (max-width: 767px) {
    .modal-auth-info {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}

.modal-auth-info-text {
    grid-column: 1 / 2;
    grid-row: 1;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    color: #9DA5AF;
}

@media (max-width: 767px) {
    .modal-auth-info-text {
        font-size: 14px;
    }
}

.modal-auth-info-text-link {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
    color: #B1C909;
    cursor: pointer;
    transition: all .2s;
}

.modal-auth-info-text-link:hover {
    color: #FFFFFF;
}

@media (max-width: 767px) {
    .modal-auth-info-text-link {
        font-size: 14px;
    }
}

.modal-auth-info-btn {
    grid-column: 2 / 3;
    grid-row: 1;
}

@media (max-width: 767px) {
    .modal-auth-info-btn {
        order: -1;
        width: 100%;
    }
}

.modal-auth-info-error {
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
    .modal-auth-info-error {
        font-size: 14px;
        padding: 6px 20px;
    }
}
</style>