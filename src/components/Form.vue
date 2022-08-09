<template>
  <div class="form">
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese URL" v-model.trim="url" />
      <button>guardar</button>
    </form>
  </div>
</template>

<script setup>
import { useDatabaseStore } from "./../stores/database";
import { ref } from "vue";
const url = ref("");

const databaseStore = useDatabaseStore();

const handleSubmit = async () => {
  if (!url.value) return;
  await databaseStore.setUrl(url.value);
  url.value = "";
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 500px;
  width: 100%;
  box-shadow: 0 0 5px #444;
  padding: 1rem;
  margin: auto;

  input {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    outline: none;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 0.3rem;
  }
  input:focus {
    box-shadow: 0 0 3px blue;
    border: 1px solid transparent;
  }
  button {
    width: 100%;
    margin-top: 0.8rem;
    padding: 0.7rem;
    cursor: pointer;
    outline: none;
    border: none;
    box-shadow: 0 0 3px blue;
    border-radius: 0.3rem;
  }
}
</style>
