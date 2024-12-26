export const isValidCliam = (data: unknown) => {
    try {
        const input = typeof data === 'string' ? JSON.parse(data) : data;
        const keys = Object.keys(input);
        return [
            'revocation',
            'issuanceDate',
            'credentialSubject',
            'id',
            'proof',
            'type',
            'issuer',
            'expirationDate',
            '@context'
        ].every((item) => keys.includes(item));
    } catch (error) {
        return false;
    }
};
