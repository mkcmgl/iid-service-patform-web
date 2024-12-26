import axios from '@/plugins/axios';

export enum AuthOnOff {
    on = '0',
    off = '1'
}

export enum DataUploadOnOff {
    on = '0',
    off = '1'
}

export const personalFormConfig = [
    {
        label: '系统名称',
        prop: 'systemName',
        element: 'el-input',
        tips: '支持中英文及数字，区分大小写，长度1-20字符',
        rules: [
            {
                required: true,
                max: 20,
                message: '请输入长度1-20字符的系统名称'
            },
            {
                pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                message: '仅支持中英文及数字'
            }
        ]
    },
    {
        label: '英文名称',
        prop: 'englishName',
        element: 'el-input',
        tips: '支持英文及数字，区分大小写，长度1-100字符',
        rules: [
            { max: 100, message: '请输入长度1-100字符的英文名称' },
            { pattern: /^[a-zA-Z0-9\s]+$/, message: '仅支持英文及数字' }
        ]
    },
    {
        label: 'LOGO',
        prop: 'logoPath',
        accept: '.png',
        maxSize: 300 * 1024,
        useCustomPreview: true,
        element: 'versa-image-upload',
        onUpload: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('/common/upload', formData);
            return res.data.url;
        },
        tips: '建议尺寸：宽128px*高128px。png格式，不大于300KB',
        rules: [{ required: true, message: '请上传LOGO' }]
    },
    {
        label: '登录页背景图',
        prop: 'loginBackgroundPath',
        accept: '.png',
        maxSize: 2 * 1024 * 1024,
        useCustomPreview: true,
        element: 'versa-image-upload',
        onUpload: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('/common/upload', formData);
            return res.data.url;
        },
        tips: '建议尺寸：宽1920px*高1080px。png格式，不大于2M',
        rules: [{ required: true, message: '请上传登录页背景图' }]
    },
    {
        label: '注册页背景图',
        prop: 'registerBackgroundPath',
        accept: '.png',
        maxSize: 2 * 1024 * 1024,
        useCustomPreview: true,
        element: 'versa-image-upload',
        onUpload: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('/common/upload', formData);
            return res.data.url;
        },
        tips: '建议尺寸：宽650px*高1080px。png格式，不大于2M',
        rules: [{ required: true, message: '请上传注册页背景图' }]
    },
    {
        label: '版权信息',
        prop: 'copyright',
        type: 'textarea',
        element: 'el-input',
        tips: '支持中英文及数字，区分大小写，长度1-50字符',
        rules: [
            { max: 50, message: '请输入长度1-50字符的版权信息' },
            {
                pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                message: '仅支持中英文及数字、区分大小写'
            }
        ],
        tooltip: '在登录页底部展示版权信息'
    }
] as const;

export type FormItemKey = (typeof personalFormConfig)[number]['prop'];
