<template>
  <div>Login</div>
  <form @submit.prevent="handleSubmit">
    <input v-model.trim="email" type="text" placeholder="Ingrese Email" />
    <input
      v-model.trim="password"
      type="password"
      placeholder="Ingrese Password"
    />
    <button type="submit" :disabled="userStore.loadingUser">Ingresar</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const email = ref("diego@gmail.com");
const password = ref("acrdhr");

const handleSubmit = () => userStore.loginUser(email.value, password.value);
</script>

<style lang="scss" scoped></style>
