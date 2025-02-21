import { BrowserProvider } from "ethers";
import { useEffect, useState } from "react";
import useBalance from "./useBalance";

type Props = {
  provider?: BrowserProvider;
  contractAddress: string;
};

const Balance = ({ provider, contractAddress }: Props) => {
  const [balance, setBalance] = useState("0 ETH");

  const use = useBalance({
    provider,
    contractAddress,
    balance, setBalance
  });

  useEffect(use.updateBalance, [provider, contractAddress]);

  return (
    <>
      <label className="block mt-4 mb-4">Contract balance: {balance}</label>
    </>
  )
}

export default Balance;
