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

export default function useTasks(props: Props, states: States) {
  return {
    tasksHandler: async () => {
      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);

      const task = await contract.tasks(states.taskId)
        .catch(() => {
          props.setErrorMessage("Unexisting task");
        });

      if (!task) return;

      states.setTask({
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
