<template>
    <VersaForm
        status="preview"
        :options="state.options"
        v-model="state.formValues"
        v-loading="state.loading"
    />
</template>
<script setup lang="ts">
import { markRaw, onBeforeMount, reactive } from 'vue';
import { personalFormConfig } from './config';
import { usePlatformStore } from '@/store/platform';
import { VersaButton, VersaForm } from 'versa-form';
import type { FormValues } from 'versa-form/types/VersaForm';
import axios from 'axios';
import notify from '@/plugins/notify';
import FileUpload from './FileUpload.vue';
import { pick } from 'lodash-es';

const platformStore = usePlatformStore();
const state = reactive({
    loading: false,
    options: [
        {
            label: '个性化信息',
            prop: 'basic',
            element: 'versa-form',
            labelType: {
                type: 'card' as const,
                actions: [
                    {
                        actionType: 'preview',
                        actionName: '编辑',
                        link: true,
                        size: 'default',
                        type: 'primary',
                        action: async (
                            _: Event,
                            instance: InstanceType<VersaButton>
                        ) => toggleAction('basic', instance)
                    }
                ]
            },
            labelWidth: 'auto',
            hideRequiredAsterisk: true,
            options: personalFormConfig
        },
        {
            label: '文档',
            prop: 'document',
            element: 'versa-form',
            labelType: {
                type: 'card' as const,
                actions: [
                    {
                        actionType: 'preview',
                        actionName: '编辑',
                        link: true,
                        size: 'default',
                        type: 'primary',
                        action: async (
                            _: Event,
                            instance: InstanceType<VersaButton>
                        ) => toggleAction('document', instance)
                    }
                ]
            },
            hideRequiredAsterisk: true,
            options: [
                {
                    label: '上传文档',
                    prop: 'file',
                    useCustomPreview: true,
                    element: markRaw(FileUpload)
                }
            ]
        }
    ],
    formValues: {
        basic: {} as FormValues,
        document: {} as FormValues
    }
});

async function toggleAction(
    cardType: 'basic' | 'document',
    instance: InstanceType<VersaButton>
) {
    const formCore = instance.formCore as InstanceType<
        VersaForm<{ basic: FormValues; document: FormValues }>
    >;

    // 切换为编辑态
    if (formCore.getStatus(cardType) !== 'edit') {
        formCore.setStatus?.(cardType, 'edit');
        instance.text = '保存';
        return;
    }

    // 编辑保存
    await formCore.validateField([cardType]);
    await axios.post('/system/baseConfig/updatePersonalSetting', {
        ...platformStore.platform,
        ...(cardType === 'basic'
            ? state.formValues[cardType]
            : state.formValues[cardType].file)
    });
    notify({
        type: 'success',
        title: '保存成功'
    });
    platformStore.refreshPlatform(true);
    formCore.setStatus?.(cardType, 'preview');
    instance.text = '编辑';
}

onBeforeMount(async () => {
    try {
        state.loading = true;
        const platform = await platformStore.refreshPlatform();
        state.formValues = {
            basic: pick(platform, [
                'systemName',
                'englishName',
                'logoPath',
                'loginBackgroundPath',
                'registerBackgroundPath',
                'copyright'
            ]),
            document: {
                file: pick(platform, ['filePath', 'fileName'])
            }
        };
    } catch (error) {
        console.log(error);
    } finally {
        state.loading = false;
    }
});
</script>
