import JSEncrypt from 'jsencrypt';
import { ExtendImportMeta } from '@/types/index';

export const encrypt = (raw: string) => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(
        (import.meta as ExtendImportMeta).env.VITE_APP_PUBLIC_KEY
    );
    return encryptor.encrypt(raw);
};

export const decrypt = (raw: string) => {
    const encryptor = new JSEncrypt();
    encryptor.setPrivateKey(
        (import.meta as ExtendImportMeta).env.VITE_APP_PRIVATE_KEY
    );
    return encryptor.decrypt(raw);
};
