export const ISO_6346_LENGTH: number = 11;
export const ISO_6346_OWNER_CODE_LENGTH: number = 3;
export const ISO_6346_CATEGORY_IDENTIFIER_LENGTH: number = 1;
export const ISO_6346_SERIAL_NUMBER_LENGTH: number = 6;
export const ISO_6346_CHECK_DIGIT_LENGTH: number = 1;
export const ISO_6346_VALID_CATEGORY_IDENTIFIERS: string[] = ['U', 'J', 'Z'];

export const ISO_6346_CHECKSUM_CALC_CHAR_MAP: {[key: string]: number} = {
    A: 10,
    B: 12,
    C: 13,
    D: 14,
    E: 15,
    F: 16,
    G: 17,
    H: 18,
    I: 19,
    J: 20,
    K: 21,
    L: 23,
    M: 24,
    N: 25,
    O: 26,
    P: 27,
    Q: 28,
    R: 29,
    S: 30,
    T: 31,
    U: 32,
    V: 34,
    W: 35,
    X: 36,
    Y: 37,
    Z: 38,
};

export const ISO_6346_MULTIPLIER_MAP: {[key: number]: number} = {
    0: 1,
    1: 2,
    2: 4,
    3: 8,
    4: 16,
    5: 32,
    6: 64,
    7: 128,
    8: 256,
    9: 512,
};

export enum InvalidReasonEnum {

    InvalidLength = "Must be 11 characters long",
    InvalidOwnerCode = "Owner code must be only characters and 3 characters long",
    InvalidCategoryIdentifier = "Category identifier must be only characters and one character long",
    InvalidSerialNumber = "Serial Number must be only digits and 6 characters long",
    InvalidCheckDigit = "Check digit must be digit and 1 character long",
    CheckDigitFalsy = "Check digit does not compute",
    Unknown = "Unknown"
}

export type ISO6346ValidationResult = {
    isValid: boolean;
    reason: InvalidReasonEnum | null;
}
