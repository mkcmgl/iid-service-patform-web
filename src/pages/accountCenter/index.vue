<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] font-medium tracking-wider text-[#333333] leading-none"
        >
            账号中心
        </h1>
    </div>
    <div class="w-full flex flex-col">
        <div class="flex w-full min-w-[500px] bg-white p-4 rounded-xl topBg">
            <div class="flex-1 flex min-w-[45px] items-center">
                <img
                    class="w-[100px] h-[100px] mr-5"
                    src="@/assets/images/accountCenter/user.png"
                />
                <div class="w-full">
                    <el-form
                        size="large"
                        label-position="left"
                        label-width="120px"
                        class="min-w-[500px]"
                    >
                        <el-row :gutter="35">
                            <el-col
                                :xs="24"
                                :sm="24"
                                :md="24"
                                :lg="24"
                                :xl="24"
                                class="mb22"
                            >
                                <el-form-item label="账号:" class="formList">
                                    <span>{{ userDetail.userName }}</span>
                                    <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                                </el-form-item>
                                <el-form-item
                                    label="分布式身份DID:"
                                    class="formList"
                                >
                                    <span class="truncate w-full">{{
                                        userDetail.did
                                    }}</span>
                                </el-form-item>

                                <el-form-item
                                    label="实名认证:"
                                    prop="enterpriseName"
                                    class="formList"
                                >
                                    <span>{{ userDetail.authStateName }}</span>
                                </el-form-item>
                                <el-form-item
                                    label="发证方入驻:"
                                    prop="enterpriseName"
                                    class="formList"
                                >
                                    <span>{{
                                        userDetail.settleStateName
                                    }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <div>
                <el-dropdown @command="handleCommand">
                    <el-button link type="primary" @mouseleave="visible = false"
                        >操作</el-button
                    >
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                command="a"
                                @click="showChangePassword = true"
                                >修改登陆密码</el-dropdown-item
                            >
                            <!-- <el-dropdown-item command="b">
                                导出DiD文档</el-dropdown-item
                            > -->
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="bg-white my-4 w-ful rounded-xl p-4">
            <div class="flex">
                <div class="mb-4 flex-1 font-bold">实名认证</div>

                <div>
                    <el-dropdown>
                        <el-button
                            link
                            type="primary"
                            @mouseleave="visible = false"
                            >操作</el-button
                        >
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="claimFile"
                                    >导出凭证</el-dropdown-item
                                >
                                <el-dropdown-item
                                    @click="showChangeOrgInfo = true"
                                    v-if="authStore.user.admin"
                                    >修改认证信息</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>

            <div class="">
                <el-form
                    size="large"
                    label-position="left"
                    label-width="120px"
                    class="w-full"
                >
                    <el-row :gutter="35">
                        <el-col
                            :xs="12"
                            :sm="12"
                            :md="12"
                            :lg="12"
                            :xl="12"
                            class="mb22"
                        >
                            <el-form-item label="机构姓名:" class="formList">
                                <span class="truncate w-full">{{
                                    userDetail.orgName
                                }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item label="机构证照:" class="formList">
                                <el-button
                                    link
                                    type="primary"
                                    @click="showImg = true"
                                >
                                    查看
                                </el-button>
                            </el-form-item>

                            <el-form-item
                                label="联系人姓名:"
                                prop="enterpriseName"
                                class="formList"
                            >
                                <span class="truncate w-full">{{
                                    userDetail.contactName
                                }}</span>
                            </el-form-item>
                        </el-col>

                        <el-col
                            :xs="12"
                            :sm="12"
                            :md="12"
                            :lg="12"
                            :xl="12"
                            class="mb22"
                        >
                            <el-form-item
                                label="统一信用代码:"
                                class="formList"
                            >
                                <span>{{ userDetail.orgCode }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item label="地址:" class="formList">
                                <span>{{ userDetail.orgAddress }}</span>
                            </el-form-item>

                            <el-form-item
                                label="联系人手机号:"
                                prop="enterpriseName"
                                class="formList"
                            >
                                <span>{{ userDetail.contactPhone }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="bg-white w-ful rounded-xl p-4">
            <div class="mb-4 flex-1 font-bold">发证方入驻</div>

            <div class="">
                <el-form
                    size="large"
                    label-position="left"
                    label-width="120px"
                    class="w-full"
                >
                    <el-row :gutter="35">
                        <el-col
                            :xs="12"
                            :sm="12"
                            :md="12"
                            :lg="12"
                            :xl="12"
                            class="mb22"
                        >
                            <el-form-item label="发证方DID:" class="formList">
                                <span class="truncate w-full">{{
                                    userDetail.did
                                }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item label="发证事项:" class="formList">
                                <span>{{ userDetail.settleDesc }}</span>
                            </el-form-item>
                        </el-col>

                        <el-col
                            :xs="12"
                            :sm="12"
                            :md="12"
                            :lg="12"
                            :xl="12"
                            class="mb22"
                        >
                            <el-form-item label="发证方名称:" class="formList">
                                <span class="truncate w-full">{{
                                    userDetail.orgName
                                }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
    <el-dialog
        :loading="dialogLoading"
        v-model="showChangePassword"
        title="更改密码"
        width="800"
        @close="handleClose"
    >
        <el-form
            ref="changePasswordFormRef"
            :model="state.form"
            size="large"
            label-position="left"
            :rules="rules"
            label-width="120px"
            class="w-full p-5"
            :hide-required-asterisk="true"
        >
            <el-form-item label="新密码" prop="password" class="leftFormTip">
                <el-input
                    v-model="state.form.password"
                    placeholder="请输入新密码"
                    type="password"
                    clearable
                    :show-password="true"
                ></el-input>
                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
            </el-form-item>
            <el-form-item
                label="确认新密码"
                prop="validatePassword"
                class="leftFormTip"
            >
                <el-input
                    v-model="state.form.validatePassword"
                    placeholder="请确认新密码"
                    type="password"
                    clearable
                    :show-password="true"
                ></el-input>
            </el-form-item>

            <FormLine
                v-if="showChangePassword"
                v-model="state.form.captcha"
                v-model:uuid="state.form.uuid"
                label="验证码"
                prop="captcha"
                ref="captchaRef"
                prefix-type="captcha"
                clearable
                class="w-full color"
                placeholder="请输入验证码"
            />

            <el-form-item label="手机号" prop="phone" class="leftFormTip">
                <el-input
                    v-model="state.form.phone"
                    placeholder="请输入手机号"
                    clearable
                ></el-input>
            </el-form-item>
            <FormLine
                v-if="showChangePassword"
                label="短信验证码"
                class="color"
                v-model="state.form.code"
                prop="code"
                prefix-type="sms"
                placeholder="请输入短信验证码"
                :onSendSms="onSendSms"
            />
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showChangePassword = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleSubmit"
                    :loading="state.form.loading"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog
        v-model="showChangeOrgInfo"
        title="修改认证信息"
        width="800"
        @close="handleCloseOrgInfo"
    >
        <el-form
            ref="changeOrgInfoFormRef"
            :model="state.orgInfoForm"
            size="large"
            label-position="left"
            :rules="orgInfoFormRules"
            label-width="120px"
            class="w-full p-5"
            :hide-required-asterisk="true"
        >
            <el-form-item label="机构名称" prop="orgName" class="leftFormTip">
                <el-input
                    v-model="state.orgInfoForm.orgName"
                    placeholder="请输入机构名称"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item
                label="统一信用代码"
                prop="orgCode"
                class="leftFormTip"
            >
                <el-input
                    v-model="state.orgInfoForm.orgCode"
                    placeholder="请输入统一信用代码"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="机构证照" prop="fileName" class="leftFormTip">
                <el-upload
                    class="uploadImg"
                    multiple
                    v-model:file-list="fileList"
                    :action="_UPLOAD_URL_"
                    :headers="headers"
                    :on-remove="handleRemove"
                    :on-preview="handlePictureCardPreview"
                    :limit="limitNum"
                    :class="{
                        uploadImgDisabled: uploadDisabled1
                    }"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess"
                    :on-exceed="handleExceed"
                    :on-error="handleUploadError"
                    list-type="picture-card"
                >
                    <div class="flex justify-around">
                        <el-icon><Plus /></el-icon>
                    </div>
                </el-upload>
                <div class="text-[12px] text-[#9ca3af] leading-5 mt-1">
                    请上传《组织机构代码证》、《事业单位法人证书》或《营业执照》，格式限JPG、JPEG和PNG，大小不超过5M
                </div>
            </el-form-item>
            <el-form-item label="地址" prop="orgAddress" class="leftFormTip">
                <el-input
                    v-model="state.orgInfoForm.orgAddress"
                    placeholder="请输入地址"
                    clearable
                ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showChangeOrgInfo = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleOrgInfoFormSubmit"
                    :loading="state.orgInfoForm.loading"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="showImg" title="查看图片" width="800">
        <div class="w-full flex justify-center">
            <img :src="businessFilePath" />
        </div>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus';
import axios from '@/plugins/axios';
import { useAuthStore } from '@/store/auth';
import FormLine from '@/components/login/FormLine.vue';
import { notify } from '@kyvg/vue3-notification';
import { ExtendImportMeta } from '@/types/index';
import { User } from '@/types/user';
type UserDetail = {
    [P in keyof User]: User[P];
} & {
    userName: string;
    idNum?: string;
    attachments: Array<any>;
    authState?: string;
    settleState?: string;
    did?: string;
    authStateName: string;
    settleStateName: string;
};
function setDataUploadUrl() {
    let locationObj = window.location;
    let urlStr =
        locationObj.protocol +
        '//' +
        locationObj.host +
        (import.meta as ExtendImportMeta).env.VITE_API_URL;
    return urlStr + '/common/upload';
}
const _UPLOAD_URL_ = setDataUploadUrl();
const headers = computed(() => {
    return { Authorization: 'Bearer ' + authStore.token };
});
const uploadDisabled1 = ref(false);
const fileList = ref<UploadUserFile[]>();
const limitNum = ref(1);
const faceFilePath = ref('');
const backFilePath = ref('');
const IdFaceFilePath = ref('');
const businessFilePath = ref('');
const visible = ref(false);
const showImg = ref(false);

const showChangePassword = ref(false);
const showChangeOrgInfo = ref(false);
const dialogLoading = ref(false);
const changePasswordFormRef = ref<FormInstance>();
const changeOrgInfoFormRef = ref<FormInstance>();
const captchaRef = ref<InstanceType<typeof FormLine>>();
const authStore = useAuthStore();
const userDetail = ref(<UserDetail>{});
const state = reactive({
    form: {
        password: '',
        validatePassword: '',
        captcha: '',
        phone: '',
        code: '',
        loading: false,
        uuid: '',
        img: ''
    },
    orgInfoForm: {
        orgName: '',
        orgCode: '',
        orgAddress: '',
        loading: false,
        url: '',
        fileName: ''
    }
});
const formReset = () => {
    state.form = {
        password: '',
        validatePassword: '',
        captcha: '',
        phone: '',
        code: '',
        loading: false,
        uuid: '',
        img: ''
    };
    changePasswordFormRef.value?.resetFields();
};
const orgInfoFormReset = () => {
    state.orgInfoForm = {
        orgName: '',
        orgCode: '',
        orgAddress: '',
        loading: false,
        url: '',
        fileName: ''
    };
    changeOrgInfoFormRef.value?.resetFields();
};
const validateNoSpace = (rule: any, value: any, callback: any) => {
    if (/^\s+$/gi.test(value)) {
        callback(new Error('不能全输入空格'));
    } else {
        callback();
    }
};
const validatePhone = (rule: any, value: any, callback: any) => {
    //使用正则表达式进行验证手机号码
    if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号格式！'));
    } else {
        callback();
    }
};
const equalToPassword = (rule: any, value: any, callback: any) => {
    if (state.form.password !== value) {
        callback(new Error('两次输入的密码不一致'));
    } else {
        callback();
    }
};
const testPassword = (rule: any, value: any, callback: any) => {
    if (
        !/^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{6,20}$/.test(
            value
        )
    ) {
        callback(
            new Error(
                '长度6~20，必须含大写小写字母、数字、特殊字符中的至少三种'
            )
        );
    } else {
        callback();
    }
};
const validatecreditCode = (rule: any, value: any, callback: any) => {
    //使用正则表达式进行社会码
    if (!/^[A-Za-z0-9]+$/.test(value)) {
        callback(new Error('请输入正确的统一信用代码！'));
    } else {
        callback();
    }
};
const rules = reactive<FormRules>({
    password: [
        { required: true, trigger: 'blur', message: '请输入密码' },
        {
            min: 6,
            max: 20,
            message: '用户密码长度必须介于 6 和 20 之间',
            trigger: 'blur'
        },
        { required: true, validator: testPassword, trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' }
    ],

    validatePassword: [
        { required: true, trigger: 'blur', message: '请再次输入您的密码' },
        { required: true, validator: equalToPassword, trigger: 'blur' }
    ],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],

    code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
    phone: [
        { required: true, message: '请输入电话', trigger: 'blur' },
        { required: true, validator: validatePhone, trigger: 'blur' }
    ]
});
const orgInfoFormRules = reactive<FormRules>({
    orgName: [
        { required: true, message: '请输入机构名称', trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' },
        { min: 1, max: 50, message: '1-50字符', trigger: 'blur' }
    ],
    orgCode: [
        { required: true, trigger: 'blur', message: '请输入统一信用代码' },
        { required: true, validator: validatecreditCode, trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' },
        { min: 18, max: 18, message: '长度为18位', trigger: 'blur' }
    ],
    fileName: [{ required: true, message: '请上传文件', trigger: 'change' }],
    orgAddress: [
        { required: true, message: '请输入地址', trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' },
        { min: 1, max: 100, message: '1-100字符', trigger: 'blur' }
    ]
});

onMounted(() => {
    getDetail();
});
const getDetail = async () => {
    const { data } = await axios.get('/system/user/detail', {
        params: { userId: authStore.user.userId }
    });
    if (data.code == 200) {
        userDetail.value = data.data;
        data.data.attachments.forEach((item: any) => {
            if (item.fileType == 0) {
                IdFaceFilePath.value = item.filePath;
            } else if (item.fileType == 1) {
                backFilePath.value = item.filePath;
            } else if (item.fileType == 2) {
                faceFilePath.value = item.filePath;
            } else if (item.fileType == 3) {
                businessFilePath.value = item.filePath;
            }
        });
    } else {
        ElMessage.error(data.msg);
    }
};
const claimFile = async () => {
    if (userDetail.value.hasDid == '0') {
        ElMessage.warning('需要创建分布式身份DID');
    } else {
        try {
            const { data } = await axios.get('/iid/claim/realName');
            const {
                createBy,
                createTime,
                updateBy,
                updateTime,
                ...filteredData
            } = data.data;
            const jsonString = JSON.stringify(filteredData, null, 2);

            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = data.data.claimIssuerName + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};
const onSendSms = async () => {
    try {
        await changePasswordFormRef.value?.validateField(['phone']);
        await axios.post('/app/sendPhoneCode', {
            phone: state.form.phone,
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
        state.form.captcha = '';
        state.form.code = '';
        throw error;
    }
};

const handlePictureCardPreview = (file: any) => {
    // dialogImageUrl.value = file.url!;
    // dialogVisible.value = true;
};

const handleRemove = (file: any, fileList: any) => {
    uploadDisabled1.value = false;
    state.orgInfoForm.fileName = '';
};
const handleAvatarSuccess = (response: any, uploadFile: any) => {
    if (response.code == 200) {
        state.orgInfoForm.fileName = response.fileName;
        state.orgInfoForm.url = response.url;
        uploadDisabled1.value = true;
    } else {
        notify({ type: 'error', text: response.msg });
    }
};
const handleUploadError: UploadProps['onError'] = () => {
    ElMessage.warning('上传文件失败，请重试');
    // state.ruleForm.loading?.close();
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (
        rawFile.type == 'image/png' ||
        rawFile.type == 'image/jpeg' ||
        rawFile.type == 'image/jpg'
    ) {
        if (rawFile.size / 1024 / 1024 < 5) {
            return true;
        } else {
            notify({
                type: 'error',
                text: '图片不得超过5M'
            });
            return false;
        }
    } else {
        notify({
            type: 'error',
            text: '上传文件格式务必PNG|JPG|JPEG'
        });
        return false;
    }
};
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning('上传文件数量超出限制');
};

const handleClose = () => {
    formReset();
};
const handleCloseOrgInfo = () => {
    showChangeOrgInfo.value = false;
    orgInfoFormReset();
};
const handleSubmit = async () => {
    changePasswordFormRef.value?.validate(async (valid: any) => {
        if (valid) {
            state.form.loading = true;
            try {
                const { data } = await axios.post(
                    '/system/user/resetOwnPwd',
                    state.form
                );
                if (data.code == 200) {
                    formReset();
                    showChangePassword.value = false;
                    ElMessage.success('修改成功');
                } else {
                    ElMessage.error(data.msg);
                }
            } catch (error: any) {
                ElMessage.error(error);
            } finally {
                state.form.loading = false;
            }
        }
    });
};
const handleOrgInfoFormSubmit = () => {
    changeOrgInfoFormRef.value?.validate(async (valid: any) => {
        if (valid) {
            state.orgInfoForm.loading = true;
            try {
                const { data } = await axios.post(
                    '/system/user/updateOrgInfo',
                    {
                        orgName: state.orgInfoForm.orgName,
                        orgCode: state.orgInfoForm.orgCode,
                        orgAddress: state.orgInfoForm.orgAddress,
                        attachments: [
                            {
                                fileName: state.orgInfoForm.fileName,
                                filePath: state.orgInfoForm.url
                            }
                        ]
                    }
                );
                if (data.code == 200) {
                    showChangeOrgInfo.value = false;
                    ElMessage.success('认证信息修改成功');
                    handleCloseOrgInfo();
                    getDetail();
                } else {
                    ElMessage.error(data.msg);
                }
            } catch (e: any) {
                ElMessage.error(e);
            } finally {
                state.orgInfoForm.loading = false;
            }
        }
    });
};
const handleCommand = (command: string | number | object) => {
    // ElMessage(`click on item ${command}`);
};
</script>
<style lang="scss" scoped>
.formList {
    margin: 0 !important;
}
.el-dropdown-link {
    color: var(--el-color-primary);
    border: none;
    cursor: pointer;
}
.el-dropdown {
    &focus,
    &:focus-visible {
        border: none !important;
        border-color: #fff !important;
    }
}
.topBg {
    background-image: url('@/assets/images/accountCenter/topBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.uploadImg {
    margin-right: 1rem;
    ::v-deep(.el-upload-dragger) {
        height: 100%;
    }
    ::v-deep(.el-icon--close-tip) {
        display: none !important;
    }
}
.uploadImgDisabled {
    ::v-deep(.el-upload--picture-card) {
        display: none;
    }
}
.color {
    ::v-deep(.el-input__inner) {
        color: #606266 !important;
        &::placeholder {
            color: #a8abb2 !important;
        }
    }
}
</style>
