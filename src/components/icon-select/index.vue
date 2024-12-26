<template>
    <div class="icon-select w-full">
        <template v-if="status === 'edit'">
            <el-input
                v-model="selectValue"
                placeholder="点击选择图标"
                v-click-outside="clickOutside"
                readonly
                ref="selectRef"
            >
                <template #prepend>
                    <el-icon>
                        <!-- @vue-ignore -->
                        <component
                            :is="ElementPlusIconsVue[selectValue] ?? undefined"
                        />
                    </el-icon>
                </template>
            </el-input>
            <el-popover
                shadow="none"
                ref="popoverRef"
                width="100%"
                virtual-triggering
                placement="top"
                trigger="click"
                :virtual-ref="selectRef"
                :teleported="false"
            >
                <el-input
                    v-model="searchValue"
                    placeholder="输入名称搜索图标"
                />
                <el-divider border-style="dashed" />
                <el-scrollbar height="220px">
                    <template v-for="icon in filterIcons" :key="icon">
                        <el-icon
                            class="mr-[10px] mb-[10px] cursor-pointer"
                            @click="selectIcon(icon)"
                        >
                            <!-- @vue-ignore -->
                            <component
                                :is="ElementPlusIconsVue[icon] ?? undefined"
                            />
                        </el-icon>
                    </template>
                </el-scrollbar>
            </el-popover>
        </template>
        <el-icon :style="{ fontSize: size }" v-else>
            <!-- @vue-ignore -->
            <component :is="ElementPlusIconsVue[selectValue] ?? undefined" />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ClickOutside as vClickOutside } from 'element-plus';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        status?: string;
        size?: string;
    }>(),
    {
        status: 'edit',
        size: '20px'
    }
);

const emit = defineEmits(['update:modelValue']);

const selectValue = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emit('update:modelValue', val);
    }
});

const selectRef = ref();
const searchValue = ref('');
const popoverRef = ref();

// 点击其它区域隐藏 popover 弹窗
function clickOutside() {
    popoverRef.value?.popperRef?.delayHide?.();
}

const filterIcons = computed(() => {
    return Object.keys(ElementPlusIconsVue).filter((item) =>
        item
            .toLocaleLowerCase()
            .includes(searchValue.value?.toLocaleLowerCase())
    );
});

// 选则图标
const selectIcon = (icon: string) => {
    selectValue.value = icon;
    popoverRef.value?.hide();
    searchValue.value = '';
};
</script>

<style lang="scss" scoped>
.icon-select {
    .el-icon {
        font-size: 20px;
    }

    :deep(.el-input-group__prepend) {
        padding: 0 10px;
    }
    :deep() {
        .el-popper.is-dark {
            background-color: black;
        }

        .el-popper.is-dark .el-popper__arrow::before {
            background-color: black;
        }
    }
}
</style>
