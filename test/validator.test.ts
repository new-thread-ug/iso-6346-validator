import { test } from "node:test"
import assert from "node:assert"
import { isValid } from "../lib/index";
import { InvalidReasonEnum, ISO6346ValidationResult } from "../lib/types";

const truthyValidationResult: ISO6346ValidationResult = {
  isValid: true,
  reason: null,
}


test("isInvalid_LengthZero_True", (t) => {
  const lengthZero = "";
  const expectedValidationResult: ISO6346ValidationResult = {
    isValid: false,
    reason: InvalidReasonEnum.InvalidLength,
  };

  const unexpectedValidationResult: ISO6346ValidationResult = truthyValidationResult;

  const validationResult = isValid(lengthZero);
  assert.deepStrictEqual(expectedValidationResult, validationResult);
  assert.notDeepStrictEqual(unexpectedValidationResult, validationResult);
});

test("isInvalid_LengthTen_True", (t) => {
  const lengthTen = "CSQU305438";
  const expectedValidationResult: ISO6346ValidationResult = {
    isValid: false,
    reason: InvalidReasonEnum.InvalidLength,
  };

  const unexpectedValidationResult: ISO6346ValidationResult = truthyValidationResult;

  const validationResult = isValid(lengthTen);
  assert.deepStrictEqual(expectedValidationResult, validationResult);
  assert.notDeepStrictEqual(unexpectedValidationResult, validationResult);
});

test("isValid_LengthEleven_True", (t) => {
  const lengthTen = "CSQU3054383";
  const expectedValidationResult: ISO6346ValidationResult = truthyValidationResult;

  const unexpectedValidationResult: ISO6346ValidationResult = {
    isValid: false,
    reason: InvalidReasonEnum.InvalidLength,
  }

  const validationResult = isValid(lengthTen);
  assert.deepStrictEqual(expectedValidationResult, validationResult);
  assert.notDeepStrictEqual(unexpectedValidationResult, validationResult);
});

test("isValid_FalsyOwnerCode_False", (t) => {
  const lengthTen = "C1QU3054383";
  const expectedValidationResult: ISO6346ValidationResult = {
    isValid: false,
    reason: InvalidReasonEnum.InvalidOwnerCode,
  };

  const unexpectedValidationResult: ISO6346ValidationResult = truthyValidationResult;

  const validationResult = isValid(lengthTen);
  assert.deepStrictEqual(expectedValidationResult, validationResult);
  assert.notDeepStrictEqual(unexpectedValidationResult, validationResult);
});

test("isValid_FalsySerialNumber_False", (t) => {
  const lengthTen = "CSQU3054X83";
  const expectedValidationResult: ISO6346ValidationResult = {
    isValid: false,
    reason: InvalidReasonEnum.InvalidSerialNumber,
  };

  const unexpectedValidationResult: ISO6346ValidationResult = truthyValidationResult;

  const validationResult = isValid(lengthTen);
  assert.deepStrictEqual(expectedValidationResult, validationResult);
  assert.notDeepStrictEqual(unexpectedValidationResult, validationResult);
});


test("isValid_CorrectContainerNumber_True", (t) => {
  const correctNumber = "CSQU3054383";
  const expectedValidationResult: ISO6346ValidationResult = truthyValidationResult;

  const unexpectedValidationResult: ISO6346ValidationResult = {
    isValid: false,
    reason: InvalidReasonEnum.InvalidLength,
  };

  const validationResult = isValid(correctNumber);
  assert.deepStrictEqual(expectedValidationResult, validationResult);
  assert.notDeepStrictEqual(unexpectedValidationResult, validationResult);
});

test("isValid_CorrectContainerNumberWithZeroChecksum_True", (t) => {
  const correctNumber = "HLBU3616150";
  const expectedValidationResult: ISO6346ValidationResult = truthyValidationResult;

  const unexpectedValidationResult: ISO6346ValidationResult = {
    isValid: false,
    reason: InvalidReasonEnum.CheckDigitFalsy,
  };

  const validationResult = isValid(correctNumber);
  assert.deepStrictEqual(expectedValidationResult, validationResult);
  assert.notDeepStrictEqual(unexpectedValidationResult, validationResult);
})

test("isValid_IncorrectCheckSum_False", (t) => {
  const correctNumber = "CSQU3054384";
  const expectedValidationResult: ISO6346ValidationResult = {
    isValid: false,
    reason: InvalidReasonEnum.CheckDigitFalsy,
  };

  const unexpectedValidationResult: ISO6346ValidationResult = truthyValidationResult;

  const validationResult = isValid(correctNumber);
  assert.deepStrictEqual(expectedValidationResult, validationResult);
  assert.notDeepStrictEqual(unexpectedValidationResult, validationResult);
});