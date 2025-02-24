import { ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  contractAddress: string,
  contractAbi: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer: JsonRpcSigner
};

export default function useTasks(props: Props, states: States) {
  return {
    tasksHandler: async () => {
      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);

      states.setDeletedTask(await contract.deletedTasks(states.taskId));
    },

    formatDeletedTask: () => states.deletedTask === undefined ? "" : states.deletedTask ? "true" : "false"
  };
}

type States = {
  taskId: bigint,
  setDeletedTask: Dispatch<SetStateAction<boolean | undefined>>,
  deletedTask: boolean | undefined
};
