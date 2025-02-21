"use client";

import { BrowserProvider } from "ethers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useWalletConnect from "./useWalletConnect";
import { JsonRpcSigner } from "ethers";

type Props = {
  setProvider: Dispatch<SetStateAction<BrowserProvider | undefined>>,
  provider: BrowserProvider | undefined,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | undefined>>
};

const WalletConnect = ({ setProvider, provider, setErrorMessage, setSigner }: Props) => {
  const [connectedNetwork, setConnectedNetwork] = useState<{ name: string, chainId: bigint }>({ name: "Disconnected", chainId: 0n });
  const [connectedAccount, setConnectedAccount] = useState("0x0000...0000");
  const [accountBalance, setAccountBalance] = useState("0 ETH");

  const use = useWalletConnect({
    provider, setProvider,
    setErrorMessage,
    connectedNetwork, setConnectedNetwork,
    connectedAccount, setConnectedAccount,
    accountBalance, setAccountBalance,
    setSigner
  });

  useEffect(() => { use.afterProviderUpdate() }, [provider])

  // TODO: class refactoring
  return (
    <>
      <div className="border-solid border-2 rounded-md p-1 border-gray-500">
        <label className="mb-4 block w-auto text-center">Wallet connect</label>
        <button className="bg-amber-500 rounded-md p-1 block w-full mb-4" onClick={use.walletConnectHandler}>Connect your wallet</button>
        <label className="block bg-zinc-800 mb-1">{`Connected network: ${connectedNetwork.name} (${connectedNetwork.chainId})`}</label>
        <label className="block bg-zinc-800 mb-1">{`Connected account: ${connectedAccount}`}</label>
        <label className="block bg-zinc-800 mb-1">{`Account balance: ${accountBalance}`}</label>
      </div>
    </>
  );
}

export default WalletConnect;
