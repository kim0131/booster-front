import { IconCheckFill, IconCloseFill, IconInfoFill } from "@components/icons";
import theme from "@components/styles/theme";
import useToast from "@core/hook/use-toast";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    padding: 1.25rem;
    gap: 0.75rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 60;
    pointer-events: none;
    ${props => props.theme.screen.md} {
      align-items: flex-end;
    }
  `,
  Toast: styled(motion.div)`
    width: 100%;
    max-width: 28rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    border-radius: ${props => props.theme.rounded.md};
    font-size: ${props => props.theme.fontSize.body2};
    line-height: ${props => props.theme.lineHeight.body2};
    font-weight: 500;
    color: ${props => props.theme.color.gray[900]};
    background-color: ${props => props.theme.color.white};
    box-shadow: ${props => props.theme.shadow.lg};
  `,
};

const Toast = () => {
  const { toast } = useToast();
  return (
    <Style.Container>
      <AnimatePresence>
        {toast?.map((item, idx) => (
          <Style.Toast
            key={idx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
          >
            {item.type === "success" ? (
              <IconCheckFill color={theme.color.green[600]} />
            ) : item.type === "danger" ? (
              <IconCloseFill color={theme.color.red[600]} />
            ) : (
              <IconInfoFill color={theme.color.blue[600]} />
            )}
            {item.message}
          </Style.Toast>
        ))}
      </AnimatePresence>
    </Style.Container>
  );
};

export default Toast;
