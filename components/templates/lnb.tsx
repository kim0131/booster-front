/* eslint-disable react-hooks/exhaustive-deps */
import { IconChevronDown } from "@components/icons";
import { useCategorySubSide } from "@core/hook/use-category-sub-side";
import { useDesktop } from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

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
    Button: styled.div<IPropsStyle>`
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
  param: string | string[] | undefined;
  onClick?: any;
}

const Lnb = ({ param, onClick }: IPropsLnb) => {
  const { isDesktop } = useDesktop();
  const { categorySubSide } = useCategorySubSide("insight");
  const [lnbData, setLnbData] = useState<any>();

  useEffect(() => {
    if (categorySubSide) {
      setLnbData(categorySubSide[0]);
    }
  }, [categorySubSide]);

  return (
    <>
      {lnbData && isDesktop ? (
        <Style.Desktop.Container>
          <Style.Desktop.Button
            key={"all"}
            onClick={() => {
              onClick("all");
            }}
            isActive={param === "all"}
          >
            {"전체"}
          </Style.Desktop.Button>
          {lnbData &&
            lnbData.menus.map((lnbData: any) => (
              <Style.Desktop.Button
                key={lnbData.id}
                onClick={() => {
                  onClick(lnbData.param);
                }}
                isActive={lnbData.param === param}
              >
                {lnbData.content}
              </Style.Desktop.Button>
            ))}
        </Style.Desktop.Container>
      ) : (
        <Style.Mobile.Wrapper>
          <Style.Mobile.Selectbox defaultValue={param}>
            <option
              key={"all"}
              onClick={() => {
                onClick("all");
              }}
            >
              {"전체"}
            </option>
            {lnbData &&
              lnbData.menus.map((lnbData: any) => (
                <option
                  key={lnbData.id}
                  value={lnbData.param}
                  onClick={() => {
                    onClick(lnbData.content);
                  }}
                >
                  {lnbData.content}
                </option>
              ))}
          </Style.Mobile.Selectbox>
          <Style.Mobile.Icon>
            <IconChevronDown />
          </Style.Mobile.Icon>
        </Style.Mobile.Wrapper>
      )}
    </>
  );
};

export default Lnb;
