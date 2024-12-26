<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] flex items-center font-medium tracking-wider text-[#333333] leading-none"
        >
            <el-icon class="cursorPointer" @click="toBack"
                ><ArrowLeft></ArrowLeft
            ></el-icon>
            <span>审核 <span class="text-[#CACED3]">/ 签发</span></span>
        </h1>
        <el-button type="primary" @click="onSubmit">提交</el-button>
    </div>
    <div class="w-full">
        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            size="large"
            label-position="left"
            label-width="165px"
            :hide-required-asterisk="true"
            @submit.native.prevent="onSubmit"
        >
            <div class="bg-white my-4 w-ful rounded-xl p-4">
                <div
                    class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
                >
                    <i class="leftLine"></i><span>签发信息</span>
                </div>
                <div
                    class="w-[500px]"
                    v-for="item in applyData.claimFields"
                    :key="item.fieldId"
                >
                    <el-form-item
                        :label="item.fieldNameCn"
                        :prop="String(item.fieldId)"
                        class="leftFormTip formList"
                        v-if="item.fieldDataType == '1'"
                        :required="item.fieldRequired == '1'"
                    >
                        <el-input
                            v-model="formData[item.fieldId]"
                            :maxlength="item.fieldLimit"
                            :min="0"
                            type="number"
                            :placeholder="`${item.fieldDescription}`"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="item.fieldNameCn"
                        :prop="String(item.fieldId)"
                        class="leftFormTip formList"
                        v-if="item.fieldDataType == '0'"
                        :required="item.fieldRequired == '1'"
                    >
                        <el-input
                            v-model="formData[item.fieldId]"
                            :placeholder="`${item.fieldDescription}`"
                            clearable
                        ></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <el-dialog v-model="showDialog" width="800">
            <div class="text-center">
                <div class="flex justify-center items-center">
                    <svg
                        t="1733707092193"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1459"
                        data-spm-anchor-id="a313x.search_index.0.i0.4cd73a81XGurFf"
                        width="20"
                        height="20"
                    >
                        <path
                            d="M512 14.208c274.56 0 497.792 223.168 497.792 497.792 0 274.56-223.168 497.792-497.792 497.792C237.44 1009.792 14.208 786.56 14.208 512 14.208 237.44 237.44 14.208 512 14.208z m0 71.104A427.072 427.072 0 0 0 85.312 512 427.072 427.072 0 0 0 512 938.688 427.072 427.072 0 0 0 938.688 512 427.072 427.072 0 0 0 512 85.312z m35.584 628.16v71.104H476.416v-71.04h71.168z m0-474.048v402.944H476.416V239.424h71.168z"
                            fill="#e6a23c"
                            p-id="1460"
                        ></path>
                    </svg>
                    <span class="ml-2 font-bold text-black text-[16px]"
                        >未检测倒浏览器钱包插件</span
                    >
                </div>
                <div class="text-center mt-2">
                    请下载、安装浏览器钱包插件，并在钱包中导入分布式身份
                </div>
                <div class="text-center text-[#2f88ff]">
                    导出Keystore文件 |
                    <el-button
                        type="primary"
                        link
                        @click="toDownloadDidLocation"
                        >下载浏览器钱包插件</el-button
                    >
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer text-center">
                    <el-button @click="showDialog = false">取消</el-button>
                    <el-button type="primary" @click="showDialog = false">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted, toRaw } from 'vue';
import { ElMessage, ElMessageBox, FormRules, FormInstance } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ExtendImportMeta } from '@/types/index';
import notify from '@/plugins/notify';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import { ApplyData } from '@/types/certs';

const authStore = useAuthStore();
const route = useRoute();
const showDialog = ref(false);
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
interface AnyObject {
    [key: string]: any;
}
const fileList = ref<UploadUserFile[]>();
const applyData = ref(<ApplyData>{});
const formRef = ref<FormInstance>();
const formData = ref(<AnyObject>{});
const router = useRouter();
const visible = ref(false);
const topFocus = ref(1);
const state = reactive({
    form: {
        name: '',
        enterpriseName: '',
        expire: 0,
        desc: '',
        loading: false
    }
});
const formRules = reactive<FormRules>({});

const handleRemove = (fieldName: any) => (file: any, fileList: any) => {
    formData.value[fieldName] = '';
};
const handleAvatarSuccess =
    (fieldName: any) => (response: any, uploadFile: any) => {
        if (response.code == 200) {
            formData.value[fieldName] = JSON.stringify({
                url: response.url,
                fileName: response.fileName
            });
        } else {
            notify({ type: 'error', text: response.msg });
        }
    };
