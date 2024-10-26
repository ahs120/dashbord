const input = document.getElementById("inp");
const addBtn = document.getElementById("btnadd");
const taskList = document.getElementById("tasklist");

// دالة لإضافة مهمة جديدة
function addTask() {
  addBtn.addEventListener("click", function () {
    const taskName = input.value;
    const tasks = Array.from(taskList.children);
    const isTaskExist = tasks.some((task) =>
      task.textContent.includes(taskName)
    );
    if (isTaskExist || taskName === "") {
      input.value = "";
      return;
    }

    const newTask = document.createElement("div");
    newTask.innerHTML = `${taskName}`;
    newTask.style.cssText =
      "display:flex ;  justify-content: space-between; align-items: center; background-color: #fff; width: 100%; padding: 8px; margin-bottom: 15px";

    const delBtn = document.createElement("span");
    delBtn.innerHTML = "Delete";
    delBtn.style.cssText =
      "background: red; color: #fff; border-radius: 14px; padding: 8px; font-size: 8px; font-weight: 600; cursor: pointer;";

    // حذف المهمة
    delBtn.addEventListener("click", (e) => {
      newTask.remove();
      removeTaskFromStorage(taskName); // إزالة المهمة من التخزين
    });

    newTask.appendChild(delBtn);
    taskList.appendChild(newTask);
    input.value = "";

    saveTaskToStorage(taskName); // حفظ المهمة في التخزين
  });
}

// دالة لحفظ المهمة في localStorage
function saveTaskToStorage(taskName) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskName);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// دالة لإزالة المهمة من localStorage
function removeTaskFromStorage(taskName) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task !== taskName);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// دالة لعرض المهام المحفوظة عند تحميل الصفحة
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskName) => {
    const newTask = document.createElement("div");
    newTask.innerHTML = `${taskName}`;
    newTask.style.cssText =
      "display:flex ;  justify-content: space-between; align-items: center; background-color: #fff; width: 100%; padding: 8px; margin-bottom: 15px";

    const delBtn = document.createElement("span");
    delBtn.innerHTML = "Delete";
    delBtn.style.cssText =
      "background: red; color: #fff; border-radius: 14px; padding: 8px; font-size: 8px; font-weight: 600; cursor: pointer;";

    delBtn.addEventListener("click", (e) => {
      newTask.remove();
      removeTaskFromStorage(taskName); // إزالة المهمة من التخزين
    });

    newTask.appendChild(delBtn);
    taskList.appendChild(newTask);
  });
}

// استدعاء دالة تحميل المهام عند تحميل الصفحة
loadTasks();
addTask();
