<template>
    <h1
        class="my-[20px] text-[22px] font-medium tracking-wider text-[#333333] leading-none"
    >
        基础配置
    </h1>

    <nav class="bg-white rounded shadow p-6 my-4 text-base">
        <a
            :class="[
                'mx-2 hover:text-blue-500 select-none cursor-pointer',
                {
                    'text-blue-600 font-semibold': activeTab === 'global'
                }
            ]"
            @click="onToggleTab('global')"
        >
            全局策略
        </a>

        <a
            :class="[
                'mx-2 hover:text-blue-500 select-none cursor-pointer',
                {
                    'text-blue-600 font-semibold': activeTab === 'personal'
                }
            ]"
            @click="onToggleTab('personal')"
        >
            个性化设置
        </a>
    </nav>

    <el-tabs class="base-config-tabs" v-model="activeTab">
        <el-tab-pane lazy label="global" name="global">
            <GlobalSetting />
        </el-tab-pane>
        <el-tab-pane lazy label="personal" name="personal">
            <PersonalSetting />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import GlobalSetting from './GlobalSetting.vue';
import PersonalSetting from './PersonalSetting.vue';

const route = useRoute();
const router = useRouter();
const activeTab = ref((route.query.tab as string) || 'global');

watch(
    () => route.query.tab,
    () => {
        activeTab.value = (route.query.tab as string) || 'global';
    }
);

const onToggleTab = (tab: string) => {
    if (activeTab.value !== tab) {
        router.push({
            name: 'BaseConfig',
            query: { tab }
        });
    }
    activeTab.value = tab;
};

useMeta({
    title: '基础配置'
});
</script>

<style lang="scss" scoped>
.base-config-tabs {
    :deep(.el-tabs__header) {
        display: none;
    }
}
</style>
