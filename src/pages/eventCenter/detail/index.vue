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
            <span>详情</span>
        </h1>
        <div
            v-if="userDetail.authState == '1' || userDetail.settleState == '1'"
        >
            <el-button :loading="buttonLoading" @click="showAuthDialog = true"
                >驳回</el-button
            >
            <el-button
                :loading="buttonLoading"
                type="primary"
                @click="onSubmit('审核通过', '2')"
                >通过</el-button
            >
        </div>
    </div>
    <div class="w-full">
        <div class="bg-white my-4 w-ful rounded-xl p-4">
            <div class="mb-4 flex-1 font-bold">流程进度</div>
            <div
                class="el-steps el-steps--horizontal justify-center overflow-auto w-full h-[130px]"
            >
                <div
                    v-for="(node, index) in detailNodeList"
                    :key="index"
                    class="el-step is-horizontal"
                    style="flex-basis: 200px"
                >
                    <div class=" ">
                        <div
                            class="el-step__line"
                            style="background-color: #fff"
                        >
                            <i
                                style="
                                    display: block;
                                    position: relative;
                                    top: 1px;
                                    border-top: 2px solid #2f88ff;
                                "
                            ></i>
                        </div>
                        <div class="el-step__icon">
                            <i
                                style="
                                    display: block;
                                    width: 5px;
                                    border-radius: 50%;
                                    border: 5px solid #2f88ff;
                                "
                            ></i>
                        </div>
                    </div>
                    <!-- title & description -->
                    <div class="el-step__main">
                        <div
                            style="position: relative; right: 10px"
                            class="flex flex-col mt-2 w-[150px]"
                            v-if="node?.dealTime"
                        >
                            <span>{{ node?.operate }}</span>
                            <span class="text-[#9ca3af] text-[14px] truncate">{{
                                detailListObj?.userName
                            }}</span>
                            <el-tooltip placement="bottom">
                                <template #content>
                                    <div style="width: 200px">
                                        {{ node?.did }}
                                    </div>
                                </template>
                                <span
                                    class="text-[#9ca3af] text-[14px] truncate"
                                    >{{ node?.did }}</span
                                >
                            </el-tooltip>
                            <span class="text-[#9ca3af] text-[14px] truncate">{{
                                node?.dealTime
                            }}</span>
                        </div>
                        <div
                            v-else
                            style="position: relative; right: 10px"
                            class="flex flex-col mt-2"
                        >
                            待审核
                        </div>
                        <div class="el-step__description is-success"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white my-4 w-ful rounded-xl p-4">
            <div class="mb-4 flex-1 font-bold">申请信息</div>
            <div>
                <el-form
                    size="large"
                    label-position="left"
                    label-width="120px"
                    class="w-full"
                >
                    <el-row :gutter="35" v-if="route.query.businessType == '0'">
                        <el-col
                            :xs="12"
                            :sm="12"
                            :md="12"
                            :lg="12"
                            :xl="12"
                            class="mb22"
                        >
                            <el-form-item label="姓名:" class="formList">
                                <span>{{ userDetail.userName }}</span>
                            </el-form-item>
                            <el-form-item label="人像图片:" class="formList">
                                <img
                                    :src="faceFilePath"
                                    @click="handleShowImg(faceFilePath)"
                                />
                            </el-form-item>
                            <el-form-item
                                label="身份证国徽面:"
                                class="formList"
                            >
                                <img
                                    :src="backFilePath"
                                    @click="handleShowImg(backFilePath)"
                                />
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
                            <el-form-item label="身份证号:" class="formList">
                                <span>{{ userDetail.idNum }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item
                                label="身份证人像面:"
                                class="formList"
                            >
                                <img
                                    :src="IdFaceFilePath"
                                    @click="handleShowImg(IdFaceFilePath)"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="35" v-if="route.query.businessType == '1'">
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <el-form-item
                                label="机构名称"
                                prop="name"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.orgName }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item
                                label="机构证照"
                                prop="enterpriseName"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <el-button
                                    link
                                    type="primary"
                                    @click="handleShowImg(businessFilePath)"
                                >
                                    查看
                                </el-button>
                            </el-form-item>
                            <el-form-item
                                label="联系人姓名"
                                prop="enterpriseName"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.contactName }}</span>
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
                                label="统一信用代码"
                                prop="enterpriseName"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.orgCode }}</span>
                            </el-form-item>

                            <el-form-item
                                label="地址"
                                prop="enterpriseName"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.orgAddress }}</span>
                            </el-form-item>
                            <el-form-item
                                label="联系人手机号"
                                prop="enterpriseName"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.contactPhone }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="35" v-if="route.query.businessType == '2'">
                        <el-col
                            :xs="24"
                            :sm="24"
                            :md="24"
                            :lg="24"
                            :xl="24"
                            class="mb22"
                        >
                            <el-form-item label="机构名称" class="leftFormTip">
                                <span>{{ userDetail.orgName }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item
                                label="统一信用代码"
                                class="leftFormTip"
                            >
                                <span>{{ userDetail.orgCode }}</span>
                            </el-form-item>

                            <el-form-item
                                label="申请事项"
                                prop="settleDesc"
                                class="leftFormTip"
                            >
                                <span>{{ userDetail.settleDesc }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="bg-white my-4 w-ful rounded-xl p-4">
            <div class="mb-4 flex-1 font-bold">流程日志</div>
            <div class="">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    max-height="250"
                >
                    <el-table-column
                        show-overflow-tooltip
                        prop="operate"
                        label="流程环节"
                    >
                        <template #default="scope"> </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="userName"
                        label="操作者"
                    >
                    </el-table-column>

                    <el-table-column prop="did" label="操作者DID">
                        <template #default="scope">
                            <el-tooltip placement="bottom">
                                <template #content>
                                    <div style="width: 200px">
                                        {{ scope.row.did }}
                                    </div>
                                </template>
                                <div class="truncate w-full">
                                    {{ scope.row.did }}
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="undoState"
                        label="状态"
                    >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="remark"
                        label="办理结算"
                    >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="createTime"
                        label="办理时间"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog
            :loading="dialogLoading"
            v-model="showDialog"
            title="查看图片"
            width="800"
        >
            <div class="w-full flex justify-center">
                <img :src="dialogImgUrl" />
            </div>
        </el-dialog>
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
                label-width="120px"
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
                    <el-button
                        type="primary"
                        @click="onSubmit(state.dialogForm.desc, '3')"
                        :loading="state.dialogForm.loading"
                    >
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
import { User } from '@/types/user';
type UserDetail = {
    [P in keyof User]: User[P];
} & {
    userName: string;
    idNum?: string;
    attachments: Array<any>;
    authState?: string;
    settleState?: string;
    dealTime?: string;
    operate?: string;
};
const faceFilePath = ref('');
const backFilePath = ref('');
const IdFaceFilePath = ref('');
const businessFilePath = ref('');
const route = useRoute();
const router = useRouter();
const formRef = ref<FormInstance>();
const tableData = ref([]);
const remark = ref('');
const userDetail = ref(<UserDetail>{});
const buttonLoading = ref(false);
const showDialog = ref(false);
const showAuthDialog = ref(false);
const dialogLoading = ref(false);
const dialogImgUrl = ref('');
const dialogFormRef = ref<FormInstance>();
const detailListObj = ref(<UserDetail>{});
const authListObj = ref(<UserDetail>{});
const detailNodeList = ref(<UserDetail[]>[]);
const visible = ref(false);
const topFocus = ref(1);
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
onMounted(() => {
    getDetail();
    getDetailLog();
    getDetaildetailNodeList();
});
const formReset = () => {
    state.form = {
        name: '',
        enterpriseName: '',
        expire: 0,
        loading: false
    };
    formRef.value?.resetFields();
};
const dialogFormReset = () => {
    state.dialogForm = {
        desc: '',
        loading: false
    };
    dialogFormRef.value?.resetFields();
};
const getDetailLog = async () => {
    const { data } = await axios.get('/sys/undo/getUndoLogs', {
        params: { undoId: route.query.id }
    });
    if (data.code == 200) {
        tableData.value = data.data;
    } else {
        ElMessage.error(data.msg);
    }
};
const getDetaildetailNodeList = async () => {
    const { data } = await axios.get('/sys/undo/getNodeList', {
        params: { undoId: route.query.id }
    });
    if (data.code == 200) {
        detailNodeList.value = data.data;
        detailListObj.value = data.data[0];
        authListObj.value = data.data[1];
    } else {
        ElMessage.error(data.msg);
    }
};
const getDetail = async () => {
    const { data } = await axios.get('/system/user/detail', {
        params: { userId: route.query.businessId }
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
const handleShowImg = (url: any) => {
    dialogImgUrl.value = url;
    showDialog.value = true;
};
const handleCloseAuth = () => {
    dialogFormReset();
};
const postAuth = async (des: any, type: any) => {
    buttonLoading.value = true;

    const { data } = await axios.post('/system/settle/auditUndo', {
        remark: des,
        auditState: type,
        undoId: route.query.id,
        businessId: route.query.businessId,
        businessType: route.query.businessType
    });
    if (data.code == 200) {
        ElMessage.success('处理成功');
        // router.back();
        getDetail();
        getDetailLog();
        buttonLoading.value = false;
    } else {
        ElMessage.error(data.msg);
    }
};
const onSubmit = async (des: any, type: any) => {
    if (type == '3') {
        dialogFormRef.value?.validate(async (valid: any) => {
            if (valid) {
                state.dialogForm.loading = true;
                await postAuth(des, type);
                showAuthDialog.value = false;
                state.dialogForm.loading = false;
            }
        });
    } else {
        postAuth(des, type);
    }
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
.formList {
    margin-bottom: 10px !important;
}
.leftFormTip {
    margin-bottom: 0px !important;
}
</style>
