<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            事件中心
        </h1>
    </div>
    <div class="w-full bg-white p-4">
        <div class="justify-evenly flex items-center">
            <div class="mr-20 text-center">
                <el-button
                    :type="eventType == 'todo' ? 'primary' : ''"
                    style="border-radius: 16px"
                    @click="handleEventType('todo', '0')"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                    >
                        <g transform="translate(-626 -174)">
                            <rect
                                class="a"
                                :class="
                                    eventType == 'todo'
                                        ? 'focusIcon'
                                        : 'noFocusIcon'
                                "
                                width="16"
                                height="16"
                                transform="translate(626 174)"
                            />
                            <path
                                class="b"
                                :class="
                                    eventType == 'todo'
                                        ? 'focusColor'
                                        : 'noFocusColor'
                                "
                                d="M31.062,1.443A7.008,7.008,0,1,0,38.07,8.451a7.008,7.008,0,0,0-7.008-7.008Zm4.123,7.936H30.959a.735.735,0,0,1-.824-.722V4.226a.721.721,0,0,1,1.443,0v3.71h3.5a.705.705,0,0,1,.721.721.579.579,0,0,1-.619.722ZM24.364,3.5a1.6,1.6,0,0,1-.516-1.34A2.113,2.113,0,0,1,26.013,0a2.025,2.025,0,0,1,1.753.928A5.762,5.762,0,0,0,24.364,3.5ZM34.67.929A2.294,2.294,0,0,1,36.422,0a2.114,2.114,0,0,1,2.165,2.164,2.466,2.466,0,0,1-.516,1.444A6.157,6.157,0,0,0,34.67.929Z"
                                transform="translate(602.782 174.27)"
                            />
                        </g>
                    </svg>
                    <span class="ml-2">我的待办</span>
                </el-button>
                <div class="topText mt-2">{{ undoNum }}个任务</div>
            </div>
            <i class="linCenter"></i>
            <div class="ml-20 text-center">
                <el-button
                    style="border-radius: 16px"
                    :type="eventType == 'done' ? 'primary' : ''"
                    @click="handleEventType('done', '1')"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                    >
                        <g transform="translate(-1285 -173)">
                            <rect
                                :class="
                                    eventType == 'done'
                                        ? 'focusIcon'
                                        : 'noFocusIcon'
                                "
                                class="a"
                                width="16"
                                height="16"
                                transform="translate(1285 173)"
                            />
                            <path
                                class="b"
                                :class="
                                    eventType == 'done'
                                        ? 'focusColor'
                                        : 'noFocusColor'
                                "
                                d="M7.73,15.461a7.73,7.73,0,1,1,7.73-7.73A7.73,7.73,0,0,1,7.73,15.461ZM6.982,9.766,4.77,7.529,3.313,8.921a12.546,12.546,0,0,1,3.818,3.227C8.03,10.458,10.8,7,12.148,6.693a6.929,6.929,0,0,1,0-3.38C9.384,5.135,6.982,9.766,6.982,9.766Z"
                                transform="translate(1285.27 173.27)"
                            />
                        </g></svg
                    ><span class="ml-2">我的已办</span></el-button
                >
                <div class="topText mt-2">{{ doneNum }}个任务</div>
            </div>
        </div>
    </div>
    <div class="my-4 w-full bg-white">
        <div class="py-4 topSearchBorder pl-4 mb-3">
            <el-button
                :type="state.businessType === '' ? 'primary' : ''"
                @click="handleEventTypeBtn('')"
                link
            >
                全部事件
            </el-button>
            <el-button
                link
                class="ml-4"
                :type="state.businessType === '0' ? 'primary' : ''"
                @click="handleEventTypeBtn('0')"
            >
                人工实名认证
            </el-button>
            <el-button
                link
                class="ml-4"
                :type="state.businessType === '1' ? 'primary' : ''"
                @click="handleEventTypeBtn('1')"
            >
                机构实名认证
            </el-button>
            <el-button
                link
                class="ml-4"
                :type="state.businessType === '2' ? 'primary' : ''"
                @click="handleEventTypeBtn('2')"
            >
                发证方入驻
            </el-button>
        </div>
        <div class="flex justify-between p-4 mb-4">
            <el-form ref="form" label-position="left" label-width="88px">
                <div class="flex-1 mr-8 grid gap-3 grid-cols-3 gap-x-4">
                    <el-form-item
                        label="发起方"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-input
                            v-model="state.form.userName"
                            clearable
                            placeholder="请输入发起方"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="发起方DID"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-input
                            v-model="state.form.did"
                            clearable
                            placeholder="请输入发起方DID"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="开始时间"
                        prop="enterpriseName"
                        class="leftFormTip"
                    >
                        <el-date-picker
                            class="timeFont"
                            v-model="searchTimeArray"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="YYYY-MM-DD HH:mm:ss "
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
    </div>
    <div class="w-full bg-white p-4">
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
                <el-table-column
                    show-overflow-tooltip
                    prop="date"
                    label="事件类型"
                >
                    <template #default="scope">
                        <span>{{
                            scope.row.businessType == '0'
                                ? '人工实名认证'
                                : scope.row.businessType == '1'
                                  ? '机构实名认证'
                                  : '发证方入驻'
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    show-overflow-tooltip
                    prop="userName"
                    label="发起方"
                />
                <el-table-column prop="did" label="发起方DID">
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
                    prop="authStateName"
                    label="当前环节"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="createTime"
                    label="到达时间"
                />
                <el-table-column label="操作" width="80">
                    <template #default="scope">
                        <el-button
                            link
                            type="primary"
                            size="small"
                            @click="toApply(scope.row)"
                            >详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="justify-end mt-8"
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
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import axios from '@/plugins/axios';
const router = useRouter();
const visible = ref(false);
const eventType = ref('todo');
const name = ref('');
const dialogFormRef = ref<FormInstance>();
const showDialog = ref(false);
const state = reactive({
    form: {
        userName: '',
        did: ''
    },
    businessType: '',
    undoType: '0',
    name: '',
    loading: false,
    pageSize: 10,
    pageNum: 1,
    total: 0
});

const reset = () => {
    state.form = {
        userName: '',
        did: ''
    };
    searchTimeArray.value = [];
};
const searchTimeArray = ref([]);
const searchLoading = ref(false);
const value1 = ref('');
const tableData = ref([]);
const value = ref('');
const undoNum = ref(0);
const doneNum = ref(0);
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
onMounted(() => {
    getTableData();
    getEventNum();
});

const getEventNum = async () => {
    const { data } = await axios.get('/sys/undo/getUndoNum');
    if (data.code == 200) {
        doneNum.value = data.doneNum;
        undoNum.value = data.undoNum;
    } else {
        ElMessage.error(data.msg);
    }
};
// 初始化表格数据
const getTableData = async () => {
    state.loading = true;
    searchLoading.value = true;
    try {
        const { data } = await axios.post(
            `/sys/undo/list?pageSize=${state.pageSize}&pageNum=${state.pageNum}`,
            {
                businessType: state.businessType,
                userName: state.form.userName,
                did: state.form.did,
                startTime: searchTimeArray.value[0],
                endTime: searchTimeArray.value[1],
                undoType: state.undoType
            }
        );
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
const handleEventType = (type: any, undoType: any) => {
    eventType.value = type;
    state.undoType = undoType;
    state.businessType = '';
    handleSearch();
};

const handleEventTypeBtn = (type: any) => {
    state.businessType = type;
    handleSearch();
};
const toApply = (row: any) => {
    router.push({
        name: 'EventCenterDetail',
        query: {
            id: row.id,
            businessId: row.businessId,
            businessType: row.businessType
        }
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
.timeFont {
    ::v-deep(.el-range-input) {
        font-size: 12px;
    }
}
.linCenter {
    height: 50px;
    border-left: 1px solid #c8c9cc;
    width: 0px;
}
.textBlue {
    color: #2f88ff;
    font-weight: bold;
}
.topText {
    font-weight: bold;
    font-size: 20px;
}
.focusIcon {
    fill: #fff;
    opacity: 0;
}
.noFocusIcon {
    fill: #caced3;
    opacity: 0;
}
.focusColor {
    fill: #fff;
}
.noFocusColor {
    fill: #caced3;
}
</style>
