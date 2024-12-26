<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            凭证签发
        </h1>
    </div>
    <div class="w-full bg-white p-4">
        <div class="flex justify-between py-4 mb-4 topSearchBorder">
            <div class="flex-1 mr-8 grid gap-3 grid-cols-3 gap-x-4">
                <div class="flex items-center max-w-[500px]">
                    <span class="mr-4 w-28">凭证名称</span>
                    <el-input
                        v-model="state.form.templateName"
                        clearable
                        placeholder="请输入凭证名称"
                    ></el-input>
                </div>
                <div class="flex items-center max-w-[500px]">
                    <span class="mr-4 w-28">审核状态</span>
                    <el-select
                        v-model="state.form.processApprovalStatus"
                        clearable
                        placeholder="请选择审核状态"
                    >
                        <el-option
                            v-for="item in processApprovalStatusOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
                <div class="flex items-center max-w-[500px]">
                    <span class="mr-4 w-28">签发状态</span>
                    <el-select
                        v-model="state.form.processIssuedStatus"
                        clearable
                        placeholder="请选择签发状态"
                    >
                        <el-option
                            v-for="item in processIssuedStatusOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
            <div class="flex">
                <el-button
                    type="primary"
                    @click="handleSearch"
                    :loading="searchLoading"
                    ><el-icon class="mr-2"><Search /></el-icon>搜索</el-button
                >
                <el-button type="" @click="searchReset"
                    ><el-icon class="mr-2"><RefreshLeft /></el-icon
                    >重置</el-button
                >
            </div>
        </div>
        <div>
            <el-table class="" :data="tableData" style="width: 100%">
                <template #empty>
                    <el-empty description="暂无数据" />
                </template>
                <el-table-column
                    show-overflow-tooltip
                    prop="templateName"
                    label="凭证名称"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="templateDescription"
                    label="凭证描述"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="did"
                    label="申请方DID"
                />
                <el-table-column show-overflow-tooltip label="申请状态"
                    ><template #default="scope">
                        <div>
                            {{
                                scope.row.processApprovalStatus == 0
                                    ? '未申请 '
                                    : scope.row.processApprovalStatus == 1
                                      ? '申请中'
                                      : scope.row.processApprovalStatus == 2
                                        ? '申请驳回'
                                        : '申请通过'
                            }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label="签发状态">
                    <template #default="scope">
                        <!-- <div class="flex items-center">
                            <div
                                class="mr-2 round-green"
                                :class="{
                                    'round-green':
                                        scope.row.processIssuedStatus == 1,
                                    'round-red':
                                        scope.row.processIssuedStatus == 0
                                }"
                            /> -->
                        <div>
                            {{
                                scope.row.processIssuedStatus == 0
                                    ? '未签发'
                                    : '已签发'
                            }}
                        </div>
                        <!-- </div> -->
                    </template>
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="processSubmitTime"
                    label="申请时间"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="processApprovalTime"
                    label="审核时间"
                />

                <el-table-column label="操作" width="80">
                    <template #default="scope">
                        <el-button
                            v-if="scope.row.processApprovalStatus != 1"
                            :disabled="scope.row.type == '2'"
                            :class="
                                scope.row.type == '2' ? 'disabledColor' : ''
                            "
                            size="small"
                            link
                            type="primary"
                            @click="toApply(scope.row)"
                            >查看
                        </el-button>
                        <el-button
                            v-if="scope.row.processApprovalStatus == 1"
                            :disabled="scope.row.type == '2'"
                            :class="
                                scope.row.type == '2' ? 'disabledColor' : ''
                            "
                            size="small"
                            link
                            type="primary"
                            @click="toApply(scope.row)"
                            >审核
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="justify-end mt-20"
                v-model:current-page="state.pageNum"
                v-model:page-size="state.pageSize"
                :page-sizes="[5, 10, 30, 50]"
                size="default"
                layout="total, sizes, prev, pager, next, jumper"
                :total="state.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import axios from '@/plugins/axios';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const visible = ref(false);
const dialogFormRef = ref<FormInstance>();
const showDialog = ref(false);
const state = reactive({
    form: {
        templateName: '',
        processApprovalStatus: '',
        processIssuedStatus: '',
        appId: ''
    },
    loading: false,
    pageSize: 10,
    pageNum: 1,
    total: 0
});
const processApprovalStatusOption = [
    {
        value: '1',
        label: '申请中'
    },
    {
        value: '2',
        label: '申请驳回'
    },
    {
        value: '3',
        label: '申请通过'
    }
];
const processIssuedStatusOption = [
    {
        value: '0',
        label: '未签发'
    },
    {
        value: '1',
        label: '已签发'
    }
];
export interface AppDataListData {
    appName: string;
    appId: string;
}
const appDataList = ref(<AppDataListData[]>[]);
const value = ref('');
const searchLoading = ref(false);

const tableData = ref([]);
onMounted(() => {
    getTableDidAppData();
    getTableData();
});
// 初始化表格数据
const getTableDidAppData = async () => {
    searchLoading.value = true;
    try {
        const { data } = await axios.get('/did/app/list', {
            params: {
                pageSize: 99999,
                pageNum: 1
            }
        });
        if (data.code == 200) {
            appDataList.value = data.rows;
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    } finally {
        searchLoading.value = false;
    }
};
const getTableData = async (processApprovalStatusList: any = '1,2,3') => {
    state.loading = true;
    searchLoading.value = true;
    try {
        const { data } = await axios.get('/did/process/list', {
            params: {
                templateName: state.form.templateName,
                processApprovalStatus: processApprovalStatusList,
                processIssuedStatus: state.form.processIssuedStatus,
                appId: state.form.appId,
                pageSize: state.pageSize,
                pageNum: state.pageNum
            }
        });
        if (data.code == 200) {
            tableData.value = data.rows;
            state.total = data.total;
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    } finally {
        state.loading = false;
        searchLoading.value = false;
    }
};

const handleSearch = () => {
    state.pageNum = 1;
    if (state.form.processApprovalStatus) {
        getTableData(state.form.processApprovalStatus);
    } else {
        getTableData('1,2,3');
    }
};
const reset = () => {
    state.form = {
        templateName: '',
        processApprovalStatus: '',
        processIssuedStatus: '',
        appId: ''
    };
};
const searchReset = () => {
    reset();
    state.pageNum = 1;
    state.pageSize = 10;
    getTableData();
};
const dialogFormRules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入应用名称', trigger: 'blur' },
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
        { min: 1, max: 32, message: '1-32字符', trigger: 'blur' }
    ],
    desc: [
        { required: true, message: '请输入描述', trigger: 'blur' },
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

const handleSizeChange = (val: number) => {
    state.pageSize = val;
    getTableData();
};
const handleCurrentChange = (val: number) => {
    state.pageNum = val;
    getTableData();
};
const handleCommand = (command: string | number | object) => {
    ElMessage(`click on item ${command}`);
};

const toApply = (row: any) => {
    router.push({
        name: 'CertificateIssuanceAuth',
        query: { processId: row.processId }
    });
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
</style>
