import { formatBalance } from "@/utility";
import { BrowserProvider } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  provider: BrowserProvider;
  contractAddress: string;
};

type States = {
  balance: string, setBalance: Dispatch<SetStateAction<string>>
};

export default function useBalance(props: Props, states: States) {
  return {
    updateBalance: async () => {
      const balance = await props.provider.getBalance(props.contractAddress);

      states.setBalance(formatBalance(balance));
    }
  };
}
