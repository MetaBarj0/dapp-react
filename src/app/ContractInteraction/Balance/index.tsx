import { BrowserProvider } from "ethers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

type Props = {
  provider?: BrowserProvider;
  contractAddress: string;
  setErrorMessage: (error: string) => void
};

const Balance = ({ provider, contractAddress, setErrorMessage }: Props) => {
  const [balance, setBalance] = useState("0 ETH");

  useEffect(() => {
    if (!provider) return;
    if (!contractAddress) return;

    provider.getBalance(contractAddress)
      .then(balance => {
        setBalance(`${ethers.formatEther(balance)} ETH`);
      })
  }, [provider, contractAddress]);

  return (
    <div>
      <label className="block mt-4 mb-4">Contract balance: {balance}</label>
    </div>
  )
}

export default Balance;
