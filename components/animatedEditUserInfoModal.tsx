import React from "react";
import { CSSTransition } from "react-transition-group";
import EditUserModal, { EditUserInfoModalProps } from "./editUserInfoModal";
import Portals from "./Portals";

interface AnimatedEditUserInfoModalProps extends EditUserInfoModalProps {
  isOpen: boolean;
}

export function AnimatedEditUserInfoModal(
  props: AnimatedEditUserInfoModalProps,
) {
  const { isOpen, ...rest } = props;
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={400}
      classNames="animated-edit-user-info-modal"
      unmountOnExit
    >
      <Portals>
        <EditUserModal {...rest} />
      </Portals>
    </CSSTransition>
  );
}
