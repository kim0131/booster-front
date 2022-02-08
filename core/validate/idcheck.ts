const Joi = require("joi");

const schema = Joi.object({
  mb_id: Joi.string().alphanum().min(6).max(30).required(),
});

export const mb_id_vaildate = async (mb_id: string | undefined) => {
  let { value, error } = schema.validate({ mb_id: mb_id });

  console.log(error);
  if (
    error ==
    'ValidationError: "mb_id" length must be at least 6 characters long'
  ) {
    error = "아이디는 최소 6자 이상이여야합니다.";
  } else if (
    error ==
    'ValidationError: "mb_id" length must be less than or equal to 30 characters long'
  ) {
    error = "아이디는 30자를 초과할 수 없습니다.";
  } else if (
    error ==
      'ValidationError: "mb_id" must only contain alpha-numeric character' ||
    'ValidationError: "mb_id" must only contain alpha-numeric characters'
  ) {
    error = "아이디는 영어 및 숫자만 사용할 수 있습니다.";
  }
  return { value, error };
};
