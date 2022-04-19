/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import Selectbox from "@components/elements/selectbox";
import TextAreaTopicContent from "@components/elements/text-area-topic-content";
import TextField from "@components/elements/text-field";
import TopicCreateLayout from "@components/layouts/topic-create-layout";
import useCategorySelect from "@core/hook/use-category-seclect";
import axios from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const CreateTopic: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState("");
  const { data: session, status } = useSession();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { categorySelect } = useCategorySelect("topic");

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
  });

  useEffect(() => {
    getUserIp();
  }, [session]);

  const getUserIp = async () => {
    const res = await axios.get("/json/");
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

    formData.append("file", image.image_file);

    if (!data.board) return alert("카테고리를 선택해주세요");
    if (!data.wr_subject) return alert("제목을 작성해주세요");
    if (!data.wr_content) return alert("내용을 작성해주세요");

    await axios
      .post("/api2/topic/write", {
        wr_subject: data.wr_subject,
        wr_content: data.wr_content,
        wr_ip: data.wr_ip,
        mb_id: data.mb_id,
        mb_name: data.mb_name,
        board: data.board,
      })
      .then(async res => {
        const id = res.data.result.idx;
        if (image.image_file) {
          formData.append("idx", id);
          await axios.post(`/api2/upload/topic`, formData);
        }

        alert("토픽이 등록되었습니다");
        router.push("/topics");
      })
      .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  };

  const onClickInput = () => {
    hiddenFileInput.current.click();
  };
  return (
    <TopicCreateLayout
      header="글쓰기"
      category={
        categorySelect && (
          <Selectbox
            key="create"
            options={categorySelect}
            placeholder={"카테고리"}
            onChange={onChangeSelcet}
            value={data.board ? data.board : ""}
          />
        )
      }
      title={
        <TextField
          name={"wr_subject"}
          onChange={onChangeTopic}
          placeholder="제목"
        />
      }
      content={
        <TextAreaTopicContent
          name="wr_content"
          placeholder="내용을 입력하세요."
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
