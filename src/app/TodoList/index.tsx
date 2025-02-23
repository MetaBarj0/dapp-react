"use client";

import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useState } from "react";
import ContractInteraction from "./ContractInteraction";
import ErrorMessage from "./ErrorMessage";
import WalletConnect from "./WalletConnect";

const TodoList = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [provider, setProvider] = useState<BrowserProvider>();
  const [signer, setSigner] = useState<JsonRpcSigner>();

  return (
    <div className="grid grid-cols-2 gap-2 w-fit">
      <WalletConnect
        setProvider={setProvider}
        provider={provider}
        setErrorMessage={setErrorMessage}
        setSigner={setSigner} />

      {signer && provider && <ContractInteraction
        provider={provider}
        setErrorMessage={setErrorMessage}
        signer={signer} />}

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default TodoList;
