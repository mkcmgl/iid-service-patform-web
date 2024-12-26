import * as path from 'path';
import { type UserConfig, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';

export default ({ mode }: { mode: string }) => {
    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd())
    };

    return defineConfig({
        base: process.env.VITE_APP_BASE,
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api']
                }
            }
        },
        resolve: {
            alias: {
                // 设置路径
                '~': path.resolve(__dirname, './'),
                '@': path.resolve(__dirname, './src'),
                vue: 'vue/dist/vue.esm-bundler.js'
            }
            // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        server: {
            host: '0.0.0.0',
            port: process.env.VITE_APP_PORT || 5173,
            strictPort: true,
            watch: {
                usePolling: true
            },
            hmr: {
                host: process.env.VITE_APP_HOST || 'manage.qualink.com',
                port: process.env.VITE_APP_PORT || 5173
            },
            proxy: {
                '/api': {
                    // target: 'http://10.180.13.200:8988',
                    // target: 'https://642359be7qk0.vicp.fun',
                    target: 'http://100.70.3.92:8899',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },

        plugins: [
            vue(),
            checker({
                typescript: true
            })
        ]
    } as UserConfig);
};
