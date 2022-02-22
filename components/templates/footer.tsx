import { companyInfo } from "@core/config/company-info";
import { footerNavigation } from "@core/config/navigation";
import styled from "@emotion/styled";

const Style = {
  Container: styled.footer`
    width: 100%;
    background-color: ${props => props.theme.color.white};
    box-shadow: ${props => props.theme.shadow.inset.top};
  `,
  Wrapper: styled.div`
    width: 100%;
    max-width: 72rem;
    margin: 0 auto;
    padding: 1.5rem 1.25rem;
    ${props => props.theme.screen.md} {
      padding: 1.5rem 3rem;
    }
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  Nav: styled.nav`
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
  `,
  NavItem: styled.div`
    font-size: ${props => props.theme.fontSize.body2};
    line-height: ${props => props.theme.lineHeight.body2};
    font-weight: 500;
    color: ${props => props.theme.color.gray[500]};
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.color.gray[600]};
    }
  `,
  Info: styled.div`
    font-size: ${props => props.theme.fontSize.body3};
    line-height: ${props => props.theme.lineHeight.body3};
    color: ${props => props.theme.color.gray[500]};
  `,
};

const Footer = () => {
  return (
    <>
      <Style.Container>
        <Style.Wrapper>
          <Style.Nav>
            {footerNavigation.map(nav => (
              <Style.NavItem key={nav.id}>{nav.content}</Style.NavItem>
            ))}
          </Style.Nav>
          <Style.Info>
            {companyInfo.company_name}
            <br />
            사업자 등록번호 : {companyInfo.company_number} | 대표 :{" "}
            {companyInfo.company_ceo}
            <br />
            {companyInfo.company_address}
          </Style.Info>
        </Style.Wrapper>
      </Style.Container>
    </>
  );
};

export default Footer;
