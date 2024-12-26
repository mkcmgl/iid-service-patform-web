/**
 * 菜单类型
 */
export enum MenuType {
    directory = 'M',
    menu = 'C'
}

export const menuTypeMap = {
    [MenuType.directory]: '目录',
    [MenuType.menu]: '菜单'
};

/**
 * 是否外链
 */
export enum IsFrame {
    'Y' = '0',
    'N' = '1'
}

export const isFrameMap = {
    [IsFrame.Y]: '是',
    [IsFrame.N]: '否'
};

/**
 * 图标类型
 */
export enum IconType {
    lib = '0',
    upload = '1'
}

export const iconTypeMap = {
    [IconType.lib]: '图标库',
    [IconType.upload]: '自主上传'
};

/**
 * 菜单级别
 */
export enum MenuLevel {
    first = '0',
    second = '1'
}

export const menuLevelMap = {
    [MenuLevel.first]: '一级菜单',
    [MenuLevel.second]: '二级菜单'
};
