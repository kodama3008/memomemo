const taskValue = document.getElementsByClassName("task_value")[0];
const taskSubmit = document.getElementsByClassName("task_submit")[0];
const taskList = document.getElementsByClassName("task_list")[0];
const tasksArray = []; // タスクを格納する配列

// タスクを生成
const createTask = (task) => {
  console.log(task);
  tasksArray.push(task); // タスクを配列に追加
};

// 追加ボタンを作成
const addTasks = (task) => {
  if (task !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      deleteTasks(deleteButton);
    });

    taskList.appendChild(listItem);
  }
};

// 削除ボタンにタスクを消す機能を付与
const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest("li");
  taskList.removeChild(chosenTask);
};

taskSubmit.addEventListener("click", (evt) => {
  evt.preventDefault();
  const task = taskValue.value;
  createTask(task);
  addTasks(task);
  taskValue.value = "";
});

// 例: ページロード時に既存タスクを配列から表示
tasksArray.forEach((task) => {
  addTasks(task);
});
