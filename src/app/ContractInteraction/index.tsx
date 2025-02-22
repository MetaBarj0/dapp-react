"use client";

import { useState } from "react";
import Balance from "./Balance";
import Owner from "./Owner";
import Tasks from "./Tasks";
import useContractInteraction, { Props } from "./useContractInteraction";

const ContractInteraction = (props: Props) => {
  const [contractAddress, setContractAddress] = useState("");
  const [etherscanApiKey, setEtherscanApiKey] = useState("");
  const [contractAbi, setContractAbi] = useState("");

  const use = useContractInteraction({
    ...props,
    contractAddress, setContractAddress,
    etherscanApiKey, setEtherscanApiKey,
    contractAbi, setContractAbi
  });

  return (
    <>
      <div className="border-solid border-2 rounded-md p-1 border-gray-500">
        <label className="mb-4 block w-auto text-center">Contract Interaction</label>

        <input className="w-full rounded-md p-1 mb-2 bg-gray-800 fg-gray-500"
          placeholder="Enter etherscan API key"
          onBlur={(e) => { setEtherscanApiKey(e.target.value); }} />

        <input className="w-full rounded-md p-1 mb-2 bg-gray-800 fg-gray-500"
          placeholder="Enter the contract address"
          onBlur={(e) => { setContractAddress(e.target.value) }} />

        <button className="bg-amber-500 rounded-md p-1 block w-full"
          onClick={use.fetchContractInterfaceHandler}>Fetch contract Interface</button>

        <Balance provider={props.provider} contractAddress={contractAddress} />

        <Owner
          contractAddress={contractAddress}
          contractAbi={contractAbi}
          setErrorMessage={props.setErrorMessage}
          signer={props.signer} />

        <Tasks
          contractAddress={contractAddress}
          contractAbi={contractAbi}
          setErrorMessage={props.setErrorMessage}
          signer={props.signer} />
      </div>
    </>
  );
}

export default ContractInteraction;
