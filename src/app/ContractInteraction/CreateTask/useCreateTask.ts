import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  contractAddress?: string,
  contractAbi?: string,
  provider?: BrowserProvider,
  signer?: JsonRpcSigner,
  setErrorMessage: Dispatch<SetStateAction<string>>
};

export default function useCreateTask(props: Props & State) {
  return {
    // TODO: remove unecessary _events on handlers
    createTaskHandler: async () => {
      // TODO: refactor the way props are verified regarding undefined state
      if (!props.contractAddress) {
        props.setErrorMessage("You must set a contract address");

        return;
      }

      if (!props.contractAbi) {
        props.setErrorMessage("You must fetch contract interface first");

        return;
      }

      if (!props.signer || !props.provider) {
        props.setErrorMessage("You must connect your wallet first");

        return;
      }

      if (!props.taskDefinition) {
        props.setErrorMessage("You must set a task definition");

        return;
      }

      const feeData = await props.provider.getFeeData();
      const newGasPrice = feeData.gasPrice! * 15n / 10n;

      const contract = new ethers.Contract(props.contractAddress, props.contractAbi, props.signer);
      const estimatedGas = await contract.createTask.estimateGas(props.taskDefinition, { value: ethers.parseEther("0.01") });

      const options = {
        gasPrice: newGasPrice,
        gasLimit: estimatedGas * 11n / 10n,
      }

      const tx = await contract.createTask(props.taskDefinition, {
        value: ethers.parseEther("0.01"),
        ...options
      });

      props.setTaskCreationResult("creating task...")

      await tx.wait();

      props.setTaskCreationResult("Task created!")
    }
  };
}

type State = {
  taskDefinition?: string,
  setTaskCreationResult: Dispatch<SetStateAction<string>>
};
