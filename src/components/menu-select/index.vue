<template>
    <div class="menu-select w-full">
        <el-checkbox
            class="pl-6"
            v-if="!state.loading && status === 'edit' && treeData.length > 0"
            @change="onToggleAll"
            v-model="state.selectAll"
        >
            全选/全不选
        </el-checkbox>
        <el-tree
            ref="treeRef"
            node-key="id"
            show-checkbox
            :expand-on-click-node="false"
            :data="treeData"
            :empty-text="state.loading ? '加载中，请稍后' : '暂无数据'"
            v-bind="$attrs"
            @check-change="onCheckChange"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { CheckboxValueType, ElTree } from 'element-plus';
import type {
    TreeKey,
    TreeNodeData
} from 'element-plus/es/components/tree/src/tree.type';

const props = defineProps({
    modelValue: {
        type: Array<TreeKey>,
        default: () => []
    },
    // edit/preview
    status: {
        type: String,
        default: 'edit'
    },
    queryMenuList: {
        type: Function,
        default: () => []
    }
});

const emits = defineEmits(['update:modelValue']);

const state = reactive<{
    data: TreeNodeData[];
    flatData: TreeNodeData[];
    loading: boolean;
    selectAll: boolean;
}>({
    data: [],
    flatData: [],
    loading: false,
    selectAll: false
});
const treeRef = ref<InstanceType<typeof ElTree> | null>(null);

const treeData = computed(() => {
    if (props.status !== 'preview') {
        return state.data;
    }

    // 预览状态只展示选中的值
    const traverse = (dataSource = [] as TreeNodeData[]): TreeNodeData[] => {
        return (
            dataSource?.map((item) => {
                return {
                    ...item,
                    disabled: true,
                    children: traverse(item.children)
                };
            }) ?? []
        );
    };
    return traverse(state.data);
});

const getCheckedKeys = () => {
    // 目前被选中的菜单节点
    const checkedKeys = treeRef.value?.getCheckedKeys() ?? [];
    // 半选中的菜单节点
    const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys() ?? [];
    return [...checkedKeys, ...halfCheckedKeys];
};

const onToggleAll = (checked: CheckboxValueType) => {
    // @ts-expect-error 类型不一致，仅传入id
    treeRef.value?.setCheckedNodes(checked ? state.flatData : []);
    emits('update:modelValue', getCheckedKeys());
};

const onCheckChange = () => {
    emits('update:modelValue', getCheckedKeys());
};

const initSelectAll = () => {
    const checkedsKeys = treeRef.value?.getCheckedKeys() ?? [];
    state.selectAll =
        state.flatData.length > 0 &&
        checkedsKeys.length > 0 &&
        checkedsKeys.length === state.flatData.length;
};

const treeToFlat = (data: TreeNodeData[]) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const list: TreeNodeData[] = [];
    data.forEach((item) => {
        list.push(item);
        list.push(treeToFlat(item.children));
    });

    return list.flat();
};

watch(
    () => props.modelValue,
    () => {
        // @FIXME: 临时移除一级菜单的选中，不合理的逻辑，且不支持多级路由
        const toCheck = (props.modelValue ?? [])?.filter((item) => {
            const target = state.flatData.find((d) => d.menuId === item);
            return (
                !!target?.parentId ||
                (!target?.parentId && (target?.children?.length ?? 0) === 0)
            );
        });
        treeRef.value?.setCheckedKeys(toCheck);
        initSelectAll();
    }
);

onBeforeMount(async () => {
    state.loading = true;
    state.data = await props.queryMenuList();
    state.flatData = treeToFlat(state.data);
    state.loading = false;
    initSelectAll();
});
</script>

<script lang="ts">
export default {
    name: 'menu-select'
};
</script>

<style lang="scss" scoped>
.menu-select {
    :deep(
            .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after
        ) {
        border-color: var(--el-checkbox-checked-icon-color);
    }

    :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
        background-color: var(--el-checkbox-checked-bg-color);
        border-color: var(--el-checkbox-checked-input-border-color);
    }

    :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
        color: #606266;
    }
}
</style>
