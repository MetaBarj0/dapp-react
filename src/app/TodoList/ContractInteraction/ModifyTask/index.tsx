import { useState } from "react";
import useModifyTask, { Props } from "./useModifyTask"

const ModifyTask = (props: Props) => {
  const [taskId, setTaskId] = useState<bigint>(0n);
  const [taskDefinition, setTaskDefinition] = useState("");
  const [taskStatus, setTaskStatus] = useState<number>();
  const [taskModificationResult, setTaskModificationResult] = useState("");

  const use = useModifyTask(
    props,
    {
      taskId,
      taskDefinition,
      taskStatus,
      setTaskModificationResult
    });

  return (
    <div className="grid grid-cols-[25%_37%_38%] mt-2">
      <button className="bg-red-800 mr-2 rounded-md" onClick={use.createTaskHandler}>modifyTask</button>

      <div>
        <input className="w-full rounded-md bg-gray-800 fg-gray-500 mb-1"
          type="number" min={0} defaultValue={0}
          onChange={e => { setTaskId(BigInt(e.target.value)); }}
          placeholder="Task Id" />

        <input className="w-full rounded-md bg-gray-800 fg-gray-500 mb-1"
          onBlur={e => { setTaskDefinition(e.target.value); }}
          placeholder="New task definition" />

        <select
          className="w-full rounded-md, bg-gray-800 from-gray-500"
          onChange={e => { setTaskStatus(Number(e.target.value)) }}>
          <option value="">-- select status</option>
          <option value={0}>Todo</option>
          <option value={1}>Doing</option>
          <option value={2}>Done</option>
        </select>
      </div>

      <label className="bg-zinc-800 ml-2">{taskModificationResult}</label>
    </div>
  )
}

export default ModifyTask;
