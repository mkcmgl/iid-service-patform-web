<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] flex items-center font-medium tracking-wider text-[#333333] leading-none"
        >
            <el-icon class="cursorPointer" @click="toBack"
                ><ArrowLeft></ArrowLeft
            ></el-icon>
            <span>详情 <span class="text-[#CACED3]">/ 创建凭证模板</span></span>
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
            :model="state.form"
            :rules="rules"
            size="large"
            label-position="left"
            label-width="120px"
            :hide-required-asterisk="true"
        >
            <div class="bg-white my-4 w-ful rounded-xl p-4">
                <div
                    class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
                >
                    <i class="leftLine"></i><span>基本信息</span>
                </div>
                <div class="w-[500px]">
                    <el-row :gutter="35">
                        <el-col
                            :xs="24"
                            :sm="24"
                            :md="24"
                            :lg="24"
                            :xl="24"
                            class="mb22"
                        >
                            <el-form-item
                                label="模板名称"
                                prop="templateName"
                                class="leftFormTip"
                            >
                                <el-input
                                    v-model="state.form.templateName"
                                    placeholder="请输入模板名称"
                                    clearable
                                ></el-input>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item
                                label="模板类型"
                                prop="templateType"
                                class="leftFormTip"
                            >
                                <el-input
                                    v-model="state.form.templateType"
                                    placeholder="请输入模板类型"
                                    clearable
                                ></el-input>
                            </el-form-item>

                            <el-form-item
                                label="模板描述"
                                prop="templateDescription"
                                class="leftFormTip"
                            >
                                <el-input
                                    type="textarea"
                                    v-model="state.form.templateDescription"
                                    placeholder="模板描述"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-form>
    </div>
    <div class="w-full">
        <el-form
            ref="certFormRef"
            :model="state.certForm"
            :rules="formCertRules"
            size="large"
            label-position="left"
            label-width="120px"
            :hide-required-asterisk="true"
        >
            <div class="bg-white my-4 w-ful rounded-xl p-4">
                <div
                    class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
                >
                    <i class="leftLine"></i><span>凭证元数据</span>
                </div>
                <div class="">
                    <el-form-item
                        prop="claimFields"
                        class="el-form-flex-column"
                        label-width="0"
                    >
                        <el-table
                            :data="state.certForm.claimFields"
                            style="width: 100%"
                            max-height="250"
                            class="applyFormClass"
                        >
                            <el-table-column label="属性名称(中文)">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'claimFields.' +
                                            scope.$index +
                                            '.fieldNameCn'
                                        "
                                    >
                                        <el-input
                                            v-model="scope.row.fieldNameCn"
                                            clearable
                                            reserve-keyword
                                            placeholder="请输入"
                                            style="width: 240px"
                                        />
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性名称(英文)">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'claimFields.' +
                                            scope.$index +
                                            '.fieldNameUs'
                                        "
                                    >
                                        <el-input
                                            v-model="scope.row.fieldNameUs"
                                            clearable
                                            reserve-keyword
                                            placeholder="请输入"
                                            style="width: 240px"
                                        />
                                    </el-form-item>
                                </template>
                            </el-table-column>

                            <el-table-column label="数据类型">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'claimFields.' +
                                            scope.$index +
                                            '.fieldDataType'
                                        "
                                    >
                                        <el-select
                                            v-model="scope.row.fieldDataType"
                                            placeholder="请选择"
                                            size="large"
                                            style="width: 240px"
                                        >
                                            <el-option
                                                v-for="item in fieldTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否必填">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'claimFields.' +
                                            scope.$index +
                                            '.fieldRequired'
                                        "
                                    >
                                        <el-select
                                            v-model="scope.row.fieldRequired"
                                            placeholder="请选择"
                                            size="large"
                                            style="width: 240px"
                                        >
                                            <el-option
                                                v-for="item in fieldRequiredOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            />
                                        </el-select>
                                    </el-form-item> </template
                            ></el-table-column>
                            <el-table-column label="限制字数">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'claimFields.' +
                                            scope.$index +
                                            '.fieldLimit'
                                        "
                                    >
                                        <el-input-number
                                            v-model="scope.row.fieldLimit"
                                            :min="0"
                                            :max="15"
                                            reserve-keyword
                                            type="number"
                                            style="width: 240px"
                                            controls-position="right"
                                        />
                                    </el-form-item> </template
                            ></el-table-column>
                            <el-table-column label="属性描述(选填)">
                                <template #default="scope">
                                    <el-form-item label-width="0px">
                                        <el-input
                                            v-model="scope.row.fieldDescription"
                                            clearable
                                            reserve-keyword
                                            maxlength="50"
                                            placeholder="请输入"
                                            style="width: 240px"
                                        />
                                    </el-form-item> </template
                            ></el-table-column>
                            <el-table-column label="操作" width="120">
                                <template #default="scope">
                                    <el-button
                                        link
                                        type="primary"
                                        size="small"
                                        @click.prevent="
                                            deleteRow(scope.row, scope.$index)
                                        "
                                    >
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>

                    <el-button
                        class="mt-4"
                        style="width: 100%"
                        @click="onAddItem"
                    >
                        添加属性
                    </el-button>
                </div>
            </div>
        </el-form>
    </div>
    <div class="w-full">
        <el-form
            ref="formApplyRef"
            :model="state.applyForm"
            :rules="formRules"
            size="large"
            label-position="left"
            label-width="120px"
            :hide-required-asterisk="true"
        >
            <div class="bg-white my-4 w-ful rounded-xl p-4">
                <div
                    class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
                >
                    <i class="leftLine"></i><span>凭证申请元数据</span>
                </div>
                <div class="w-full">
                    <el-form-item
                        prop="templateFields"
                        class="el-form-flex-column"
                        label-width="0"
                    >
                        <el-table
                            :data="state.applyForm.templateFields"
                            style="width: 100%"
                            max-height="250"
                            class="applyFormClass"
                        >
                            <el-table-column label="属性名称(中文)">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'templateFields.' +
                                            scope.$index +
                                            '.fieldNameCn'
                                        "
                                    >
                                        <el-input
                                            v-model="scope.row.fieldNameCn"
                                            clearable
                                            reserve-keyword
                                            placeholder="请输入"
                                            style="width: 240px"
                                        />
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性名称(英文)">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'templateFields.' +
                                            scope.$index +
                                            '.fieldNameUs'
                                        "
                                    >
                                        <el-input
                                            v-model="scope.row.fieldNameUs"
                                            clearable
                                            reserve-keyword
                                            placeholder="请输入"
                                            style="width: 240px"
                                        />
                                    </el-form-item>
                                </template>
                            </el-table-column>

                            <el-table-column label="数据类型">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'templateFields.' +
                                            scope.$index +
                                            '.fieldDataType'
                                        "
                                    >
                                        <el-select
                                            v-model="scope.row.fieldDataType"
                                            placeholder="请选择"
                                            size="large"
                                            style="width: 240px"
                                        >
                                            <el-option
                                                v-for="item in fieldDataTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否必填">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'templateFields.' +
                                            scope.$index +
                                            '.fieldRequired'
                                        "
                                    >
                                        <el-select
                                            v-model="scope.row.fieldRequired"
                                            placeholder="请选择"
                                            size="large"
                                            style="width: 240px"
                                        >
                                            <el-option
                                                v-for="item in fieldRequiredOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            />
                                        </el-select>
                                    </el-form-item> </template
                            ></el-table-column>
                            <el-table-column label="限制字数">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'templateFields.' +
                                            scope.$index +
                                            '.fieldLimit'
                                        "
                                    >
                                        <el-input-number
                                            v-model="scope.row.fieldLimit"
                                            :min="0"
                                            :max="15"
                                            reserve-keyword
                                            type="number"
                                            style="width: 240px"
                                            controls-position="right"
                                        />
                                    </el-form-item> </template
                            ></el-table-column>
                            <el-table-column label="属性描述(选填)">
                                <template #default="scope">
                                    <el-form-item
                                        label-width="0px"
                                        :prop="
                                            'templateFields.' +
                                            scope.$index +
                                            '.fieldDescription'
                                        "
                                    >
                                        <el-input
                                            v-model="scope.row.fieldDescription"
                                            clearable
                                            reserve-keyword
                                            maxlength="50"
                                            placeholder="请输入"
                                            style="width: 240px"
                                        />
                                    </el-form-item> </template
                            ></el-table-column>
                            <el-table-column label="操作" width="120">
                                <template #default="scope">
                                    <el-button
                                        link
                                        type="primary"
                                        size="small"
                                        @click.prevent="
                                            deleteRowApply(
                                                scope.row,
                                                scope.$index
                                            )
                                        "
                                    >
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>

                    <el-button
                        class="mt-4"
                        style="width: 100%"
                        @click="onAddItemApply"
                    >
                        添加属性
                    </el-button>
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
const fieldErrors = ref([]);
const formRef = ref<FormInstance>();
const formApplyRef = ref<FormInstance>();
const certFormRef = ref<FormInstance>();
const value = ref('');
const fieldTypeOptions = [
    {
        value: '0',
        label: '字符串'
    },
    {
        value: '1',
        label: '数字'
    }
];
const fieldDataTypeOptions = [
    {
        value: '0',
        label: '字符串'
    },
    {
        value: '1',
        label: '数字'
    },
    {
        value: '2',
        label: '文件'
    }
];
const fieldRequiredOptions = [
    {
        value: '0',
        label: '否'
    },
    {
        value: '1',
        label: '是'
    }
];
const formRules = reactive<FormRules>({});
const formCertRules = reactive<FormRules>({});
const updateCertFormFormRules = () => {
    formCertRules.claimFields = [];
    state.certForm.claimFields.forEach((field, index) => {
        formCertRules['claimFields.' + index + '.fieldNameCn'] = [
            {
                required: true,
                message: '属性名称(中文)是必填项',
                trigger: 'blur'
            },
            {
                required: true,
                validator: (rule: any, value: any, callback: any) => {
                    if (!/^[\u4e00-\u9fa5]{1,20}$/.test(value)) {
                        callback(new Error('限中文不超过20个字符'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            },
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
            { min: 1, max: 20, message: '1-20字符', trigger: 'blur' }
        ];
        formCertRules['claimFields.' + index + '.fieldNameUs'] = [
            {
                required: true,
                message: '属性名称(英文)是必填项',
                trigger: 'blur'
            },

            {
                required: true,
                validator: (rule: any, value: any, callback: any) => {
                    if (!/^[a-zA-Z]{1,50}$/.test(value)) {
                        callback(new Error('限英文不超过50个字符'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            },
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
            { min: 1, max: 50, message: '1-50字符', trigger: 'blur' }
        ];
        formCertRules['claimFields.' + index + '.fieldDataType'] = [
            {
                required: true,
                message: '数据类型是必选项',
                trigger: 'change'
            }
        ];
        formCertRules['claimFields.' + index + '.fieldRequired'] = [
            {
                required: true,
                message: '是否必填是必选项',
                trigger: 'blur'
            }
        ];
        formCertRules['claimFields.' + index + '.fieldLimit'] = [
            {
                required: true,
                message: '限制字数是必填项',
                trigger: 'blur'
            }
        ];
    });
};
const updateFormRules = () => {
    formRules.templateFields = [];
    state.applyForm.templateFields.forEach((field, index) => {
        formRules['templateFields.' + index + '.fieldNameCn'] = [
            {
                required: true,
                message: '属性名称(中文)是必填项',
                trigger: 'blur'
            },
            {
                required: true,
                validator: (rule: any, value: any, callback: any) => {
                    if (!/^[\u4e00-\u9fa5]{1,20}$/.test(value)) {
                        callback(new Error('限中文不超过20个字符'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            },
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
            { min: 1, max: 20, message: '1-20字符', trigger: 'blur' }
        ];
        formRules['templateFields.' + index + '.fieldNameUs'] = [
            {
                required: true,
                message: '属性名称(英文)是必填项',
                trigger: 'blur'
            },

            {
                required: true,
                validator: (rule: any, value: any, callback: any) => {
                    if (!/^[a-zA-Z]{1,50}$/.test(value)) {
                        callback(new Error('限英文不超过50个字符'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            },
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
            { min: 1, max: 50, message: '1-50字符', trigger: 'blur' }
        ];
        formRules['templateFields.' + index + '.fieldDataType'] = [
            {
                required: true,
                message: '数据类型是必选项',
                trigger: 'change'
            }
        ];
        formRules['templateFields.' + index + '.fieldRequired'] = [
            {
                required: true,
                message: '是否必填是必选项',
                trigger: 'blur'
            }
        ];
        formRules['templateFields.' + index + '.fieldLimit'] = [
            {
                required: true,
                message: '限制字数是必填项',
                trigger: 'blur'
            }
        ];
    });
};
const deleteRow = (e: any, index: number) => {
    if (state.certForm.claimFields.length == 1) {
        ElMessage.warning('至少需要一个数据');
    } else {
        state.certForm.claimFields.splice(index, 1);
    }
};
const deleteRowApply = (e: any, index: number) => {
    state.applyForm.templateFields.splice(index, 1);
};
const onAddItemApply = () => {
    state.applyForm.templateFields.push({ fieldRequired: '1' });
    updateFormRules();
    console.log(formRules);
};
const onAddItem = () => {
    state.certForm.claimFields.push({ fieldRequired: '1' });
    updateCertFormFormRules();
};
const requiredFields = [
    'fieldNameCn',
    'fieldNameUs',
    'fieldDataType',
    'fieldRequired',
    'fieldLimit',
    'fieldDescription'
];
const router = useRouter();
const route = useRoute();
const visible = ref(false);
const topFocus = ref(1);
const state = reactive({
    form: {
        templateName: '',
        templateType: '',
        templateDescription: '',
        loading: false
    },
    applyForm: {
        templateFields: <Object[]>[]
    },
    certForm: {
        claimFields: [{ fieldRequired: '1' }]
    }
});
const errors = ref<Record<string, Record<string, string[]>>>({});

const rules = reactive<FormRules>({
    templateName: [
        { required: true, message: '请输入模板名称', trigger: 'blur' },
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
        },
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
        { min: 1, max: 20, message: '1-20字符', trigger: 'blur' }
    ],
    templateType: [
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
                if (!/^[\u4e00-\u9fa5A-Za-z0-9]{1,50}$/.test(value)) {
                    callback(
                        new Error('限中文、数字或大小写字母，不超过50个字符')
                    );
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    templateDescription: [
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
        },
        { min: 1, max: 100, message: '1-100字符', trigger: 'blur' }
    ],
    claimFields: [
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                if (
                    !requiredFields.every(
                        (field) =>
                            field in value[0] && value[0][field] !== undefined
                    )
                ) {
                    callback(
                        new Error(
                            '至少需要一个元数据对象，且所有字段都不能为空 '
                        )
                    );
                } else {
                    const allFieldsNonEmpty = value.every((obj: any) => {
                        return requiredFields.every((field) => {
                            const fieldValue = obj[field];
                            // 检查字段值是否为空，这里可以根据需要调整空值的定义
                            return (
                                fieldValue !== null &&
                                fieldValue !== undefined &&
                                fieldValue !== '' &&
                                !/^\s+$/gi.test(fieldValue)
                            );
                        });
                    });

                    if (!allFieldsNonEmpty) {
                        callback(new Error('元数据对象的所有字段都不能为空'));
                        return;
                    }

                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    templateFields: [
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                const allFieldsNonEmpty = value.every((obj: any) => {
                    return requiredFields.every((field) => {
                        const fieldValue = obj[field];
                        // 检查字段值是否为空，这里可以根据需要调整空值的定义
                        return (
                            fieldValue !== null &&
                            fieldValue !== undefined &&
                            fieldValue !== '' &&
                            !/^\s+$/gi.test(fieldValue)
                        );
                    });
                });

                if (!allFieldsNonEmpty) {
                    callback(new Error('元数据对象的所有字段都不能为空'));
                    return;
                }

                callback();
            },
            trigger: 'change'
        }
    ]
});
const searchLoading = ref(false);

onMounted(() => {
    formReset();
    updateCertFormFormRules();
});
const formReset = () => {
    state.form = {
        templateName: '',
        templateType: '',
        templateDescription: '',
        loading: false
    };
    state.applyForm = {
        templateFields: <Object[]>[]
    };
    state.certForm = {
        claimFields: [{ fieldRequired: '1' }]
    };
    formRef.value?.resetFields();
    certFormRef.value?.resetFields();
    formApplyRef.value?.resetFields();
};
const onSubmit = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            certFormRef.value?.validate((valid) => {
                if (valid) {
                    formApplyRef.value?.validate(async (valid) => {
                        if (valid) {
                            state.form.loading = true;
                            const { loading, ...formWithoutLoading } =
                                state.form;
                            try {
                                const { data } = await axios.post(
                                    '/did/template',
                                    {
                                        ...formWithoutLoading,
                                        ...state.certForm,
                                        ...state.applyForm,
                                        appId: route.query.appId
                                    }
                                );
                                if (data.code == 200) {
                                    ElMessage.success('凭证模板创建成功');
                                    router.back();
                                } else {
                                    ElMessage.error(data.msg);
                                }
                            } catch (error) {
                                throw error;
                            } finally {
                                state.form.loading = false;
                                formReset();
                            }
                        }
                    });
                }
            });
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
.applyFormClass {
    ::v-deep(.el-table__row) {
        height: 70px;
        line-height: 70px;
        td > .cell {
            height: 70px !important;
            line-height: 70px !important;
        }
    }
}
</style>
