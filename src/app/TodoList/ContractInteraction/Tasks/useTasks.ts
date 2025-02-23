import { ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  contractAddress: string,
  contractAbi: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer: JsonRpcSigner
};

export type Task = {
  id: bigint,
  timestamp: bigint,
  definition: string,
  status: number
};

export default function useTasks(props: Props & States) {
  return {
    tasksHandler: async () => {
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

type States = {
  taskId: bigint,
  setTask: Dispatch<SetStateAction<Task | undefined>>
};
