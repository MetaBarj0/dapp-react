import axios from "axios";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export type Props = {
  provider: BrowserProvider,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer: JsonRpcSigner
};

export default function useContractInteraction(props: Props & States) {
  return {
    fetchContractInterfaceHandler: async (_event: MouseEvent<HTMLButtonElement>) => {
      if (props.etherscanApiKey.length === 0) {
        props.setErrorMessage("You must provide your etherscan API key");
        return;
      }

      if (props.contractAddress.length === 0) {
        props.setErrorMessage("You must provide a TodoList contract address");
        return;
      }

      props.setErrorMessage("");

      props.setContractAbi(await fetchContractAbi());
    }
  };

  async function fetchContractAbi() {
    const url = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${props.contractAddress}&apikey=${props.etherscanApiKey}`;

    const response = await axios.get(url);

    type FetchContractAbiResult = {
      message: string,
      result: string
    };

    const data = response.data as FetchContractAbiResult;

    if (data.message === "NOTOK") {
      props.setErrorMessage(data.result);
      return "";
    }

    return data.result;
  }
}

type States = {
  contractAddress: string, setContractAddress: Dispatch<SetStateAction<string>>,
  etherscanApiKey: string, setEtherscanApiKey: Dispatch<SetStateAction<string>>,
  contractAbi: string, setContractAbi: Dispatch<SetStateAction<string>>
};
