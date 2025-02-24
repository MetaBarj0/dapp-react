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
      if (!states.taskDefinition) {
        props.setErrorMessage("You must set a task definition");

        return;
      }

      const feeData = await props.provider.getFeeData();
      const newGasPrice = feeData.gasPrice! * 15n / 10n;

      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);
      const estimatedGas = await contract.createTask.estimateGas(states.taskDefinition, { value: ethers.parseEther("0.01") });

      const options = {
        gasPrice: newGasPrice,
        gasLimit: estimatedGas * 11n / 10n,
      }

      const tx = await contract.createTask(states.taskDefinition, {
        value: ethers.parseEther("0.01"),
        ...options
      });

      states.setTaskCreationResult("creating task...")

      await tx.wait();

      states.setTaskCreationResult("Task created!")
    }
  };
}

type State = {
  taskDefinition?: string,
  setTaskCreationResult: Dispatch<SetStateAction<string>>
};
