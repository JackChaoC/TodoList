<template>
    <Header></Header>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>

<script setup>
import Header from '../../components/header/header.vue';

import { onMounted, ref } from 'vue';

const message = ref('Hello, Vue 3!');

// Add your component logic here
</script>

<style scoped>
/* Add your styles here */
</style>