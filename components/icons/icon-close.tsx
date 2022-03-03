import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconClose = ({
  size = 24,
  color = theme.color.gray[900],
}: IPropsSvgIcon) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#IconClose_svg__a)">
        <path
          d="M4.929 4.929a1 1 0 0 0 0 1.414L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414L12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586 6.343 4.929a1 1 0 0 0-1.414 0Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="IconClose_svg__a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgIconClose;
