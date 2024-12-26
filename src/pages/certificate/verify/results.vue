<template>
    <div class="w-[100%] my-5 flex items-center">
        <img
            class="w-2 h-3 mr-3 cursor-pointer"
            @click="router.back"
            :src="IconBack"
        />
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            验证凭证
        </h1>
        <div class="ml-3 text-[#999999] border-l border-[#B8B8B8] indent-3">
            验证结果
        </div>
    </div>
    <div
        class="bg-white w-full min-h-[calc(100vh-200px)] rounded flex flex-col items-center justify-center"
    >
        <img
            class="w-[85px] h-[85px] mb-5"
            :src="isSuccess ? IconSuccess : IconError"
        />
        <span class="text-[#333333] text-[22px]">
            {{ isSuccess ? '验证成功' : '验证失败' }}
        </span>
        <span class="my-2.5 text-[#666666] text-sm">
            {{ isSuccess ? '凭证验证成功' : '凭证验证失败' }}
        </span>
        <div class="mt-5">
            <VersaButton type="primary" plain @click="router.back">
                返回
            </VersaButton>
            <VersaButton type="primary" @click="onVerifyAgain">
                再次验证
            </VersaButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconBack from '@/assets/images/icon_back.svg';
import IconSuccess from '@/assets/images/icon_success.png';
import IconError from '@/assets/images/icon_error.png';

const router = useRouter();
const route = useRoute();
const isSuccess = computed(() => {
    return route.query.state === '1';
});

const onVerifyAgain = async () => {
    router.replace({
        name: 'VerifySingle'
    });
};
</script>

<style lang="scss" scoped></style>
