"use client";

import { useState } from "react";
import Balance from "./Balance";
import Owner from "./Owner";
import Tasks from "./Tasks";
import DeletedTasks from "./DeletedTasks";
import CreateTask from "./CreateTask";
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

        {contractAbi && <Balance provider={props.provider} contractAddress={contractAddress} />}

        {contractAbi && <Owner
          contractAddress={contractAddress}
          contractAbi={contractAbi}
          setErrorMessage={props.setErrorMessage}
          signer={props.signer} />}

        {/* TODO: signer not necessary here */}
        {contractAbi && <Tasks
          contractAddress={contractAddress}
          contractAbi={contractAbi}
          setErrorMessage={props.setErrorMessage}
          signer={props.signer} />}

        {contractAbi && <DeletedTasks
          contractAddress={contractAddress}
          contractAbi={contractAbi}
          setErrorMessage={props.setErrorMessage}
          signer={props.signer} />}

        {contractAbi && <CreateTask
          contractAddress={contractAddress}
          contractAbi={contractAbi}
          setErrorMessage={props.setErrorMessage}
          signer={props.signer}
          provider={props.provider}
        />}
      </div>
    </>
  );
}

export default ContractInteraction;
