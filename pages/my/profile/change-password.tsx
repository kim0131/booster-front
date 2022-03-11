import type { NextPage } from "next";
import styled from "@emotion/styled";
import Button from "@components/elements/button";
import BasicLayout from "@components/layouts/basic-layout";
import { Body1, Body2 } from "@components/elements/types";
import TextField from "@components/elements/text-field";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    ${props => props.theme.screen.md} {
      max-width: 22.5rem;
    }
  `,
};

const ChangePassword: NextPage = () => {
  return (
    <BasicLayout
      title="비밀번호 변경"
      description="새로운 비밀번호로 변경합니다."
      buttons={
        <>
          <Button size="large" variants="solid">
            완료
          </Button>
          <Button size="large">취소</Button>
        </>
      }
    >
      <Style.Container>
        <Body2>이전 비밀번호</Body2>
        <TextField type="password" placeholder="이전 비밀번호를 입력하세요." />
      </Style.Container>
      <Style.Container>
        <Body2>새 비밀번호</Body2>
        <TextField type="password" placeholder="새 비밀번호를 입력하세요." />
        <TextField
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요."
        />
      </Style.Container>
    </BasicLayout>
  );
};

export default ChangePassword;
