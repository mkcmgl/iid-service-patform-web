<template>
    <div v-if="isPreview">
        <div v-for="item in fileList" :key="item.url" class="flex items-center">
            <span class="versa-form-item__content--preview mr-1">
                {{ item.name }}
            </span>
            <VersaButton
                type="primary"
                link
                @click="onDownload(item.url, item.name)"
            >
                下载
            </VersaButton>
        </div>
    </div>
    <el-upload
        :file-list="fileList"
        v-else
        class="upload-demo"
        accept=".md"
        @remove="onRemove"
        :http-request="onUpload"
    >
        <VersaButton type="primary">
            <el-icon class="mr-1"><Upload /></el-icon>
            点击上传
        </VersaButton>
        <template #tip>
            <div class="versa-form-item__tips mt-1">
                请上传文档文件，限MD格式，大小不超过10MB
            </div>
        </template>
    </el-upload>
</template>

<script setup lang="ts">
import axios from '@/plugins/axios';
import type { UploadRequestOptions } from 'element-plus';
import { Upload } from '@element-plus/icons-vue';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        modelValue?: { fileName: string; filePath: string };
        status: string;
    }>(),
    {
        status: 'edit'
    }
);

const emits = defineEmits(['update:modelValue']);

const isPreview = computed(() => props.status === 'preview');

const fileList = computed(() => {
    return props.modelValue?.filePath
        ? [
              {
                  name: props.modelValue.fileName,
                  url: props.modelValue.filePath
              }
          ]
        : [];
});

const onUpload = async (options: UploadRequestOptions) => {
    const formData = new FormData();
    formData.append('file', options.file);
    const res = await axios.post<{ fileName: string; url: string }>(
        '/common/upload',
        formData
    );
    emits('update:modelValue', {
        fileName: res.data.fileName,
        filePath: res.data.url
    });
};

const onRemove = () => {
    emits('update:modelValue', {
        fileName: '',
        filePath: ''
    });
};

const onDownload = async (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
</script>

<style lang="scss" scoped></style>
