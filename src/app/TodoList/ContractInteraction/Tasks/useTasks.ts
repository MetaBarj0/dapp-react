import { ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  contractAddress: string,
  contractAbi: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signer: JsonRpcSigner
};

export type Task = {
  date: Date,
  definition: string,
  status: string
};

export default function useTasks(props: Props & States) {
  return {
    tasksHandler: async () => {
      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);

      const task = await contract.tasks(props.taskId)
        .catch(_error => {
          props.setErrorMessage("Unexisting task");
        });

      if (!task) return;

      props.setTask({
        date: new Date(Number(task.timestamp) * 1000),
        definition: task.definition,
        status: formatStatus(task.status)
      });
    },

    formatTask: (task: Task | undefined) => {
      if (!task) return "";

      return JSON.stringify(task, null, 2);
    }
  };
}

function formatStatus(status: bigint) {
  return status === 0n ? "todo" : status === 1n ? "doing" : "done";
}

type States = {
  taskId: bigint,
  setTask: Dispatch<SetStateAction<Task | undefined>>
};
