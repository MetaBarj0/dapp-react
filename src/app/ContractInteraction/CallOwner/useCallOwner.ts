import { ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { formatAddress } from "@/utility/"

type Props = {
  setOwner: Dispatch<SetStateAction<string>>,
  contractAddress: string,
  contractAbi: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer?: JsonRpcSigner
};

export default function useCallOwner(props: Props) {
  return {
    ownerHandler: async () => {
      try {
        if (!props.contractAddress) {
          props.setErrorMessage("You must specify a contract address");

          return;
        }

        if (!props.contractAbi) {
          props.setErrorMessage("You must fetch contract interface first, I need the ABI");

          return;
        }

        if (!props.signer) {
          props.setErrorMessage("Connect your wallet first")

          return;
        }

        const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);

        props.setOwner(formatAddress(await contract.owner()));
      } catch (error) {
        if (error instanceof Object && "message" in error && typeof error.message === "string")
          props.setErrorMessage(error.message);
      }
    }
  };
}
