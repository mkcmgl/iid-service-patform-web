<template>
    <Guides v-if="authStore.needIdentityVerify" />
    <Home v-else />
</template>

<script setup lang="ts">
import Guides from './guides.vue';
import Home from './home.vue';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();
</script>
