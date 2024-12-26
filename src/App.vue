<template>
    <VersaProvide :axiosInstance="axios">
        <metainfo>
            <template #title="{ content, metainfo }">
                {{ metainfo.titleTemplate?.replace('%s', content) ?? content }}
                -
                {{ platformStore.platform.systemName }}
            </template>
        </metainfo>
        <router-view />
        <global-notification />
    </VersaProvide>
</template>

<script lang="ts" setup>
import { useMeta } from 'vue-meta';
import { onBeforeMount } from 'vue';
import { usePlatformStore } from '@/store/platform';
import GlobalNotification from '@/components/global-notification/index.vue';
import FaviconIco from '@/assets/images/favicon.ico';
import axios from '@/plugins/axios';

const platformStore = usePlatformStore();

useMeta({
    link: [
        {
            rel: 'icon',
            href: FaviconIco
        }
    ]
});

onBeforeMount(() => {
    platformStore.refreshPlatform();
});
</script>
