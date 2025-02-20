"use client";

import { MouseEvent, useState } from "react";

import { ethers } from "ethers";

const Todo = () => {
  const [buttonConnectText, setButtonConnectText] = useState(
    "Connect your wallet",
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(ethers.ZeroAddress);
  const [signer, setSigner] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  const handleConnectButtonClick = async (_event: MouseEvent) => {
    if (!window.ethereum) {
      setErrorMessage("You need to install a MetaMask compatible wallet");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signers = await provider.listAccounts();

    setDefaultAccount(await signers[0].getAddress());
  };

  return (
    <div className="Todo">
      <h3>Get/Set interaction with contract!</h3>
      <button className="Button" onClick={handleConnectButtonClick}>
        {buttonConnectText}
      </button>
      <h1>{errorMessage}</h1>
    </div>
  );
};

export default Todo;
