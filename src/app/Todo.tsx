"use client";

import { MouseEvent, useEffect, useState } from "react";

import { BrowserProvider, Contract, Eip1193Provider, ethers, JsonRpcSigner } from "ethers";

import contractAbi from "./Todo.ABI.json"

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
  const [contractAddress, setContractAddress] = useState("");
  const [contract, setContract] = useState<Contract>();

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

  const handleGetContract = async (_event: MouseEvent<HTMLButtonElement>) => {
    try {
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      console.log(await contract.owner());

      setContract(contract);
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
    }
  }

  return (
    <div className="Todo">
      <div className="grid grid-cols-2 gap-2 w-fit">
        <button
          className="EditableField mt-1"
          onClick={handleConnectButtonClick}
        >
          {buttonConnectText}
        </button>
        <div className="ReadOnlyField mt-1">
          Connected network: {`${network.name} (${network.id})`}
        </div>
        <div className="ReadOnlyField">
          Connected account: {defaultAccount}
        </div>
        <div className="ReadOnlyField">Balance: {balance}</div>
        <div className="w-full grid col-span-2">
          <input className="EditableField col-start-1 col-end-9"
            placeholder="Contract Address: 0x1234...cdef"
            onBlur={(e) => { setContractAddress(e.target.value) }} />
          <button className="EditableField col-start-9 col-end-10 ml-1" onClick={handleGetContract}>Get</button>
        </div>
      </div>
      <h1 className="text-red-500 block absolute bottom-12 left-0">
        {errorMessage}
      </h1>
    </div>
  );
};

export default Todo;
