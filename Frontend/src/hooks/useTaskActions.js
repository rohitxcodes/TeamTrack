import { useState } from "react";
import {
  createGroupTask,
  updateGroupTask,
  deleteGroupTask,
} from "../api/group.api";

export function useTaskActions(groupId, onSuccess) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [creatingTask, setCreatingTask] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);
  const [updatingTask, setUpdatingTask] = useState(false);

  async function createTask(payload) {
    if (!groupId) return;
    setCreatingTask(true);
    setMessage("");
    setError("");
    try {
      await createGroupTask(groupId, payload);
      setMessage("Task created successfully");
      onSuccess?.();
    } catch (err) {
      setError(err?.message || "Failed to create task");
    } finally {
      setCreatingTask(false);
    }
  }

  async function deleteTask(taskId) {
    if (!groupId || !taskId) return;
    setDeletingTask(true);
    setError("");
    try {
      await deleteGroupTask(groupId, taskId);
      setMessage("Task deleted successfully");
      onSuccess?.();
    } catch (err) {
      setError(err?.message || "Failed to delete task");
    } finally {
      setDeletingTask(false);
    }
  }

  async function updateTaskStatus(taskId, status) {
    if (!groupId || !taskId) return;
    setUpdatingTask(true);
    setError("");
    try {
      await updateGroupTask(groupId, taskId, { status });
      onSuccess?.();
    } catch (err) {
      setError(err?.message || "Failed to update task");
    } finally {
      setUpdatingTask(false);
    }
  }

  function clearMessages() {
    setMessage("");
    setError("");
  }

  return {
    createTask,
    deleteTask,
    updateTaskStatus,
    message,
    error,
    clearMessages,
    creatingTask,
    deletingTask,
    updatingTask,
  };
}
