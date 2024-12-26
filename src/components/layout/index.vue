<template>
    <div class="bg-[#F0F7FD]" theme="default">
        <nav
            style="box-shadow: 20px 0 20px -20px rgba(0, 0, 0, 0.2)"
            class="w-[200px] h-[calc(100vh-70px)] z-[999] fixed top-[70px] left-0 bg-white text-slate-700 flex flex-col scrollbar-trigger-wrapper overflow-auto"
        >
            <menu-layout
                v-for="(item, index) in sidebarRoutes"
                :key="index"
                :item="item"
            />
        </nav>

        <header
            class="w-full bg-white px-6 shadow-sm h-[70px] flex items-center fixed z-30 top-0 left-0 shadow-[0_3_5_1_rgba(240,240,240,0.7)]"
        >
            <router-link
                class="flex items-center cursor-pointer"
                :to="{
                    name: 'Profile'
                }"
            >
                <img
                    :src="platformStore.platform.logoPath"
                    :alt="platformStore.platform.systemName"
                    class="w-[36px] h-[36px] rounded-full mx-auto"
                />
                <h1
                    class="my-2 ml-2.5 text-lg font-bold text-[#333333] text-center select-none"
                >
                    {{ platformStore.platform.systemName }}
                </h1>
            </router-link>
            <versa-button
                v-if="platformStore.platform.filePath"
                class="ml-auto mr-10"
                type="primary"
                @click="onPrevewDocument"
                link
            >
                文档
            </versa-button>
            <dashboard-header
                :class="{ 'ml-auto': !platformStore.platform.filePath }"
            />
        </header>
        <main
            class="ml-[200px] p-8 pt-5 mt-[70px] min-h-[calc(100vh-70px)] min-w-[1050px] bg-[#F0F7FD]"
        >
            <router-view />
        </main>
    </div>
</template>

<script lang="ts" setup>
import { Ref, computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '@/store/platform';
import axios from '@/plugins/axios';
import { useAuthStore } from '@/store/auth';
import { UserRoute } from '@/types/user';
import DashboardHeader from './DashboardHeader.vue';
import MenuLayout from './MenuLayout.vue';

const platformStore = usePlatformStore();

const routesInfo: Ref<UserRoute[]> = ref([]);
const authStore = useAuthStore();
const router = useRouter();

const sidebarRoutes = computed(() => {
    return authStore.needIdentityVerify
        ? [
              {
                  meta: {
                      title: '概览',
                      icon: 'PieChart'
                  },
                  name: 'Profile',
                  path: 'profile'
              } as UserRoute
          ]
        : routesInfo.value;
});

const getRoutesInfo = async () => {
    const { data } = await axios.get<{ data: UserRoute[] }>('/getRouters');
    routesInfo.value = data.data?.sort((a, b) => b.orderNum - a.orderNum) ?? [];
};

const onPrevewDocument = () => {
    router.push({
        name: 'Document'
    });
};

onBeforeMount(async () => {
    await getRoutesInfo();
});

defineOptions({
    name: 'SystemLayout'
});
</script>

<style lang="scss"></style>
