<template>
    <div class="w-[100%] my-5 flex items-center">
        <img
            class="w-2 h-3 mr-3 cursor-pointer"
            @click="router.back"
            :src="IconBack"
        />
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none mr-auto"
        >
            验证记录
        </h1>
    </div>
    <VersaPage
        rowKey="userId"
        listKey="data.rows"
        :api="`/did/group/log`"
        :default-filters="{ groupId: route.query.groupId }"
        :tableOptions="tableOptions"
        :filter-options="filterOptions"
        :detail-props="detailProps"
    >
        <template #modal-default="{ model }">
            <versa-table
                class="!p-0"
                :options="[
                    {
                        label: '凭证名称',
                        prop: 'name'
                    },
                    {
                        label: '验证结果',
                        prop: 'result',
                        width: 160,
                        mapSource: LogResultMap
                    }
                ]"
                :autoLoad="false"
                :tableData="JSON.parse(model.logContent || '[]')"
            >
            </versa-table>
        </template>
    </VersaPage>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconBack from '@/assets/images/icon_back.svg';
import type { FormOption, TableOption, VersaModalProps } from 'versa-form';
import type {
    VerfiyGroupRow,
    VerfiyHistoryFilter,
    VerfiyHistoryRow
} from '@/types/verify-group';
import { LogResult, LogResultMap } from '@/data/certs';
import { omit } from 'lodash-es';

const router = useRouter();
const route = useRoute();

const tableOptions = ref<TableOption<VerfiyHistoryRow>[]>([
    {
        type: 'index',
        label: '编号',
        width: '80'
    },
    {
        prop: 'logDid',
        label: '持证方DID'
    },
    {
        prop: 'logResult',
        label: '验证结果',
        width: '160',
        mapSource: LogResultMap
    },
    {
        prop: 'logTime',
        width: '180',
        label: '验证时间'
    },
    {
        label: '操作',
        fixed: 'right',
        width: '100',
        actions: [
            {
                actionType: 'detail',
                actionName: '查看',
                title: '查看'
            }
        ]
    }
]);

// 筛选栏信息
const filterOptions = ref<FormOption<VerfiyHistoryFilter>[]>([
    {
        label: '持证方DID',
        prop: 'logDid',
        element: 'el-input'
    },
    {
        label: '验证结果',
        prop: 'logResult',
        element: 'versa-select',
        clearable: true,
        mapSource: omit(LogResultMap, LogResult.notExist)
    }
]);

const detailProps = ref<VersaModalProps<VerfiyGroupRow, { a: string }>>({
    formatBefore: async (row) => {
        return {
            ...row
        };
    }
});
</script>

<style scoped lang="scss"></style>
