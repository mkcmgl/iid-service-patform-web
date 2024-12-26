<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            用户管理
        </h1>
        <VersaButton
            buttonText="新增用户"
            type="primary"
            @click="onEmitCreate"
        />
    </div>
    <VersaPage
        ref="versaPageRef"
        rowKey="userId"
        listKey="data.rows"
        api="/system/user/list"
        :keyMap="{ createTime: ['startTime', 'endTime'] }"
        :filterOptions="filterOptions"
        :tableOptions="tableOptions"
        :detailProps="detailProps"
        :onCreate="onActionCallBack.bind(null, 'create')"
        :onUpdate="onActionCallBack.bind(null, 'edit')"
        :onRemove="onRemove"
    >
    </VersaPage>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useMeta } from 'vue-meta';
import axios from '@/plugins/axios.js';
import notify from '@/plugins/notify';
import type { UserFormValues, UserRow } from '@/types/user';
import { UserState, userStateOptions } from './config';
import { RoleRow } from '@/types/role';
import { passwordRules } from '@/data/validator';
import MD5 from 'crypto-js/md5';

const versaPageRef = ref();
const roleList = ref<Record<string, string | number>[]>([]);
const defaultValues = ref({
    roleIds: [] as number[],
    status: UserState.normal
});

const resetPasswordAction = {
    title: '重置密码',
    actionName: '重置密码',
    actionType: 'resetPassword',
    usePageModal: true,
    formatBefore: (row: UserRow) => ({
        userId: row.userId
    }),
    status: 'eidt',
    options: [
        {
            label: '新密码',
            prop: 'password',
            element: 'el-input',
            'show-password': true,
            autocomplete: 'new-password',
            rules: [
                { required: true, message: '请输入新密码' },
                ...passwordRules
            ],
            tips: '6-20字符，需包含数字、大小写字母、特殊字符'
        },
        {
            label: '再次输入',
            prop: 'checkpassword',
            'show-password': true,
            autocomplete: 'new-password',
            element: 'el-input',
            rules: (formValues: {
                password: string;
                checkpassword: string;
            }) => ({
                validator(_: unknown, value: string) {
                    const errors = [];
                    if (formValues.password !== value) {
                        errors.push('两次输入不一致');
                    }
                    return errors;
                }
            })
        }
    ],
    actions: [
        'cancel',
        {
            actionType: 'resetPasswordConfirm',
            actionName: '确认',
            type: 'primary',
            action: async (
                values: { userId: number; password: string },
                _: unknown,
                { close }: { close: () => void }
            ) => {
                await axios.post('/system/user/resetPwd', {
                    userId: values.userId,
                    password: MD5(values.password).toString()
                });
                notify({
                    type: 'success',
                    title: '重置密码成功'
                });
                close();
            }
        }
    ]
};

const tableOptions = computed(() => {
    return [
        {
            prop: 'userName',
            label: '账号',
            width: '100'
        },
        {
            prop: 'phoneNumber',
            label: '手机号',
            width: '120'
        },
        {
            prop: 'roleName',
            label: '角色',
            width: '160'
        },
        {
            prop: 'createTime',
            width: '180',
            label: '创建时间'
        },
        {
            prop: 'status',
            label: '用户状态'
        },
        {
            prop: 'authState',
            label: '认证状态'
        },
        {
            prop: 'actions',
            label: '操作',
            fixed: 'right',
            width: '200',
            actions: (row: UserRow) => {
                return [
                    {
                        title: '编辑用户',
                        actionName: '编辑',
                        actionType: 'edit'
                    },
                    resetPasswordAction,
                    ['admin'].includes(row.userName)
                        ? null
                        : {
                              actionType: 'remove',
                              actionName: '删除',
                              disabled: (row: UserRow) => row.admin,
                              popconfirm: {
                                  title: '您正准备删除一个用户',
                                  message:
                                      '点击确定按钮，将执行删除操作<br>数据删除后不可恢复，请谨慎操作'
                              }
                          }
                ];
            }
        }
    ].filter((item) => item !== null);
});

// 筛选栏信息
const filterOptions = computed(() => {
    return [
        {
            label: '账号',
            prop: 'userName',
            element: 'el-input'
        },
        {
            label: '手机号',
            prop: 'phoneNumber',
            element: 'el-input'
        },
        {
            label: '角色',
            prop: 'roleId',
            element: 'versa-select',
            clearable: true,
            options: roleList.value
        },
        {
            label: '用户状态',
            prop: 'status',
            element: 'versa-select',
            clearable: true,
            options: userStateOptions
        },
        {
            label: '创建时间',
            prop: 'createTime',
            type: 'daterange',
            style: { width: '240px' },
            element: 'el-date-picker'
        }
    ];
});

const detailProps = computed(() => {
    return {
        formatBefore: async (row: UserRow) => {
            const res = await axios.get<{ data: UserRow }>(
                '/system/user/detail',
                {
                    params: { userId: row.userId }
                }
            );
            const data = res.data?.data ?? {};
            return {
                ...data,
                roleIds: data.roles?.map((item) => item.roleId) ?? []
            };
        },
        hideRequiredAsterisk: true,
        defaultValues: defaultValues.value,
        width: '450px',
        options: [
            {
                label: '账号',
                prop: 'userName',
                element: 'el-input',
                rules: [
                    {
                        required: true,
                        min: 5,
                        max: 50,
                        message: '请输入账号，5-20字符'
                    }
                ]
            },
            {
                label: '手机号',
                prop: 'phoneNumber',
                element: 'el-input',
                rules: [
                    { required: true, message: '请输入手机号' },
                    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' }
                ]
            },
            {
                label: '角色',
                prop: 'roleIds',
                element: 'versa-select',
                multiple: true,
                options: roleList.value,
                rules: [{ required: true, message: '请选择角色' }]
            },
            {
                label: '用户状态',
                prop: 'status',
                element: 'versa-radio-group',
                options: userStateOptions,
                rules: [
                    {
                        required: true,
                        message: '请选择用户状态'
                    }
                ]
            }
        ]
    };
});

// 触发新增用户
const onEmitCreate = () => {
    versaPageRef.value.onAction('create', { title: '新增用户' });
};

// 新增、编辑回调
const onActionCallBack = async (type: string, formValues: UserFormValues) => {
    const isCreate = type === 'create';
    await axios.post(`/system/user/${isCreate ? 'add' : 'edit'}`, formValues);
    notify({
        type: 'success',
        title: `${isCreate ? '新增' : '编辑'}成功`
    });
};

// 删除用户接口交互
const onRemove = async (userId: number) => {
    await axios.delete('/system/user/delete', {
        params: { userId }
    });
    notify({
        type: 'success',
        title: '删除成功'
    });
};

// 获取角色列表
const initRoleList = async () => {
    const res = await axios.get<{ rows: RoleRow[] }>('/system/role/list', {
        params: {
            pageNum: 1,
            pageSize: 10000
        }
    });
    const answer: Record<string, string | number>[] = [];
    res.data.rows.forEach((item) => {
        answer.push({
            label: item.roleName,
            value: item.roleId
        });
        if (item.roleKey === 'general') {
            defaultValues.value.roleIds = [item.roleId];
        }
    });

    roleList.value = answer;
};

onBeforeMount(() => {
    initRoleList();
});

useMeta({
    title: '用户管理'
});
</script>

<style scoped lang="scss"></style>
