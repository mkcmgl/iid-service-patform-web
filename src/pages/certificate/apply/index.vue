<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] flex items-center font-medium tracking-wider text-[#333333] leading-none"
        >
            <!-- <el-button link> -->
            <el-icon class="cursorPointer" @click="toBack"
                ><ArrowLeft></ArrowLeft
            ></el-icon>
            <!-- </el-button> -->
            <span>申请</span>
        </h1>
        <el-button
            type="primary"
            :loading="state.form.loading"
            @click="onSubmit"
            >提交</el-button
        >
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
        >
            <div class="bg-white my-4 w-ful rounded-xl p-4">
                <div class="mb-4 flex-1 font-bold">凭证申请元数据</div>
                <div class="flex flex-col items-center">
                    <div
                        class="w-2/3"
                        v-for="item in applyData.templateFields"
                        :key="item.fieldId"
                    >
                        <el-form-item
                            :label="item.fieldNameCn"
                            :prop="String(item.fieldId)"
                            class="leftFormTip formList"
                            v-if="item.fieldDataType == '2'"
                        >
                            <el-upload
                                class="upload-demo w-full"
                                multiple
                                v-model:file-list="
                                    formDataFileList[item.fieldId + 'fileList']
                                "
                                :action="_UPLOAD_URL_"
                                :headers="headers"
                                :on-remove="handleRemove(item.fieldId)"
                                :limit="1"
                                :before-upload="
                                    createBeforeUploadHandler(item.fieldLimit)
                                "
                                :on-success="handleAvatarSuccess(item.fieldId)"
                                :on-exceed="handleExceed"
                                :on-error="handleUploadError"
                            >
                                <el-button type="primary">选择文件</el-button>
                            </el-upload>
                            <div
                                class="text-[12px] text-[#9ca3af] leading-5 mt-1"
                            >
                                请上传文件，格式限png、jpg、jpeg、pdf、doc、docx、xls、xlsx、csv，大小不超过{{
                                    item.fieldLimit
                                }}M
                            </div>
                        </el-form-item>
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
            </div>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import axios from '@/plugins/axios';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ExtendImportMeta } from '@/types/index';
import { useAuthStore } from '@/store/auth';
import { ApplyData } from '@/types/certs';
import { notify } from '@kyvg/vue3-notification';
const authStore = useAuthStore();
const route = useRoute();
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
const formDataFileList = reactive({});

const fileList = ref<UploadUserFile[]>();
const applyData = ref(<ApplyData>{});
const formRef = ref<FormInstance>();
const formData = ref(<AnyObject>{});
const tableData = ref([
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
    }
]);
const value = ref('');

const options = [
    {
        value: 'Option1',
        label: 'Option1'
    },
    {
        value: 'Option2',
        label: 'Option2'
    },
    {
        value: 'Option3',
        label: 'Option3'
    },
    {
        value: 'Option4',
        label: 'Option4'
    },
    {
        value: 'Option5',
        label: 'Option5'
    }
];
const deleteRow = (index: number) => {
    tableData.value.splice(index, 1);
};

const onAddItem = () => {};

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

const searchLoading = ref(false);
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
            // 移除文件
            const fileListKey = `${fieldName}fileList`;
            if (formDataFileList[fileListKey]) {
                // 假设每个文件对象有一个唯一的标识符，如uid，这里假设uploadFile有uid属性
                const index = formDataFileList[fileListKey].findIndex(
                    (file: any) => file.uid === uploadFile.uid
                );
                if (index !== -1) {
                    formDataFileList[fileListKey].splice(index, 1);
                }
            }
        }
    };
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning('上传文件数量超出限制');
};
const handleUploadError: UploadProps['onError'] = () => {
    ElMessage.warning('上传文件失败，请重试');
    // state.ruleForm.loading?.close();
};
const beforeAvatarUpload = (rawFile: any, limit: any) => {
    if (
        rawFile.type == 'image/png' ||
        rawFile.type == 'image/jpeg' ||
        rawFile.type == 'image/jpg' ||
        rawFile.type == 'application/pdf' ||
        rawFile.type == 'application/msword' || // doc
        rawFile.type ==
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        rawFile.type == 'application/vnd.ms-excel' ||
        rawFile.type ==
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        rawFile.type == 'text/csv'
    ) {
        if (rawFile.size / 1024 / 1024 <= limit) {
            return true;
        } else {
            notify({
                type: 'error',
                text: '文件不得超过' + limit.toFixed(2) + 'M'
            });
            return false;
        }
    } else {
        notify({
            type: 'error',
            text: '上传文件格式务必为png、jpg、jpeg、pdf、doc、docx、xls、xlsx或者cvs'
        });
        return false;
    }
};

const createBeforeUploadHandler = (limit: any) => {
    return (rawFile: any) => {
        return beforeAvatarUpload(rawFile, limit);
    };
};

const getDetail = async () => {
    try {
        const { data } = await axios.get(
            `/did/process/${route.query.processId}`
        );
        if (data.code == 200) {
            applyData.value = data.data;
            data.data.templateFields?.forEach((item: any) => {
                formData.value[item.fieldId] = '';
                if (item.fieldDataType == 2) {
                    formRules[item.fieldId] = [
                        {
                            required: item.fieldRequired == '1',
                            message: '请上传文件',
                            trigger: 'change'
                        }
                    ];
                } else if (item.fieldDataType == 1) {
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
const onSubmit = () => {
    formRef.value?.validate(async (valid) => {
        if (valid) {
            state.form.loading = true;
            try {
                const { data } = await axios.post(
                    `/did/process/submit/${route.query.processId}`,
                    formData.value
                );
                if (data.code == 200) {
                    formReset();
                    ElMessage.success('凭证申请提交成功');
                    router.back();
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
</style>
