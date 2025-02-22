import { formatBalance } from "@/utility";
import { BrowserProvider, ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  provider?: BrowserProvider;
  contractAddress: string;
};

type States = {
  balance: string, setBalance: Dispatch<SetStateAction<string>>
};

export default function useBalance(props: Props & States) {
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
