/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDesktop } from "@core/hook/use-desktop";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Button from "@components/elements/button";
import { Logotype, Symbol } from "@components/elements/logo";
import TextField from "@components/elements/text-field";
import {
  IconClose,
  IconMenu,
  IconProfile,
  IconSearch,
} from "@components/icons";
import {
  globalNavigation,
  globalNavigationMore,
  globalNavigationMy,
} from "@core/config/navigation";
import Dropdown from "@components/elements/dropdown";
import { accountsNavigation } from "@core/config/navigation";
import Portal from "./portal";

import useHistoryState from "@core/hook/use-history-state";
import useToast from "@core/hook/use-toast";
import checkAuth from "@core/util/check-auth";

interface IPropsStyle {
  isRoute?: boolean;
}

const Style = {
  Container: styled.header`
    position: sticky;
    width: 100%;
    top: 0;
    background-color: ${props => props.theme.color.white};
    box-shadow: ${props => props.theme.shadow.inset.bottom};
    display: flex;
    flex-direction: column;
    z-index: 10;
  `,
  Wrapper: styled.div`
    width: 100%;
    max-width: 72rem;
    margin: 0 auto;
    padding: 0.5rem 1.25rem;
    ${props => props.theme.screen.md} {
      padding: 0 3rem;
    }
    display: flex;
    align-items: center;
    gap: 3rem;
  `,
  MobileWrapper: styled.div`
    width: 100%;
    max-width: 72rem;
    margin: 0 auto;
    padding-right: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Nav: styled.nav`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  `,
  NavItem: styled.button<IPropsStyle>`
    height: 3rem;
    ${props => props.theme.screen.md} {
      height: 3.5rem;
    }
    padding: 0 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    outline: 0;
    &:hover,
    &:focus {
      outline: 0;
      box-shadow: ${props =>
        props.isRoute
          ? `inset 0px -4px 0px ${props.theme.color.blue[600]}`
          : `inset 0px -4px 0px ${props.theme.color.gray[300]}`};
    }
    box-shadow: ${props =>
      props.isRoute
        ? `inset 0px -4px 0px ${props.theme.color.blue[600]}`
        : "none"};
  `,
  NavMore: styled.div`
    height: 3.5rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    box-shadow: none;
    outline: 0;
    & > div {
      display: none;
    }
    &:hover,
    &:focus,
    &:active {
      outline: 0;
      & > div {
        display: block;
      }
    }
  `,
  ProfileWrapper: styled.div`
    height: 3.5rem;
    position: relative;
    display: flex;
    align-items: center;
    & > div {
      display: none;
    }
    &:hover {
      & > div {
        display: block;
      }
    }
  `,
  Util: styled.div`
    flex: 1 1 0%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
  `,
  MobileMenu: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      position: fixed;
      padding: 1.25rem;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background-color: ${props => props.theme.color.white};
    `,
    Header: styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    `,
    Button: styled.button``,
    Menu: styled.button`
      text-align: left;
      padding: 1.25rem 0;
      font-size: ${props => props.theme.fontSize.sub3};
      line-height: ${props => props.theme.lineHeight.sub3};
    `,
    Divider: styled.div`
      height: 1px;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
    `,
  },
  MobileSearch: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    `,
    Wrapper: styled.div`
      flex: none;
      padding: 1.5rem;
      background-color: ${props => props.theme.color.white};
      box-shadow: ${props => props.theme.shadow.inset.bottom};
    `,
    CloseBlock: styled.div`
      flex: 1 1 0%;
    `,
  },
};

