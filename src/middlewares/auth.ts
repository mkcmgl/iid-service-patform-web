import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import { useAuthStore } from '@/store/auth';

export const auth = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    await useAuthStore().refreshUser();

    if (useAuthStore().isAuthed) {
        next();
    } else {
        next({
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        });
    }
};
