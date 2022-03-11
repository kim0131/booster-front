import type { NextPage } from "next";
import styled from "@emotion/styled";
import Button from "@components/elements/button";
import BasicLayout from "@components/layouts/basic-layout";
import { Body2 } from "@components/elements/types";
import TextField from "@components/elements/text-field";
import Callout from "@components/elements/callout";
import { IconAdd, IconDocuments, IconInfo } from "@components/icons";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    ${props => props.theme.screen.md} {
      max-width: 22.5rem;
    }
  `,
  Button: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  `,
};

const UpdateCompany: NextPage = () => {
  return (
    <BasicLayout
      title="회사 업데이트"
      description="회사 정보를 업데이트합니다."
      buttons={
        <>
          <Button size="large" variants="solid">
            업데이트
          </Button>
          <Button size="large">취소</Button>
        </>
      }
    >
      <Callout
        icon={<IconInfo />}
        title="회사를 업데이트하는 데 시간이 소요될 수 있습니다."
      >
        회사 업데이트 신청이 접수되면, 관리자가 확인 후 승인할 예정이며 최대
        24시간 이내로 결과 이메일을 드릴 예정입니다. (영업일 기준)
      </Callout>
      <Style.Container>
        <Callout size="small" color="primary" icon={<IconDocuments />}>
          사업자등록증_회사명.pdf
        </Callout>
        <Style.Button>
          <Button>
            <IconAdd />
            사업자등록증 첨부
          </Button>
          <Button>변경</Button>
          <Button>삭제</Button>
        </Style.Button>
      </Style.Container>
    </BasicLayout>
  );
};

export default UpdateCompany;
