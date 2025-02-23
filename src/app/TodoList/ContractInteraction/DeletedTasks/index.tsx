import { useState } from "react";
import useDeletedTasks, { Props } from "./useDeletedTasks";

const DeletedTasks = (props: Props) => {
  const [taskId, setTaskId] = useState(0n);
  const [deletedTask, setDeletedTask] = useState<boolean>();

  const use = useDeletedTasks({
    taskId,
    setDeletedTask,
    deletedTask,
    ...props
  });

  return (
    <div className="grid grid-cols-[30%_20%_50%] mt-2">
      <button className="bg-blue-800 mr-2 rounded-md" onClick={use.tasksHandler}>deletedTasks</button>

      <input type="number" min={0} defaultValue={0}
        className="w-full rounded-md bg-gray-800 fg-gray-500"
        onBlur={e => { setTaskId(BigInt(e.target.value)); }} />

      <label className="bg-zinc-800 ml-2" >{use.formatDeletedTask()}</label>
    </div>
  );
}

export default DeletedTasks;
