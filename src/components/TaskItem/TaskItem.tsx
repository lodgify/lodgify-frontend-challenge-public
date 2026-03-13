import type { Task } from "../../types";
import { CheckmarkIcon } from "../../assets/CheckmarkIcon";
import "./TaskItem.css";

interface TaskItemProps {
  task: Task;
  groupIndex: number;
  taskIndex: number;
  onToggle: (groupIndex: number, taskIndex: number) => void;
}

export const TaskItem = ({
  task,
  groupIndex,
  taskIndex,
  onToggle,
}: TaskItemProps) => {
  const id = `task-${groupIndex}-${taskIndex}`;

  return (
    <li className="task-item">
      <label className="task-item__label" htmlFor={id}>
        <input
          id={id}
          className="task-item__checkbox"
          type="checkbox"
          checked={task.checked}
          onChange={() => onToggle(groupIndex, taskIndex)}
        />
        <span
          className={`task-item__custom-checkbox${task.checked ? " task-item__custom-checkbox--checked" : ""}`}
          aria-hidden="true"
        >
          {task.checked && <CheckmarkIcon />}
        </span>
        <span className="task-item__description">{task.description}</span>
      </label>
    </li>
  );
};
