export type RoleRow = {
    roleId: number;
    roleName: string;
    roleKey: string;
    status: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
}

export type RoleFormValues = {
    roleId?: string;
    roleName: string;
    roleKey: string;
    remark: string;
    menuIds: number[];
}