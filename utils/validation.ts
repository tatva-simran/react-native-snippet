export const validation = {
  // TextInput Empty Validation
  textInputCheck(txtInput: any) {
    if (txtInput !== undefined) {
      if (
        txtInput !== null &&
        txtInput.trim().length >= 1 &&
        txtInput !== undefined
      ) {
        return true;
      }
      return false;
    }
    return false;
  },

  // Email Validation
  isValidEmail(email: any) {
    // https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      return false;
    }
    return true;
  },

  // Alphabets only validation
  onlyAlphabets(value: string) {
    if (!/[^\sa-zA-Z]/.test(value)) {
      return true;
    } else {
      return false;
    }
  },

  // Password validation
  isValidPassword(value: string) {
    // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    let reg = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  },

  // Length validation 
  checkLength(txtInput: any, len: any) {
    if (txtInput !== undefined) {
      if (
        txtInput !== null &&
        txtInput.trim().length > len &&
        txtInput !== undefined
      ) {
        return true;
      }
      return false;
    }
    return false;
  },

  // Phone number validation
  isValidPhoneNumber(txtInput: any) {
    if (txtInput) {
      txtInput = txtInput.replace(/[^0-9]/g, '').substring(0, 10);
    }
    if (txtInput !== undefined) {
      if (
        txtInput !== null &&
        txtInput.trim().length === 10 &&
        txtInput !== undefined
      ) {
        return true;
      }
      return false;
    }
    return false;
  },

  // Name validation
  isValidName(value: string) {
    let reg = /\S\w*/;
    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  },
};
