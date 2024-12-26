<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            应用管理
        </h1>
        <el-button type="primary" @click="showDialog = true"
            >创建应用</el-button
        >
    </div>
    <div class="w-full p-4 bg-white">
        <div class="flex bg-white justify-between py-5 mb-4 topSearchBorder">
            <div class="flex items-center">
                <span class="mr-4 w-24">应用名称</span>
                <el-input
                    v-model="state.form.appName"
                    placeholder="请输入应用名称"
                ></el-input>
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
            <div
                v-if="tableData.length == 0"
                class="w-full text-center text-[#909399]"
            >
                <el-empty description="暂无数据" />
            </div>
            <div v-else class="grid gap-4 grid-cols-4">
                <div
                    class="itemBorder px-4 bg-white"
                    v-for="(item, index) in tableData"
                    :key="index"
                >
                    <div
                        style="border-bottom: 1px solid #ebebeb"
                        class="p-2 font-bold"
                    >
                        {{ item.appName }}
                    </div>
                    <div class="p-2">
                        <div class="text-[#CACED3] text-[12px] mb-2">
                            {{ item.createTime }}
                        </div>
                        <div class="flex text-[13px]">
                            <div class="flex-1">
                                <span class="mr-2 text-[#666]">凭证模板数</span>
                                <span class="font-bold text-[16px]">{{
                                    item.templateNum
                                }}</span>
                            </div>
                            <div class="flex-1">
                                <span class="mr-2 text-[#666]">签发凭证数</span>
                                <span class="font-bold text-[16px]">{{
                                    item.claimNum
                                }}</span>
                            </div>
                        </div>
                        <div class="text-end mt-6 mb-4">
                            <el-button
                                type="primary"
                                @click="toDetail(item.appId)"
                                >详情</el-button
                            >
                        </div>
                    </div>
                </div>
            </div>
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
    <el-dialog
        @close="closeDialog"
        v-model="showDialog"
        title="创建应用"
        width="800"
    >
        <el-form
            :model="dialogForm"
            :rules="dialogFormRules"
            ref="dialogFormRef"
            size="large"
            label-position="left"
            label-width="100px"
            class="w-[500px]"
        >
            <el-form-item label="应用名称" prop="appName">
                <el-input
                    v-model="dialogForm.appName"
                    placeholder="请输入请输入应用名称"
                    clearable
                />
            </el-form-item>
            <el-form-item label="应用描述" prop="appDescription">
                <el-input
                    v-model="dialogForm.appDescription"
                    type="textarea"
                    placeholder="请输入应用描述"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="onSubmit"> 确认 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import axios from '@/plugins/axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const visible = ref(false);
const name = ref('');
const dialogFormRef = ref<FormInstance>();
const showDialog = ref(false);
const state = reactive({
    form: { appName: '' },
    loading: false,
    pageSize: 10,
    pageNum: 1,
    total: 0
});
const tableData = ref([]);
const dialogForm = reactive({
    appName: '',
    appDescription: '',
    loading: false
});
const searchLoading = ref(false);
const dialogFormRules = reactive<FormRules>({
    appName: [
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
        { min: 1, max: 20, message: '1-20字符', trigger: 'blur' }
    ],
    appDescription: [
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
        },
        { min: 1, max: 20, message: '1-20字符', trigger: 'blur' }
    ]
});

onMounted(() => {
    getTableData();
});
const closeDialog = () => {
    showDialog.value = false;
    dialogForm.appName = '';
    dialogForm.appDescription = '';
    dialogFormRef.value?.resetFields();
};
const getTableData = async () => {
    state.loading = true;
    searchLoading.value = true;
    try {
        const { data } = await axios.get('/did/app/list', {
            params: {
                appName: state.form.appName,
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
    getTableData();
};
const reset = () => {
    state.form = {
        appName: ''
    };
};
const searchReset = () => {
    reset();
    state.pageNum = 1;
    state.pageSize = 10;
    getTableData();
};
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

const onSubmit = () => {
    dialogFormRef.value?.validate(async (valid: any) => {
        if (valid) {
            dialogForm.loading = true;
            try {
                const { data } = await axios.post('/did/app', {
                    appName: dialogForm.appName,
                    appDescription: dialogForm.appDescription
                });
                if (data.code == 200) {
                    ElMessage.success('应用创建成功');
                    closeDialog();
                    handleSearch();
                } else {
                    ElMessage.error(data.msg);
                }
            } catch (error) {
                throw error;
            } finally {
                dialogForm.loading = false;
            }
        }
    });
};

const toDetail = (e: any) => {
    router.push({
        name: 'AppManagementDetail',
        query: { appId: e }
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

.itemBorder {
  max-width: 500px;
  box-shadow: 0 0 10px 1px #e4e6e9;
  border-radius: 4px 4px 4px 4px;
}
</style>
