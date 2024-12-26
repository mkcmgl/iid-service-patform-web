<template>
    <div class="w-[100%] my-5 flex items-center justify-between">
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none mr-auto"
        >
            凭证验证
        </h1>
        <VersaButton
            buttonText="验证凭证"
            type="primary"
            plain
            @click="onVerifySingle"
        />
        <VersaButton
            buttonText="创建验证模板"
            type="primary"
            @click="onEmitCreate"
        />
    </div>

    <div
        class="flex items-center my-5 py-2.5 bg-[#E3EFFF] pl-[15px] pr-[12px] rounded border border-[#B2CEFB]"
    >
        <img class="w-4 h-4" :src="IconWarning" />
        <p class="text-[#666666] text-sm pl-2.5 leading-5">
            您可以在验证模板中选择要验证的凭证或凭证集合，持证方收到验证请求后根据模板要求出示要验证的凭证
        </p>
    </div>
    <VersaPage
        ref="pageRef"
        rowKey="userId"
        listKey="data.rows"
        api="/did/group/list"
        :filterOptions="filterOptions"
        :tableOptions="tableOptions"
        :detail-props="detailProps"
        :onCreate="onActionCallBack.bind(null, 'create')"
        :onUpdate="onActionCallBack.bind(null, 'edit')"
    >
    </VersaPage>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useMeta } from 'vue-meta';
import notify from '@/plugins/notify';
import IconWarning from '@/assets/images/icon_warning.svg';
import { useRouter } from 'vue-router';
import type {
    BaseOptions,
    FormValues,
    TableOption,
    VersaModalProps,
    VersaPage
} from 'versa-form';
import type { VerfiyGroupForm, VerfiyGroupRow } from '@/types/verify-group';
import { useAuthStore } from '@/store/auth';
import { CertTemplate } from '@/types/certs';
import axios from 'axios';
import { TemplateStatus } from '@/data/certs';

const router = useRouter();
const authStore = useAuthStore();
const pageRef =
    ref<InstanceType<VersaPage<VerfiyGroupRow, FormValues, VerfiyGroupForm>>>();
const templateIdList = ref<BaseOptions[]>([]);

const tableOptions = ref<TableOption<VerfiyGroupRow>[]>([
    {
        prop: 'groupId',
        label: '模板ID',
        width: '100'
    },
    {
        prop: 'groupName',
        label: '模板名称'
    },
    {
        prop: 'templateIds',
        label: '待验证凭证数',
        width: '110',
        formatter: (row) => String(row.templateIds.split(',').length)
    },
    {
        prop: 'updateTime',
        width: '180',
        label: '更新时间'
    },
    {
        prop: 'createTime',
        width: '180',
        label: '创建时间'
    },
    {
        label: '操作',
        fixed: 'right',
        width: '240',
        actions: (row) => {
            return [
                {
                    actionName: '编辑',
                    actionType: 'edit',
                    title: '编辑验证模板'
                },
                {
                    title: '发起验证请求',
                    actionName: '发起验证请求',
                    actionType: 'LaunchVerfiy',
                    usePageModal: true,
                    status: 'edit',
                    actions: 'cancel,confirm',
                    formatBefore: async () => ({
                        ...row,
                        did: authStore.user.did
                    }),
                    options: [
                        {
                            label: '待验证放',
                            prop: 'did',
                            disabled: true,
                            element: 'el-input',
                            tips: '体验环境下只支持给当前账户发送验证请求',
                            placeholder: '请选择did'
                        }
                    ],
                    onOk: async () => {
                        // 是否安装浏览器插件
                        if (!window.IIDWallet) {
                            notify({
                                type: 'error',
                                text: '未检测到浏览器钱包插件'
                            });
                            throw new Error('未检测到浏览器钱包插件');
                        }

                        const pluginDID =
                            await window.IIDWallet.getActiveAccount();
                        if (pluginDID !== authStore.user.did) {
                            notify({
                                type: 'error',
                                text: '浏览器钱包插件账户与当前账户不一致，请切换钱包账户'
                            });
                            throw new Error(
                                '浏览器钱包插件账户与当前账户不一致，请切换钱包账户'
                            );
                        }

                        await window.IIDWallet.verifyCert({
                            templateIds: row.templateIds,
                            groupId: row.groupId
                        });

                        router.push({
                            name: 'VerifyHistory',
                            query: {
                                groupId: row.groupId
                            }
                        });
                    }
                },
                {
                    actionName: '验证记录',
                    actionType: 'VerfiyHistory',
                    action: () =>
                        router.push({
                            name: 'VerifyHistory',
                            query: {
                                groupId: row.groupId
                            }
                        })
                }
            ];
        }
    }
]);

const detailProps = computed<VersaModalProps<VerfiyGroupRow, VerfiyGroupForm>>(
    () => {
        return {
            labelWidth: '120px',
            formatBefore: async (row) => {
                return {
                    ...row,
                    templateIds: row.templateIds.split(',')
                };
            },
            options: [
                {
                    prop: 'groupName',
                    label: '模板名称',
                    element: 'el-input',
                    rules: [
                        {
                            required: true,
                            max: 20,
                            message: '请输入模板名称，限20字符'
                        }
                    ]
                },
                {
                    prop: 'groupDescription',
                    label: '模板描述',
                    element: 'el-input',
                    type: 'textarea',
                    rules: [
                        {
                            required: true,
                            max: 100,
                            message: '请输入模板描述，限100字符'
                        }
                    ]
                },
                {
                    prop: 'templateIds',
                    label: '待验证凭证',
                    element: 'versa-select',
                    tips: '凭证验证时, 持证方需按照验证模板要求出示待验证的凭证, 否则不予通过',
                    multiple: true,
                    'collapse-tags': true,
                    options: templateIdList.value,
                    rules: [{ required: true, message: '请选择待验证凭证' }]
                }
            ]
        };
    }
);

// 筛选栏信息
const filterOptions = computed(() => {
    return [
        {
            label: '模板名称',
            prop: 'groupName',
            element: 'el-input'
        }
    ];
});

const onEmitCreate = () => {
    pageRef.value?.onAction('create', { title: '新增校验模板' });
};

const onVerifySingle = () => {
    router.push({
        name: 'VerifySingle'
    });
};

// 新增、编辑回调
const onActionCallBack = async (type: string, formValues: VerfiyGroupForm) => {
    const isCreate = type === 'create';
    await axios('/did/group', {
        method: isCreate ? 'post' : 'put',
        data: {
            ...formValues,
            templateIds: formValues.templateIds.join(',')
        }
    });
    notify({
        type: 'success',
        title: isCreate ? '验证模板创建成功' : '验证模板更新成功'
    });
};

const initOptions = async () => {
    const res = await axios.get<{ rows: CertTemplate[] }>(
        '/did/template/list',
        {
            params: {
                pageNum: 1,
                pageSize: 1000,
                templateStatus: TemplateStatus.on
            }
        }
    );
    templateIdList.value = res.data.rows.map((item) => ({
        label: item.templateName,
        value: String(item.templateId)
    }));
};

useMeta({
    title: '凭证验证'
});

onBeforeMount(() => {
    initOptions();
});
</script>

<style scoped lang="scss"></style>
