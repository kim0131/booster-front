import { Body2 } from "@components/elements/types";
import { IconChevronDown } from "@components/icons";
import useDesktop from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface IPropsStyle {
  isActive?: boolean;
}

const Style = {
  Desktop: {
    Container: styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    `,
    Button: styled.button<IPropsStyle>`
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 3rem;
      color: ${props =>
        props.isActive
          ? props.theme.color.gray[900]
          : props.theme.color.gray[500]};
      background-color: ${props =>
        props.isActive ? props.theme.color.gray[100] : "transparent"};
      border-color: ${props =>
        props.isActive ? props.theme.color.gray[100] : "transparent"};
      font-size: ${props => props.theme.fontSize.body1};
      line-height: ${props => props.theme.lineHeight.body1};
      font-weight: 500;
      padding-left: 13px;
      padding-right: 13px;
      border-radius: ${props => props.theme.rounded.md};
      gap: 8px;
      &:hover,
      &:focus {
        color: ${props => props.theme.color.gray[600]};
        background-color: ${props => props.theme.color.gray[50]};
        border-color: ${props => props.theme.color.gray[50]};
        outline: 0;
      }
      &:disabled {
        opacity: 0.25;
        pointer-events: none;
      }
      & > svg {
        width: 20px;
        height: 20px;
      }
      & > svg > path {
        fill: ${props => props.theme.color.gray[500]};
      }
    `,
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

interface IPropsLnb {
  lnbDatas: {
    id: number;
    content: string;
    param: string;
  }[];
  param: string | string[] | undefined;
}

// TODO : LNB는 URL 쿼리스트링으로 카테고리를 받아온다.

const Lnb = ({ lnbDatas, param }: IPropsLnb) => {
  const { isDesktop } = useDesktop();
  const router = useRouter();

  const onClickRouter = (param: string) => {
    router.push(`/topics/?category=${param}`);
  };
  return isDesktop ? (
    <Style.Desktop.Container>
      {lnbDatas.map(lnbData => (
        <Style.Desktop.Button
          key={lnbData.id}
          onClick={() => {}}
          isActive={lnbData.content === param}
        >
          {lnbData.content}
        </Style.Desktop.Button>
      ))}
    </Style.Desktop.Container>
  ) : (
    <Style.Mobile.Wrapper>
      <Style.Mobile.Selectbox defaultValue={param}>
        {lnbDatas.map(lnbData => (
          <option key={lnbData.id} value={lnbData.param} onClick={() => {}}>
            {lnbData.content}
          </option>
        ))}
      </Style.Mobile.Selectbox>
      <Style.Mobile.Icon>
        <IconChevronDown />
      </Style.Mobile.Icon>
    </Style.Mobile.Wrapper>
  );
};

export default Lnb;
