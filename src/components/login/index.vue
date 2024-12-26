<template>
    <div class="login">
        <el-tabs stretch lazy v-model="loginType" @tab-change="onTabChange">
            <el-tab-pane name="password">
                <template #label>
                    <span class="text-lg"> 密码登录 </span>
                </template>
                <PasswordForm
                    v-if="loginType === 'password'"
                    @handle-token-response="handleTokenResponse"
                />
            </el-tab-pane>
            <el-tab-pane name="sms">
                <template #label>
                    <span class="text-lg"> 短信登录 </span>
                </template>
                <SmsForm
                    v-if="loginType === 'sms'"
                    @handle-token-response="handleTokenResponse"
                />
            </el-tab-pane>
        </el-tabs>
        <footer class="mt-4 flex items-center justify-center">
            <ElButton link type="primary" @click="onRegister">
                没有账户？立即注册
            </ElButton>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import PasswordForm from './PasswordForm.vue';
import SmsForm from './SmsForm.vue';

type LoginType = 'password' | 'sms';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const loginType: Ref<'password' | 'sms'> = ref(
    (route.query.type as unknown as LoginType) || 'password'
);

const handleTokenResponse = async (token: string) => {
    authStore.setToken(token);
    await authStore.refreshUser();
    router.push({
        name: 'Profile'
    });
};

const onTabChange = () => {
    router.push({
        name: 'login',
        query: {
            ...route.query,
            type: loginType.value
        }
    });
};

const onRegister = () => {
    router.push({
        name: 'register'
    });
};
</script>

<style lang="scss" scoped>
.login {
    :deep(.el-tabs__active-bar) {
        background-color: transparent;
        background-image: linear-gradient(
            90deg,
            transparent 0,
            transparent 37%,
            var(--el-color-primary) 0,
            var(--el-color-primary) 63%,
            transparent 0,
            transparent
        );
    }
    :deep(.el-tabs__nav-wrap::after) {
        background-color: transparent;
    }

    :deep(.el-checkbox.el-checkbox--large) {
        height: auto;
    }
}
</style>
