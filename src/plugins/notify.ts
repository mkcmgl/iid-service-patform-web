import { notify as baseNotify } from '@kyvg/vue3-notification';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type Notification = {
    title?: string;
    type: NotificationType;
    text?: string;
    duration?: number;
    hideClose?: boolean;
};

export default (notification: Notification) => {
    return baseNotify(notification);
};
