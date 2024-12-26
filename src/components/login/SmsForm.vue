<template>
    <el-form
        label-width="40px"
        hide-required-asterisk
        size="large"
        ref="formRef"
        @keyup.enter="onLogin"
        :rules="rules"
        :model="formValues"
    >
        <FormLine
            v-model="formValues.phone"
            prop="phone"
            clearable
            icon-type="user"
            placeholder="请输入手机号码"
        />
        <FormLine
            v-model="formValues.captcha"
            v-model:uuid="formValues.uuid"
            prop="captcha"
            ref="captchaRef"
            clearable
            icon-type="captcha"
            prefix-type="captcha"
            placeholder="请输入验证码"
        />
        <FormLine
            v-model="formValues.code"
            prop="code"
            icon-type="sms"
            prefix-type="sms"
            placeholder="请输入短信验证码"
            :onSendSms="onSendSms"
        />
        <el-checkbox v-model="formValues.remeber"> 保持登录状态 </el-checkbox>
    </el-form>
    <ElButton
        type="primary"
        class="w-full mt-8"
        size="large"
        :loading="loading"
        @click="onLogin"
    >
        登录
    </ElButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from '@/plugins/axios';
import notify from '@/plugins/notify';
import { ElForm } from 'element-plus';
import FormLine from './FormLine.vue';

const emits = defineEmits(['handleTokenResponse']);

const formValues = ref({
    phone: '',
    code: '',
    uuid: '',
    captcha: '',
    remeber: false
});
const loading = ref(false);
const formRef = ref<InstanceType<typeof ElForm>>();
const captchaRef = ref<InstanceType<typeof FormLine>>();

const rules = ref({
    phone: [
        {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
        },
        { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确' }
    ],
    captcha: [
        {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
        }
    ],
    code: [
        {
            required: true,
            message: '短信验证码不能为空',
            trigger: 'blur'
        }
    ]
});

const onSendSms = async () => {
    try {
        await formRef.value?.validateField(['phone']);
        await axios.post('/app/sendPhoneCode', {
            phone: formValues.value.phone,
            msgType: '01',
            loginType: '00'
        });
        notify({
            type: 'success',
            title: '短信已发送',
            text: '短信发送成功，5 分钟内有效'
        });
    } catch (error) {
        captchaRef.value?.refreshCaptcha();
        formValues.value.captcha = '';
        throw error;
    }
};

const onLogin = async () => {
    try {
        const valid = await formRef.value?.validate().catch(() => false);
        if (!valid) {
            return false;
        }

        loading.value = true;

        const { data } = await axios.post('/login', {
            loginType: '1',
            phone: formValues.value.phone,
            code: formValues.value.code,
            uuid: formValues.value.uuid,
            captcha: formValues.value.captcha
        });

        emits('handleTokenResponse', data.token);
    } catch (error) {
        captchaRef.value?.refreshCaptcha();
        formValues.value.captcha = '';
    } finally {
        loading.value = false;
    }
};
</script>
