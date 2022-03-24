import { createPortal } from "react-dom";

interface IPropsPortal {
  type: string;
  children: React.ReactNode;
}

const Portal = ({ type, children }: IPropsPortal) => {
  if (typeof window !== "undefined") {
    const el = document.getElementById(type);
    return el ? createPortal(children, el) : null;
  } else return null;
};

export default Portal;
