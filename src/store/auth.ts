import { defineStore } from 'pinia';
import Cookie from 'js-cookie';
import axios from '@/plugins/axios';
import { ExtendImportMeta } from '@/types/index';
import { User, Roles, UserDataNum } from '@/types/user';

const __TOKEN_KEY__ =
    (import.meta as ExtendImportMeta).env.VITE_TOKEN_KEY ?? 'iot-token';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {} as User,
        userDataNum: {} as UserDataNum,
        roles: {} as Roles,
        token: Cookie.get(__TOKEN_KEY__) || null
    }),

    getters: {
        isAuthed(): boolean {
            return Object.keys(this.user).length > 0;
        },
        /**
         * 是否需要实名认证
         * 1、管理员不需要认证
         * 2、全局配置是否开启认证
         * 3、认证未正式通过
         */
        needIdentityVerify(): boolean {
            if (this.roles?.includes('admin') && this.user.admin) {
                return false;
            } else {
                if (
                    this.user.settleState === '2' &&
                    this.user.authState === '2'
                ) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    },

    actions: {
        setUser(user: User) {
            this.user = user;
        },
        setUserDataNum(userDataNum: UserDataNum) {
            this.userDataNum = userDataNum;
        },
        setRoles(roles: Roles) {
            this.roles = roles;
        },
        setToken(token: string) {
            this.token = token;
            Cookie.set(__TOKEN_KEY__, token, { expires: 365 });
        },

        clearAuth() {
            this.user = {} as User;
            this.token = null;
            Cookie.remove(__TOKEN_KEY__);
        },

        async refreshUser() {
            if (this.token && Object.keys(this.user).length === 0) {
                await this.forceRefreshUser();
                await this.forceRefreshUserStatistic();
            }
        },

        async forceRefreshUser() {
            try {
                const { data } = await axios.get('/getInfo');
                this.setUser(data.user as User);
                this.setRoles(data.roles as Roles);
            } catch (e) {
                this.clearAuth();
            }
        },
        async forceRefreshUserStatistic() {
            try {
                const { data } = await axios.get('/did/app/statistic');
                this.setUserDataNum(data.data as UserDataNum);
            } catch (e) {
                this.clearAuth();
            }
        }
    }
});
