<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            菜单管理
        </h1>
        <VersaButton
            buttonText="新增菜单"
            type="primary"
            @click="onEmitCreate"
        />
    </div>
    <VersaPage
        ref="versaPageRef"
        listKey="data.data"
        rowKey="menuId"
        api="/system/menu/menuTreeSelect"
        :extraTableProps="{
            'default-expand-all': true
        }"
        :needPagination="false"
        :filterOptions="filterOptions"
        :tableOptions="tableOptions"
        :detailProps="detailProps"
        :onCreate="onActionCallBack.bind(null, 'create')"
        :onUpdate="onActionCallBack.bind(null, 'edit')"
    >
        <template #iconPath="{ row }">
            <div
                v-if="row.iconType === IconType.upload && row.parentId === 0"
                class="w-[20px] h-[20px]"
            >
                <img :src="row.iconPath" class="w-[100%]" />
            </div>
            <div
                v-else-if="row.iconType === IconType.lib && row.parentId === 0"
                class="flex items-center"
            >
                <icon-select :modelValue="row.icon" status="preview" />
            </div>
        </template>
    </VersaPage>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';
import axios from '@/plugins/axios.js';
import { useMeta } from 'vue-meta';
import notify from '@/plugins/notify';
import type { MenuFormValues, MenuRow, Option } from '@/types/menu';
import {
    MenuType,
    menuTypeMap,
    IsFrame,
    isFrameMap,
    IconType,
    iconTypeMap,
    menuLevelMap,
    MenuLevel
} from './config';

const defaultValues = {
    menuLevel: MenuLevel.first,
    isFrame: IsFrame.N,
    iconType: IconType.lib
};

const versaPageRef = ref();
const headMenus = ref<Option[]>([]);
const filterOptions = ref([
    {
        label: '菜单名称',
        prop: 'menuName',
        element: 'el-input'
    },
    {
        label: '菜单路径',
        prop: 'component',
        element: 'el-input'
    }
]);

const tableOptions = ref([
    {
        prop: 'menuName',
        label: '菜单名称',
        width: '160'
    },
    {
        prop: 'menuTypeLevel',
        label: '菜单级别',
        width: '100',
        formatter: (row: MenuRow) => {
            return `${row.parentId ? '二级' : '一级'} ${menuTypeMap[row.menuType]}`;
        }
    },
    {
        prop: 'menuType',
        label: '菜单类型',
        mapSource: menuTypeMap,
        width: '100'
    },
    {
        prop: 'iconPath',
        label: '图标',
        slotName: 'iconPath'
    },
    {
        prop: 'orderNum',
        label: '排序'
    },
    {
        prop: 'component',
        width: '180',
        label: '路径'
    },
    {
        prop: 'createTime',
        width: '180',
        label: '创建时间'
    },
    {
        prop: 'actions',
        label: '操作',
        fixed: 'right',
        width: '200',
        actions: (row: MenuRow) => {
            const disableRemove = row.children?.length > 0;
            return [
                {
                    title: '编辑菜单',
                    actionName: '编辑',
                    actionType: 'edit'
                },
                {
                    title: '新增菜单',
                    actionType: 'create',
                    actionName: '新增二级菜单',
                    disabled: !!row.parentId || row.menuType === MenuType.menu,
                    defaultValues: {
                        ...defaultValues,
                        menuLevel: MenuLevel.second,
                        parentId: row.menuId
                    }
                },
                {
                    actionType: 'customRemove',
                    actionName: '删除',
                    popconfirm: {
                        title: disableRemove
                            ? '暂不可执行删除操作'
                            : '您正准备删除一个菜单',
                        message: disableRemove
                            ? '该菜单下还有二级菜单，请先删除该菜单下的二级菜单，再执行删除操作<br>数据删除后不可恢复，请谨慎操作'
                            : '点击确定按钮，将执行删除操作<br>数据删除后不可恢复，请谨慎操作'
                    },
                    action: async () => {
                        if (disableRemove) {
                            return;
                        }
                        await axios.delete('/system/menu/delete', {
                            params: { menuId: row.menuId }
                        });
                        notify({
                            type: 'success',
                            title: '删除成功'
                        });

                        initHeadMenus();
                        versaPageRef.value.refresh();
                    }
                }
            ];
        }
    }
]);

