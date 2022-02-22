import { Body2 } from "@components/elements/types";
import { IconChevronDown } from "@components/icons";
import useDesktop from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

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
    `,
  },
};

interface IPropsLnb {
  lnbDatas: {
    id: number;
    category: string;
    menus: { id: number; content: string; param: string }[];
  }[];
  param: string | string[] | undefined;
}

// TODO : LNB는 URL 쿼리스트링으로 카테고리를 받아온다.

const Lnb = ({ lnbDatas, param }: IPropsLnb) => {
  const { isDesktop } = useDesktop();
  const router = useRouter();
  // console.log(param);
  const onClickRouter = (param: string) => {
    router.push(`/topics/?category=${param}`);
  };
  return isDesktop ? (
    <Style.Desktop.Container>
      {lnbDatas.map(lnbData => (
        <Style.Desktop.Category.Container key={lnbData.id}>
          <Body2 isBold>{lnbData.category}</Body2>
          <Style.Desktop.Category.Block>
            {lnbData.menus.map(menu => (
              <Style.Desktop.Category.Button
                key={menu.id}
                isRoute={menu.content === param}
                onClick={() => onClickRouter(menu.param)}
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
      <Style.Mobile.Selectbox defaultValue={param}>
        {lnbDatas.map(lnbData => (
          <optgroup key={lnbData.id} label={lnbData.category}>
            {lnbData.menus.map(menu => (
              <option
                key={menu.id}
                value={menu.param}
                onClick={() => onClickRouter(menu.param)}
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

export default Lnb;
