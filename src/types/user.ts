import { UserState } from '@/pages/system/user/config';

export type User = {
    userName: string;
    address: string;
    nickName: string;
    deptName: string;
    authState: string;
    settleState: string;
    authStatus?: string; // 实名认证状态
    reviewOpinion?: string; // 实名认证驳回原因
    authOnOff?: string; // 是否开启实名认证
    roles: string[];
    inviteCode: string;
    deptId: string;
    userId: string;
    orgAddress?: string;
    contactName?: string;
    contactPhone?: string;
    orgCode?: string;
    orgName?: string;
    remark?: string;
    settleDesc?: string;
    settleRemark?: string;
    admin?: string;
    did?: string;
    hasDid?: string;
};
export type UserDataNum = {
    appNum: string;
    templateNum: string;
    claimNum: string;
};
export type Roles = string[];

export type UserRoute = {
    name: string;
    path: string;
    hidden: boolean;
    component: string;
    alwaysShow: boolean;
    orderNum: number;
    meta: {
        title: string;
        icon: string;
        noCache: boolean;
        link: string;
    };
    children: UserRoute[];
};

export type UserRow = {
    userId: number;
    userName: string;
    phoneNumber: string;
    roleName: string;
    status: UserState;
    certificateStatus: number;
    createBy: string;
    createTime: string;
    updateTime: string;
    institution: string;
    roles: { roleId: number }[];
    admin: boolean;
};
export type UserFormValues = {
    userName: string;
    phoneNumber: string;
    roleIds: string;
    status: UserState;
    tenantIds: string;
};
