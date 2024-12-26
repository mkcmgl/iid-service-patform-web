<template>
    <div
        class="min-h-screen min-w-screen bg-cover"
        :style="{
            backgroundImage: `url(${platformStore.platform.loginBackgroundPath})`
        }"
    >
        <header
            class="fixed top-[60px] left-[max(20px,5vw)] flex items-center justify-center w-fit -mx-2"
        >
            <img
                :src="platformStore.platform.logoPath"
                :alt="platformStore.platform.systemName"
                class="h-[75px] w-[75px] mx-2.5"
            />
            <div class="mx-2">
                <h1 class="font-bold text-[40px] text-[#555454]">
                    {{ platformStore.platform.systemName }}
                </h1>
                <p class="text-sm text-[#666666]">
                    {{ platformStore.platform.englishName }}
                </p>
            </div>
        </header>

        <div
            class="w-[400px] px-12 py-10 border bg-white rounded shadow-lg fixed top-1/2 -translate-y-1/2 left-1/2 translate-x-[calc(-50%+400px)]"
            theme="login"
        >
            <h1
                class="mb-4 py-1 pl-4 border-l-4 border-[var(--el-color-primary)] font-bold"
            >
                找回密码
            </h1>

            <el-form
                label-width="40px"
                hide-required-asterisk
                size="large"
                ref="formRef"
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
                    prop="sms"
                    icon-type="sms"
                    prefix-type="sms"
                    placeholder="请输入短信验证码"
                    show-password
                    :onSendSms="onSendSms"
                />
                <FormLine
                    v-model="formValues.password"
                    prop="password"
                    autocomplete="new-password"
                    icon-type="password"
                    placeholder="请输入新密码"
                    show-password
                />
            </el-form>
            <ElButton
                type="primary"
                class="w-full mt-4"
                size="large"
                :loading="loading"
                @click="resetPassword"
            >
                重置密码
            </ElButton>
            <footer class="mt-4 flex items-center justify-center">
                <ElButton
                    link
                    type="primary"
                    @click="
                        () =>
                            router.push({
                                name: 'login'
                            })
                    "
                >
                    返回登录
                </ElButton>
                <!-- <ElButton
                    link
                    type="primary"
                    @click="
                        () =>
                            router.push({
                                name: 'register'
                            })
                    "
                >
                    没有账户？立即注册
                </ElButton> -->
            </footer>
        </div>
        <div
            v-if="platformStore.platform.copyright"
            class="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-slate-600"
        >
            {{ platformStore.platform.copyright }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MD5 from 'crypto-js/md5';
import { notify } from '@kyvg/vue3-notification';
import { useMeta } from 'vue-meta';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '@/store/platform';
import axios from '@/plugins/axios';
import FormLine from '@/components/login/FormLine.vue';
import { ElForm } from 'element-plus';
import { passwordRules } from '@/data/validator';

const initValues = {
    phone: '',
    password: '',
    code: '',
    uuid: '',
    captcha: ''
};
const formValues = ref({ ...initValues });
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
    ],
    password: [
        {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
        },
        ...passwordRules
    ]
});
const loading = ref(false);
const formRef = ref<InstanceType<typeof ElForm>>();
const captchaRef = ref<InstanceType<typeof FormLine>>();
const router = useRouter();
const platformStore = usePlatformStore();

const onSendSms = async () => {
    await formRef.value?.validateField(['phone']);
    await axios.post('/app/sendPhoneCode', {
        phone: formValues.value.phone,
        loginType: '00',
        msgType: '03'
    });
    notify({
        type: 'success',
        title: '短信已发送',
        text: '短信发送成功，5 分钟内有效'
    });
};

const resetPassword = async () => {
    try {
        const valid = await formRef.value?.validate().catch(() => false);
        if (!valid) {
            return false;
        }

        loading.value = true;
        const { data } = await axios.post('/forgetPwd', {
            phone: formValues.value.phone,
            code: formValues.value.code,
            captcha: formValues.value.captcha,
            uuid: formValues.value.uuid,
            password: MD5(formValues.value.password).toString()
        });
        if (data.code !== 200) {
            notify({
                type: 'error',
                title: '错误',
                text: data.msg
            });

            formValues.value = { ...initValues };
            throw new Error(data.msg);
        }

        notify({
            type: 'success',
            title: '成功',
            text: '密码重置成功，请重新登录'
        });
        router.replace({
            name: 'login'
        });
    } catch (error) {
        captchaRef.value?.refreshCaptcha();
        formValues.value.captcha = '';
    } finally {
        loading.value = false;
    }
};

useMeta({
    title: '找回密码'
});
</script>
