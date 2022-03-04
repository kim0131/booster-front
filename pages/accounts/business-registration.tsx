/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import AccountsLayout from "@components/layouts/accounts-layout";
import { Body1, Body2, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import Button from "@components/elements/button";
import { IconAdd, IconDocuments } from "@components/icons";
import Callout from "@components/elements/callout";
import styled from "@emotion/styled";
import theme from "@components/styles/theme";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

// 이 페이지에 접근하려면 로그인 세션이 필요하다.

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

const BusinessRegistration: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const hiddenFileInput = React.useRef<any>(null);
  const [userIdx, setUserIdx] = useState({
    idx: "",
    mb_business_num: "",
  });
  const [loaded, setLoaded] = useState<any>(false);
  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: "",
  });

  if (status != "authenticated") {
    // router.push("/");
  }
  useEffect(() => {
    getUserIdx();
  }, [router]);

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
    console.log(image);
  };

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "",
    });
    setLoaded(false);
  };

  const onClickSubmitBusinessUrl = async () => {
    const formData = new FormData();
    if (image.image_file) {
      formData.append("file", image.image_file);
    }
    await axios.post(
      `/api2/business/upload/${userIdx.mb_business_num}`,
      formData,
    );
    alert("사업자 등록증이 접수되었습니다");
    router.push("/");
  };

  const getUserIdx = async () => {
    await axios
      .post(`/api2/find-idx`, {
        mb_id: session?.user?.email,
      })
      .then(res => {
        const result = res.data.result;
        setUserIdx(result);
      });
  };
  return (
    <AccountsLayout
      title={
        <>
          <Header4>{accountsDescription.businessRegistration.title}</Header4>
          <Body1>{accountsDescription.businessRegistration.description}</Body1>
        </>
      }
      section1={
        status == "authenticated" ? (
          <>
            {image.image_file ? (
              <>
                <Callout size="small" icon={<IconDocuments />}>
                  {image.image_file.name}
                  {/* 미리보기 예시 */}
                  <img src={image.preview_URL} alt="" />
                </Callout>
                <ButtonWrapper>
                  <Button
                    variants="light"
                    size="large"
                    color="primary"
                    onClick={onClickInput}
                  >
                    변경
                  </Button>
                  <Button variants="light" size="large" onClick={deleteImage}>
                    삭제
                  </Button>
                </ButtonWrapper>
              </>
            ) : (
              <Button variants="light" size="large" onClick={onClickInput}>
                <IconAdd />
                사업자등록증 첨부하기
              </Button>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              ref={hiddenFileInput}
              onChange={onLoadFile}
            />
          </>
        ) : (
          <Body1>로그인 상태에서 이용가능 합니다.</Body1>
        )
      }
      section2={
        status == "authenticated" ? (
          <Button
            variants="solid"
            size="large"
            color="primary"
            onClick={onClickSubmitBusinessUrl}
          >
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
  );
};

export default BusinessRegistration;
