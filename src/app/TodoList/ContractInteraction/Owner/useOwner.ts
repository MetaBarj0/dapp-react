import { ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { formatAddress } from "@/utility/"

export type Props = {
  contractAddress: string,
  contractAbi: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer: JsonRpcSigner
};

export default function useOwner(props: Props, states: States) {
  return {
    ownerHandler: async () => {
      try {
        const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);

        states.setOwner(formatAddress(await contract.owner()));
      } catch (error) {
        if (error instanceof Object && "message" in error && typeof error.message === "string")
          props.setErrorMessage(error.message);
      }
    }
  };
}

type States = {
  setOwner: Dispatch<SetStateAction<string>>,
};
