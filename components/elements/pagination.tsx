import { IconChevronLeft, IconChevronRight } from "@components/icons";
import theme from "@components/styles/theme";
import styled from "@emotion/styled";
import Loader from "./loader";

// Style
interface IPropsPage {
  isCurrent: boolean;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  ${props => props.theme.screen.md} {
    justify-content: flex-start;
  }
`;

const Arrow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 2rem;
  height: 2rem;
  background-color: transparent;
  color: ${props => props.theme.color.gray[500]};
  font-size: ${props => props.theme.fontSize.body3};
  line-height: ${props => props.theme.lineHeight.body3};
  padding: 0 0.75rem;
  border-radius: ${props => props.theme.rounded.xs};
  font-weight: 500;
  outline: 0;
  & > svg {
    width: 1rem;
    height: 1rem;
  }
  & > svg > path {
    fill: ${props => props.theme.color.gray[500]};
  }
  &:hover,
  &:focus {
    background-color: ${props => props.theme.color.gray[50]};
    color: ${props => props.theme.color.gray[900]};
    outline: 0;
    & > svg > path {
      fill: ${props => props.theme.color.gray[900]};
    }
  }
  &:active {
    outline: 0;
  }
  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }
`;

const Page = styled.button<IPropsPage>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 2rem;
  height: 2rem;
  pointer-events: ${props => (props.isCurrent ? "none" : "auto")};
  background-color: ${props =>
    props.isCurrent ? props.theme.color.gray[100] : "transparent"};
  color: ${props =>
    props.isCurrent
      ? props.theme.color.gray[900]
      : props.theme.color.gray[500]};
  font-size: ${props => props.theme.fontSize.body3};
  line-height: ${props => props.theme.lineHeight.body3};
  padding: 0 0.75rem;
  border-radius: ${props => props.theme.rounded.xs};
  font-weight: ${props => (props.isCurrent ? 700 : 500)};
  outline: 0;
  &:hover,
  &:focus {
    color: ${props => props.theme.color.gray[900]};
    background-color: ${props =>
      props.isCurrent
        ? props.theme.color.gray[100]
        : props.theme.color.gray[50]};
  }
  &:active {
    outline: 0;
  }
  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }
`;

// Component

interface IPropsPagination {}

const sampleData = {
  totalContent: 102581,
  line: 20,
  currentPage: 1,
};

const Pagination = ({}: IPropsPagination) => {
  const pageNum = Math.ceil(sampleData.totalContent / sampleData.line);

  return (
    <Container>
      <Arrow>
        <IconChevronLeft size={16} />
      </Arrow>
      <Page isCurrent>1</Page>
      <Page isCurrent={false}>2</Page>
      <Page isCurrent={false}>3</Page>
      <Page isCurrent={false}>4</Page>
      <Page isCurrent={false}>5</Page>
      <Arrow disabled>
        <IconChevronRight size={16} />
      </Arrow>
    </Container>
  );
};

export default Pagination;
