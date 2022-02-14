import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import TextField from "@components/elements/text-field";
import Button from "@components/elements/button";
import AccountsLayout from "@components/layouts/accounts/accounts-layout";
import { Body1, Body2, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import React, { useState } from "react";
import theme from "@components/styles/theme";
import { IAccountsData } from "@core/interfaces/accounts";
import { accountsNavigation } from "@core/config/navigation";

interface IStateAccounts {
  data: {
    mb_id: IAccountsData["mb_id"];
    mb_pw: IAccountsData["mb_pw"];
  };
  invalid?: string;
  isLoading: boolean;
}

const Accounts: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState<IStateAccounts>({
    data: {
      mb_id: "",
      mb_pw: "",
    },
    invalid: "",
    isLoading: false,
  });
  const { data: session, status } = useSession();

  if (status == "authenticated") {
    router.push("/");
  }

  const onClickLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>,
  ) => {
    e.preventDefault();
    const link = e.currentTarget.dataset.value;
    link && router.push(link);
  };

  const onChangeAccounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
      },
      invalid: "",
    });
  };

  const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    await axios
      .post("/api2/login", state.data)
      .then((res: any) => {
        const user = res.data.result;
        signIn("username-password", {
          mb_id: user.mb_id,
          mb_pw: user.mb_pw,
          mb_nick: user.mb_nick,
          redirect: false,
        });
      })
      .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          // console.log(error.response.data);
          alert(error.response.data.msg);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
      });
    setState({ ...state, isLoading: false });
  };

  return (
    <>
      <Header />
      <AccountsLayout
        title={
          <>
            <Header4>{accountsDescription.accounts.title}</Header4>
            <Body1>{accountsDescription.accounts.description}</Body1>
          </>
        }
        section1={
          <>
            <TextField
              placeholder="아이디를 입력하세요"
              name="mb_id"
              type="text"
              size="large"
              width="100%"
              onChange={onChangeAccounts}
            />
            <TextField
              placeholder="비밀번호를 입력하세요"
              name="mb_pw"
              type="password"
              size="large"
              onChange={onChangeAccounts}
            />
            {state.invalid && (
              <Body2 color={theme.color.red[600]}>{state.invalid}</Body2>
            )}
          </>
        }
        section2={
          <>
            <Button
              variants="solid"
              color="primary"
              size="large"
              isDisabled={state.data.mb_id && state.data.mb_pw ? false : true}
              isLoading={state.isLoading}
              onClick={onClickLogin}
            >
              {accountsNavigation[0].content}
            </Button>
            <Button
              variants="light"
              size="large"
              onClick={onClickLink}
              dataValue={accountsNavigation[1].url}
            >
              {accountsNavigation[1].content}
            </Button>
          </>
        }
        find={
          <>
            <Body2
              isLink
              data-value={accountsNavigation[2].url}
              onClick={onClickLink}
              color={theme.color.gray[500]}
            >
              {accountsNavigation[2].content}
            </Body2>
            <Body2
              isLink
              data-value={accountsNavigation[3].url}
              onClick={onClickLink}
              color={theme.color.gray[500]}
            >
              {accountsNavigation[3].content}
            </Body2>
          </>
        }
      />
      <Footer />
    </>
  );
};

export default Accounts;
