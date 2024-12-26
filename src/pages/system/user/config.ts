/**
 * 用户状态
 */
export enum UserState {
    normal,
    deactivated
}

export const userStateOptions = [
    {
        label: '正常',
        value: UserState.normal
    },
    {
        label: '停用',
        value: UserState.deactivated
    }
];
