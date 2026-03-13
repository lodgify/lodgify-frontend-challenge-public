import { useState, useEffect, useCallback } from "react";
import type { Group } from "../types";

const API_URL =
  "https://raw.githubusercontent.com/lodgify/lodgify-frontend-challenge-public/refs/heads/master/mock-data/mock-progress.json";

interface UseProgressDataReturn {
  groups: Group[];
  loading: boolean;
  error: string | null;
  progress: number;
  toggleTask: (groupIndex: number, taskIndex: number) => void;
}

export const useProgressData = (): UseProgressDataReturn => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data: Group[]) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleTask = useCallback((groupIndex: number, taskIndex: number) => {
    setGroups((prev) =>
      prev.map((group, gi) =>
        gi === groupIndex
          ? {
              ...group,
              tasks: group.tasks.map((task, ti) =>
                ti === taskIndex ? { ...task, checked: !task.checked } : task,
              ),
            }
          : group,
      ),
    );
  }, []);

  const allTasks = groups.flatMap((g) => g.tasks);
  const totalValue = allTasks.reduce((sum, t) => sum + t.value, 0);
  const checkedValue = allTasks
    .filter((t) => t.checked)
    .reduce((sum, t) => sum + t.value, 0);
  const progress = totalValue > 0 ? (checkedValue * 100) / totalValue : 0;

  return {
    groups,
    loading,
    error,
    progress,
    toggleTask,
  };
};
