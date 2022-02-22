import styled from "@emotion/styled";

const Style = {
  Container: styled.div`
    width: 100%;
    padding: 3rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    ${props => props.theme.screen.md} {
      max-width: 27rem;
      margin: 3rem auto;
      padding: 2.25rem;
      border: 1px solid ${props => props.theme.color.gray[300]};
      border-radius: ${props => props.theme.rounded.xxl};
    }
  `,
  Block: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,
  Find: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  `,
};

interface IPropsAccountsLayout {
  title?: React.ReactNode;
  section1?: React.ReactNode;
  section2?: React.ReactNode;
  section3?: React.ReactNode;
  find?: React.ReactNode;
}

const AccountsLayout = ({
  title,
  section1,
  section2,
  section3,
  find,
}: IPropsAccountsLayout) => {
  return (
    <Style.Container>
      {title && <Style.Block>{title}</Style.Block>}
      {section1 && <Style.Block>{section1}</Style.Block>}
      {section2 && <Style.Block>{section2}</Style.Block>}
      {section3 && <Style.Block>{section3}</Style.Block>}
      {find && <Style.Find>{find}</Style.Find>}
    </Style.Container>
  );
};

export default AccountsLayout;
