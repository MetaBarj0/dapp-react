import { ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

type Props = {
  contractAddress: string,
  contractAbi: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer?: JsonRpcSigner,
  taskId: bigint,
  setTask: Dispatch<SetStateAction<Task | undefined>>
};

export type Task = {
  id: bigint,
  definition: string
};

export default function useTasks(props: Props) {
  return {
    tasksHandler: async () => {
      if (!props.contractAddress) {
        props.setErrorMessage("You must specify a contract address");

        return;
      }

      if (!props.contractAbi) {
        props.setErrorMessage("You must fetch contract interface first, I need the ABI");

        return;
      }

      if (!props.signer) {
        props.setErrorMessage("Connect your wallet first")

        return;
      }

      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);

      const task = await contract.tasks(props.taskId)
        .catch(_error => {
          props.setErrorMessage("Unexisting task");
        });
    },

    formatTask: (task: Task | undefined) => {
      return "";
    }
  };
}
