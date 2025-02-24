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
    createTaskHandler: async () => {
      if (states.taskId === undefined) {
        props.setErrorMessage("You must provide a task id to modify");

        return;
      }

      if (!states.taskDefinition) {
        props.setErrorMessage("You must set a task definition");

        return;
      }

      if (!states.taskStatus) {
        props.setErrorMessage("You must set a task status");

        return;
      }

      const feeData = await props.provider.getFeeData();
      const newGasPrice = feeData.gasPrice! * 15n / 10n;

      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);
      const estimatedGas = await contract.modifyTask.estimateGas(states.taskId, states.taskDefinition, states.taskStatus);

      const options = {
        gasPrice: newGasPrice,
        gasLimit: estimatedGas * 11n / 10n,
      }

      const tx = await contract.modifyTask(
        states.taskId,
        states.taskDefinition,
        states.taskStatus,
        options
      );

      states.setTaskModificationResult("modifying task...")

      await tx.wait();

      states.setTaskModificationResult("Task modified!")
    }
  };
}

type State = {
  taskId?: bigint,
  taskDefinition?: string,
  taskStatus?: number,
  setTaskModificationResult: Dispatch<SetStateAction<string>>
};
