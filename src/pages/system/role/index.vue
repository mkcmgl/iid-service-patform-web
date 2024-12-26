<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            角色管理
        </h1>
        <VersaButton
            buttonText="新增角色"
            type="primary"
            @click="onEmitCreate"
        />
    </div>
    <VersaPage
        ref="versaPageRef"
        listKey="data.rows"
        api="/system/role/list"
        :filterOptions="filterOptions"
        :tableOptions="tableOptions"
        :detailProps="detailProps"
        :onCreate="onCreate"
        :onUpdate="onUpdate"
    >
    </VersaPage>
</template>

<script lang="ts" setup>
import { markRaw, ref } from 'vue';
import axios from '@/plugins/axios.js';
import { useMeta } from 'vue-meta';
import notify from '@/plugins/notify';
import type { RoleFormValues, RoleRow } from '@/types/role';
import type { MenuRow } from '@/types/menu';
import type { FormStatus } from 'versa-form/types/VersaForm';
import MenuSeclect from '@/components/menu-select/index.vue';

const versaPageRef = ref();
// 缓存菜单列表
const queryMenuList = (() => {
    let callback: (val: unknown) => void = () => {};
    const promise = new Promise((resolve) => {
        callback = resolve;
    });

    const initMenuList = async () => {
        try {
            const res = await axios.get<{ data: MenuRow[] }>(
                '/system/menu/menuTreeSelect',
                {}
            );
            callback(res.data?.data ?? []);
        } catch (error) {
            callback([]);
        }
    };
    initMenuList();

    return () => promise;
})();

// 筛选栏信息
const filterOptions = [
    {
        label: '角色名称',
        prop: 'roleName',
        element: 'el-input'
    },
    {
        label: '角色编码',
        prop: 'roleKey',
        element: 'el-input'
    }
];
const tableOptions = ref([
    {
        prop: 'roleName',
        label: '角色名称'
    },
    {
        prop: 'roleKey',
        label: '角色编码'
    },
    {
        prop: 'createTime',
        label: '创建时间'
    },
    {
        prop: 'updateTime',
        label: '更新时间'
    },
    {
        prop: 'actions',
        label: '操作',
        width: '200',
        actions: (row: RoleRow) => {
            return [
                {
                    title: '查看角色',
                    actionName: '查看',
                    actionType: 'detail',
                    actions: [
                        'cancel',
                        {
                            actionName: '确认',
                            type: 'primary',
                            actionType: 'cancel'
                        }
                    ]
                },
                {
                    title: '编辑角色',
                    actionName: '编辑',
                    actionType: 'edit'
                },
                {
                    title: '授权角色',
                    actionName: '授权',
                    actionType: 'auth',
                    usePageModal: true,
                    actions: [
                        'cancel',
                        {
                            actionName: '确认',
                            type: 'primary',
                            actionType: 'confirm'
                        }
                    ]
                },
                ['admin', 'general'].includes(row.roleKey)
                    ? null
                    : {
                          actionType: 'customRemove',
                          actionName: '删除',
                          popconfirm: {
                              title: '您正准备删除一个角色',
                              message:
                                  '点击确定按钮，将执行删除操作<br>数据删除后不可恢复，请谨慎操作'
                          },
                          action: async () => {
                              await axios.delete('/system/role/delete', {
                                  params: { roleId: row.roleId }
                              });
                              notify({
                                  type: 'success',
                                  title: '删除成功'
                              });

                              versaPageRef.value.refresh();
                          }
                      }
            ];
        }
    }
]);

const detailProps = ref({
    formatBefore: async (row: RoleRow) => {
        const res = await axios.get<{ data: RoleFormValues }>(
            '/system/role/detail',
            {
                params: { roleId: row.roleId }
            }
        );
        return res.data.data ?? {};
    },
    hideRequiredAsterisk: true,
    width: '550px',
    maxHeight: '60vh',
    'align-center': true,
    options: [
        {
            label: '角色名称',
            prop: 'roleName',
            element: 'el-input',
            tips: '支持中英文及数字，区分大小写，长度1-10字符',
            rules: [
                {
                    required: true,
                    max: 10,
                    message: '请输入长度1-10字符的角色名称'
                },
                {
                    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                    message: '仅支持中英文及数字'
                }
            ]
        },
        {
            label: '角色编码',
            prop: 'roleKey',
            element: 'el-input',
            tips: '支持小写字母，长度1-20字符',
            rules: [
                {
                    required: true,
                    max: 20,
                    message: '请输入长度1-20字符的角色编码'
                },
                { pattern: /^[a-z]+$/, message: '仅支持小写字母' }
            ]
        },
        {
            label: '角色描述',
            prop: 'remark',
            type: 'textarea',
            element: 'el-input',
            placeholder: '请输入角色描述',
            rules: [{ max: 100, message: '限100字符' }]
        },
        {
            label: '菜单权限',
            prop: 'menuIds',
            element: markRaw(MenuSeclect),
            useCustomPreview: true,
            props: {
                label: 'menuName'
            },
            'node-key': 'menuId',
            status: (
                _row: unknown,
                _option: unknown,
                {
                    actionType,
                    globalStatus
                }: { actionType: string; globalStatus: FormStatus }
            ) => (actionType === 'auth' ? 'edit' : globalStatus),
            queryMenuList: queryMenuList
        }
    ]
});

// 触发新增用户
const onEmitCreate = () => {
    versaPageRef.value.onAction('create', { title: '新增角色' });
};

// 创建用户接口交互
const onCreate = async (formValues: RoleFormValues) => {
    await axios.post('/system/role/add', formValues);
    notify({
        type: 'success',
        title: '新增成功'
    });
};

// 编辑用户接口交互
const onUpdate = async (formValues: RoleFormValues) => {
    await axios.post('/system/role/edit', formValues);
    notify({
        type: 'success',
        title: '编辑成功'
    });
};

useMeta({
    title: '角色管理'
});
</script>

<style scoped lang="scss"></style>
