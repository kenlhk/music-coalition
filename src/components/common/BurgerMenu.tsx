import { PropsWithChildren } from "react";
import { slide as Menu } from "react-burger-menu";
import useBurgerMenuStore from "../../stores/useBurgerMenuStore";

const styles = {
  bmBurgerButton: {
    position: "relative",
    width: "36px",
    height: "30px",
    top: "10px",
  },
  bmBurgerBars: {
    background: "#0072F5",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: "0",
    left: "0",
  },
  bmMenu: {
    background: "#16181A",
    padding: "3em 0 0 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const BurgerMenu = ({ children, ...props }: PropsWithChildren) => {
  const { isOpen, setOpen } = useBurgerMenuStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Menu
      styles={styles}
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      {children}
    </Menu>
  );
};

export default BurgerMenu;
