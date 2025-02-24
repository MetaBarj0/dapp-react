import { useState } from "react";
import useCreateTask, { Props } from "./useCreateTask"

const CreateTask = (props: Props) => {
  const [taskDefinition, setTaskDefinition] = useState("");
  const [taskCreationResult, setTaskCreationResult] = useState("");

  const use = useCreateTask(
    props,
    {
      taskDefinition,
      setTaskCreationResult
    });

  return (
    <div className="grid grid-cols-[25%_37%_38%] mt-2">
      <button className="bg-red-800 mr-2 rounded-md" onClick={use.createTaskHandler}>createTask</button>

      <input className="w-full rounded-md bg-gray-800 fg-gray-500"
        onBlur={e => { setTaskDefinition(e.target.value); }} />

      <label className="bg-zinc-800 ml-2">{taskCreationResult}</label>
    </div>
  )
}

export default CreateTask;
