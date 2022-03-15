/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import Logo from "@components/elements/logo";
import TextField from "@components/elements/text-field";
import { IconMenu, IconProfile, IconSearch } from "@components/icons";
import {
  globalNavigation,
  globalNavigationMore,
  globalNavigationMy,
} from "@core/config/navigation";
import useDesktop from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Dropdown from "@components/elements/dropdown";
import { accountsNavigation } from "@core/config/navigation";

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
};

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isDesktop } = useDesktop();

  useEffect(() => {
    console.log(session);
    if (status == "unauthenticated" && router.route != "/accounts") {
      router.push("/accounts");
    }
  }, [router, status]);

  const onClickLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | SVGElement>,
  ) => {
    e.preventDefault();
    const link: string | undefined = e.currentTarget.dataset.value;
    const content: string | null = e.currentTarget.textContent;
    if (link) {
      link === "logout" ? console.log("logout") : router.push(link);
    }

    if (content) {
      content === "로그아웃"
        ? signOut({
            redirect: false,
          })
        : "";
    }
  };

  const oncClickPUshWrite = () => {
    router.push("/create");
  };

  return (
    <Style.Container>
      <Style.Wrapper>
        <Logo onClick={onClickLink} />
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
              <Dropdown menu={globalNavigationMore} onClick={() => {}} />
            </Style.NavMore>
          </Style.Nav>
        )}
        <Style.Util>
          {isDesktop && (
            <TextField
              isRounded
              size="small"
              placeholder="검색"
              prefix={<IconSearch />}
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
              <Dropdown
                menu={globalNavigationMy}
                isRight
                onClick={onClickLink}
              />
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
            <Button variants="ghost" size="small">
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
          <IconMenu />
        </Style.MobileWrapper>
      )}
    </Style.Container>
  );
};

export default Header;
