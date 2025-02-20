"use client";

import { MouseEvent, useEffect, useState } from "react";

import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { Eip1193Provider } from "ethers";

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatBalance(amount: bigint): string {
  return `${ethers.formatEther(amount)} ETH`;
}

const Todo = () => {
  const [buttonConnectText, setButtonConnectText] = useState("Connect your wallet");
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(formatAddress(ethers.ZeroAddress));
  const [balance, setBalance] = useState("0 ETH");
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [provider, setProvider] = useState<BrowserProvider>();
  const [network, setNetwork] = useState({ name: 'None', id: 0n });
  const [contract, setContract] = useState(undefined);

  const updateBalance = () => {
    if (!provider) return;
    if (!signer) return;

    provider.getBalance(signer)
      .then(amount => { setBalance(formatBalance(amount)); })
      .catch(error => setErrorMessage(error));
  }

  useEffect(updateBalance, [signer, provider]);

  const switchToSepoliaAndRequestForAccounts = async (provider: Eip1193Provider) => {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{
        chainId: `0x${11155111n.toString(16)}`
      }]
    });

    await provider.request({ method: "eth_requestAccounts" });
  }

  const handleConnectButtonClick = async (_event: MouseEvent) => {
    if (!window.ethereum) {
      setErrorMessage("You need to install a MetaMask compatible wallet");

      return;
    }

    await switchToSepoliaAndRequestForAccounts(window.ethereum);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    const signers = await provider.listAccounts();
    const signer = signers[0];
    const address = await signers[0].getAddress();

    setDefaultAccount(formatAddress(address));
    setProvider(provider);
    setSigner(signer);
    setNetwork({ name: network.name, id: network.chainId });
    setButtonConnectText("Wallet connected!")
  };

  return (
    <div className="Todo">
      <div className="grid grid-cols-2 gap-2 w-fit">
        <button
          className="bg-amber-500 rounded-md p-1 block"
          onClick={handleConnectButtonClick}
        >
          {buttonConnectText}
        </button>
        <div className="ReadOnlyField">
          Connected network: {`${network.name} (${network.id})`}
        </div>
        <div className="ReadOnlyField">
          Connected account: {defaultAccount}
        </div>
        <div className="ReadOnlyField">Balance: {balance}</div>
      </div>
      <h1 className="text-red-500 block absolute bottom-12 left-0">
        {errorMessage}
      </h1>
    </div>
  );
};

export default Todo;
