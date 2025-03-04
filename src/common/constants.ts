export enum GENDER {
    FEMALE = 'female',
    MALE = 'male',
    OTHER = 'other',
}

export enum Role {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
}

export enum TOKEN_TYPE {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
}

export const SERVICE_NAME = 'TechTalks';

export const COMMON_MESSAGE = {
    ERR_COM_001_Required: 'ERR_COM_001_Required',
    ERR_COM_002_InvalidFormat: 'ERR_COM_002_InvalidFormat',
    ERR_COM_003_ExistedValue: 'ERR_COM_003_ExistedValue',
    ERR_COM_004_MaxLength: 'ERR_COM_004_MaxLength',
    ERR_COM_005_MinLength: 'ERR_COM_028_MinLength',
    INF_WH_ORDER_003: 'INF_WH_ORDER_003',
    ERR_WH_ORDER_008: 'ERR_WH_ORDER_008',
    ERR_COM_007_InternalServerError: 'ERR_COM_007_InternalServerError',
    ERR_COM_010_InvalidInputData: 'ERR_COM_010_InvalidInputData',
    INCORRECT_ACCOUNT: 'Incorrect username or password',
    ACCESS_DENIED: 'Access Denied',
    TOKEN_INVALID: 'Token Invalid !',
    RESET_PASSWORD_EXPIRED: 'The password reset code has expired',
    PASSWORD_NOT_MATCH: 'Passwords do not match',
    FORBIDDEN: "you don't have permission to access this resource",
    NAME_ALREADY_EXISTS: 'Name already exists !',
    FOLLOW_LINK_EXISTS: 'Follow link already exists !',
    TEMPLATE_TYPE: 'Template type already exists !',
};

export const NOT_FOUND_ERROR = {
    USER: 'User not found!',
    POST: 'Post not found!',
    TECHNOLOGY: 'Technology not found!',
    TEMPLATE: 'Template not found!',
    TOPIC: 'Topic not found!',
    DISCUSS: 'Discuss not found!',
    QUESTION: 'Question not found!',
    REPOSITORY: 'Repository not found!',
    CONTENT_INCREMENT_POINT: 'Content not found',
    FOLLOW_LINK: 'Follow link not found!',
    FOLLOW: 'Follow not found!',
    ANSWER: 'Answer not found!',
    DEVICE_TOKEN: 'Device token not found!',
};

export const EXIST_ERROR = {
    EMAIL_EXIST: 'Email already exists in the system',
    USERNAME_EXIST: 'Username already exists in the system',
};

export enum QueueName {
    TEST_QUEUE = 'TEST_QUEUE',
    FIREBASE_NOTIFICATION = 'FIREBASE_NOTIFICATION',
}
