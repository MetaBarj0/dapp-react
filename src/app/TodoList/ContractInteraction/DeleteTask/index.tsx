import { useState } from "react";
import useDeleteTask, { Props } from "./useDeleteTask"

const DeleteTask = (props: Props) => {
  const [taskId, setTaskId] = useState(0n);
  const [taskCreationResult, setTaskCreationResult] = useState("");

  const use = useDeleteTask(
    props,
    {
      taskId,
      setTaskCreationResult
    });

  return (
    <div className="grid grid-cols-[25%_37%_38%] mt-2">
      <button className="bg-red-800 mr-2 rounded-md" onClick={use.deleteTaskHandler}>deleteTask</button>

      <input type="number" min={0} defaultValue={0}
        className="w-full rounded-md bg-gray-800 fg-gray-500"
        onChange={e => { setTaskId(BigInt(e.target.value)); }} />

      <label className="bg-zinc-800 ml-2">{taskCreationResult}</label>
    </div>
  )
}

export default DeleteTask;
