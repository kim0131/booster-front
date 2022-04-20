import axios from "axios";
const validator = require("validator");

export const mb_id_vaildate = async (mb_id: string) => {
  let error: string = "";
  if (!mb_id) {
    error = "아이디를 입력해주세요.";
    return error;
  }
  if (!validator.isAlphanumeric(mb_id)) {
    error = "아이디는 영어 및 숫자만 사용할 수 있습니다.";
    return error;
  }
  if (!validator.isLength(mb_id, { min: 6, max: 30 })) {
    error = "아이디는 최소 6자 이상 최대 30자 이하여야합니다.";
    return error;
  }

  await axios
    .post("/api2/mbid-check", {
      mb_id: mb_id,
    })
    .then((res: any) => {
      if (!res.data.success) {
        error = "아이디가 중복되었습니다.";
      }
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));

  return error;
};

export const mb_pw_vaildate = async (mb_pw: string) => {
  let error: string = "";
  const regExp1 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; //특수문자
  const regExp2 = /[a-z]/g; //알파벳
  const regExp3 = /[0-9]/g; //숫자

  if (!mb_pw) {
    error = "비밀번호를 입력해주세요.";
    return error;
  }
  if (!regExp2.test(mb_pw)) {
    error = `비밀번호에는 영어가 포함되어야합니다.`;
    return error;
  }

  if (!regExp3.test(mb_pw)) {
    error = `비밀번호에는 숫자가 포함되어야합니다.`;
    return error;
  }
  if (!regExp1.test(mb_pw)) {
    error = `비밀번호에는 특수문자가 포함되어야합니다.`;
    return error;
  }

  if (!validator.isLength(mb_pw, { min: 8, max: 16 })) {
    error = "비밀번호는 최소 8자 이상 최대 16 이하여야합니다.";
    return error;
  }

  return error;
};

export const mb_nick_vaildate = async (mb_nick: string | undefined) => {
  let error: string = "";
  if (!mb_nick) {
    error = "닉네임을 입력해주세요.";
    return error;
  }
  if (!validator.isLength(mb_nick, { min: 2, max: 10 })) {
    error = "닉네임은 2자이상 10이하여야합니다.";
    return error;
  }
  await axios
    .post("/api2/mbnick-check", {
      mb_nick: mb_nick,
    })
    .then(res => {
      if (!res.data.success) {
        error = "닉네임이 중복되었습니다.";
      }
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));

  return error;
};

export const mb_name_vaildate = async (mb_name: string | undefined) => {
  let error: string = "";
  if (!mb_name) {
    error = "이름을 입력해주세요.";
    return error;
  }

  return error;
};

export const mb_email_vaildate = async (mb_email: string | undefined) => {
  let error: string = "";
  if (!mb_email) {
    error = "이메일을 작성해주세요.";
    return error;
  }
  if (!validator.isEmail(mb_email)) {
    error = "올바른 이메일 형식이 아닙니다.";
    return error;
  }

  await axios
    .post("/api2/mbemail-check", {
      mb_email: mb_email,
    })
    .then(res => {
      console.log(res);
      if (!res.data.success) {
        error = "이메일이 중복되었습니다.";
      }
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));

  return error;
};

export const mb_ph_vaildate = async (mb_ph: string | undefined) => {
  let error: string = "";
  if (!mb_ph) {
    error = "휴대폰 번호를 작성해주세요.";
    return error;
  }
  if (validator.contains(mb_ph, "-")) {
    error = ` "-"을 제거해주세요.`;
    return error;
  }

  await axios
    .post("/api2/mbph-check", {
      mb_ph: mb_ph,
    })
    .then(res => {
      if (!res.data.success) {
        error = "휴대폰번호가 중복되었습니다.";
      }
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));

  return error;
};
