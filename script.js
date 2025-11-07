import { alert, success, error, notice } from "https://cdn.jsdelivr.net/npm/@pnotify/core/+esm";

const keys = ["a","s","d","f","g","h","j","k","l","z"];
let currentKeyIndex = 0;
const keyElement = document.getElementById("key");
const newGameBtn = document.getElementById("newGameBtn");

function setNewKey() {
  currentKeyIndex = Math.floor(Math.random() * keys.length);
  keyElement.textContent = keys[currentKeyIndex];
  notice({ text: `Натисни клавішу "${keys[currentKeyIndex].toUpperCase()}"` });
}

setNewKey();

document.addEventListener("keydown", (event) => {
  const pressed = event.key.toLowerCase();
  if (pressed === keys[currentKeyIndex]) {
    success({ text: "✅ Правильно!" });
    setNewKey();
  } else {
    error({ text: `❌ Неправильно! Ти натиснув "${pressed}"` });
  }
});

document.addEventListener("keypress", (event) => event.preventDefault());

newGameBtn.addEventListener("click", () => {
  setNewKey();
  alert({ text: "🔄 Нова гра розпочата!" });
});

const chartData = {
  labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
  datasets: [{
    label: "Продажі за останній місяць",
    data: [150,220,180,200,250,300,280,350,400,380,420,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350],
    borderColor: "#2196f3",
    backgroundColor: "rgba(33,150,243,0.2)",
    borderWidth: 2,
    fill: true,
    tension: 0.4
  }]
};

const ctx = document.getElementById("sales-chart").getContext("2d");

new Chart(ctx, {
  type: "line",
  data: chartData,
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true, ticks: { stepSize: 100 } } }
  }
});
