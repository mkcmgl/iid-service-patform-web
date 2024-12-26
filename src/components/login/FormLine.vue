<template>
    <el-form-item
        :class="['login', { 'is-focus': focused, 'has-label': !!iconType }]"
        :prop="prop"
    >
        <template #label>
            <svg
                v-if="iconType === 'user'"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#b7bedc"
            >
                <path
                    class="a"
                    d="M11.254,13.851a.593.593,0,0,1-.6-.6A4.733,4.733,0,0,0,5.927,8.523,4.791,4.791,0,0,0,1.2,13.251a.593.593,0,0,1-.6.6.594.594,0,0,1-.6-.6A5.722,5.722,0,0,1,3.731,7.815l.294-.109-.268-.16A4.022,4.022,0,0,1,1.748,4.095,4.237,4.237,0,0,1,6.01,0,4.1,4.1,0,0,1,10.1,4.095,4.021,4.021,0,0,1,8.1,7.546L7.84,7.7l.278.113a5.892,5.892,0,0,1,3.736,5.438.594.594,0,0,1-.6.6M5.927,1.115a2.948,2.948,0,0,0-2.98,2.98,2.948,2.948,0,0,0,2.98,2.98,2.948,2.948,0,0,0,2.98-2.98,2.948,2.948,0,0,0-2.98-2.98"
                />
            </svg>
            <svg
                v-else-if="iconType === 'password'"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#b7bedc"
            >
                <g class="c">
                    <path
                        class="a"
                        d="M6.565,10.343h-1.1a.594.594,0,0,0,0,1.188h1.1a.594.594,0,0,0,0-1.188"
                    />
                    <path
                        class="a"
                        d="M11.035,6.275H3.251L3.245,3.966l0-.1h.01a2.771,2.771,0,0,1,5.54.087v.39a.595.595,0,0,0,1.189,0V3.955a3.958,3.958,0,0,0-7.915-.036l.008.005-.01.1V6.275H1.046A1.047,1.047,0,0,0,0,7.317V14.7a1.047,1.047,0,0,0,.877.9H11.218a1.04,1.04,0,0,0,.809-.808V7.211a1.045,1.045,0,0,0-.993-.936M10.841,14a.528.528,0,0,1-.406.409H1.664a.524.524,0,0,1-.477-.454l0-6.084a.525.525,0,0,1,.433-.414l8.7,0a.527.527,0,0,1,.522.479Z"
                    />
                </g>
            </svg>
            <svg
                v-else-if="iconType === 'captcha'"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#b7bedc"
            >
                <g class="c">
                    <path
                        class="a"
                        d="M13.352,3.395a1.443,1.443,0,0,0-1.161-1.333A18.8,18.8,0,0,1,9.7,1.5,9.048,9.048,0,0,1,7.518.25,1.5,1.5,0,0,0,5.751.332,5.766,5.766,0,0,1,3.579,1.523a8.207,8.207,0,0,1-2.389.591A1.363,1.363,0,0,0,0,3.41V7.6c.06,3.662,4.351,7.384,6.724,7.384,2.329,0,6.014-2.591,6.575-7.309a38.637,38.637,0,0,0,.053-4.276M12.116,7.551c-.509,4.141-3.722,6.223-5.384,6.223a6.033,6.033,0,0,1-3.385-1.962A6.611,6.611,0,0,1,1.2,7.581V3.44A.158.158,0,0,1,1.333,3.3a9.479,9.479,0,0,0,2.643-.652,6.94,6.94,0,0,0,2.531-1.4.3.3,0,0,1,.172-.06.289.289,0,0,1,.143.037A10.072,10.072,0,0,0,9.248,2.6l.052.023.053.015a20.871,20.871,0,0,0,2.613.6.246.246,0,0,1,.187.217,39.394,39.394,0,0,1-.037,4.1"
                    />
                    <path
                        class="a"
                        d="M9.166,5.259l-3.19,3.19L4.254,6.727a.6.6,0,0,0-.847.846l2.12,2.119.008.007.007.008a.586.586,0,0,0,.823,0L9.99,6.083a.583.583,0,0,0-.824-.824"
                    />
                </g>
            </svg>
            <svg
                v-else-if="iconType === 'sms'"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#b7bedc"
            >
                <g class="c" transform="translate(0 0)">
                    <path
                        class="a"
                        d="M3.446,13.938a.52.52,0,0,1-.415-.189.859.859,0,0,1-.163-.55V11.62l-1.007-.052A1.855,1.855,0,0,1,0,9.725V1.842A1.811,1.811,0,0,1,.544.54,1.86,1.86,0,0,1,1.861,0H13.333a1.855,1.855,0,0,1,1.861,1.842V9.725a1.821,1.821,0,0,1-.546,1.3,1.855,1.855,0,0,1-1.316.54H8.016L3.9,13.8a.967.967,0,0,1-.458.134M1.856,1.158a.684.684,0,0,0-.485.2.672.672,0,0,0-.2.482V9.73a.689.689,0,0,0,.689.681H4.091l-.053,1.841L7.727,10.4l5.608.006a.687.687,0,0,0,.487-.2.675.675,0,0,0,.2-.482V1.839a.687.687,0,0,0-.69-.681ZM11.1,6.836a.908.908,0,0,1-.783-.447.892.892,0,0,1,0-.895A.9.9,0,1,1,11.1,6.836m-3.507,0a.906.906,0,0,1-.782-.447.887.887,0,0,1,0-.895A.9.9,0,1,1,7.6,6.836m-3.506,0a.909.909,0,0,1-.783-.447.892.892,0,0,1,0-.895.9.9,0,1,1,.783,1.342"
                        transform="translate(0 0)"
                    />
                </g>
            </svg>
        </template>
        <el-input
            v-model="value"
            @blur="focused = false"
            @focus="focused = true"
            v-bind="$attrs"
        >
        </el-input>

        <button
            v-if="prefixType === 'captcha'"
            class="ml-4 shrink-0 w-24 max-h-[theme('space.10')]"
            type="button"
            title="看不清，换一张"
            :disabled="loading"
            @click="refreshCaptcha"
        >
            <img :src="captcha" alt="图形验证码" />
        </button>
        <el-button
            v-if="prefixType === 'sms'"
            type="primary"
            size="default"
            class="ml-4 shrink-0 w-24 max-h-[theme('space.10')]"
            :disabled="sending || countdown !== 0"
            @click="sendSms"
        >
            {{ buttonContent }}
        </el-button>
    </el-form-item>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import axios from '@/plugins/axios';

