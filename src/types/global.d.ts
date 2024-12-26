declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.ico' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module 'element-plus/dist/locale/zh-cn.mjs';

interface Window {
    IIDWallet: {
        signCert: (data: {
            /** 审核流程ID */
            processId: string;
            /** 凭证元数据 */
            data: {
                [key: string]: string;
            };
        }) => Promise<void>;
        verifyCert: (data: {
            /** 校验模板关联的凭证模板ID */
            templateIds: string;
            groupId: number;
        }) => Promise<void>;
        getActiveAccount: () => Promise<string>;
    };
}
