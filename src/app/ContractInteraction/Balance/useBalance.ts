import { formatBalance } from "@/utility";
import { BrowserProvider, ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";

type Props = {
  provider: BrowserProvider | undefined,
  contractAddress: string,
  balance: string, setBalance: Dispatch<SetStateAction<string>>
};

export default function useBalance(props: Props) {
  return {
    updateBalance: () => {
      if (!props.provider) return;
      if (!props.contractAddress) return;

      props.provider.getBalance(props.contractAddress)
        .then(balance => {
          props.setBalance(formatBalance(balance));
        })
    }
  };
}
