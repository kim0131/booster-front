import Button from "@components/elements/button";
import Logo from "@components/elements/logo";
import TextField from "@components/elements/text-field";
import { IconMenu, IconSearch } from "@components/icons";
import { globalNavigationConfig } from "@core/config/navigation";
import useDesktop from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface IPropsNavItem {
  isRoute: boolean;
}

const Container = styled.header`
  position: sticky;
  width: 100%;
  top: 0;
  background-color: ${props => props.theme.color.white};
  box-shadow: inset 0px -1px 0px ${props => props.theme.color.gray[300]};
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0.5rem 0.75rem;
  ${props => props.theme.screen.md} {
    padding: 0 3rem;
  }
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const MobileWrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const NavItem = styled.div<IPropsNavItem>`
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
  &:hover {
    box-shadow: ${props =>
      props.isRoute
        ? `inset 0px -4px 0px ${props.theme.color.blue[600]}`
        : `inset 0px -4px 0px ${props.theme.color.gray[300]}`};
  }
  box-shadow: ${props =>
    props.isRoute
      ? `inset 0px -4px 0px ${props.theme.color.blue[600]}`
      : "none"};
`;

const Util = styled.div`
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isDesktop = useDesktop();

  const onClickLink = (e: React.MouseEvent<HTMLDivElement | SVGElement>) => {
    e.preventDefault();
    const link: string | undefined = e.currentTarget.dataset.value;
    link && router.push(link);
  };

  return (
    <Container>
      <Wrapper>
        <Logo onClick={onClickLink} />
        {isDesktop && (
          <Nav>
            {globalNavigationConfig.map(nav => (
              <NavItem
                key={nav.id}
                data-value={nav.url}
                isRoute={router.pathname === nav.url}
                onClick={onClickLink}
              >
                {nav.content}
              </NavItem>
            ))}
            {/* <NavItem>더보기</NavItem> */}
          </Nav>
        )}
        <Util>
          {isDesktop && (
            <TextField
              isRounded
              size="small"
              placeholder="검색"
              prefix={<IconSearch />}
            />
          )}
          <Button variants="solid" size="small">
            글쓰기
          </Button>
          <Button variants="ghost" size="small">
            로그인
          </Button>
          {!isDesktop && (
            <Button variants="ghost" size="small">
              <IconSearch />
            </Button>
          )}
        </Util>
      </Wrapper>
      {!isDesktop && (
        <MobileWrapper>
          <Nav>
            {globalNavigationConfig.map(nav => (
              <NavItem
                key={nav.id}
                data-value={nav.url}
                isRoute={router.pathname === nav.url}
                onClick={onClickLink}
              >
                {nav.content}
              </NavItem>
            ))}
          </Nav>
          <IconMenu />
        </MobileWrapper>
      )}
    </Container>
  );
};

export default Header;
