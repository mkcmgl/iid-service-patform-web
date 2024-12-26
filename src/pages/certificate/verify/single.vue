<template>
    <div class="w-[100%] my-5 flex items-center">
        <img
            class="w-2 h-3 mr-3 cursor-pointer"
            @click="router.back"
            :src="IconBack"
        />
        <h1
            class="text-[22px] font-medium tracking-wider text-[#333333] leading-none"
        >
            验证凭证
        </h1>
    </div>
    <div
        class="bg-white w-full min-h-[calc(100vh-200px)] rounded flex flex-col items-center justify-center"
    >
        <el-upload
            drag
            accept=".json"
            class="w-3/5"
            :limit="1"
            :http-request="noop"
            v-model:file-list="state.fileList"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text !text-[#333333] font-medium">
                请上传凭证
            </div>
            <template #tip>
                <div class="el-upload__tip text-center">
                    点击上传凭证文件，限.json格式
                </div>
            </template>
        </el-upload>
        <div class="mt-5">
            <VersaButton type="primary" plain @click="router.back">
                取消
            </VersaButton>
            <VersaButton type="primary" @click="onVerify"> 验证 </VersaButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import IconBack from '@/assets/images/icon_back.svg';
import notify from '@/plugins/notify';
import type { UploadFile } from 'element-plus';
import { isValidCliam } from '@/utils/validate';
import axios from 'axios';

const router = useRouter();
const state = reactive({
    fileList: [] as UploadFile[]
});

const noop = async () => {};

const onVerify = async () => {
    if (!state.fileList.length) {
        notify({
            type: 'error',
            text: '请上传凭证文件'
        });
        return;
    }

    const claimText = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(state.fileList[0].raw!, 'utf-8');

        reader.onload = function () {
            resolve(reader.result as string);
        };

        reader.onerror = function () {
            reject('转换文件失败');
        };
    });
    const isValid = isValidCliam(claimText);
    if (!isValid) {
        notify({
            type: 'error',
            text: '凭证文件内容错误'
        });
        return;
    }

    const res = await axios.post<{ data: boolean }>(
        '/did/group/verify/claim',
        JSON.parse(claimText)
    );
    router.replace({
        name: 'VerifyResults',
        query: {
            state: res.data.data ? '1' : '0'
        }
    });
};
</script>

<style lang="scss" scoped></style>