const handleExceed: UploadProps['onExceed'] = () => {
    ElMessage.warning('上传文件数量超出限制');
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
const getDetail = async () => {
    try {
        const { data } = await axios.get(
            `/did/process/${route.query.processId}`
        );
        if (data.code == 200) {
            applyData.value = data.data;
            data.data.claimFields?.forEach((item: any) => {
                formData.value[item.fieldId] = '';
                if (item.fieldDataType == 1) {
                    formRules[item.fieldId] = [
                        {
                            required: item.fieldRequired == '1',
                            message: '此字段为必填项，只能是数字',
                            trigger: 'blur'
                        },
                        {
                            max: item.fieldLimit,
                            message: `输入长度不能超过 ${item.fieldLimit} 个字符`,
                            trigger: 'blur'
                        },
                        {
                            required: item.fieldRequired == '1',
                            validator: (
                                rule: any,
                                value: any,
                                callback: any
                            ) => {
                                if (
                                    /^\s+$/gi.test(value) &&
                                    item.fieldRequired == '1'
                                ) {
                                    callback(new Error('不能全输入空格'));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ];
                } else {
                    formRules[item.fieldId] = [
                        {
                            required: item.fieldRequired == '1',
                            message: '此字段为必填项',
                            trigger: 'blur'
                        },
                        {
                            max: item.fieldLimit,
                            message: `输入长度不能超过 ${item.fieldLimit} 个字符`,
                            trigger: 'blur'
                        },
                        {
                            required: item.fieldRequired == '1',
                            validator: (
                                rule: any,
                                value: any,
                                callback: any
                            ) => {
                                if (
                                    /^\s+$/gi.test(value) &&
                                    item.fieldRequired == '1'
                                ) {
                                    callback(new Error('不能全输入空格'));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ];
                }
            });
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    }
};

onMounted(() => {
    getDetail();
});

const formReset = () => {
    formData.value = {};
    formRef.value?.resetFields();
};
const toDownloadDidLocation = () => {
    window.open('/resources/iid-browser-wallet.zip');
};
const onOk = async () => {
    state.form.loading = true;
    // 是否安装浏览器插件
    if (!window.IIDWallet) {
        showDialog.value = true;
    }

    const pluginDID = await window.IIDWallet.getActiveAccount();
    if (pluginDID !== authStore.user.did) {
        notify({
            type: 'error',
            text: '浏览器钱包插件账户与当前账户不一致，请切换钱包账户'
        });
        throw new Error('浏览器钱包插件账户与当前账户不一致，请切换钱包账户');
    }
    await window.IIDWallet.signCert({
        processId: route.query.processId as string,
        data: toRaw(formData.value)
    });
    formReset();
    state.form.loading = false;
    router.push({
        name: 'CertificateIssuance'
    });
};
const onSubmit = () => {
    formRef.value?.validate(async (valid) => {
        if (valid) {
            onOk();
        }
    });
};

const handleToDataDetail = () => {
    router.push({
        name: 'AppManagementDetail'
    });
};
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
};
const handleCommand = (command: string | number | object) => {
    ElMessage(`click on item ${command}`);
};
const toBack = () => {
    router.back();
};
</script>
<style lang="scss" scoped>
.formList {
    // margin: 0 !important;
    ::v-deep(.el-form-item__label) {
        height: auto;
    }
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
.topSearchBorder {
    border-bottom: 1px solid #3333;
}
.itemBorder {
    border: 1px solid #3333;
}

.cursorPointer {
    cursor: pointer;
}
.cursorNo {
    pointer-events: none;
}
.round-green {
    width: 10px;
    height: 10px;
    background-color: green;
    border-radius: 50%;
}
.round-red {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
}
.disabledColor {
    color: #c8c9cc !important;
}
.el-table {
    ::v-deep(thead > tr > th) {
        background-color: #f2f3f5;
        color: #000;
        font-weight: bold;
    }
}
.el-table {
    ::v-deep(.el-table__cell) {
        vertical-align: top !important;
    }
}
.leftLine {
    border: 2px solid #2f88ff;
    height: 16px;
    display: block;
    width: 1px;
    margin-right: 5px;
    line-height: 15px;
    border-radius: 20%;
}
</style>
