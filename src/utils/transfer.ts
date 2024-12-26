export const safeJsonParse = <T>(val: string): T | null => {
    try {
        return JSON.parse(val) as T;
    } catch (error) {
        return null;
    }
};
