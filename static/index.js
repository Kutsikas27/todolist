// @ts-nocheck
const inputText = document.getElementById("userInput");
const addTaskButton = document.getElementById("addTask");
const output = document.getElementById("output");

const text = inputText.value;
console.log(text);
fetch("/text")
  .then((response) => response.json())
  .then((data) =>
    data.input.map((item) => {
      addTask(item);
    })
  );

addTaskButton.addEventListener("click", () => {
  fetch("/text", {
    method: "POST",
    body: JSON.stringify({ input: text }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
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
    document.getElementById("list").removeChild(li);
  };
};
