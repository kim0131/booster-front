import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import TextField from "@components/elements/text-field";
import Button from "@components/elements/button";
import AccountsLayout from "@components/layouts/accounts-layout";
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

    await axios.post("/api2/login", state.data).then((res: any) => {
      const user = res.data.result;
      console.log(user);
      signIn("username-password", {
        mb_id: user.mb_id,
        mb_pw: user.mb_pw,
        mb_nick: user.mb_nick,
        mb_idx: user.idx,
        redirect: false,
      });
    });
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
  );
};

export default Accounts;
