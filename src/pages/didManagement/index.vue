<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            DID管理
        </h1>
    </div>
    <div class="w-full bg-white p-4">
        <div class="flex justify-between py-4 mb-4 topSearchBorder">
            <el-form ref="form" label-position="left" label-width="88px">
                <div class="flex-1 mr-6 grid gap-3 grid-cols-3 gap-x-4">
                    <el-form-item
                        label="DID标识符"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-input
                            v-model="state.searchForm.iidId"
                            clearable
                            placeholder="请输入DID标识符"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="认证类型"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-select
                            v-model="state.searchForm.iidType"
                            clearable
                            placeholder="请选择认证类型"
                        >
                            <el-option
                                v-for="item in iidTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="认证主体"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-input
                            v-model="state.searchForm.iidSubject"
                            clearable
                            placeholder="请输入认证主体名称"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="是否发证方"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-select
                            v-model="state.searchForm.iidIsIssuer"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in iidIsIssuerOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="状态"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-select
                            v-model="state.searchForm.iidStatus"
                            clearable
                            placeholder="请选择状态"
                        >
                            <el-option
                                v-for="item in iidStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="创建时间"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-date-picker
                            class="timeFont"
                            v-model="searchTimeArray"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            clearable
                        />
                    </el-form-item>
                </div>
            </el-form>
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
            <el-table
                class=""
                v-loading="state.loading"
                :data="tableData"
                style="width: 100%"
            >
                <template #empty>
                    <el-empty description="暂无数据" />
                </template>
                <el-table-column show-overflow-tooltip label="DID标识符">
                    <template #default="scope">
                        <el-button
                            link
                            type="primary"
                            @click="copy(scope.row.iidId)"
                            size="small"
                        >
                            {{ scope.row.iidId
                            }}<el-icon class="ml-1"><DocumentCopy /></el-icon>
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="name"
                    label="认证类型"
                >
                    <template #default="scope">
                        <span>{{
                            scope.row.iidType == 0 ? '个人认证' : '机构认证'
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="iidSubject"
                    label="认证主体"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="address"
                    label="是否发证方"
                    ><template #default="scope">
                        <span>{{
                            scope.row.iidIsIssuer == 0 ? '否' : '是'
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="address"
                    label="状态"
                >
                    <template #default="scope">
                        <div class="flex items-center">
                            <div
                                class="mr-2 round-green"
                                :class="{
                                    'round-green': scope.row.iidStatus == 1,
                                    'round-red': scope.row.iidStatus == 0
                                }"
                            />
                            <div>
                                {{ scope.row.iidStatus == 0 ? '禁用' : '启用' }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="createTime"
                    label="创建时间"
                />
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button
                            link
                            type="primary"
                            size="small"
                            @click="showDidDialog(scope.row)"
                            >查看DID文档
                        </el-button>
                        <el-button
                            link
                            style="margin-left: 5px"
                            type="primary"
                            size="small"
                            @click="showPublicDialog(scope.row)"
                            >查看公钥
                        </el-button>
                        <!-- 
                            //禁用
                        :disabled="scope.row.iidStatus == '1'"
                        :class="
                            scope.row.iidStatus == '1'
                                ? 'disabledColor'
                                : ''
                        " -->
                        <!-- <el-button
                            style="margin-left: 5px"
                            size="small"
                            link
                            type="primary"
                            @click="handlerDidToggle(scope.row)"
                            >{{ scope.row.iidStatus == 1 ? '禁用' : '启用' }}
                        </el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="justify-end mt-4"
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
        <el-dialog
            :loading="dialogLoading"
            v-model="showDialogDid"
            title="查看DID文档"
            width="800"
        >
            <pre class="bg-[rgb(247,248,250)] overflow-x-auto">{{
                didDocumentJsonString
            }}</pre>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showDialogDid = false">取消</el-button>
                    <el-button type="primary" @click="showDialogDid = false">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog
            :loading="dialogLoading"
            v-model="showDialogPublicKey"
            title="查看公钥"
            width="800"
        >
            <div class="flex">
                <span class="mr-8">公钥:</span>
                <el-button
                    @click="copy(publicKeyHex)"
                    link
                    style="
                        flex: 1;
                        overflow-wrap: break-word;
                        word-break: break-all;
                        white-space: normal;
                        text-align: justify;
                    "
                >
                    {{ publicKeyHex }}
                    <el-icon class="ml-1"><DocumentCopy /></el-icon>
                </el-button>
                <!-- <el-button link>
                    {{ publicKeyHex
                    }}<el-icon class="ml-1"><DocumentCopy /></el-icon>
                </el-button> -->
            </div>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showDialogPublicKey = false"
                        >取消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="showDialogPublicKey = false"
                    >
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import axios from '@/plugins/axios';
import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard();
const router = useRouter();
const visible = ref(false);
const name = ref('');
const dialogFormRef = ref<FormInstance>();
const showDialogPublicKey = ref(false);
const showDialogDid = ref(false);
const dialogLoading = ref(false);
const searchTimeArray = ref([]);
const didDocumentJsonString = ref('');
const publicKeyHex = ref('');
const state = reactive({
    searchForm: {
        iidId: '',
        iidType: '',
        iidSubject: '',
        iidIsIssuer: '',
        iidStatus: '',
        beginDate: '',
        endDate: ''
    },
    loading: false,
    name: '',
    pageSize: 10,
    pageNum: 1,
    total: 0
});
const tableData = ref([]);
const searchLoading = ref(false);

const iidTypeOptions = [
    {
        value: '0',
        label: '个人认证'
    },
    {
        value: '1',
        label: '机构认证'
    }
];
const iidIsIssuerOptions = [
    {
        value: '0',
        label: '否'
    },
    {
        value: '1',
        label: '是'
    }
];
const iidStatusOptions = [
    {
        value: '0',
        label: '禁用'
    },
    {
        value: '1',
        label: '启用'
    }
];

onBeforeMount(() => {
    getTableData();
});
const copy = (text: any) => {
    return new Promise((resolve, reject) => {
        try {
            // 复制
            toClipboard(text);
            // 下面可以设置复制成功的提示框等操作
            ElMessage.success('复制成功!');
            resolve(text);
        } catch (e) {
            // 复制失败
            ElMessage.error(`复制失败!${e}`);
            reject(e);
        }
    });
};

// 初始化表格数据
const getTableData = async () => {
    state.loading = true;
    searchLoading.value = true;
    try {
        const { data } = await axios.get('/did/iid/list', {
            params: {
                iidId: state.searchForm.iidId,
                iidType: state.searchForm.iidType,
                iidSubject: state.searchForm.iidSubject,
                iidIsIssuer: state.searchForm.iidIsIssuer,
                iidStatus: state.searchForm.iidStatus,
                beginDate: searchTimeArray.value[0],
                endDate: searchTimeArray.value[1],
                pageSize: state.pageSize,
                pageNum: state.pageNum
            }
        });

        if (data.code == 200) {
            tableData.value = data?.rows ?? {};
            state.total = data?.total;
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    } finally {
        state.loading = false;
        searchLoading.value = false;
    }

    //
    // 	.then((res: any) => {
    // 		if (res.resultCode === 0) {
    // 			state.tableData = [];
    // 			state.tableData = res.data.data;
    // 			state.total = res.data.total;
    // 		} else {
    // 			ElMessage.error(res.resultDesc);
    // 		}
    // 	})
    // 	.catch((err: any) => {
    // 		ElMessage.error(...err);
    // 	})
    // 	.finally(() => {
    // 	});
};

const handleSearch = () => {
    state.pageNum = 1;
    getTableData();
};
const reset = () => {
    state.searchForm = {
        iidId: '',
        iidType: '',
        iidSubject: '',
        iidIsIssuer: '',
        iidStatus: '',
        beginDate: '',
        endDate: ''
    };
    searchTimeArray.value = [];
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

const handlerDidToggle = async (row: any) => {
    state.loading = true;
    searchLoading.value = true;
    try {
        const { data } = await axios.post(
            `/did/iid/toggle/${row.iidId}/${row.iidStatus == '0' ? '1' : '0'}`
        );
        if (data.code == 200) {
            getTableData();
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
const showPublicDialog = async (row: any) => {
    showDialogPublicKey.value = true;
    dialogLoading.value = true;
    try {
        const { data } = await axios.get(`/did/iid/doc/${row.iidId}`);
        if (data.code == 200) {
            publicKeyHex.value = data?.data?.publicKey[0]?.publicKeyHex ?? [];
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    } finally {
        dialogLoading.value = false;
    }
};
const showDidDialog = async (row: any) => {
    dialogLoading.value = true;
    showDialogDid.value = true;
    try {
        const { data } = await axios.get(`/did/iid/doc/${row.iidId}`);
        if (data.code == 200) {
            didDocumentJsonString.value = data?.data ?? {};
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    } finally {
        dialogLoading.value = false;
    }
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
.timeFont {
    ::v-deep(.el-range-input) {
        font-size: 12px;
    }
}
</style>
