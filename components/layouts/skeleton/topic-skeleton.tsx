import Skeleton from "@components/elements/skeleton";
import styled from "@emotion/styled";

const Style = {
  Snb: styled.div`
    flex: none;
    width: 12rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  SubMenu: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,
};

export const TopicSnbSkeleton = () => {
  return (
    <Style.Snb>
      <Style.SubMenu>
        <Skeleton width="6rem" height="1rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </Style.SubMenu>
      <Style.SubMenu>
        <Skeleton width="6rem" height="1rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </Style.SubMenu>
    </Style.Snb>
  );
};
