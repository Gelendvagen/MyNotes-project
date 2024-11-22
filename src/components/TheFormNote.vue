<script>
export default {
  name: 'FormWithSubmit',
  data() {
    return {
      title: '',
      text: '',
      theme: ''
    };
  },
  methods: {
    hideForm() {
      this.$store.commit("visibleForm", false);
    },
    clearForm() {
      this.title = '';
      this.text = '';
    },
    addNote() {
      const newNote = { title: this.title, text: this.text, theme: this.theme };
      fetch("https://6536b157bb226bb85dd28259.mockapi.io/api/v1/notes", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      })
        .then((res) => res.json())
        .then((data) => this.$store.commit("addNote", data))
        .catch((err) => console.log(err.message));
      this.hideForm();
      this.clearForm();
    },
    onSetTheme(value) {
      this.theme = value;
    },
    selectedTheme(theme) {
      console.log(theme);
      return theme;
    },
  },
}
</script>

<template>
  <div class="layout" v-if="this.$store.state.visibleForm">
    <form class="form" :class="selectedTheme(theme)" @submit.prevent="addNote" name="addForm">
      <div class="form__close" @click="hideForm">
        <svg class="form__close-fill" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 50 50">
          <path
            d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z">
          </path>
        </svg>
      </div>
      <h2 class="form__title">Добавление заметки</h2>
      <input type="text" class="form__input-title" v-model="title" placeholder="Введите название">
      <textarea name="text" class="form__input-text" v-model="text" placeholder="Введите текст"></textarea>
      <div class="form__btn-wrapper"><button type="submit" class="form__btn"
          :disabled="text === '' || title === ''">Добавить</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.layout {
  min-width: 320px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.form {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  width: 40%;
  height: fit-content;
  background: var(--color-background);
  border-radius: 6px;
  z-index: 5;
  gap: 2rem;
  border: 1px solid var(--color-text);
}

@media screen and (max-width: 1024px) {
  .form {
    width: 50%;
  }
}

@media screen and (max-width: 768px) {
  .form {
    width: calc(100% - 4rem);
    padding: 1.5rem;
    gap: 1rem;
  }
}

.form__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  transition: all 0.3s linear;
  width: 2rem;
  height: 2rem;
}

.form__close:hover {
  transform: rotate(180deg);
}

@media screen and (max-width: 768px) {
  .form__close {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.form__close-fill {
  fill: var(--color-text);
  height: 100%;
  width: 100%;
}

.form__title {
  text-transform: uppercase;
  font-family: 'PressStart2P', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  margin: 0;
}

.form__title::placeholder {
  opacity: 0.8;
}

@media screen and (max-width: 768px) {
  .form__title {
    font-size: 0.7rem;
  }
}

.form__input-title {
  height: 3rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.5rem;
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-green);
  border-radius: 4px;
  font-family: 'OpenSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.form__input-title::placeholder {
  opacity: 0.8;
}

@media screen and (max-width: 768px) {
  .form__input-title {
    font-size: 1rem;
    height: 2rem;
  }
}

.form__input-text {
  height: 10rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.5rem;
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-green);
  border-radius: 4px;
  font-family: 'OpenSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

@media screen and (max-width: 768px) {
  .form__input-text {
    font-size: 1rem;
  }
}

.form__btn-wrapper {
  display: flex;
  gap: 1.5rem;
  width: 100%;
}

.form__btn {
  height: 3rem;
  border: 1px solid var(--color-text);
  border-radius: 4px;
  max-width: 200px;
  background-color: var(--color-background);
  color: var(--color-text);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s linear;
  padding: 10px 2rem;
  font-size: 1rem;
  font-family: 'PressStart2P', Arial, Helvetica, sans-serif;
}

.form__btn:active {
  transform: translate(0.5rem, 0.5rem);
}

.form__btn:hover {
  background-color: var(--color-text);
  border: 1px solid var(--color-background);
  color: var(--color-background);
}

@media screen and (max-width: 768px) {
  .form__btn {
    font-size: 0.7rem;
    height: 2rem;
    max-width: 100px;
  }
}
</style>