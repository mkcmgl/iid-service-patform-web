export enum ProcessApprovalStatus {
    /** 未申请 */
    'NotApply' = '0',
    /** 申请中 */
    'Applying' = '1',
    /** 申请驳回 */
    'Rejected' = '2',
    /** 申请通过 */
    'Approved' = '3'
}

export const ProcessApprovalStatusMap = {
    [ProcessApprovalStatus.NotApply]: '未申请',
    [ProcessApprovalStatus.Applying]: '申请中',
    [ProcessApprovalStatus.Approved]: '已通过',
    [ProcessApprovalStatus.Rejected]: '被拒绝'
};

export enum FieldDataType {
    /** 字符串 */
    'string' = '0',
    /** 数字 */
    'number' = '1',
    /** 文件 */
    'file' = '2'
}

export enum FieldRequired {
    /** 非必填 */
    'optional' = '0',
    /** 必填 */
    'required' = '1'
}

export enum TemplateStatus {
    /** 禁用 */
    off = '0',
    /** 启用 */
    on = '1'
}

export enum LogResult {
    /** 验证不通过 */
    unpass = '0',
    /** 验证通过 */
    passed = '1',
    /** 凭证不存在 */
    notExist = '2'
}

export const LogResultMap = {
    [LogResult.passed]: '验证通过',
    [LogResult.unpass]: '验证不通过',
    [LogResult.notExist]: '凭证不存在'
};
