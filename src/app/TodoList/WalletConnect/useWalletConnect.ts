import { formatAddress, formatBalance } from "@/utility/";
import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  setProvider: Dispatch<SetStateAction<BrowserProvider | undefined>>,
  provider: BrowserProvider | undefined,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | undefined>>
};

export default function useWalletConnect(props: Props, states: States) {
  return {
    walletConnectHandler: async () => {
      await switchWalletNetworkToSepolia();
    },

    initializeWalletInfo: async () => {
      if (!props.provider) return;

      const network = await props.provider.getNetwork();
      const signers = await props.provider.listAccounts();
      const signer = signers[0];
      const address = await signer.getAddress();
      const balance = await props.provider.getBalance(signer);

      states.setConnectedAccount(formatAddress(address));
      states.setConnectedNetwork({ name: network.name, chainId: network.chainId });
      states.setAccountBalance(formatBalance(balance));
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
