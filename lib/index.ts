import { InvalidReasonEnum, ISO6346ValidationResult, ISO_6346_CATEGORY_IDENTIFIER_LENGTH, ISO_6346_CHECKSUM_CALC_CHAR_MAP, ISO_6346_LENGTH, ISO_6346_MULTIPLIER_MAP, ISO_6346_OWNER_CODE_LENGTH, ISO_6346_SERIAL_NUMBER_LENGTH } from "./types";

function containsOnlyString(str: string): boolean {
    let containsOnlyString: boolean = true;
    str.split('').forEach(char => {
        if(isNaN(parseFloat(char)) === false) containsOnlyString = false;
    });
    return containsOnlyString;
  }

function containsOnlyNumbers(str: string): boolean {
    return /^\d+$/.test(str);
}

/**
 * 
 * @param number Takes a string following the ISO 63456 Container Number Standard
 * @returns boolean Returns true or false depending on the validity of the ISO 63456 standard
 */
export function isValid(iso63456ContainerNumber: string): ISO6346ValidationResult {
    // Validate that exact length is 11
    if (iso63456ContainerNumber.length !== ISO_6346_LENGTH) return { isValid: false, reason: InvalidReasonEnum.InvalidLength };
    // Validate that ownerCode is a string
    const ownerCode = iso63456ContainerNumber.substring(0, ISO_6346_OWNER_CODE_LENGTH);
    if (!containsOnlyString(ownerCode)) return { isValid: false, reason: InvalidReasonEnum.InvalidOwnerCode };
    // Validate the Category identifier
    const categoryIdentifier = iso63456ContainerNumber.substring(ISO_6346_OWNER_CODE_LENGTH+1, ISO_6346_OWNER_CODE_LENGTH);
    if (!containsOnlyString(categoryIdentifier)) return { isValid: false, reason: InvalidReasonEnum.InvalidCategoryIdentifier };
    // Validate the SN
    const serialNumber = iso63456ContainerNumber.substring(ISO_6346_CATEGORY_IDENTIFIER_LENGTH + ISO_6346_OWNER_CODE_LENGTH, ISO_6346_SERIAL_NUMBER_LENGTH+4);
    if (!containsOnlyNumbers(serialNumber)) return { isValid: false, reason: InvalidReasonEnum.InvalidSerialNumber };
    // Validate the Check Digit
    const checkDigit = iso63456ContainerNumber.charAt(10);
    if(!containsOnlyNumbers(checkDigit)) return { isValid: false, reason: InvalidReasonEnum.InvalidCheckDigit };
    // Map values and calculate sum
    const values = [...(ownerCode + categoryIdentifier).split('').map(char => ISO_6346_CHECKSUM_CALC_CHAR_MAP[char]), ...serialNumber.split('').map(char => Number(char))];
    let sum: number = 0;
    for (let i=0; i<values.length; i++) {
        sum = sum + values[i]!*ISO_6346_MULTIPLIER_MAP[i]!
    }
    const calculatedCheckDigit = sum-(Math.floor(sum / 11)*11); 
    if (calculatedCheckDigit === Number(checkDigit)) return { isValid: true, reason: null }
    else return { isValid: false, reason: InvalidReasonEnum.CheckDigitFalsy }
}