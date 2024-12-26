<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] flex items-center font-medium tracking-wider text-[#333333] leading-none"
        >
            <el-icon class="cursorPointer" @click="toBack"
                ><ArrowLeft></ArrowLeft
            ></el-icon>
            <span v-if="applyData.processApprovalStatus == '1'">审核 </span>
            <span v-else>查看 </span>
        </h1>
        <div v-if="applyData.processApprovalStatus == '1'">
            <el-button :loading="buttonLoading" @click="showAuthDialog = true"
                >驳回</el-button
            >
            <el-button :loading="buttonLoading" type="primary" @click="cert()"
                >签发</el-button
            >
        </div>
    </div>
    <div class="w-full">
        <div class="bg-white my-4 w-ful rounded-xl p-4">
            <div
                class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
            >
                <i class="leftLine"></i><span>基本信息</span>
            </div>
            <div>
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
                            <el-form-item label="申请编号:" class="formList">
                                <span>{{ applyData.processId }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item label="凭证名称:" class="formList">
                                <span>{{ applyData.templateName }}</span>
                            </el-form-item>
                            <el-form-item label="审核状态:" class="formList">
                                <span>{{
                                    applyData.processApprovalStatus == '1'
                                        ? '申请中'
                                        : applyData.processApprovalStatus == '2'
                                          ? '申请驳回'
                                          : applyData.processApprovalStatus ==
                                              '0'
                                            ? '未申请'
                                            : '申请通过'
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
                            <el-form-item label="申请方DID:" class="formList">
                                <span class="truncate">{{
                                    applyData.did
                                }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item label="申请时间:" class="formList">
                                <span>{{ applyData.processSubmitTime }}</span>
                            </el-form-item>
                            <el-form-item label="签发状态:" class="formList">
                                <span>{{
                                    applyData.processIssuedStatus == '0'
                                        ? '未签发'
                                        : '已签发'
                                }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="bg-white my-4 w-ful rounded-xl p-4">
            <div
                class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
            >
                <i class="leftLine"></i><span>申请信息</span>
            </div>
            <div>
                <el-form
                    size="large"
                    label-position="left"
                    label-width="165px"
                    class="w-full"
                >
                    <div class="grid gap-2 grid-cols-2 gap-x-4 w-full">
                        <div
                            v-for="item in applyData.templateFields"
                            class="formList flex-1"
                        >
                            <el-form-item
                                :key="item.fieldId"
                                :label="item.fieldNameCn"
                                class="formList flex-1"
                                v-if="item.fieldDataType == '2'"
                            >
                                <!-- <img
                                    v-if="
                                        getImageExtension(
                                            processTemplateContent[item.fieldId]
                                                .url
                                        )
                                    "
                                    :src="
                                        processTemplateContent[item.fieldId].url
                                    "
                                />
                                <span v-else> -->
                                <span>
                                    {{
                                        processTemplateContent[item.fieldId]
                                            .fileName
                                    }}</span
                                >
                            </el-form-item>
                            <el-form-item
                                :label="item.fieldNameCn"
                                class="formList flex-1"
                                v-else
                            >
                                <span>{{
                                    processTemplateContent[item.fieldId]
                                }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>

        <div
            class="bg-white my-4 w-ful rounded-xl p-4"
            v-if="applyData.processApprovalStatus != '1'"
        >
            <div
                class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
            >
                <i class="leftLine"></i><span>审核信息</span>
            </div>
            <div>
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
                            <el-form-item label="审核状态:" class="formList">
                                <span>{{
                                    applyData.processApprovalStatus == '1'
                                        ? '申请中'
                                        : applyData.processApprovalStatus == '2'
                                          ? '申请驳回'
                                          : applyData.processApprovalStatus ==
                                              '0'
                                            ? '未申请'
                                            : '申请通过'
                                }}</span>
                            </el-form-item>
                            <el-form-item label="审核时间:" class="formList">
                                <span>{{ applyData.processApprovalTime }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
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
                            <el-form-item label="签发状态:" class="formList">
                                <span>{{
                                    applyData.processIssuedStatus == '0'
                                        ? '未签发'
                                        : '已签发'
                                }}</span>
                            </el-form-item>
                            <el-form-item
                                label="驳回原因:"
                                class="formList"
                                v-if="applyData.processApprovalStatus == '2'"
                            >
                                <span>{{
                                    JSON.parse(
                                        applyData.processDisapprovalReason
                                    ).desc
                                }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <el-dialog
            v-model="showAuthDialog"
            @close="handleCloseAuth"
            title="审核"
            width="800"
        >
            <el-form
                ref="dialogFormRef"
                :model="state.dialogForm"
                :rules="dialogRules"
                size="large"
                label-position="left"
                label-width="165px"
                class="w-[500px]"
                :hide-required-asterisk="true"
            >
                <el-form-item label="驳回原因" prop="desc" class="leftFormTip">
                    <el-input
                        v-model="state.dialogForm.desc"
                        type="textarea"
                        maxlength="100"
                        show-word-limit
                        placeholder="请输入驳回原因"
                        clearable
                    ></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showAuthDialog = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import axios from '@/plugins/axios';
import { ApplyData } from '@/types/certs';
const route = useRoute();
const showAuthDialog = ref(false);
const formRef = ref<FormInstance>();
type KnownPropertiesAndAny = {
    [key: string]: any; // 允许额外的任意属性
};

const applyData = ref(<ApplyData>{});
const processTemplateContent = ref(<KnownPropertiesAndAny>{});

const dialogFormRef = ref<FormInstance>();
const buttonLoading = ref(false);
const state = reactive({
    form: {
        name: '',
        enterpriseName: '',
        expire: 0,
        loading: false
    },
    dialogForm: {
        desc: '',
        loading: false
    }
});
const dialogRules = reactive<FormRules>({
    desc: [
        { required: true, message: '请输入驳回原因', trigger: 'blur' },
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                if (/^\s+$/gi.test(value)) {
                    callback(new Error('不能全输入空格'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ]
});

const dialogFormReset = () => {
    state.dialogForm = {
        desc: '',
        loading: false
    };
    dialogFormRef.value?.resetFields();
};

const router = useRouter();
const visible = ref(false);
const topFocus = ref(1);

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入模板名称', trigger: 'blur' },
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                if (/^\s+$/gi.test(value)) {
                    callback(new Error('不能全输入空格'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        },
        { min: 6, max: 32, message: '6-32字符', trigger: 'blur' }
    ],
    enterpriseName: [
        { required: true, message: '请输入模板类型', trigger: 'blur' },
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                if (/^\s+$/gi.test(value)) {
                    callback(new Error('不能全输入空格'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        },
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                if (!/^[\u4e00-\u9fa5A-Za-z0-9]{1,20}$/.test(value)) {
                    callback(
                        new Error('限中文、数字或大小写字母，不超过20个字符')
                    );
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    desc: [
        { required: true, message: '请输入模板描述', trigger: 'blur' },
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                if (/^\s+$/gi.test(value)) {
                    callback(new Error('不能全输入空格'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    expire: [{ required: true, message: '请输入证书有效期', trigger: 'blur' }]
});
const getImageExtension = (url: any) => {
    const extension = url?.split('.').pop().toLowerCase();
    return ['png', 'jpg', 'jpeg'].includes(extension);
};

onMounted(() => {
    getDetail();
});

//递归转为对象
function parseJsonWithPossibleNested(jsonString: any) {
    let parsedObject;

    try {
        // 解析外层的JSON字符串
        parsedObject = JSON.parse(jsonString, (key, value) => {
            // 递归检查每个值
            if (typeof value === 'string') {
                try {
                    // 尝试将字符串解析为JSON对象或数组
                    const parsedValue = JSON.parse(value);
                    return parsedValue; // 返回解析后的对象或数组
                } catch (innerError) {
                    // 如果解析失败，则保留原始字符串
                    return value;
                }
            }
            return value; // 对于非字符串值，直接返回
        });
    } catch (error) {
        console.error('解析外层JSON字符串时出错:', error);
        // 处理错误，例如返回null或抛出异常
        return null;
    }

    // 递归函数，用于处理可能仍然包含未解析JSON字符串的嵌套对象
    function recursivelyParseNested(obj: any) {
        if (Array.isArray(obj)) {
            // 如果对象是数组，递归处理每个元素
            return obj.map((item) =>
                typeof item === 'object' ? recursivelyParseNested(item) : item
            );
        } else if (typeof obj === 'object' && obj !== null) {
            // 如果对象是普通对象，递归处理每个属性值
            return Object.keys(obj).reduce((acc, key) => {
                acc[key] =
                    typeof obj[key] === 'object'
                        ? recursivelyParseNested(obj[key])
                        : obj[key];
                return acc;
            }, {});
        }
        // 对于非对象和非数组值，直接返回
        return obj;
    }

    // 调用递归函数以确保所有嵌套的JSON字符串都被解析
    return recursivelyParseNested(parsedObject);
}
const getDetail = async () => {
    try {
        const { data } = await axios.get(
            `/did/process/${route.query.processId}`
        );
        if (data.code == 200) {
            applyData.value = data.data;
            processTemplateContent.value = parseJsonWithPossibleNested(
                data.data.processTemplateContent
            );
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    }
};

const formReset = () => {
    state.form = {
        name: '',
        enterpriseName: '',
        expire: 0,
        loading: false
    };
    formRef.value?.resetFields();
};
const handleCloseAuth = () => {
    showAuthDialog.value = false;
    state.dialogForm.desc = '';
    state.dialogForm.loading = false;
    dialogFormRef.value?.resetFields();
};
const onSubmit = () => {
    dialogFormRef.value?.validate(async (valid) => {
        if (valid) {
            state.dialogForm.loading = true;
            try {
                const { data } = await axios.post(
                    `/did/process/reject/${route.query.processId}`,
                    {
                        desc: state.dialogForm.desc
                    }
                );
                if (data.code == 200) {
                    ElMessage.success('凭证申请已驳回');
                    router.back();
                } else {
                    ElMessage.error(data.msg);
                }
            } catch (error) {
                throw error;
            } finally {
                dialogFormReset();
                state.form.loading = false;
            }
        }
    });
};
const cert = () => {
    router.push({
        name: 'CertificateIssuanceApply',
        query: {
            processId: route.query.processId
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
