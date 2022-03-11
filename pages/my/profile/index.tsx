import Button from "@components/elements/button";
import Callout from "@components/elements/callout";
import { Header4 } from "@components/elements/types";
import { IconDocuments, IconInfo, IconProfile } from "@components/icons";
import ProfileCardLayout from "@components/layouts/profile-card-layout";
import ProfileLayout from "@components/layouts/profile-layout";
import type { NextPage } from "next";

const profileDatas = [
  {
    id: 0,
    title: "아이디",
    content: "test123",
  },
  {
    id: 1,
    title: "이메일",
    content: "sdadas@dsadas.com",
  },
  {
    id: 2,
    title: "이름",
    content: "홍길동",
  },
  {
    id: 3,
    title: "연락처",
    content: "010-0000-0000",
  },
];

const companyDatas = [
  {
    id: 0,
    title: "사업자등록번호",
    content: "111-11-11111",
  },
  {
    id: 1,
    title: "법인등록번호",
    content: "111111-1111111",
  },
  {
    id: 2,
    title: "업종",
    content: "도매업",
  },
  {
    id: 3,
    title: "업태",
    content: "소프트웨어 개발 및 공급",
  },
  {
    id: 4,
    title: "주소",
    content: "서울 마포구 114-2 승지빌딩 2층",
  },
];

const Profile: NextPage = () => {
  return (
    <ProfileLayout
      buttons={
        <>
          <Button size="large">로그아웃</Button>
          <Button size="large">회원 탈퇴</Button>
        </>
      }
    >
      <Callout
        size="large"
        color="danger"
        title="회사 정보 승인이 반려되었습니다."
        button={
          <Button variants="solid" color="primary">
            다시 인증하기
          </Button>
        }
        icon={<IconInfo />}
      >
        회사 업데이트 신청이 접수되면, 관리자가 확인 후 승인할 예정이며 최대
        24시간 이내로 결과 이메일을 드릴 예정입니다. (영업일 기준)
      </Callout>

      <ProfileCardLayout
        title={
          <>
            <IconProfile />
            <Header4>홍길동</Header4>
          </>
        }
        buttons={
          <>
            <Button>내 정보 변경</Button>
            <Button>비밀번호 변경</Button>
          </>
        }
        datas={profileDatas}
      />
      <ProfileCardLayout
        title={
          <>
            <IconDocuments />
            <Header4>주식회사 맘스터치</Header4>
          </>
        }
        buttons={<Button>회사 업데이트</Button>}
        datas={companyDatas}
      />
    </ProfileLayout>
  );
};

export default Profile;
