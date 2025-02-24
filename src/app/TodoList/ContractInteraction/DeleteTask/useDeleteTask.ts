import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  contractAddress: string,
  contractAbi: string,
  provider: BrowserProvider,
  signer: JsonRpcSigner,
  setErrorMessage: Dispatch<SetStateAction<string>>
};

export default function useCreateTask(props: Props, states: State) {
  return {
    // TODO: remove unecessary _events on handlers
    deleteTaskHandler: async () => {
      if (states.taskId === undefined) {
        props.setErrorMessage("You must set a task id");

        return;
      }

      const feeData = await props.provider.getFeeData();
      const newGasPrice = feeData.gasPrice! * 15n / 10n;

      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);
      const estimatedGas = await contract.deleteTask.estimateGas(states.taskId);

      const options = {
        gasPrice: newGasPrice,
        gasLimit: estimatedGas * 11n / 10n,
      }

      // TODO: try/catch tx
      const tx = await contract.deleteTask(states.taskId, options);

      states.setTaskCreationResult("deleting task...")

      await tx.wait();

      states.setTaskCreationResult("Task deleted!")
    }
  };
}

type State = {
  taskId?: bigint,
  setTaskCreationResult: Dispatch<SetStateAction<string>>
};
