"use client";

import { BrowserProvider, ethers } from "ethers";
import { MouseEvent, useEffect, useState } from "react";

type Props = {
  setProvider: (provider: BrowserProvider) => void,
  provider: BrowserProvider | undefined,
  setErrorMessage: (error: string) => void
};

const WalletConnect = ({ setProvider, provider, setErrorMessage }: Props) => {
  const [connectedNetwork, setConnectedNetwork] = useState<{ name: string, chainId: bigint }>({ name: "Disconnected", chainId: 0n });
  const [connectedAccount, setConnectedAccount] = useState("0x0000...0000");
  const [accountBalance, setAccountBalance] = useState("0 ETH");

  function formatBalance(amount: bigint): string {
    return `${ethers.formatEther(amount)}`;
  }

  function formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  async function switchWalletNetworkToSepolia() {
    if (!window.ethereum) {
      setErrorMessage("You need to install a MetaMask compatible wallet");

      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: `0x${11155111n.toString(16)}`
        }]
      });

      setProvider(new ethers.BrowserProvider(window.ethereum));
    } catch (error) {
      if (error instanceof Object && "message" in error && typeof error.message === "string")
        setErrorMessage(error.message);
    }
  }

  async function walletConnectHandler(_event: MouseEvent<HTMLButtonElement>) {
    await switchWalletNetworkToSepolia();
  }

  async function afterProviderUpdate() {
    if (!provider) return;

    const network = await provider.getNetwork();
    const signers = await provider.listAccounts();
    const signer = signers[0];
    const address = await signer.getAddress();
    const balance = await provider.getBalance(signer);

    setConnectedAccount(formatAddress(address));
    setConnectedNetwork({ name: network.name, chainId: network.chainId });
    setAccountBalance(formatBalance(balance));
  }

  useEffect(() => { afterProviderUpdate() }, [provider])

  return (
    <div>
      <div className="border-solid border-2 rounded-md p-1 border-gray-500">
        <label className="mb-4 block w-auto text-center">Wallet connect</label>
        <button className="bg-amber-500 rounded-md p-1 block w-full mb-4" onClick={walletConnectHandler}>Connect your wallet</button>
        <label className="block">{`Connected network: ${connectedNetwork.name} (${connectedNetwork.chainId})`}</label>
        <label className="block">{`Connected account: ${connectedAccount}`}</label>
        <label className="block">{`Account balance: ${accountBalance}`}</label>
      </div>
    </div>
  );
}

export default WalletConnect;
