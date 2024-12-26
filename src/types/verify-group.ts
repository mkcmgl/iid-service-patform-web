import { LogResult } from '@/data/certs';

export type VerfiyGroupRow = {
    /** 验证模板Id */
    groupId: number;
    /** 验证模板名称 */
    groupName: string;
    /** 验证模板描述 */
    groupDescription: string;
    /** 证书模板Id */
    templateIds: string;
    /** 更新时间 */
    updateTime: string;
    /** 创建时间 */
    createTime: string;
    actions: string;
};

export type VerfiyGroupForm = {
    groupName: string;
    groupDescription: string;
    templateIds: string[];
};

export type VerfiyHistoryFilter = {
    /** 持证方did */
    logDid: string;
    /** 验证结果 */
    logResult: LogResult;
};

export type VerfiyHistoryRow = {
    /** 验证模版记录ID */
    logId: string;
    /** 验证模版ID */
    groupId: string;
    /** 持证方did */
    logDid: string;
    /** 验证结果 */
    logResult: LogResult;
    /** 验证详情 */
    logContent: string;
    /** 验证时间 */
    logTime: string;
};
