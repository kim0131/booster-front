/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import Selectbox from "@components/elements/selectbox";
import TextAreaTopicContent from "@components/elements/text-area-topic-content";
import TextField from "@components/elements/text-field";
import TopicCreateLayout from "@components/layouts/topic-create-layout";
import { topicImageUrl } from "@core/config/imgurl";
import useCategorySelect from "@core/hook/use-category-seclect";
import { useTopicDetail } from "@core/hook/use-topic-detail";
import axios from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const EditTopic: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { data: session, status } = useSession();
  let { id } = router.query;
  const [topicId, setTopicId] = useState(id);
  const { topicDetail } = useTopicDetail(topicId);
  const [data, setData] = useState<any>({
    wr_subject: "",
    wr_content: "",
    wr_ip: "",
    mb_id: "",
    mb_name: "",
    board: topicDetail ? topicDetail.board : 0,
    wr_update: new Date(),
  });
  const { categorySelect } = useCategorySelect("topic");

  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: "",
  });

  useEffect(() => {
    setTopicId(id);
    getTopiceContent();
  }, [topicDetail, id]);

  const getTopiceContent = async () => {
    if (topicDetail) {
      const TopicContent = topicDetail;
      TopicContent.category = router.query.category;
      TopicContent.bookmark = false; //추후필요

      setData({
        ...data,
        wr_subject: TopicContent.wr_subject,
        wr_content: TopicContent.wr_content,
        board: TopicContent.board,
        file_url: TopicContent.file_url,
      });
      setImage({
        image_file: TopicContent.file_url,
        preview_URL: TopicContent.file_full_url,
      });
    }
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

  const hiddenFileInput = React.useRef<any>(null);

  const onClickInput = () => {
    hiddenFileInput.current.click();
  };

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "",
    });
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

  const onClickSubmitTopic = async () => {
    const formData = new FormData();

    formData.append("file", image.image_file);
    formData.append("exist_url", data.file_url);
    if (!data.board) return alert("카테고리를 선택해주세요");
    if (!data.wr_subject) return alert("제목을 작성해주세요");
    if (!data.wr_content) return alert("내용을 작성해주세요");
    await axios
      .post(`/api2/topic/update/${id}`, {
        wr_subject: data.wr_subject,
        wr_content: data.wr_content,
        board: data.board,
      })
      .then(async res => {
        if (image.image_file != data.file_url) {
          formData.append("idx", `${id}`);
          await axios.post(`/api2/upload/topic`, formData);
        }
        alert("토픽이 수정되었습니다");
        router.push(`/topics`);
      })
      .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  };

  return (
    <TopicCreateLayout
      header="수정하기"
      category={
        categorySelect && (
          <Selectbox
            options={categorySelect}
            placeholder={"카테고리"}
            onChange={onChangeSelcet}
            value={data.board}
          />
        )
      }
      title={
        <TextField
          name={"wr_subject"}
          onChange={onChangeTopic}
          value={data.wr_subject}
        />
      }
      content={
        <TextAreaTopicContent
          name="wr_content"
          value={data.wr_content}
          textAreaRef={textAreaRef}
          rows={20}
          onChange={onChangeheight}
          maxLength={2000}
          insertImage={onClickInput}
          thumbnail={
            image.preview_URL != topicImageUrl ? image.preview_URL : ""
          }
          delImage={deleteImage}
        />
      }
      buttons={
        <>
          <Button variants="solid" size="large" onClick={onClickSubmitTopic}>
            수정하기
          </Button>
          <Button size="large">취소</Button>
          <input
            style={{ display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={onLoadFile}
          />
        </>
      }
    />
  );
};

export default EditTopic;
