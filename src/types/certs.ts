import {
    FieldDataType,
    FieldRequired,
    ProcessApprovalStatus
} from '@/data/certs';

export type CertField = {
    /** 字段ID */
    fieldId: number;
    /** 属性名称(中文) */
    fieldNameCn: string;
    /** 属性名称(英文) */
    fieldNameUs: string;
    /** 数据类型 0-字符串 1-数字 2-文件 */
    fieldDataType: FieldDataType;
    /** 是否必填 */
    fieldRequired: FieldRequired;
    /** 限制字数/大小(MB) */
    fieldLimit: number;
    /** 属性描述 */
    fieldDescription: string;
};

export type CertBase = {
    /** 凭证流程ID */
    processId: number;
    /** 模版ID */
    templateId: number;
    /** 审核状态 */
    processApprovalStatus: ProcessApprovalStatus;
    /** 审核时间 */
    processApprovalTime: string;
    /** 驳回原因 */
    processDisapprovalReason: string;
    /** 应用名称 */
    appName: string;
    /** 模版名称 */
    templateName: string;
    /** 模版描述 */
    templateDescription: string;
    /** 申请方DID */
    did: string;
    /** 申请时间 */
    processSubmitTime: string;
    templateType?: string;
};

export type CertDetails = CertBase & {
    /** 凭证数据 */
    processClaimContent: string;
    /** 凭证申请数据 */
    processTemplateContent: string;
    /** 凭证元数据 */
    claimFields: CertField[];
    /** 凭证申请元数据  */
    templateFields: CertField[];
};

export type CertTemplate = {
    /**
     * 应用ID
     */
    appId: number;
    /**
     * 凭证元数据
     */
    claimFields: CertField[];
    createBy: string;
    createTime: string;
    /**
     * 不管
     */
    did?: string;
    /**
     * 模板描述
     */
    templateDescription: string;
    /**
     * 凭证申请元数据
     */
    templateFields: CertField[];
    /**
     * 模版ID
     */
    templateId: number;
    /**
     * 模板名称
     */
    templateName: string;
    /**
     * 模版状态，0-禁用1-启用
     */
    templateStatus: string;
    /**
     * 模板类型
     */
    templateType: string;
    updateBy: string;
    updateTime?: string;
};
/**
 * field
 */
export interface Field {
    /**
     * 数据类型，0-字符串 1-数字 2-文件
     */
    fieldDataType: string;
    /**
     * 属性描述
     */
    fieldDescription: string;
    /**
     * 字段ID
     */
    fieldId: number;
    /**
     * 限制字数/大小(MB)
     */
    fieldLimit: number;
    /**
     * 属性名称(中文)
     */
    fieldNameCn: string;
    /**
     * 属性名称(英文)
     */
    fieldNameUs: string;
    /**
     * 是否必填，0-否 1-是
     */
    fieldRequired: string;
}
export interface ApplyData {
    /**
     * 应用名称
     */
    appName: string;
    /**
     * 凭证元数据
     */
    claimFields: Field[];
    createBy: string;
    createTime: string;
    /**
     * 申请方DID
     */
    did: string;
    /**
     * 审核状态，0-未申请 1-申请中 2-申请驳回 3-申请通过
     */
    processApprovalStatus: string;
    /**
     * 审核时间
     */
    processApprovalTime: string;
    /**
     * 凭证数据
     */
    processClaimContent: string;
    /**
     * 驳回原因
     */
    processDisapprovalReason: string;
    /**
     * 凭证流程ID
     */
    processId: number;
    /**
     * 签发状态，0-未签发 1-已签发
     */
    processIssuedStatus: string;
    /**
     * 申请时间
     */
    processSubmitTime: string;
    /**
     * 凭证申请数据
     */
    processTemplateContent: string;
    /**
     * 模版描述
     */
    templateDescription: string;
    /**
     * 凭证申请元数据
     */
    templateFields: Field[];
    /**
     * 模版ID
     */
    templateId: number;
    /**
     * 模版名称
     */
    templateName: string;
    /**
     * 模版类型
     */
    templateType: string;
    updateBy: string;
    updateTime: string;
}
