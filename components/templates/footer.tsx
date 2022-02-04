import { companyInfo } from "@core/config/company-info";
import styled from "@emotion/styled";
import Link from "next/link";

const Container = styled.footer`
  width: 100%;
  background-color: ${props => props.theme.color.white};
  box-shadow: inset 0px 1px 0px ${props => props.theme.color.gray[300]};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem;
  ${props => props.theme.screen.md} {
    padding: 1.5rem 3rem;
  }
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  ${props => props.theme.screen.md} {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }
`;

const NavItem = styled.div`
  font-size: ${props => props.theme.fontSize.body2};
  line-height: ${props => props.theme.lineHeight.body2};
  font-weight: 500;
  color: ${props => props.theme.color.gray[500]};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.color.gray[600]};
  }
`;

const Info = styled.div`
  font-size: ${props => props.theme.fontSize.body3};
  line-height: ${props => props.theme.lineHeight.body3};
  color: ${props => props.theme.color.gray[500]};
`;

const Footer = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Nav>
            <NavItem>커뮤니티소개</NavItem>
            <NavItem>이용약관</NavItem>
            <NavItem>개인정보처리방침</NavItem>
            <NavItem>도움센터</NavItem>
            <NavItem>채용</NavItem>
          </Nav>
          <Info>
            {companyInfo.company_name}
            <br />
            사업자 등록번호 : {companyInfo.company_number} | 대표 :{" "}
            {companyInfo.company_ceo}
            <br />
            {companyInfo.company_address}
          </Info>
        </Wrapper>
      </Container>
    </>
  );
};

export default Footer;
