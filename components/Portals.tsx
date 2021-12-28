import ReactDOM from "react-dom";

interface PortalsProps {
  children: React.ReactNode;
}

export default function Portals(props: PortalsProps) {

  return ReactDOM.createPortal(
    props.children,
    document.getElementById("modal-container"),
  );
}
