<style lang="scss">
.sidebar-item {
    @apply text-sm;

    & > summary::-webkit-details-marker {
        display: none;
    }

    summary > span {
        @apply transition-[transform] rotate-180;
    }

    &[open] > summary > span {
        @apply rotate-0;
    }
}
</style>

<template>
    <details class="sidebar-item" ref="detailsRef">
        <summary
            :class="[
                'cursor-pointer select-none list-none flex items-center px-6 py-4 relative border-l-[5px]',
                isActive(renderMenu)
                    ? 'bg-[var(--el-color-primary-light-8)] border-[var(--el-color-primary)]'
                    : 'border-transparent'
            ]"
            @click="() => onJump(renderMenu)"
        >
            <img
                v-if="renderMenu.meta?.iconType === IconType.upload"
                :src="renderMenu.meta?.iconPath"
                class="w-[16px] h-[16px]"
            />
            <icon-select
                v-else-if="renderMenu.meta?.iconType === IconType.lib"
                class="!w-[16px] h-[16px]"
                size="16px"
                :modelValue="renderMenu.meta?.icon"
                status="preview"
            />

            <p class="flex items-center ml-2" v-html="renderMenu.meta?.title" />
            <span
                class="block absolute right-6"
                v-show="renderMenu.children?.length > 0"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="5.795"
                    viewBox="0 0 10 5.795"
                    fill="#ABABAB"
                >
                    <path
                        d="M171.376,362.025a.753.753,0,0,0,1.011.049l.054-.049,3.725-3.725,3.7,3.749a.753.753,0,0,0,1.011.055l.054-.048a.753.753,0,0,0,.055-1.011l-.048-.054-4.233-4.289a.753.753,0,0,0-1.017-.05l-.051.047-4.261,4.261a.753.753,0,0,0,0,1.066Z"
                        transform="translate(-171.155 -356.479)"
                    />
                </svg>
            </span>
        </summary>
        <ul v-if="renderMenu.children?.length > 0">
            <li
                v-for="(item, index) in renderMenu.children"
                :key="index"
                :class="[
                    'cursor-pointer select-none list-none block pr-6 pl-[calc(theme(space.12))] py-4 border-l-[5px]',
                    isActive(item)
                        ? 'bg-[var(--el-color-primary-light-8)] border-[var(--el-color-primary)]'
                        : 'border-transparent'
                ]"
                @click="onJump(item)"
            >
                {{ item.meta?.title }}
            </li>
        </ul>
    </details>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconSelect from '@/components/icon-select/index.vue';
import { IconType } from '@/pages/system/menu/config';

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const route = useRoute();
const router = useRouter();
const detailsRef = ref<HTMLDetailsElement | null>(null);

const renderMenu = computed(() => {
    if ((props.item.children?.length ?? 0) === 0) {
        return props.item;
    }
    return props.item.children?.length === 1 && !props.item.alwaysShow
        ? props.item.children[0]
        : props.item;
});

const isActive = (item: { path: string; children: unknown[] }) => {
    return (
        route.path === `/${item.path}`.replace(/(?<!https?:)\/\/+/g, '/') &&
        !item.children?.length
    );
};

const shouldOpen = computed(() => {
    if (renderMenu.value.children?.length > 0) {
        return renderMenu.value.children.some(isActive);
    }
    return false;
});

const onJump = (item: { path: string; children: unknown[] }) => {
    if (item.children?.length > 0) {
        return;
    }

    if (/^https?:\/\/.*/.test(item.path)) {
        window.open(item.path, '_blank');
        return;
    }
    router.push(`/${item.path}`.replace(/(?<!https?:)\/\/+/g, '/'));
};

onMounted(async () => {
    await nextTick();
    if (detailsRef.value) {
        detailsRef.value.open = shouldOpen.value;
    }
});
</script>
