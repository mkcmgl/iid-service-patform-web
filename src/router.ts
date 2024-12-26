import { createWebHistory, createRouter } from 'vue-router';
import NProgress from 'nprogress';
import { ExtendImportMeta } from './types';
import { auth } from '@/middlewares/auth';
import { guest } from '@/middlewares/guest';

const routes = [
    {
        path: '/login',
        component: () => import('@/pages/UserLogin.vue'),
        name: 'login',
        beforeEnter: guest
    },

    {
        path: '/register',
        component: () => import('@/pages/UserRegister.vue'),
        name: 'register',
        beforeEnter: guest
    },

    {
        path: '/forget-password',
        component: () => import('@/pages/ForgetPassword.vue'),
        name: 'forget-password',

        beforeEnter: guest
    },

    {
        path: '/',
        component: () => import('@/components/layout/index.vue'),
        beforeEnter: auth,
        redirect: '/profile',
        children: [
            {
                path: 'profile',
                name: 'Profile',
                props: true,
                component: () => import('@/pages/profile/index.vue')
            },
            {
                path: 'profile/issuingParty',
                name: 'IssuingParty',
                props: true,
                component: () =>
                    import('@/pages/profile/issuingParty/index.vue')
            },

            {
                path: 'accountCenter',
                name: 'AccountCenter',
                props: true,
                component: () => import('@/pages/accountCenter/index.vue')
            },
            {
                path: 'appManagement',
                name: 'AppManagement',
                props: true,
                component: () => import('@/pages/appManagement/index.vue')
            },
            {
                path: 'appManagement/detail',
                name: 'AppManagementDetail',
                props: true,
                component: () =>
                    import('@/pages/appManagement/detail/index.vue')
            },
            {
                path: 'appManagement/detail/addTemplate',
                name: 'AddTemplate',
                props: true,
                component: () =>
                    import('@/pages/appManagement/detail/addTemplate/index.vue')
            },
            {
                path: 'appManagement/detail/templateDetail',
                name: 'TemplateDetail',
                props: true,
                component: () =>
                    import(
                        '@/pages/appManagement/detail/templateDetail/index.vue'
                    )
            },
            {
                path: 'certificate',
                name: 'Certificate',
                props: true,
                component: () => import('@/pages/certificate/index.vue')
            },
            {
                path: 'certificate/apply',
                name: 'CertificateApply',
                props: true,
                component: () => import('@/pages/certificate/apply/index.vue')
            },
            {
                path: 'certificate/issuance',
                name: 'CertificateIssuance',
                props: true,
                component: () =>
                    import('@/pages/certificate/issuance/index.vue')
            },
            {
                path: 'certificate/issuance/auth',
                name: 'CertificateIssuanceAuth',
                props: true,
                component: () =>
                    import('@/pages/certificate/issuance/auth/index.vue')
            },
            {
                path: 'certificate/issuance/apply',
                name: 'CertificateIssuanceApply',
                props: true,
                component: () =>
                    import('@/pages/certificate/issuance/apply/index.vue')
            },
            {
                path: 'certificate/verify',
                children: [
                    {
                        path: '',
                        component: () =>
                            import('@/pages/certificate/verify/index.vue'),
                        name: 'VerifyGroupList'
                    },
                    {
                        path: 'single',
                        component: () =>
                            import('@/pages/certificate/verify/single.vue'),
                        name: 'VerifySingle'
                    },
                    {
                        path: 'results',
                        component: () =>
                            import('@/pages/certificate/verify/results.vue'),
                        name: 'VerifyResults'
                    },
                    {
                        path: 'history',
                        component: () =>
                            import('@/pages/certificate/verify/history.vue'),
                        name: 'VerifyHistory'
                    }
                ]
            },
            {
                path: 'didManagement',
                name: 'DidManagement',
                props: true,
                component: () => import('@/pages/didManagement/index.vue')
            },
            {
                path: 'eventCenter',
                name: 'EventCenter',
                props: true,
                component: () => import('@/pages/eventCenter/index.vue')
            },
            {
                path: 'eventCenter/detail',
                name: 'EventCenterDetail',
                props: true,
                component: () => import('@/pages/eventCenter/detail/index.vue')
            },
            {
                path: 'document',
                name: 'Document',
                props: true,
                component: () => import('@/pages/apiDocument/index.vue')
            },
            {
                path: 'system/menu',
                name: 'MenuConfig',
                props: true,
                component: () => import('@/pages/system/menu/index.vue')
            },

            {
                path: 'system/user',
                name: 'UserConfig',
                props: true,
                component: () => import('@/pages/system/user/index.vue')
            },
            {
                path: 'system/role',
                name: 'RoleConfig',
                props: true,
                component: () => import('@/pages/system/role/index.vue')
            },
            {
                path: 'system/base-config',
                children: [
                    {
                        path: '',
                        component: () =>
                            import('@/pages/system/config/index.vue'),
                        name: 'BaseConfig'
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(
        (import.meta as ExtendImportMeta).env.VITE_APP_BASE
    ),
    routes
});

router.beforeEach((_to, _from, next) => {
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});

export default router;
