import type { NextPage } from "next";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import { Body1, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import AccountsLayout from "@components/layouts/accounts/accounts-layout";
import TextField from "@components/elements/text-field";
import Button from "@components/elements/button";
import Callout from "@components/elements/callout";

const ResetPassword: NextPage = () => {
  return (
    <>
      <Header />
      <AccountsLayout
        title={
          <>
            <Header4>{accountsDescription.resetPassword.title}</Header4>
            <Body1>{accountsDescription.resetPassword.step1}</Body1>
          </>
        }
        section1={
          <>
            <TextField
              name="mb_id"
              placeholder="아이디를 입력하세요"
              size="large"
            />
            <TextField
              name="mb_name"
              placeholder="이름 입력하세요"
              size="large"
            />
            <TextField
              name="mb_ph"
              placeholder="휴대폰 번호를 입력하세요"
              size="large"
            />
            <Callout title="test123">2020년 8월 21일 가입</Callout>
          </>
        }
        section2={
          <>
            <Button variants="solid" color="primary" size="large">
              다음
            </Button>
            <Button variants="light" size="large">
              취소
            </Button>
          </>
        }
      />
      <Footer />
    </>
  );
};

export default ResetPassword;
