<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] flex items-center font-medium tracking-wider text-[#333333] leading-none"
        >
            <el-icon class="cursorPointer" @click="toBack"
                ><ArrowLeft></ArrowLeft
            ></el-icon>
            <span>详情</span>
        </h1>
    </div>
    <div class="w-full">
        <div class="bg-white my-4 w-ful rounded-xl p-4">
            <el-button
                link
                :type="topFocus == 1 ? 'primary' : ''"
                @click="handleTopFocus(1)"
                >基本信息</el-button
            >
            <el-button
                link
                :type="topFocus == 2 ? 'primary' : ''"
                @click="handleTopFocus(2)"
                >凭证模板管理</el-button
            >
        </div>
        <div class="w-full" v-if="topFocus == 1">
            <div class="h-50 bg-white my-4 w-ful rounded-xl p-4 pb-8">
                <div
                    class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
                >
                    <i class="leftLine"></i><span>数据概览</span>
                </div>
                <div class="flex justify-between">
                    <div class="flex templateNum flex-1 mr-5 py-6">
                        <img
                            src="@/assets/images/home/templateLeft.png"
                            class="w-[80px] h-[80px] mr-5 ml-10"
                        />
                        <div>
                            <div class="text-[16px]">凭证模板数</div>
                            <div class="ml-3 text-[#333] font-bold text-[32px]">
                                {{ CertBaseDetail.templateNum }}
                                <span class="text-[16px]"> 个</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex issueNum flex-1 py-6">
                        <img
                            src="@/assets/images/home/issueLeft.png"
                            class="w-[80px] h-[80px] mr-5 ml-10"
                        />
                        <div>
                            <div class="text-[16px]">签发凭证数</div>
                            <div class="ml-3 text-[#333] font-bold text-[32px]">
                                {{ CertBaseDetail.claimNum }}
                                <span class="text-[16px]"> 个</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white my-4 w-ful rounded-xl p-4">
                <div
                    class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
                >
                    <i class="leftLine"></i><span>基本信息</span>
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
                                <el-form-item label="应用ID:" class="formList">
                                    <span>{{ CertBaseDetail.appId }}</span>
                                    <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                                </el-form-item>
                                <el-form-item
                                    label="应用描述:"
                                    class="formList"
                                >
                                    <span>{{
                                        CertBaseDetail.appDescription
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
                                    label="应用名称:"
                                    class="formList"
                                >
                                    <span>{{ CertBaseDetail.appName }}</span>
                                    <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                                </el-form-item>
                                <el-form-item
                                    label="创建时间:"
                                    class="formList"
                                >
                                    <span>{{ CertBaseDetail.createTime }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="w-full bg-white my-4 w-ful rounded-xl p-4" v-else>
            <div class="flex justify-between pb-4 mb-4 topSearchBorder">
                <div class="">
                    <el-input
                        v-model="state.form.templateName"
                        style="width: 240px"
                        size="large"
                        placeholder="搜索模板名称"
                        @keyup.enter="handleSearch"
                    >
                        <template #suffix>
                            <el-icon
                                class="el-input__icon"
                                :class="
                                    searchLoading ? 'cursorNo' : 'cursorPointer'
                                "
                                @click="handleSearch"
                            >
                                <el-icon>
                                    <Search />
                                </el-icon>
                            </el-icon>
                        </template>
                    </el-input>
                </div>
                <div>
                    <el-button type="primary" @click="addTemplate"
                        >创建凭证模板</el-button
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
                    <el-table-column
                        show-overflow-tooltip
                        prop="templateId"
                        label="模板ID"
                    />
                    <el-table-column
                        show-overflow-tooltip
                        prop="templateName"
                        label="模板名称"
                    />
                    <el-table-column
                        show-overflow-tooltip
                        prop="templateType"
                        label="模板类型"
                    />
                    <el-table-column
                        show-overflow-tooltip
                        prop="templateDescription"
                        label="模板描述"
                    />
                    <el-table-column
                        show-overflow-tooltip
                        prop="createBy"
                        label="创建DID"
                    />
                    <el-table-column label="状态">
                        <template #default="scope">
                            <div class="flex items-center">
                                <div
                                    class="mr-2 round-green"
                                    :class="{
                                        'round-green':
                                            scope.row.templateStatus == 1,
                                        'round-red':
                                            scope.row.templateStatus == 0
                                    }"
                                />
                                <div>
                                    {{
                                        scope.row.templateStatus == 0
                                            ? '禁用'
                                            : '启用'
                                    }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="createTime"
                        label="创建时间"
                    />
                    <el-table-column label="操作" width="150">
                        <template #default="scope">
                            <el-button
                                size="small"
                                :disabled="scope.row.userType == '1'"
                                link
                                type="primary"
                                @click="
                                    handleToDataDetail(scope.row.templateId)
                                "
                                >详情</el-button
                            >
                            <!-- <el-button
                                size="small"
                                :disabled="
                                    scope.row.userType == '1' &&
                                    scope.row.auditStatus == '0'
                                "
                                link
                                type="primary"
                                @click="showNodeDel(scope.row)"
                                :class="
                                    scope.row.userType == '1' &&
                                    scope.row.auditStatus == '0'
                                        ? 'disabledColor'
                                        : ''
                                "
                                >下载</el-button
                            > -->
                            <el-button
                                :disabled="scope.row.type == '2'"
                                :class="
                                    scope.row.type == '2' ? 'disabledColor' : ''
                                "
                                size="small"
                                link
                                type="primary"
                                @click="onProjectDelete(scope.row)"
                                >{{
                                    scope.row.templateStatus == 1
                                        ? '禁用'
                                        : '启用'
                                }}
                            </el-button>
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
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import axios from '@/plugins/axios';
import { CertTemplate } from '@/types/certs';
const router = useRouter();
const route = useRoute();
const visible = ref(false);
const topFocus = ref(1);
const state = reactive({
    form: { templateName: '' },
    loading: false,
    name: '',
    pageSize: 10,
    pageNum: 1,
    total: 0
});
const CertBaseDetail = ref(<CertTemplate>{});
const searchLoading = ref(false);
const tableData = ref([]);
onMounted(() => {
    getDetail();
});

const getDetail = async () => {
    try {
        const { data } = await axios.get(`/did/app/${route.query.appId}`);
        if (data.code == 200) {
            CertBaseDetail.value = data.data;
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    }
};

const getTableData = async () => {
    state.loading = true;
    searchLoading.value = true;
    try {
        const { data } = await axios.get('/did/template/list', {
            params: {
                appId: route.query.appId,
                templateName: state.form.templateName,
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

const handleTopFocus = (val: number) => {
    topFocus.value = val;
    if (val == 1) {
        getDetail();
    } else {
        handleSearch();
    }
};
const addTemplate = () => {
    router.push({
        name: 'AddTemplate',
        query: { appId: route.query.appId }
    });
};
const onProjectDelete = async (row: any) => {
    searchLoading.value = true;
    state.loading = true;
    try {
        const { data } = await axios.post(
            `/did/template/toggle/${row.templateId}/${row.templateStatus == '0' ? '1' : '0'}`
        );
        if (data.code == 200) {
            ElMessage.success('修改成功');
            handleSearch();
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    } finally {
        searchLoading.value = false;
        state.loading = false;
    }
};
const handleToDataDetail = (templateId: any) => {
    router.push({
        name: 'TemplateDetail',
        query: { templateId }
    });
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
.issueNum {
    background-image: url('@/assets/images/home/issueNumBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.templateNum {
    background-image: url('@/assets/images/home/templateNumBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
