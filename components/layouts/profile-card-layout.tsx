import styled from "@emotion/styled";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
    border: 1px solid ${props => props.theme.color.gray[300]};
    border-radius: ${props => props.theme.rounded.xl};
    ${props => props.theme.screen.md} {
      border-radius: ${props => props.theme.rounded.xxl};
      padding: 2.25rem;
    }
  `,
  Header: {
    Container: styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    Content: styled.div`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.75rem;
    `,
    Button: styled.div`
      display: none;
      ${props => props.theme.screen.md} {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
      }
    `,
  },
  Cell: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      ${props => props.theme.screen.md} {
        flex-direction: row;
        gap: 0.75rem;
      }
    `,
    Title: styled.div`
      font-weight: 700;
      ${props => props.theme.screen.md} {
        flex: none;
        width: 8rem;
      }
    `,
    Content: styled.div`
      ${props => props.theme.screen.md} {
        flex: 1 1 0%;
      }
    `,
  },
  Button: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    ${props => props.theme.screen.md} {
      display: none;
    }
  `,
};

interface IPropsProfileCardLayout {
  title?: React.ReactNode;
  buttons?: React.ReactNode;
  datas?: { id: number; title: string; content: string }[];
}

const ProfileCardLayout = ({
  title,
  buttons,
  datas,
}: IPropsProfileCardLayout) => {
  return (
    <Style.Container>
      <Style.Header.Container>
        {title && <Style.Header.Content>{title}</Style.Header.Content>}
        {buttons && <Style.Header.Button>{buttons}</Style.Header.Button>}
      </Style.Header.Container>
      {datas?.map(data => (
        <Style.Cell.Container key={data.id}>
          <Style.Cell.Title>{data.title}</Style.Cell.Title>
          <Style.Cell.Content>{data.content}</Style.Cell.Content>
        </Style.Cell.Container>
      ))}
      {buttons && <Style.Button>{buttons}</Style.Button>}
    </Style.Container>
  );
};

export default ProfileCardLayout;
