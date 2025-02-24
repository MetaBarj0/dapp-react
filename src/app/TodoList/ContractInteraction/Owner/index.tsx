import { useState } from "react";
import useOwner, { Props } from "./useOwner";

const Owner = (props: Props) => {
  const [owner, setOwner] = useState("");

  const use = useOwner(props, { setOwner });

  return (
    <div className="grid grid-cols-[20%_80%]">
      <button className="bg-blue-800 mr-2 rounded-md" onClick={use.ownerHandler}>owner</button>
      <label className="bg-zinc-800">{owner}</label>
    </div>
  )
}

export default Owner;