const detailProps = computed(() => ({
    formatBefore: async (row: MenuRow) => {
        const res = await axios.get<{ data: MenuFormValues }>(
            '/system/menu/detail',
            {
                params: { menuId: row.menuId }
            }
        );
        const data = res.data.data ?? {};
        return {
            ...data,
            menuLevel: data.parentId ? MenuLevel.second : MenuLevel.first,
            children: row.children
        };
    },
    defaultValues: { ...defaultValues },
    hideRequiredAsterisk: true,
    title: '新增菜单',
    width: '550px',
    'align-center': true,
    options: [
        {
            label: '菜单级别',
            prop: 'menuLevel',
            element: 'versa-radio-group',
            status: (
                formValues: MenuFormValues,
                _: unknown,
                { actionType }: { actionType: string }
            ) => {
                if (actionType !== 'detail') {
                    return formValues.children?.length > 0
                        ? 'disabled'
                        : 'edit';
                }
                return 'preview';
            },
            button: true,
            mapSource: menuLevelMap,
            rules: [{ required: true, message: '请选择菜单级别' }]
        },
        {
            label: '上级菜单',
            prop: 'parentId',
            element: 'versa-select',
            when: (formValues: MenuFormValues) =>
                formValues.menuLevel === MenuLevel.second,
            options: headMenus.value,
            rules: [{ required: true, message: '请选择上级菜单' }]
        },
        {
            label: '菜单类型',
            prop: 'menuType',
            element: 'versa-radio-group',
            button: true,
            mapSource: menuTypeMap,
            rules: [{ required: true, message: '请选择菜单类型' }]
        },
        {
            label: '菜单名称',
            prop: 'menuName',
            element: 'el-input',
            rules: [
                {
                    required: true,
                    max: 10,
                    message: '请输入菜单名称，最大支持10个字符'
                }
            ],
            tips: '支持中英文及数字，英文区分大小写，长度1-50字符'
        },
        {
            label: '是否外链',
            prop: 'isFrame',
            element: 'versa-radio-group',
            when: (formValues: MenuFormValues) =>
                formValues.menuType === MenuType.menu,
            mapSource: isFrameMap,
            rules: [
                {
                    required: true,
                    max: 10,
                    message: '请选择是否外链'
                }
            ]
        },
        {
            label: '路径',
            prop: 'component',
            element: 'el-input',
            when: (formValues: MenuFormValues) =>
                formValues.menuType === MenuType.menu &&
                formValues.isFrame == IsFrame.N,
            rules: [
                {
                    required: true,
                    message: '请输入路径'
                }
            ]
        },
        {
            label: '路径',
            prop: 'path',
            element: 'el-input',
            when: (formValues: MenuFormValues) =>
                formValues.menuType === MenuType.menu &&
                formValues.isFrame === IsFrame.Y,
            rules: [
                {
                    required: true,
                    type: 'url' as const,
                    message: "请输入'http(s)://'开头的合法url"
                }
            ],
            tips: "外链访问需'http(s)://'开头"
        },
        {
            label: '排序',
            prop: 'orderNum',
            element: 'el-input-number',
            min: 1,
            placeholder: '请输入',
            rules: [
                {
                    required: true,
                    type: 'integer' as const,
                    message: '请输入排序,必须为正整数'
                }
            ]
        },
        {
            label: '图标',
            prop: 'iconType',
            element: 'versa-radio-group',
            button: true,
            mapSource: iconTypeMap,
            when: (formValues: MenuFormValues) =>
                formValues.menuLevel === MenuLevel.first
        },
        {
            label: '图标',
            prop: 'icon',
            element: 'icon-select',
            when: (formValues: MenuFormValues) =>
                formValues.menuLevel === MenuLevel.first &&
                formValues.iconType === IconType.lib,
            rules: [
                {
                    required: true,
                    message: '请选择图标'
                }
            ]
        },
        {
            label: '上传图标',
            prop: 'iconPath',
            element: 'versa-image-upload',
            maxSize: 10 * 1024,
            onUpload: async (file: File) => {
                const formData = new FormData();
                formData.append('file', file);
                const res = await axios.post('/common/upload', formData);
                return res.data.url;
            },
            accept: '.svg',
            when: (formValues: MenuFormValues) =>
                formValues.menuLevel === MenuLevel.first &&
                formValues.iconType === IconType.upload,
            tips: '建议尺寸：宽15px*高15px。限svg格式，不大于10KB',
            rules: [
                {
                    required: true,
                    message: '请上传图标'
                }
            ]
        }
    ]
}));

async function initHeadMenus() {
    const res = await axios.get<{ data: MenuRow[] }>('/system/menu/list');
    headMenus.value = res.data.data
        .filter(
            (item) => item.menuType === MenuType.directory && !item.parentId
        )
        .map((item) => ({ label: item.menuName, value: item.menuId }));
}

// 触发新增菜单
const onEmitCreate = () => {
    versaPageRef.value.onAction('create', { title: '新增菜单' });
};

// 新增、编辑回调
const onActionCallBack = async (type: string, formValues: MenuFormValues) => {
    const isCreate = type === 'create';
    const rewritePath =
        formValues.isFrame === IsFrame.Y
            ? formValues.path
            : formValues.component;
    await axios.post(`/system/menu/${isCreate ? 'add' : 'edit'}`, {
        ...formValues,
        component: rewritePath,
        path: rewritePath,
        parentId:
            formValues.menuLevel === MenuLevel.first ? 0 : formValues.parentId
    });
    notify({
        type: 'success',
        title: `${isCreate ? '新增' : '编辑'}成功`
    });
    initHeadMenus();
};

onBeforeMount(() => {
    initHeadMenus();
});

useMeta({
    title: '菜单管理'
});
</script>

<style scoped lang="scss"></style>
