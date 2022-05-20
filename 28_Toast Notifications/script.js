const button = document.getElementById("button");
const toasts = document.getElementById("toasts");

const messages = [
  "Message One",
  "Message Two",
  "Message Three",
  "Message Four",
];

const type = ["info", "success", "error"];

button.addEventListener("click", () => createNotifications());

function createNotifications(messages = null, type = null) {
  const notif = document.createElement("div");
  notif.classList.add("toast");

  notif.classList.add(type ? type : getRandomType());
  notif.innerText = messages ? messages : getRandomMessage();

  toasts.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 3000);
}

function myCreateNotifications() {
  const newMessage = document.createElement("div");
  newMessage.setAttribute("class", "toast");
  newMessage.textContent = getRandomMessage();
  toasts.appendChild(newMessage);

  setTimeout(() => {
    newMessage.style.display = "none";
  }, 3000);
}

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomType() {
  return type[Math.floor(Math.random() * type.length)];
}
