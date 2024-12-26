<template>
    <div class="flex min-h-screen">
        <div
            class="w-[500px] min-h-screen bg-cover"
            :style="{
                backgroundImage: `url(${platformStore.platform.registerBackgroundPath})`
            }"
        >
            <header
                class="mt-[60px] mx-auto flex items-center justify-center w-fit -mx-2"
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
        </div>

        <div class="w-[calc(100vw-500px)] flex items-center justify-center">
            <div class="w-[500px]">
                <h1 class="mb-6 text-3xl tracking-widest">欢迎注册</h1>
                <el-form
                    hide-required-asterisk
                    size="large"
                    ref="formRef"
                    :rules="rules"
                    :model="formValues"
                >
                    <FormLine
                        v-model="formValues.username"
                        prop="username"
                        clearable
                        placeholder="请输入账号，5-20字符"
                    />
                    <FormLine
                        v-model="formValues.password"
                        prop="password"
                        placeholder="请输入登录密码，6-20字符，需包含数字、大小写字母"
                        show-password
                        autocomplete="new-password"
                    />
                    <FormLine
                        v-model="formValues.passwordConfirm"
                        prop="passwordConfirm"
                        placeholder="请再次输入登录密码"
                        show-password
                        autocomplete="new-password"
                    />
                    <FormLine
                        v-model="formValues.phone"
                        prop="phone"
                        clearable
                        placeholder="请输入手机号码"
                    />
                    <FormLine
                        v-model="formValues.captcha"
                        v-model:uuid="formValues.uuid"
                        prop="captcha"
                        ref="captchaRef"
                        prefix-type="captcha"
                        clearable
                        placeholder="请输入验证码"
                    />
                    <FormLine
                        v-model="formValues.code"
                        prop="code"
                        prefix-type="sms"
                        placeholder="请输入短信验证码"
                        :onSendSms="onSendSms"
                    />
                </el-form>
                <ElButton
                    type="primary"
                    class="w-full mt-4"
                    size="large"
                    :loading="loading"
                    @click="onRegister"
                >
                    注册
                </ElButton>
                <footer class="text-center mt-4">
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
                        已有账户？去登录
                    </ElButton>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMeta } from 'vue-meta';
import MD5 from 'crypto-js/md5';
import { notify } from '@kyvg/vue3-notification';
import { usePlatformStore } from '@/store/platform';
import axios from '@/plugins/axios';
import FormLine from '@/components/login/FormLine.vue';
import { ElForm } from 'element-plus';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { passwordRules } from '@/data/validator';

const initValues = {
    username: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    code: '',
    uuid: '',
    captcha: ''
};
const formValues = ref({ ...initValues });
const loading = ref(false);
const formRef = ref<InstanceType<typeof ElForm>>();
const captchaRef = ref<InstanceType<typeof FormLine>>();
const router = useRouter();
const platformStore = usePlatformStore();

const rules = computed(() => {
    return {
        username: [
            {
                required: true,
                message: '账号不能为空',
                trigger: 'blur'
            },
            { min: 5, message: '账号不能少于5个字符', trigger: 'blur' },
            { max: 20, message: '账号不能多于20个字符', trigger: 'blur' }
        ],
        password: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
            },
            ...passwordRules
        ],
        passwordConfirm: [
            {
                validator(_: unknown, value: string) {
                    const errors = [];
                    if (value !== formValues.value.password) {
                        errors.push('两次输入密码不一致');
                    }
                    return errors;
                }
            }
        ],
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
    };
});

const onSendSms = async () => {
    await formRef.value?.validateField(['phone']);
    await axios.post('/app/sendPhoneCode', {
        phone: formValues.value.phone,
        loginType: '00',
        msgType: '01'
    });
    notify({
        type: 'success',
        title: '短信已发送',
        text: '短信发送成功，5 分钟内有效'
    });
};

const onRegister = async () => {
    try {
        const valid = await formRef.value?.validate().catch(() => false);
        if (!valid) {
            return false;
        }

        loading.value = true;
        await axios.post('/register', {
            username: formValues.value.username,
            password: MD5(formValues.value.password).toString(),
            phone: formValues.value.phone,
            code: formValues.value.code,
            uuid: formValues.value.uuid,
            captcha: formValues.value.captcha
        });
        notify({
            type: 'success',
            title: '注册成功',
            text: '请前往登录'
        });
        router.replace({
            name: 'login'
        });
    } catch (error) {
        formValues.value.captcha = '';
        formValues.value.code = '';
        captchaRef.value?.refreshCaptcha();
    } finally {
        loading.value = false;
    }
};

useMeta({
    title: '注册'
});
</script>
