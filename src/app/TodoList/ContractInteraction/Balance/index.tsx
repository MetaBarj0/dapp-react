import { useEffect, useState } from "react";
import useBalance, { Props } from "./useBalance";

const Balance = (props: Props) => {
  const [balance, setBalance] = useState("0 ETH");

  const use = useBalance(props, { balance, setBalance });

  useEffect(use.updateBalance, [props.provider, props.contractAddress]);

  return (
    <>
      <label className="block mt-4 mb-4">Contract balance: {balance}</label>
    </>
  )
}

export default Balance;
