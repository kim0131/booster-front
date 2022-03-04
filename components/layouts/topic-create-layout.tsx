import Selectbox from "@components/elements/selectbox";
import TextField from "@components/elements/text-field";
import { Header4 } from "@components/elements/types";
import styled from "@emotion/styled";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 1.25rem;
    margin: 0 auto;
    ${props => props.theme.screen.md} {
      max-width: 72rem;
      padding: 3rem;
    }
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    ${props => props.theme.screen.md} {
      gap: 1.5rem;
    }
  `,
  Header: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      ${props => props.theme.screen.md} {
        flex-direction: row;
        gap: 1.5rem;
      }
    `,
    Category: styled.div`
      ${props => props.theme.screen.md} {
        flex: none;
        width: 12rem;
      }
    `,
    Title: styled.div`
      ${props => props.theme.screen.md} {
        flex: 1 1 0%;
      }
    `,
  },
  Button: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  `,
};

interface IPropsTopicCreateLayout {
  header: string;
  category: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
  buttons: React.ReactNode;
}

const TopicCreateLayout = ({
  header,
  category,
  title,
  content,
  buttons,
}: IPropsTopicCreateLayout) => {
  return (
    <Style.Container>
      <Header4>{header}</Header4>
      <Style.Wrapper>
        <Style.Header.Container>
          <Style.Header.Category>{category}</Style.Header.Category>
          <Style.Header.Title>{title}</Style.Header.Title>
        </Style.Header.Container>
        {content}
      </Style.Wrapper>
      <Style.Button>{buttons}</Style.Button>
    </Style.Container>
  );
};

export default TopicCreateLayout;