const Header = () => {
  const { isDesktop } = useDesktop();
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();

  const [state, setState] = useState({
    mobileMenu: false,
    mobileSearch: false,
    desktopSearch: false,
    data: {
      searchTerm: "",
    },
  });

  const onClickLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | SVGElement>,
  ) => {
    e.preventDefault();
    const link: string | undefined = e.currentTarget.dataset.value;
    const content: string | null = e.currentTarget.textContent;
    if (link) {
      link === "logout" ? "" : router.push(link);
    }

    if (content) {
      content === "로그아웃"
        ? signOut({
            redirect: true,
            callbackUrl: "/",
          })
        : "";
    }
  };

  const oncClickPUshWrite = () => {
    if (status != "authenticated") {
      toast.setToast({ type: "danger", message: "로그인이 필요합니다." });
    } else {
      if (localStorage.getItem("category") == null) {
        router.push(`/topics/create`);
      } else {
        router.push(
          `/topics/create?category=${localStorage.getItem("category")}`,
        );
      }
    }
  };

  const onKeyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (status != "authenticated") {
        toast.setToast({ type: "danger", message: "로그인이 필요합니다." });
      } else {
        if (!state.data.searchTerm.trim())
          return toast.setToast({
            type: "danger",
            message: "검색어를 입력해주세요!",
          });
        router.push(`/search?searchTerm=${state.data.searchTerm}`);
        setState({
          ...state,
          mobileSearch: false,
          data: { ...state.data, searchTerm: "" },
        });
      }
    }
  };

  const onChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, data: { ...state.data, searchTerm: value } });
  };

  return (
    <Style.Container>
      <Style.Wrapper>
        <Logotype onClick={onClickLink} width="108px" height="24px" />
        {isDesktop && (
          <Style.Nav>
            {globalNavigation.map(nav => (
              <Style.NavItem
                key={nav.id}
                data-value={nav.url}
                isRoute={router.pathname.includes(nav.url)}
                onClick={onClickLink}
              >
                {nav.content}
              </Style.NavItem>
            ))}
            <Style.NavMore>
              더보기
              <Dropdown
                // isRight
                menu={globalNavigationMore}
                onClick={() => {}}
              />
            </Style.NavMore>
          </Style.Nav>
        )}
        <Style.Util>
          {isDesktop && (
            <TextField
              isRounded
              size="small"
              placeholder="검색"
              value={state.data.searchTerm}
              onChange={onChangeSearchTerm}
              width={state.desktopSearch ? "16rem" : "10rem"}
              onFocus={() => setState({ ...state, desktopSearch: true })}
              onBlur={() =>
                setState({
                  ...state,
                  desktopSearch: false,
                  data: { searchTerm: "" },
                })
              }
              prefix={<IconSearch />}
              onKeyPress={onKeyPressEnter}
            />
          )}
          <Button variants="solid" size="small" onClick={oncClickPUshWrite}>
            글쓰기
          </Button>
          {status == "authenticated" ? (
            // isDesktop && (
            <Style.ProfileWrapper>
              <Button variants="ghost" size="small">
                <IconProfile />
              </Button>
              <Dropdown menu={globalNavigationMy} onClick={onClickLink} />
            </Style.ProfileWrapper>
          ) : (
            // )
            <Button
              variants="ghost"
              size="small"
              onClick={onClickLink}
              dataValue={accountsNavigation[0].url}
            >
              {accountsNavigation[0].content}
            </Button>
          )}
          {!isDesktop && (
            <Button
              variants="ghost"
              size="small"
              onClick={() => setState({ ...state, mobileSearch: true })}
            >
              <IconSearch />
            </Button>
          )}
        </Style.Util>
      </Style.Wrapper>
      {!isDesktop && (
        <Style.MobileWrapper>
          <Style.Nav>
            {globalNavigation.map(nav => (
              <Style.NavItem
                key={nav.id}
                data-value={nav.url}
                isRoute={router.pathname.includes(nav.url)}
                onClick={onClickLink}
              >
                {nav.content}
              </Style.NavItem>
            ))}
          </Style.Nav>
          <Style.MobileMenu.Button
            onClick={() => setState({ ...state, mobileMenu: true })}
          >
            <IconMenu />
          </Style.MobileMenu.Button>
        </Style.MobileWrapper>
      )}
      {state.mobileMenu && !isDesktop && (
        <Portal type="modal">
          <Style.MobileMenu.Container>
            <Style.MobileMenu.Header>
              <Symbol width="30px" height="36px" />
              <Style.MobileMenu.Button></Style.MobileMenu.Button>
              <Button
                color="transparent"
                size="large"
                onClick={() => setState({ ...state, mobileMenu: false })}
              >
                <IconClose />
              </Button>
            </Style.MobileMenu.Header>
            {globalNavigationMore.map(nav => (
              <Style.MobileMenu.Menu key={nav.id}>
                {nav.content}
              </Style.MobileMenu.Menu>
            ))}
          </Style.MobileMenu.Container>
        </Portal>
      )}
      {state.mobileSearch && !isDesktop && (
        <Portal type="modal">
          <Style.MobileSearch.Container>
            <Style.MobileSearch.Wrapper>
              <TextField
                isRounded
                size="large"
                placeholder="검색"
                width="100%"
                prefix={<IconSearch />}
                value={state.data.searchTerm}
                onChange={onChangeSearchTerm}
                onKeyPress={onKeyPressEnter}
                suffix={
                  <Button
                    isRounded
                    size="small"
                    color="transparent"
                    onClick={e => {
                      e.stopPropagation();
                      setState({ ...state, mobileSearch: false });
                    }}
                  >
                    <IconClose />
                  </Button>
                }
              />
            </Style.MobileSearch.Wrapper>
            <Style.MobileSearch.CloseBlock
              onClick={() => setState({ ...state, mobileSearch: false })}
            />
          </Style.MobileSearch.Container>
        </Portal>
      )}
    </Style.Container>
  );
};

export default Header;
