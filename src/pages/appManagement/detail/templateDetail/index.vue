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
                            <el-form-item label="模板ID:" class="formList">
                                <span>{{ certBaseDetail.templateId }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item label="模板类型:" class="formList">
                                <span>{{ certBaseDetail.templateType }}</span>
                            </el-form-item>
                            <el-form-item label="状态:" class="formList">
                                <span>{{
                                    certBaseDetail.templateStatus == '0'
                                        ? '禁用'
                                        : '启用'
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
                            <el-form-item label="模板名称:" class="formList">
                                <span>{{ certBaseDetail.templateName }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item label="模板描述:" class="formList">
                                <span>{{
                                    certBaseDetail.templateDescription
                                }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间:" class="formList">
                                <span>{{ certBaseDetail.createTime }}</span>
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
                <i class="leftLine"></i><span>凭证元数据</span>
            </div>
            <div class="">
                <el-table
                    :data="certBaseDetail.claimFields"
                    style="width: 100%"
                    max-height="250"
                >
                    <el-table-column
                        show-overflow-tooltip
                        prop="fieldNameCn"
                        label="属性名称(中文)"
                    >
                        <template #default="scope"> </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="fieldNameUs"
                        label="属性名称(英文)"
                    >
                    </el-table-column>

                    <el-table-column show-overflow-tooltip label="数据类型">
                        <template #default="scope"
                            >{{
                                scope.row.fieldDataType == 0
                                    ? '字符串'
                                    : scope.row.fieldDataType == 1
                                      ? '数字'
                                      : '文件'
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="city"
                        label="是否必填"
                    >
                        <template #default="scope"
                            >{{ scope.row.fieldRequired == 0 ? '否' : '是' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="fieldLimit"
                        label="限制字数"
                    >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="fieldDescription"
                        label="属性描述(选填)"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="bg-white my-4 w-ful rounded-xl p-4">
            <div
                class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
            >
                <i class="leftLine"></i><span>凭证申请元数据</span>
            </div>
            <div class="">
                <el-table
                    :data="certBaseDetail.templateFields"
                    style="width: 100%"
                    max-height="250"
                >
                    <el-table-column
                        show-overflow-tooltip
                        prop="fieldNameCn"
                        label="属性名称(中文)"
                    >
                        <template #default="scope"> </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="fieldNameUs"
                        label="属性名称(英文)"
                    >
                    </el-table-column>

                    <el-table-column show-overflow-tooltip label="数据类型">
                        <template #default="scope"
                            >{{
                                scope.row.fieldDataType == 0
                                    ? '字符串'
                                    : scope.row.fieldDataType == 1
                                      ? '数字'
                                      : '文件'
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="city"
                        label="是否必填"
                    >
                        <template #default="scope"
                            >{{ scope.row.fieldRequired == 0 ? '否' : '是' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="fieldLimit"
                        label="限制字数"
                    >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="fieldDescription"
                        label="属性描述(选填)"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { CertBaseDetails } from '@/types/certs';
import axios from '@/plugins/axios';
const router = useRouter();
const route = useRoute();
const now = new Date();
const certBaseDetail = ref(<CertBaseDetails>{});
const formRef = ref<FormInstance>();
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

const onAddItem = () => {
    now.setDate(now.getDate() + 1);
    tableData.value.push({
        date: dayjs(now).format('YYYY-MM-DD'),
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
    });
};

const visible = ref(false);
const topFocus = ref(1);
const state = reactive({
    form: {
        name: '',
        enterpriseName: '',
        expire: 0,
        loading: false
    }
});
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
const searchLoading = ref(false);

onMounted(() => {
    getDetail();
});

const getDetail = async () => {
    try {
        const { data } = await axios.get(
            `/did/template/${route.query.templateId}`
        );
        if (data.code == 200) {
            certBaseDetail.value = data.data;
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
const onSubmit = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
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
