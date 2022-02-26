const regExp = {
  checkPassword(str: string) {
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regularExpression.test(str);
  },

  checkEmail(str: string) {
    const regularExpression = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regularExpression.test(str);
  },
};

export default regExp;
