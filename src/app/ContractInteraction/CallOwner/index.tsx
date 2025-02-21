import { Dispatch, SetStateAction, useState } from "react";
import useCallOwner from "./useCallOwner"
import { JsonRpcSigner } from "ethers";

type Props = {
  contractAddress: string,
  contractAbi: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer?: JsonRpcSigner
};

const CallOwner = ({ contractAddress, contractAbi, setErrorMessage, signer }: Props) => {
  const [owner, setOwner] = useState("");

  const use = useCallOwner({
    setOwner,
    contractAddress,
    contractAbi,
    setErrorMessage,
    signer
  });

  return (
    <div className="grid grid-cols-[20%_80%]">
      <button className="bg-blue-800 mr-2 rounded-md" onClick={use.ownerHandler}>owner</button>
      <label className="bg-zinc-800">{owner}</label>
    </div>
  )
}

export default CallOwner;
