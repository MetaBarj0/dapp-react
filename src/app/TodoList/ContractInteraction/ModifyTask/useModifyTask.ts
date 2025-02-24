import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  contractAddress: string,
  contractAbi: string,
  provider: BrowserProvider,
  signer: JsonRpcSigner,
  setErrorMessage: Dispatch<SetStateAction<string>>
};

// TODO: 2 args for props and states
export default function useCreateTask(props: Props & State) {
  return {
    // TODO: remove unecessary _events on handlers
    createTaskHandler: async () => {
      if (props.taskId === undefined) {
        props.setErrorMessage("You must provide a task id to modify");

        return;
      }

      if (!props.taskDefinition) {
        props.setErrorMessage("You must set a task definition");

        return;
      }

      if (!props.taskStatus) {
        props.setErrorMessage("You must set a task status");

        return;
      }

      const feeData = await props.provider.getFeeData();
      const newGasPrice = feeData.gasPrice! * 15n / 10n;

      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);
      const estimatedGas = await contract.modifyTask.estimateGas(props.taskId, props.taskDefinition, props.taskStatus);

      const options = {
        gasPrice: newGasPrice,
        gasLimit: estimatedGas * 11n / 10n,
      }

      const tx = await contract.modifyTask(
        props.taskId,
        props.taskDefinition,
        props.taskStatus,
        options
      );

      props.setTaskModificationResult("modifying task...")

      await tx.wait();

      props.setTaskModificationResult("Task modified!")
    }
  };
}

type State = {
  taskId?: bigint,
  taskDefinition?: string,
  taskStatus?: number,
  setTaskModificationResult: Dispatch<SetStateAction<string>>
};
