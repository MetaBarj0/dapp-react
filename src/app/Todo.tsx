"use client";

import { MouseEvent, useEffect, useState } from "react";

import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const Todo = () => {
  const [buttonConnectText, setButtonConnectText] = useState("Connect your wallet");
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(formatAddress(ethers.ZeroAddress));
  const [balance, setBalance] = useState("0 ETH");
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [provider, setProvider] = useState<BrowserProvider>();
  const [contract, setContract] = useState(undefined);

  const updateBalance = () => {
    if (!provider) return;
    if (!signer) return;

    provider.getNetwork()
      .then(name => { console.log(name) })
      .catch(error => setErrorMessage(error));
  }

  useEffect(updateBalance, [signer, provider]);

  const handleConnectButtonClick = async (_event: MouseEvent) => {
    if (!window.ethereum) {
      setErrorMessage("You need to install a MetaMask compatible wallet");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signers = await provider.listAccounts();
    const signer = signers[0];
    const address = await signers[0].getAddress();

    setDefaultAccount(formatAddress(address));
    setProvider(provider);
    setSigner(signer);
  };

  return (
    <div className="Todo">
      <h3 className="mb-4">Get/Set interaction with contract!</h3>
      <button
        className="bg-amber-500 rounded-md p-1 block"
        onClick={handleConnectButtonClick}
      >
        {buttonConnectText}
      </button>
      <div className="grid grid-cols-2 gap-2 w-fit">
        <div className="ReadOnlyField">
          Connected account: {defaultAccount}
        </div>
        <div className="ReadOnlyField">Balance: {balance}</div>
      </div>
      <h1 className="text-red-500 block absolute bottom-0 left-0">
        {errorMessage}
      </h1>
    </div>
  );
};

export default Todo;
