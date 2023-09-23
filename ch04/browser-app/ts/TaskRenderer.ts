import { Task } from "./Task";

export class TaskRenderer {
  constructor(private readonly todoList: HTMLElement) {}

  append(task: Task): HTMLButtonElement {
    const { taskEl, deleteButtonEl } = this.render(task);
    this.todoList.append(taskEl);
    return deleteButtonEl;
  }

  remove(task: Task) {
    const taskEl = document.getElementById(task.id);
    if (!taskEl) return;

    this.todoList.removeChild(taskEl);
  }

  private render(task: Task): {
    taskEl: HTMLSpanElement;
    deleteButtonEl: HTMLButtonElement;
  } {
    // <div class="taskItem">
    //   <span>タイトル</span>
    //   <button>削除</button>
    // </div>

    const taskEl = document.createElement("div");
    const spanEl = document.createElement("span");
    const deleteButtonEl = document.createElement("button");

    taskEl.id = task.id;
    taskEl.classList.add("task-item");

    spanEl.textContent = task.title;
    deleteButtonEl.textContent = "削除";

    taskEl.append(spanEl, deleteButtonEl);

    return { taskEl, deleteButtonEl };
  }
}