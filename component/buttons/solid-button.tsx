interface IPropsSolidButton {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SolidButton = ({ children, onClick }: IPropsSolidButton) => {
  return (
    <button className="" onClick={onClick}>
      {children}
    </button>
  );
};

export default SolidButton;
