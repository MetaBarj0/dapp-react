import { useState } from "react";
import useTasks, { Props, Task } from "./useTasks";

const Tasks = (props: Props) => {
  const [taskId, setTaskId] = useState(0n);
  const [task, setTask] = useState<Task>();

  const use = useTasks({
    taskId,
    setTask,
    ...props
  });

  return (
    <div className="grid grid-cols-[20%_20%_60%] mt-2">
      <button className="bg-blue-800 mr-2 rounded-md" onClick={use.tasksHandler}>tasks</button>

      <input type="number" min={0} defaultValue={0}
        className="w-full rounded-md bg-gray-800 fg-gray-500"
        onChange={e => { setTaskId(BigInt(e.target.value)); }} />

      <label className="bg-zinc-800 ml-2 whitespace-pre-wrap">{use.formatTask(task)}</label>
    </div>
  );
}

export default Tasks;
