// @ts-nocheck
const inputText = document.getElementById("userInput");
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const addToList = () => {
  itemsArray.push({ id: new Date().getTime(), text: inputText.value });
  localStorage.setItem("items", JSON.stringify(itemsArray));
  addTask(itemsArray[itemsArray.length - 1]);
  inputText.value = "";
};

inputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addToList();
  }
});

const addTask = (item) => {
  console.log(item.text);
  if (!item.text) return;
  const li = document.createElement("li");
  const btn = document.createElement("button");
  li.textContent = item.text;
  li.classList.add("list-group-item", "list-group-item-success");

  btn.classList.add("btn", "btn-danger", "bi", "bi-trash");
  document.getElementById("list").appendChild(li).appendChild(btn);
  btn.onclick = function () {
    removeTask(item.id);

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
