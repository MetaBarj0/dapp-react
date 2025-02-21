"use client";

import axios from "axios";
import { MouseEvent, useState } from "react";
import Balance from "./Balance";
import CallOwner from "./CallOwner";
import { BrowserProvider } from "ethers";

type Props = {
  provider?: BrowserProvider,
  setErrorMessage: (error: string) => void;
};

const ContractInteraction = ({ provider, setErrorMessage }: Props) => {
  const [contractAddress, setContractAddress] = useState("");
  const [etherscanApiKey, setEtherscanApiKey] = useState("");
  const [contractAbi, setContractAbi] = useState("");

  async function fetchContractAbi() {
    const url = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanApiKey}`;

    const response = await axios.get(url);

    type FetchContractAbiResult = {
      message: string,
      result: string
    };

    const data = response.data as FetchContractAbiResult;

    if (data.message === "NOTOK") {
      setErrorMessage(data.result);
      return "";
    }

    return data.result;
  }

  async function fetchContractInterfaceHandler(_event: MouseEvent<HTMLButtonElement>) {
    if (etherscanApiKey.length === 0) {
      setErrorMessage("You must provide your etherscan API key");
      return;
    }

    if (contractAddress.length === 0) {
      setErrorMessage("You must provide a TodoList contract address");
      return;
    }

    setErrorMessage("");

    setContractAbi(await fetchContractAbi());
  }

  return (
    <div>
      <div className="border-solid border-2 rounded-md p-1 border-gray-500">
        <label className="mb-4 block w-auto text-center">Contract Interaction</label>

        <input className="w-full rounded-md p-1 mb-2 bg-gray-800 fg-gray-500"
          placeholder="Enter etherscan API key"
          onBlur={(e) => { setEtherscanApiKey(e.target.value); }} />

        <input className="w-full rounded-md p-1 mb-2 bg-gray-800 fg-gray-500"
          placeholder="Enter the contract address"
          onBlur={(e) => { setContractAddress(e.target.value) }} />

        <button className="bg-amber-500 rounded-md p-1 block w-full"
          onClick={fetchContractInterfaceHandler}>Fetch contract Interface</button>

        <Balance provider={provider} contractAddress={contractAddress} setErrorMessage={setErrorMessage} />

        <CallOwner />
      </div>
    </div>
  );
}

export default ContractInteraction;
