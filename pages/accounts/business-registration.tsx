import type { NextPage } from "next";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import AccountsLayout from "@components/layouts/accounts/accounts-layout";
import { Body1, Body2, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import Button from "@components/elements/button";
import { IconAdd, IconDocuments } from "@components/icons";
import Callout from "@components/elements/callout";
import styled from "@emotion/styled";
import theme from "@components/styles/theme";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

// 이 페이지에 접근하려면 로그인 세션이 필요하다.

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

const BusinessRegistration: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status != "authenticated") {
    // router.push("/");
  }

  return (
    <>
      <Header />
      <AccountsLayout
        title={
          <>
            <Header4>{accountsDescription.businessRegistration.title}</Header4>
            <Body1>
              {accountsDescription.businessRegistration.description}
            </Body1>
          </>
        }
        section1={
          status == "authenticated" ? (
            <>
              <Button variants="light" size="large">
                <IconAdd />
                사업자등록증 첨부하기
              </Button>
              <Callout size="small" icon={<IconDocuments />}>
                사업자등록증_회사명.pdf
              </Callout>
              <ButtonWrapper>
                <Button variants="light" size="large" color="primary">
                  변경
                </Button>
                <Button variants="light" size="large">
                  삭제
                </Button>
              </ButtonWrapper>
            </>
          ) : (
            <Body1>로그인 상태에서 이용가능 합니다.</Body1>
          )
        }
        section2={
          status == "authenticated" ? (
            <Button variants="solid" size="large" color="primary">
              완료
            </Button>
          ) : (
            <Button
              variants="solid"
              size="large"
              color="primary"
              onClick={() => {
                signIn();
              }}
            >
              로그인
            </Button>
          )
        }
        find={
          <Body2 isLink color={theme.color.gray[500]}>
            나중에 하기
          </Body2>
        }
      />
      <Footer />
    </>
  );
};

export default BusinessRegistration;
