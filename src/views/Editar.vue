<template>
  <div class="content_loaderr" v-if="databaseStore.loading">
    <span class="loaderr"></span>
  </div>
  <div v-else>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="ingrese url" v-model="url" />
      <button type="submit">Editar</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDatabaseStore } from "./../stores/database";
import { useRoute } from "vue-router";
const databaseStore = useDatabaseStore();
const route = useRoute();
const url = ref("");

const handleSubmit = () => {
  databaseStore.updateUrl(route.params.id, url.value);
};

onMounted(async () => {
  url.value = await databaseStore.leerUrl(route.params.id);
});
</script>

<style lang="scss" scoped></style>
