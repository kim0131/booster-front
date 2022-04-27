export const getCreateTime = (time: number) => {
  if (time > 24 * 60) {
    return `${Math.ceil(time / (24 * 60))}일전`;
  } else if (time > 60) {
    return `${Math.ceil(time / 60)}시간전`;
  } else {
    return `${Math.ceil(time)}분전`;
  }
};
