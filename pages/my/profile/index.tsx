import Button from "@components/elements/button";
import Callout from "@components/elements/callout";
import { Header4 } from "@components/elements/types";
import { IconDocuments, IconInfo, IconProfile } from "@components/icons";
import ProfileCardLayout from "@components/layouts/profile-card-layout";
import ProfileLayout from "@components/layouts/profile-layout";
import useGetUser from "@core/hook/use-user";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Profile: NextPage = () => {
  const { data: session, status }: any = useSession();
  const { userInfo } = useGetUser(session?.user?.idx);
  const router = useRouter();

  const getUserCertify = (value: string | number) => {
    let result = value.toString().slice(0, 1);
    let result2 = value.toString();

    switch (result) {
      case "0":
        return (
          <Callout
            size="large"
            color="danger"
            title="회사 정보 승인을 신청해주세요."
            button={
              <Button
                variants="solid"
                color="primary"
                onClick={() => router.push("/accounts/business-registration")}
              >
                인증하기
              </Button>
            }
            icon={<IconInfo />}
          >
            회사 업데이트 신청이 접수되면, 관리자가 확인 후 승인할 예정이며 최대
            24시간 이내로 결과 이메일을 드릴 예정입니다. (영업일 기준)
          </Callout>
        );
      case "1":
        return (
          <Callout
            size="large"
            color="danger"
            title="회사 정보 승인이 심사중입니다."
            icon={<IconInfo />}
          >
            회사 업데이트 신청이 접수되면, 관리자가 확인 후 승인할 예정이며 최대
            24시간 이내로 결과 이메일을 드릴 예정입니다. (영업일 기준)
          </Callout>
        );
      case "2":
        return (
          <Callout
            size="large"
            color="danger"
            title="회사 정보 승인이 거절되었습니다."
            button={
              <Button
                variants="solid"
                color="primary"
                onClick={() => router.push("/accounts/business-registration")}
              >
                다시 인증하기
              </Button>
            }
            icon={<IconInfo />}
          >
            거절 사유 : {getBusinessRefuse(result2)}
          </Callout>
        );
      case "3":
        return (
          <Callout
            size="large"
            // color="danger"
            title="회사 정보 등록이 승인되었습니다."
            icon={<IconInfo />}
          ></Callout>
        );
      default:
        return (
          <Callout
            size="large"
            color="danger"
            title="에러!!"
            icon={<IconInfo />}
          >
            고객센터에 문의해주세요.
          </Callout>
        );
    }
  };

  const getBusinessRefuse = (value: string | number) => {
    let result = value.toString();

    switch (result) {
      case "21":
        return "사진의 화질이 안좋음";
      case "22":
        return "육안으로 내용 확인 불가";
      case "23":
        return "기타사유1";
      case "24":
        return "기타사유2";
      case "25":
        return "기타사유3";
      case "26":
        return "기타사유4";
      default:
        return "미승인";
    }
  };
  return (
    <>
      {userInfo && (
        <ProfileLayout
          buttons={
            <>
              <Button
                size="large"
                onClick={() => {
                  signOut();
                }}
              >
                로그아웃
              </Button>
              <Button
                size="large"
                onClick={() => router.push("/my/profile/archive")}
              >
                회원 탈퇴
              </Button>
            </>
          }
        >
          {getUserCertify(userInfo.member.mb_business_certify)}

          <ProfileCardLayout
            title={
              <>
                <IconProfile />
                <Header4>{userInfo.member.mb_nick}</Header4>
              </>
            }
            buttons={
              <>
                <Button
                  onClick={() => router.push("/my/profile/change-profile")}
                >
                  내 정보 변경
                </Button>
                <Button
                  onClick={() => router.push("/my/profile/change-password")}
                >
                  비밀번호 변경
                </Button>
              </>
            }
            datas={[
              {
                id: 0,
                title: "아이디",
                content: userInfo.member.mb_id,
              },
              {
                id: 1,
                title: "이메일",
                content: userInfo.member.mb_email,
              },
              {
                id: 2,
                title: "이름",
                content: userInfo.member.mb_name,
              },
              {
                id: 3,
                title: "연락처",
                content: userInfo.member.mb_ph,
              },
            ]}
          />
          {userInfo.business && (
            <ProfileCardLayout
              title={
                <>
                  <IconDocuments />
                  <Header4>{userInfo.business.business_company}</Header4>
                </>
              }
              buttons={
                <Button
                  onClick={() => router.push("/my/profile/update-company")}
                >
                  회사 업데이트
                </Button>
              }
              datas={[
                {
                  id: 0,
                  title: "사업자등록번호",
                  content: userInfo.business.business_number,
                },
                {
                  id: 1,
                  title: "법인등록번호",
                  content: userInfo.business.business_number2,
                },
                {
                  id: 2,
                  title: "업종",
                  content: userInfo.business.business_sector,
                },
                {
                  id: 3,
                  title: "업태",
                  content: userInfo.business.business_status,
                },
                {
                  id: 4,
                  title: "주소",
                  content: userInfo.business.business_address2,
                },
              ]}
            />
          )}
        </ProfileLayout>
      )}
    </>
  );
};

export default Profile;
