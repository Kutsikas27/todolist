// @ts-nocheck
const inputText = document.getElementById("userInput");
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
console.log(itemsArray);
const addToList = () => {
  itemsArray.push(inputText.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  addTask(inputText.value);
  inputText.value = "";
};

inputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addToList();
  }
});

const addTask = (text) => {
  if (!text) return;
  const li = document.createElement("li");
  const btn = document.createElement("button");
  li.textContent = text;
  li.classList.add("list-group-item", "list-group-item-success");

  btn.classList.add("btn", "btn-danger", "bi", "bi-trash");
  document.getElementById("list").appendChild(li).appendChild(btn);
  btn.onclick = function () {
    removeTask(text);

    document.getElementById("list").removeChild(li);
  };
};

const clearAllTasks = () => {
  localStorage.clear();
  document.getElementById("list").innerHTML = "";
  itemsArray = [];
};

const removeTask = (item) => {
  itemsArray.splice(itemsArray.indexOf(item), 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
};
itemsArray.forEach(addTask);
