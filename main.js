let tagsArray = [];
let tasksArray = [];

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

function updateTaskList() {
  const tasksList = document.getElementById("tasks");
  tasksList.innerHTML = "";
  const activeTags = document.querySelectorAll(".tag-button.active");
  const activeTagsArray = Array.from(activeTags).map(
    (tagButton) => tagButton.textContent
  );
  tasksArray.forEach((task) => {
    if (activeTagsArray.length === 0) {
      // すべてのタグが非アクティブの場合、全てのタスクを表示
      const listItem = document.createElement("li");
      listItem.textContent = task;
      tasksList.appendChild(listItem);
    } else {
      // アクティブなタグに関連するタスクのみ表示
      let foundAllTags = true;
      for (const tag of activeTagsArray) {
        if (!task.includes(tag)) {
          foundAllTags = false;
          break;
        }
      }
      if (foundAllTags) {
        const listItem = document.createElement("li");
        listItem.textContent = task;
        tasksList.appendChild(listItem);
      }
    }
  });
}
