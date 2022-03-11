import type { NextPage } from "next";
import styled from "@emotion/styled";
import Button from "@components/elements/button";
import BasicLayout from "@components/layouts/basic-layout";
import { Body1 } from "@components/elements/types";
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

const ChangeProfile: NextPage = () => {
  return (
    <BasicLayout
      title="내 정보 변경"
      description="내 정보를 변경합니다."
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
        <Body1 isBold>회원정보</Body1>
        <TextField label="닉네임" value="물리돌이" />
        <TextField label="이메일 주소" value="lsm@datahive.co.kr" />
      </Style.Container>
      <Style.Container>
        <Body1 isBold>연락처</Body1>
        <TextField label="이름" isDisabled value="임수민" />
        <TextField label="연락처" isDisabled value="010-9998-0967" />
        <Button>본인명의 인증</Button>
      </Style.Container>
    </BasicLayout>
  );
};

export default ChangeProfile;
