"use client";

import { BrowserProvider } from "ethers";
import { useState } from "react";
import ContractInteraction from "./ContractInteraction";
import ErrorMessage from "./ErrorMessage";
import WalletConnect from "./WalletConnect";

const TodoList = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [provider, setProvider] = useState<BrowserProvider>();

  return (
    <div className="grid grid-cols-2 gap-2 w-fit">
      <WalletConnect
        setProvider={setProvider}
        provider={provider}
        setErrorMessage={setErrorMessage} />

      <ContractInteraction provider={provider} setErrorMessage={setErrorMessage} />

      <ErrorMessage getErrorMessage={() => errorMessage} />
    </div>
  );
};

export default TodoList;
