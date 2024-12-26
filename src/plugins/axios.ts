import axios from 'axios';
import * as NProgress from 'nprogress';
import { useAuthStore } from '@/store/auth';
import router from '@/router';
import notify from '@/plugins/notify';

import { ExtendImportMeta } from '@/types/index';

axios.defaults.baseURL = (import.meta as ExtendImportMeta).env.VITE_API_URL;

axios.interceptors.request.use(
    (config) => {
        NProgress.start();

        const authStore = useAuthStore();

        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        const data = response.data;

        NProgress.done();

        if (data instanceof Blob) {
            return response;
        } else if (
            data.code &&
            (data.code.toString().startsWith('4') ||
                data.code.toString().startsWith('5'))
        ) {
            notify({
                type: 'error',
                title: '发生错误',
                text: data.msg
            });

            if (data.code == 401) {
                useAuthStore().clearAuth();
                router.push({
                    name: 'login'
                });
            }

            return Promise.reject(data);
        }

        return response;
    },
    (error) => {
        NProgress.done();
        notify({
            text: error.message || '网络异常',
            type: 'error'
        });

        return Promise.reject(error);
    }
);

export default axios;