const props = defineProps({
    modelValue: String,
    iconType: {
        type: String,
        default: ''
    },
    prefixType: String,
    prop: {
        type: String,
        required: true
    },
    onSendSms: Function
});

const emits = defineEmits(['update:modelValue', 'update:uuid']);

const focused = ref(false);
const captcha = ref('');
const loading = ref(false);
const countdown = ref(0);
const sending = ref(false);

const buttonContent = computed(() => {
    if (countdown.value > 0) {
        return `${countdown.value}秒后重试`;
    }
    return '发送验证码';
});

const value = computed({
    get() {
        return props.modelValue;
    },
    set(newVal) {
        emits('update:modelValue', newVal);
    }
});

const refreshCaptcha = async () => {
    loading.value = true;

    const response = await axios.get('/captchaImage');
    const { img: newImg, uuid: newUuid } = response.data;
    captcha.value = newImg ? `data:image/png;base64,${newImg}` : '';
    emits('update:uuid', newUuid || 'fake');

    loading.value = false;
};

const sendSms = async () => {
    if (countdown.value > 0) {
        return;
    }

    try {
        sending.value = true;
        await props.onSendSms?.();

        countdown.value = 60;
        const interval = setInterval(() => {
            countdown.value -= 1;
            if (countdown.value === 0) {
                clearInterval(interval);
            }
        }, 1000);
        sending.value = false;
    } catch (error) {
        sending.value = false;
    }
};

onBeforeMount(() => {
    if (props.prefixType === 'captcha') {
        refreshCaptcha();
    }
});

defineExpose({
    refreshCaptcha
});
</script>

<style lang="scss" scoped>
.login.el-form-item {
    &.has-label {
        border-bottom: 1px solid #dcdee2;

        :deep() {
            .el-form-item__label {
                display: inline-flex;
                align-items: center;
                padding-right: 8px;
                width: auto !important;
            }
            .el-input__wrapper {
                padding: 1px;
                box-shadow: none;
            }
            & .el-form-item__error {
                left: -24px;
            }
        }
    }

    :deep() {
        .el-form-item__content {
            flex-wrap: nowrap;
        }

        .el-form-item__label {
            padding: 0;
        }
    }

    &.is-focus {
        &.has-label {
            border-bottom: 1px solid #2563eb;
        }
        .el-form-item__label > svg {
            color: #2563eb;
        }
    }
    &.is-error {
        &.has-label {
            border-bottom: 1px solid #f56c6c;
        }
        .el-form-item__label > svg {
            fill: #f56c6c;
        }
        :deep() {
            .el-input__inner {
                color: #f56c6c;
                &::placeholder {
                    color: #f56c6c;
                }
            }
        }
    }
}
</style>
