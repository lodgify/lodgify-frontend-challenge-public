import { useState } from "react";
import type { Group } from "../../types";
import { ChevronIcon } from "../../assets/ChevronIcon";
import { ClipboardIcon } from "../../assets/ClipboardIcon";
import { TaskItem } from "../TaskItem/TaskItem";
import "./AccordionGroup.css";

interface AccordionGroupProps {
  group: Group;
  groupIndex: number;
  onToggleTask: (groupIndex: number, taskIndex: number) => void;
}

export const AccordionGroup = ({
  group,
  groupIndex,
  onToggleTask,
}: AccordionGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-group">
      <div
        className="accordion-group__header"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <ClipboardIcon />
        <span className="accordion-group__name">{group.name}</span>
        <div className="accordion-group__toggle">
          <span className="accordion-group__toggle-label">
            {isOpen ? "Hide" : "Show"}
          </span>
          <ChevronIcon
            className={`accordion-group__chevron${isOpen ? " accordion-group__chevron--open" : ""}`}
          />
        </div>
      </div>

      {isOpen && (
        <ul className="accordion-group__body" role="list">
          {group.tasks.map((task, taskIndex) => (
            <TaskItem
              key={taskIndex}
              task={task}
              groupIndex={groupIndex}
              taskIndex={taskIndex}
              onToggle={onToggleTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
