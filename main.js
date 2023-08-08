let tagsArray = [];
let tasksArray = [];
let searchMode = "AND";

// タグを追加する関数
function addTag() {
  const tagInput = document.getElementById("tagInput");
  const tag = tagInput.value.trim();
  if (tag !== "") {
    tagsArray.push(tag);
    tagInput.value = "";
    updateTagList();
  }
}

// タスクを追加する関数
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task !== "") {
    const activeTags = document.querySelectorAll(".tag-button.active");
    activeTags.forEach((tagButton) => tagButton.classList.remove("active"));

    tasksArray.push(task);
    taskInput.value = "";
    updateTaskList();
  }
}

document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

document
  .getElementById("tagInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTag();
    }
  });

// タグ一覧を更新する関数
function updateTagList() {
  const tagsContainer = document.getElementById("tags");
  tagsContainer.innerHTML = "";
  tagsArray.forEach((tag) => {
    const tagButton = document.createElement("button");
    tagButton.textContent = tag;
    tagButton.classList.add("tag-button");
    tagButton.onclick = function () {
      this.classList.toggle("active");
      updateTaskList();
    };
    tagsContainer.appendChild(tagButton);
  });
}

// タスクを削除する関数
function deleteTask(index) {
  if (index >= 0 && index < tasksArray.length) {
    tasksArray.splice(index, 1);
    updateTaskList();
  }
}

function toggleSearchMode() {
  searchMode = searchMode === "AND" ? "OR" : "AND";
  updateTaskList();
  document.getElementById("searchModeToggle").innerHTML = "search mode: " + searchMode;
}


// モード切替ボタンのクリックイベントハンドラを追加
document
  .getElementById("searchModeToggle")
  .addEventListener("click", toggleSearchMode);

// タスクのリストアイテムを作成する関数
function createTaskListItem(task, index) {
  const listItem = document.createElement("li");
  listItem.textContent = task;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.onclick = function () {
    deleteTask(index);
  };

  listItem.appendChild(deleteButton);
  return listItem;
}

// updateTaskList関数
function updateTaskList() {
  const tasksList = document.getElementById("tasks");
  tasksList.innerHTML = "";
  const activeTags = document.querySelectorAll(".tag-button.active");
  const activeTagsArray = Array.from(activeTags).map(
    (tagButton) => tagButton.textContent
  );

  tasksArray.forEach((task, index) => {
    if (activeTagsArray.length === 0) {
      const listItem = createTaskListItem(task, index);
      tasksList.appendChild(listItem);
    } else {
      let taskShouldBeShown = false;
      if (searchMode == "AND") {
        if (activeTagsArray.every((tag) => task.includes(tag))) {
          taskShouldBeShown = true;
        }
      } else if (searchMode == "OR") {
        if (activeTagsArray.some((tag) => task.includes(tag))) {
          taskShouldBeShown = true;
        }
      }

      if (taskShouldBeShown) {
        const listItem = createTaskListItem(task, index);
        tasksList.appendChild(listItem);
      }
    }
  });
}
