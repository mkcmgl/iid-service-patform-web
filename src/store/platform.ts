import { defineStore } from 'pinia';
import axios from '@/plugins/axios';
import { Platform } from '@/types/platform';

export const usePlatformStore = defineStore('platform', {
    state: () => ({
        platform: {} as Platform,
        isInited: false
    }),
    actions: {
        async refreshPlatform(force = false) {
            if (this.isInited && !force) {
                return this.platform;
            }
            const res = await axios.get(
                '/system/baseConfig/getPersonalSetting'
            );
            const newData = res.data?.data ?? {};
            this.platform = {
                ...this.platform,
                ...newData
            };
            if (Object.keys(newData).length > 0) {
                this.isInited = true;
            }

            const faviconLink = document.querySelector<HTMLLinkElement>(
                "link[rel='shortcut icon']"
            );
            if (faviconLink) {
                faviconLink.href =
                    this.platform.logoPath || 'public/images/logo.png';
            }
            return this.platform;
        }
    }
});
