<template>
    <header class="py-4" v-bind="$attrs">
        <el-dropdown @visible-change="onVisibleChange">
            <div class="flex items-center">
                <img :src="AvatarSm" alt="头像" class="w-[25px] h-[25px]" />
                <span class="px-2 text-sm text-black">
                    {{ authStore.user?.nickName }}
                </span>
                <el-icon class="el-icon--right text-sm">
                    <arrow-up v-if="dropdownVisible" />
                    <arrow-down v-else />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="onGotoAccountCenter">
                        账户中心
                    </el-dropdown-item>
                    <el-dropdown-item
                        :style="{
                            justifyContent: 'center'
                        }"
                        @click="logout"
                    >
                        注销
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import AvatarSm from '@/assets/images/avatar-sm.png';

defineOptions({
    inheritAttrs: false
});

const router = useRouter();
const authStore = useAuthStore();
const dropdownVisible = ref(false);

const onGotoAccountCenter = () => {
    router.push({
        name: 'AccountCenter'
    });
};

const logout = () => {
    authStore.clearAuth();
    router.push({
        name: 'login'
    });
};

const onVisibleChange = (visible: boolean) => {
    dropdownVisible.value = visible;
};
</script>

<style lang="scss" scoped>
:deep(.el-tooltip__trigger:focus-visible) {
    outline: unset;
}
</style>
