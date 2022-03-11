/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import Selectbox from "@components/elements/selectbox";
import TextAreaTopicContent from "@components/elements/text-area-topic-content";
import TextField from "@components/elements/text-field";
import TopicCreateLayout from "@components/layouts/topic-create-layout";
import { CategorySelectfetcher } from "@core/swr/categoryfetcher";
import axios from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const CreateTopic: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState("");
  const { data: session, status } = useSession();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { data: categoryList } = useSWR(
    `/api2/category/select`,
    CategorySelectfetcher,
  );
  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: "",
  });
  const hiddenFileInput = React.useRef<any>(null);
  const [data, setData] = useState<any>({
    wr_subject: "",
    wr_content: "",
    wr_ip: "",
    mb_id: "",
    mb_name: "",
    board: "",
    wr_datetime: new Date(),
    wr_update: new Date(),
  });

  useEffect(() => {
    getUserIp();
  }, [session]);

  const getUserIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setData({ ...data, wr_ip: res.data.IPv4 });
  };

  const onChangeheight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height = `${e.target.scrollHeight}px`;

    setState(e.currentTarget.value);
    const { value, name } = e.currentTarget;
    setData({ ...data, [name]: value });
  };

  const onChangeSelcet = (e: any) => {
    const { value } = e.currentTarget;
    setData({ ...data, board: value });
    console.log(data);
  };

  const onChangeTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setData({
      ...data,
      [name]: value,
      mb_id: session?.user?.email,
      mb_name: session?.user?.name,
    });
  };
  const onLoadFile = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "",
    });
  };

  const onClickSubmitTopic = async () => {
    const formData = new FormData();
    if (image.image_file) {
      formData.append("file", image.image_file);
    }
    console.log(data);
    await axios
      .post("/api2/topic/write", {
        wr_subject: data.wr_subject,
        wr_content: data.wr_content,
        wr_ip: data.wr_ip,
        mb_id: data.mb_id,
        mb_name: data.mb_name,
        board: data.board,
        wr_datetime: data.wr_datetime,
        wr_update: data.wr_update,
      })
      .then(async res => {
        const id = res.data.result.idx;
        await axios.post(`/api2/topic/upload/${id}`, formData);
        alert("토픽이 등록되었습니다");
        router.push("/topics");
      });
  };

  const onClickInput = () => {
    hiddenFileInput.current.click();
  };
  return (
    <TopicCreateLayout
      header="글쓰기"
      category={
        categoryList && (
          <Selectbox
            options={categoryList}
            placeholder={"카테고리"}
            onChange={onChangeSelcet}
            value={data.board}
          />
        )
      }
      title={<TextField name={"wr_subject"} onChange={onChangeTopic} />}
      content={
        <TextAreaTopicContent
          name="wr_content"
          value={state}
          textAreaRef={textAreaRef}
          rows={20}
          onChange={onChangeheight}
          maxLength={2000}
          insertImage={onClickInput}
          thumbnail={image.preview_URL}
          delImage={deleteImage}
        />
      }
      buttons={
        <>
          <Button variants="solid" size="large" onClick={onClickSubmitTopic}>
            등록하기
          </Button>
          <input
            style={{ display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={onLoadFile}
          />
          <Button size="large">취소</Button>
        </>
      }
    />
  );
};

export default CreateTopic;
