import type { NextPage } from "next";
import styled from "@emotion/styled";
import Button from "@components/elements/button";
import BasicLayout from "@components/layouts/basic-layout";
import Callout from "@components/elements/callout";
import { IconAdd, IconDocuments, IconInfo } from "@components/icons";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useGetUser from "@core/hook/use-user";

interface IPhoto {
  photo?: string;
}

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
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const { userInfo } = useGetUser(session?.user?.idx);
  const hiddenFileInput = React.useRef<any>(null);

  const [loaded, setLoaded] = useState<any>(false);
  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: "",
  });

  if (status != "authenticated") {
    // router.push("/");
  }

  const onClickInput = () => {
    hiddenFileInput.current.click();
  };

  const onLoadFile = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      setLoaded("loading");
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
      setLoaded(true);
    };
  };

  const deleteImage = () => {
    hiddenFileInput.current.value = "";
    setImage({
      image_file: "",
      preview_URL: "",
    });
    setLoaded(false);
  };

  const onClickSubmitBusinessUrl = async () => {
    const formData = new FormData();

    formData.append("file", image.image_file);
    formData.append("idx", `${userInfo.member.mb_business_num}`);
    await axios.post(`/api2/user/update/${userInfo.member.idx}`, {
      mb_business_certify: 4,
    });
    await axios.post(`/api2/upload/business`, formData);
    alert("업데이트 신청이 접수되었습니다");
    router.push("/my/profile");
  };

  return (
    <>
      {userInfo && (
        <BasicLayout
          title="회사 업데이트"
          description="회사 정보를 업데이트합니다."
          buttons={
            <>
              <Button
                size="large"
                variants="solid"
                onClick={onClickSubmitBusinessUrl}
              >
                업데이트
              </Button>
              <Button size="large" onClick={() => router.back()}>
                취소
              </Button>
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
            {image.image_file ? (
              <>
                <Callout size="small" color="primary" icon={<IconDocuments />}>
                  {image.image_file.name}
                </Callout>
                <Style.Button>
                  <Button onClick={onClickInput}>변경</Button>
                  <Button onClick={deleteImage}>삭제</Button>
                </Style.Button>
              </>
            ) : (
              <Style.Button>
                <Button onClick={onClickInput}>
                  <IconAdd />
                  사업자등록증 첨부
                </Button>
              </Style.Button>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              ref={hiddenFileInput}
              onChange={onLoadFile}
            />
          </Style.Container>
        </BasicLayout>
      )}
    </>
  );
};

export default UpdateCompany;
