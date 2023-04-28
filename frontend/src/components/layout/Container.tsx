import React from "react";

import "./Container.css";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <main className="container">{children}</main>;
};

export default Container;
