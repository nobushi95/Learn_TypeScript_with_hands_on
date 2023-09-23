import { EventListener } from "./EventListener";
import { Status, Task, statusMap } from "./Task";
import { TaskCollection } from "./TaskCollection";
import { TaskRenderer } from "./TaskRenderer";

class Application {
  private readonly eventListner = new EventListener();
  private readonly taskCollection = new TaskCollection();
  private readonly taskRenderer = new TaskRenderer(
    document.getElementById("todoList") as HTMLElement,
    document.getElementById("doingList") as HTMLElement,
    document.getElementById("doneList") as HTMLElement
  );

  start() {
    const createForm = document.getElementById("createForm") as HTMLElement;
    const deleteAddDoneTaskButton = document.getElementById(
      "deleteAllDoneTask"
    ) as HTMLElement;

    this.eventListner.add(
      "submit-handler",
      "submit",
      createForm,
      this.handleSubmit
    );
    this.eventListner.add(
      "click-handler",
      "click",
      deleteAddDoneTaskButton,
      this.handleClickDeleteAllDoneTasks
    );

    this.taskRenderer.subscribeDragAndDrop(this.handleDragAndDrop);
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();

    const titleInput = document.getElementById("title") as HTMLInputElement;

    if (!titleInput.value) return;

    const task = new Task({ tittle: titleInput.value });
    this.taskCollection.add(task);

    const deleteButtonEl = this.taskRenderer.append(task);

    this.eventListner.add(task.id, "click", deleteButtonEl, () =>
      this.handleClickDeleteTask(task)
    );

    titleInput.value = "";
  };

  private handleClickDeleteTask = (task: Task) => {
    if (!window.confirm(`${task.title}を削除してよろしいですか？`)) return;
    this.executeDeleteTask(task);
  };

  private handleDragAndDrop = (
    el: Element,
    sibling: Element | null,
    newStatus: Status
  ) => {
    const taskId = this.taskRenderer.getId(el);
    if (!taskId) return;

    const task = this.taskCollection.find(taskId);
    if (!task) return;

    task.update({ status: newStatus });
    this.taskCollection.update(task);

    console.log(sibling);
  };

  private executeDeleteTask = (task: Task) => {
    this.eventListner.remove(task.id);
    this.taskCollection.delete(task);
    this.taskRenderer.remove(task);
  };

  private handleClickDeleteAllDoneTasks = () => {
    if (!window.confirm("DONE のタスクを一括削除してもよろしいですか？"))
      return;

    const doneTasks = this.taskCollection.filter(statusMap.done);
    doneTasks.forEach((task) => this.executeDeleteTask(task));
  };
}

window.addEventListener("load", () => {
  const app = new Application();
  app.start();
});
