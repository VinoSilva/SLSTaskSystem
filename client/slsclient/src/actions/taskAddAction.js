export const SHOWADDTASK = "SHOWADDTASK";
export const HIDEADDTASK = "HIDEADDTASK";

export function showAddTask() {
  return { type: SHOWADDTASK };
}

export function hideAddTask() {
  return { type: HIDEADDTASK };
}
