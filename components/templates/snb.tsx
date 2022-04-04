import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ISnbData } from "@core/interfaces/snb";
import styled from "@emotion/styled";
import { Body2 } from "@components/elements/types";
import { IconChevronDown } from "@components/icons";
import { useCategorySubSide } from "@core/hook/use-category-subSIde";
import { useDesktop } from "@core/hook/use-desktop";

interface IPropsStyle {
  isRoute?: boolean;
}

const Style = {
  Desktop: {
    Container: styled.div`
      flex: none;
      width: 12rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    `,
    Category: {
      Container: styled.div`
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      `,
      Block: styled.div`
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      `,
      Button: styled.button<IPropsStyle>`
        padding: 0.5rem;
        border-radius: ${props => props.theme.rounded.md};
        background-color: ${props =>
          props.isRoute ? props.theme.color.blue[50] : "transparent"};
        color: ${props =>
          props.isRoute
            ? props.theme.color.blue[600]
            : props.theme.color.gray[900]};
        font-size: ${props => props.theme.fontSize.body2};
        font-weight: ${props => (props.isRoute ? 500 : 400)};
        line-height: ${props => props.theme.lineHeight.body2};
        text-align: left;
        &:hover,
        &:focus {
          outline: 0;
          background-color: ${props =>
            props.isRoute
              ? props.theme.color.blue[50]
              : props.theme.color.gray[100]};
        }
      `,
    },
  },
  Mobile: {
    Wrapper: styled.div`
      position: relative;
      width: 100%;
      height: 3.5rem;
      background-color: ${props => props.theme.color.white};
    `,
    Selectbox: styled.select`
      appearance: none;
      width: 100%;
      height: 3.5rem;
      padding: 0 1.25rem;
      background-color: ${props => props.theme.color.white};
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
      color: ${props => props.theme.color.gray[900]};
      outline: 0;
      &:focus,
      &:active {
        outline: 0;
      }
    `,
    Icon: styled.div`
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      width: 1.5rem;
      height: 1.5rem;
      pointer-events: none;
    `,
  },
};

interface IPropsSnb {
  snbDatas: ISnbData[];
  category?: string | string[] | undefined;
}

const Snb = ({ snbDatas, category }: IPropsSnb) => {
  const { isDesktop } = useDesktop();
  const router = useRouter();
  const onClickRouter = (param: string) => {
    router.push(`/topics/?category=${param}`);
  };

  return isDesktop ? (
    <Style.Desktop.Container>
      {snbDatas.map((snbData: ISnbData) => (
        <Style.Desktop.Category.Container key={snbData.id}>
          <Body2 isBold>{snbData.category}</Body2>
          <Style.Desktop.Category.Block>
            {snbData.menus &&
              snbData.menus.map((menu: any) => (
                <Style.Desktop.Category.Button
                  key={menu.id}
                  isRoute={menu.content === category}
                  onClick={() => onClickRouter(menu.content)}
                >
                  {menu.content}
                </Style.Desktop.Category.Button>
              ))}
          </Style.Desktop.Category.Block>
        </Style.Desktop.Category.Container>
      ))}
    </Style.Desktop.Container>
  ) : (
    <Style.Mobile.Wrapper>
      <Style.Mobile.Selectbox defaultValue={category}>
        {snbDatas.map((snbData: any) => (
          <optgroup key={snbData.id} label={snbData.category}>
            {snbData.menus &&
              snbData.menus.map((menu: any) => (
                <option
                  key={menu.id}
                  value={menu.param}
                  onClick={() => onClickRouter(menu.content)}
                >
                  {menu.content}
                </option>
              ))}
          </optgroup>
        ))}
      </Style.Mobile.Selectbox>
      <Style.Mobile.Icon>
        <IconChevronDown />
      </Style.Mobile.Icon>
    </Style.Mobile.Wrapper>
  );
};

export default Snb;
