<template>
    <VersaCard v-loading="state.loading">
        <div class="flex items-center">
            <div class="w-28 mr-2.5 text-right text-sm text-[#999999]">
                初始登录密码：
            </div>
            <div class="text-sm text-[#333333]">
                {{ state.formValues.initPassword ? '已设置' : '未设置' }}
                。6-20字符，需包含数字、大小写字母、特殊字符
            </div>
            <el-tooltip
                placement="top"
                content="为管理员新增用户提供初始登录密码"
            >
                <img
                    :src="IconTooltip"
                    class="w-[20px] h-[20px] ml-2.5 cursor-pointer"
                />
            </el-tooltip>
            <el-button
                class="ml-auto"
                type="primary"
                link
                @click="onToogleUpdate('initPassword')"
            >
                修改
            </el-button>
        </div>
    </VersaCard>
    <VersaModal
        labelWidth="auto"
        width="450px"
        hideRequiredAsterisk
        v-model:visible="state.visible"
        v-bind="state.modalProps"
    >
    </VersaModal>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import axios from '@/plugins/axios';
import MD5 from 'crypto-js/md5';
import notify from '@/plugins/notify';
import type { GlobalBaseConfig } from '@/types/base-config';
import { AuthOnOff, DataUploadOnOff } from './config';
import IconTooltip from '@/assets/images/icon_tooltip.svg';
import { passwordRules } from '@/data/validator';

const state = reactive({
    visible: false,
    modalProps: {},
    formValues: {
        initPassword: '',
        dataUploadOnOff: DataUploadOnOff.off,
        dataUploadAddress: '',
        authOnOff: AuthOnOff.off
    },
    loading: true
});

const modalConfig = {
    initPassword: {
        title: '修改初始登录密码',
        options: [
            {
                label: '新密码',
                prop: 'initPassword',
                autocomplete: 'new-password',
                element: 'el-input',
                'show-password': true,
                rules: [
                    { required: true, message: '请输入新密码' },
                    ...passwordRules
                ]
            },
            {
                label: '再次输入',
                prop: 'checkpassword',
                autocomplete: 'new-password',
                'show-password': true,
                element: 'el-input',
                placeholder: '请再次输入新密码',
                rules: (formValues: {
                    initPassword: string;
                    checkpassword: string;
                }) => ({
                    validator(_: unknown, value: string) {
                        const errors = [];
                        if (formValues.initPassword !== value) {
                            errors.push('两次输入不一致');
                        }
                        return errors;
                    }
                })
            }
        ]
    }
};

const onUpdateConfig = async (
    type: keyof typeof modalConfig,
    values: Partial<GlobalBaseConfig>
) => {
    const { checkpassword, ...params } = {
        ...state.formValues,
        ...values,
        ...(type === 'initPassword'
            ? { initPassword: MD5(values.initPassword!).toString() }
            : {})
    };
    await axios.post('/system/baseConfig/updateGlobalStrategy', params);
    notify({
        type: 'success',
        title: '设置成功'
    });
    state.formValues = params;
};

const onToogleUpdate = (type: keyof typeof modalConfig) => {
    state.modalProps = {
        ...modalConfig[type],
        onOk: onUpdateConfig.bind(null, type),
        defaultValues: {}
    };
    state.visible = true;
};

onBeforeMount(async () => {
    try {
        state.loading = true;
        const res = await axios.get('/system/baseConfig/getGlobalStrategy');
        state.formValues = res?.data?.data ?? {};
    } catch (error) {
        // donothine
    }
    state.loading = false;
});
</script>
