export enum ErrorTypes {
    NOT_FOUND = 404,
    INTRNAL_SERVER_ERROR = 500,
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNAUTHORIZED = 401,
}

export interface NetworkError {
    type: ErrorTypes.NETWORK_ERROR;
    title: string;
    message: string;
}