export const passwordRules = [
    { min: 6, max: 20, message: '支持6~20个字符' },
    {
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).*$/,
        message: '需包含数字、大小写字母、特殊字符'
    }
];
