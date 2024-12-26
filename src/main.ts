import '@/assets/index.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createMetaManager } from 'vue-meta';
import Notifications from '@kyvg/vue3-notification';
import VersaForm from 'versa-form';
import 'versa-form/lib/style.css';
import ElementPlus from 'element-plus';
import '@/assets/element-rewrite.scss';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import IconSelect from '@/components/icon-select/index.vue';
import App from '@/App.vue';
import router from '@/router';

const metaManager = createMetaManager();
const app = createApp(App);

app.use(metaManager)
    .use(Notifications)
    .use(VersaForm)
    .use(createPinia())
    .use(router)
    .use(ElementPlus, {
        locale: zhCn
    })
    .mount('#app');

app.component('IconSelect', IconSelect);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
