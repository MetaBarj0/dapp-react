import { ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  contractAddress: string,
  contractAbi: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer?: JsonRpcSigner
};

export default function useTasks(props: Props & States) {
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

      props.setDeletedTask(await contract.deletedTasks(props.taskId));
    },

    formatDeletedTask: () => props.deletedTask === undefined ? "" : props.deletedTask ? "true" : "false"
  };
}

type States = {
  taskId: bigint,
  setDeletedTask: Dispatch<SetStateAction<boolean | undefined>>,
  deletedTask: boolean | undefined
};
