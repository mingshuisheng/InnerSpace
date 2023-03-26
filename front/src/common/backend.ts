export const backendUrl = "http://localhost:8080"
export const getBaseUrl = () => process.browser ? "/sapi" : backendUrl;
