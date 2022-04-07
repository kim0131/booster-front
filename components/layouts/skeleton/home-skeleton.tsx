import styled from "@emotion/styled";

const Style = {
  Carousel: styled.div`
    display: flex;
    flex-direction: column;
    ${props => props.theme.screen.md} {
      flex-direction: row;
      max-width: 72rem;
      margin: 0 auto;
      gap: 3rem;
      padding: 3rem;
    }
    & > * {
      ${props => props.theme.screen.md} {
      }
    }
  `,
};

interface IPropsHomeSkeletonLayout {
  children?: React.ReactNode;
}

export const HomeSkeletonCarouselLayout = ({
  children,
}: IPropsHomeSkeletonLayout) => {
  return <Style.Carousel>{children}</Style.Carousel>;
};
