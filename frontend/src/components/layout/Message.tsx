import React, { useState } from "react";

import "./Message.css";

const Message: React.FC = () => {
  const [type, setType] = useState("");

  return <div className={`message ${type}`}>Mensagem</div>;
};

export default Message;
