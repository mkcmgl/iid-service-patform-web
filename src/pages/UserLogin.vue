<template>
    <div
        class="min-h-screen min-w-screen bg-cover"
        :style="{
            backgroundImage: `url(${platformStore.platform.loginBackgroundPath})`
        }"
    >
        <header
            class="fixed top-[60px] left-[max(20px,5vw)] flex items-center justify-center w-fit -mx-2"
        >
            <img
                :src="platformStore.platform.logoPath"
                :alt="platformStore.platform.systemName"
                class="h-[75px] w-[75px] mx-2.5"
            />
            <div class="mx-2">
                <h1 class="font-bold text-[40px] text-[#555454]">
                    {{ platformStore.platform.systemName }}
                </h1>
                <p class="text-sm text-[#666666]">
                    {{ platformStore.platform.englishName }}
                </p>
            </div>
        </header>

        <login-form
            class="w-[400px] px-12 py-10 border bg-white rounded shadow-lg fixed top-1/2 -translate-y-1/2 left-1/2 translate-x-[calc(-50%+400px)]"
        />
        <div
            v-if="platformStore.platform.copyright"
            class="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-slate-600"
        >
            {{ platformStore.platform.copyright }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMeta } from 'vue-meta';
import { usePlatformStore } from '@/store/platform';
import LoginForm from '@/components/login/index.vue';
const platformStore = usePlatformStore();
useMeta({
    title: '登录'
});
</script>
