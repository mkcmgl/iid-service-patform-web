import { AuthOnOff, DataUploadOnOff } from '@/pages/system/config/config';

export type GlobalBaseConfig = {
    // 初始登录密码
    initPassword: string;
    // 实名认证开关
    authOnOff: AuthOnOff;
    // 数据上报开关
    dataUploadOnOff: DataUploadOnOff;
    // 数据上报地址
    dataUploadAddress: string;
    checkpassword?: string;
};
