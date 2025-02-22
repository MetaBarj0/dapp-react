import { JsonRpcSigner } from "ethers";
import { BrowserProvider, ethers } from "ethers";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { formatAddress, formatBalance } from "@/utility/"

export type Props = {
  setProvider: Dispatch<SetStateAction<BrowserProvider | undefined>>,
  provider: BrowserProvider | undefined,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | undefined>>
};

export default function useWalletConnect(props: Props & States) {
  return {
    walletConnectHandler: async (_event: MouseEvent<HTMLButtonElement>) => {
      await switchWalletNetworkToSepolia();
    },

    afterProviderUpdate: async () => {
      if (!props.provider) return;

      const network = await props.provider.getNetwork();
      const signers = await props.provider.listAccounts();
      const signer = signers[0];
      const address = await signer.getAddress();
      const balance = await props.provider.getBalance(signer);

      props.setConnectedAccount(formatAddress(address));
      props.setConnectedNetwork({ name: network.name, chainId: network.chainId });
      props.setAccountBalance(formatBalance(balance));
      props.setSigner(signer);
    }
  };

  async function switchWalletNetworkToSepolia() {
    if (!window.ethereum) {
      props.setErrorMessage("You need to install a MetaMask compatible wallet");

      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: `0x${11155111n.toString(16)}`
        }]
      });

      props.setProvider(new ethers.BrowserProvider(window.ethereum));
    } catch (error) {
      if (error instanceof Object && "message" in error && typeof error.message === "string")
        props.setErrorMessage(error.message);
    }
  }
};

type NetworkInfo = {
  name: string,
  chainId: bigint
};

type States = {
  connectedNetwork: NetworkInfo, setConnectedNetwork: Dispatch<SetStateAction<NetworkInfo>>,
  connectedAccount: string, setConnectedAccount: Dispatch<SetStateAction<string>>,
  accountBalance: string, setAccountBalance: Dispatch<SetStateAction<string>>
};
