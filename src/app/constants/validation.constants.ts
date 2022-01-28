const REQUIRED = "field is required";

const EMAIL = "field is not a valid email address";

const SAME = "field does not match {?} field"; // {?} to be substituted using formatValidationMessagePipe

const MIN_LENGTH = "field must have at least {?} characters" // {?} to be subsituted using formatValidationMessagePipe

const RANGE = "field value must be between {?} and {?}"

type ValidationKeys = "REQUIRED" | "EMAIL" | "SAME" | "MIN_LENGTH" | "RANGE";

export type ValidationErrorMap = Record<ValidationKeys, string>;

export const ValidationConstants : ValidationErrorMap = {
    REQUIRED,
    EMAIL,
    SAME,
    MIN_LENGTH,
    RANGE
};