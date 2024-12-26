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
            v-model="formValues.username"
            prop="username"
            clearable
            icon-type="user"
            placeholder="请输入账号"
        />
        <FormLine
            v-model="formValues.password"
            prop="password"
            autocomplete="new-password"
            icon-type="password"
            placeholder="请输入密码"
            show-password
        />
        <FormLine
            v-model="formValues.captcha"
            v-model:uuid="formValues.uuid"
            prop="captcha"
            ref="captchaRef"
            icon-type="captcha"
            prefix-type="captcha"
            placeholder="请输入验证码"
        />
        <div class="flex items-center justify-between">
            <el-checkbox v-model="formValues.remeber">
                保持登录状态
            </el-checkbox>
            <ElButton
                link
                type="primary"
                @click="
                    () =>
                        router.push({
                            name: 'forget-password'
                        })
                "
            >
                忘记密码
            </ElButton>
        </div>
    </el-form>
    <ElButton
        type="primary"
        class="w-full mt-8"
        size="large"
        native-type="submit"
        :loading="loading"
        @click="onLogin"
    >
        登录
    </ElButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MD5 from 'crypto-js/md5';
import axios from '@/plugins/axios';
import { ElForm } from 'element-plus';
import { useRouter } from 'vue-router';
import FormLine from './FormLine.vue';

const emits = defineEmits(['handleTokenResponse']);

const formValues = ref({
    username: '',
    password: '',
    uuid: '',
    captcha: '',
    remeber: false
});
const router = useRouter();
const loading = ref(false);
const formRef = ref<InstanceType<typeof ElForm>>();
const captchaRef = ref<InstanceType<typeof FormLine>>();

const rules = ref({
    username: [
        {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
        },
        { min: 4, message: '账号不能少于4个字符', trigger: 'blur' },
        { max: 20, message: '账号不能多于20个字符', trigger: 'blur' }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }
    ],
    captcha: [
        {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
        }
    ]
});

const onLogin = async () => {
    try {
        const valid = await formRef.value?.validate().catch(() => false);
        if (!valid) {
            return false;
        }

        loading.value = true;

        const { data } = await axios.post('/login', {
            loginType: '0',
            uuid: formValues.value.uuid,
            captcha: formValues.value.captcha,
            username: formValues.value.username,
            password: MD5(formValues.value.password).toString()
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
