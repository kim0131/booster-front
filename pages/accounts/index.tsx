/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import TextField from "@components/elements/text-field";
import Button from "@components/elements/button";
import AccountsLayout from "@components/layouts/accounts-layout";
import { Body1, Body2, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import React, { useEffect, useState } from "react";
import theme from "@components/styles/theme";
import { IAccountsData } from "@core/interfaces/accounts";
import { accountsNavigation } from "@core/config/navigation";

interface IStateAccounts {
  data: {
    mb_id: IAccountsData["mb_id"];
    mb_pw: IAccountsData["mb_pw"];
  };
  invalid?: string;
}

const Accounts: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState<IStateAccounts>({
    data: {
      mb_id: "",
      mb_pw: "",
    },
    invalid: "",
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
  }, [status]);

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

  const onKeyPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      await axios
        .post("/api2/login", state.data)
        .then((res: any) => {
          const user = res.data.result;

          signIn("username-password", {
            mb_id: user.mb_id,
            mb_pw: user.mb_pw,
            mb_nick: user.mb_nick,
            mb_idx: user.idx,
            redirect: false,
          });
        })
        .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
    }
  };

  const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await axios
      .post("/api2/login", state.data)
      .then((res: any) => {
        const user = res.data.result;

        signIn("username-password", {
          mb_id: user.mb_id,
          mb_pw: user.mb_pw,
          mb_nick: user.mb_nick,
          mb_idx: user.idx,
          redirect: false,
        });
      })
      .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  };
  const onClickCertification = () => {
    router.push("/accounts/signup");
  };

  return (
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
            value={state.data.mb_id}
            onChange={onChangeAccounts}
            onKeyPress={onKeyPressEnter}
          />
          <TextField
            placeholder="비밀번호를 입력하세요"
            name="mb_pw"
            type="password"
            size="large"
            value={state.data.mb_pw}
            onChange={onChangeAccounts}
            onKeyPress={onKeyPressEnter}
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
            onClick={onClickLogin}
          >
            {accountsNavigation[0].content}
          </Button>
          <Button
            variants="light"
            size="large"
            onClick={onClickCertification}
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
          <form name="form" method="post" id="form_chk"></form>
        </>
      }
    />
  );
};

export default Accounts;
