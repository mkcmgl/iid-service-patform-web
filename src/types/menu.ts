import {
    IconType,
    IsFrame,
    MenuLevel,
    MenuType
} from '@/pages/system/menu/config';

export type Option = {
    label: string;
    value: number;
};

export type MenuRow = {
    menuId: number;
    menuName: string;
    parentId: number;
    menuType: MenuType;
    menuLevel: MenuLevel;
    iconPath: string;
    icon: string;
    // iconType: IconType;
    orderNum: number;
    component: string;
    createTime: string;
    children: MenuRow[];
    // isFrame: IsFrame
};

export type MenuFormValues = {
    menuId: number;
    menuName: string;
    parentId: number;
    menuType: MenuType;
    menuLevel: MenuLevel;
    icon: string;
    iconPath: string;
    iconType: IconType;
    orderNum: number;
    component: string;
    path: string;
    isFrame: IsFrame;
    children: MenuRow[];
};
