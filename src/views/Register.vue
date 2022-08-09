<template>
  <div>Register: {{ userStore.userData }} {{ userStore.loadingUser }}</div>
  <form @submit.prevent="handleSubmit">
    <input v-model.trim="email" type="text" placeholder="Ingrese Email" />
    <input
      v-model.trim="password"
      type="password"
      placeholder="Ingrese Password"
    />

    <button class="btn" type="submit" :disabled="userStore.loadingUser">
      Registrar
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "./../stores/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleSubmit = () => userStore.registerUser(email.value, password.value);
</script>

<style></style>
