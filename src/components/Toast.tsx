import { keyframes, styled } from "@nextui-org/react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { IoMdClose } from "react-icons/io";

const VIEWPORT_PADDING = 25;

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const StyledViewport = styled(ToastPrimitive.Viewport, {
  position: "fixed",
  bottom: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 40,
  outline: "none",
});

const StyledToast = styled(ToastPrimitive.Root, {
  backgroundColor: "#16181A",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  padding: 15,
  display: "grid",
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: "auto max-content",
  columnGap: 15,
  alignItems: "center",

  "@media (prefers-reduced-motion: no-preference)": {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: "translateX(var(--radix-toast-swipe-move-x))",
    },
    '&[data-swipe="cancel"]': {
      transform: "translateX(0)",
      transition: "transform 200ms ease-out",
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },
});

const StyledTitle = styled(ToastPrimitive.Title, {
  gridArea: "title",
  marginBottom: 5,
  fontWeight: 500,
  color: "White",
  fontSize: 15,
});

const StyledDescription = styled(ToastPrimitive.Description, {
  gridArea: "description",
  margin: 0,
  color: "White",
  fontSize: 13,
  lineHeight: 1.3,
});

const StyledAction = styled(ToastPrimitive.Action, {
  gridArea: "action",
});

// Exports
export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = StyledViewport;
export const ToastBody = StyledToast;
export const ToastTitle = StyledTitle;
export const ToastDescription = StyledDescription;
export const ToastAction = StyledAction;
export const ToastClose = ToastPrimitive.Close;

interface ToastProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  message?: string;
}

const Toast = (props: ToastProps) => {
  return (
    <ToastProvider swipeDirection="right">
      <ToastBody open={props.open} onOpenChange={props.setOpen}>
        <ToastTitle>{props.title}</ToastTitle>
        <ToastDescription>{props.message}</ToastDescription>
        <ToastAction altText="Close">
          <button>
            <IoMdClose />
          </button>
        </ToastAction>
        <ToastClose />
      </ToastBody>
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toast;
