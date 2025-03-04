export enum DEVICE_TYPE {
    ANDROID= 'Android',
    IOS= 'IOS'
}

export type DeviceToken = {
    deviceToken: string,
    customerId: number,
    deviceType: DEVICE_TYPE,
} 