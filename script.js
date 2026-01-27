// -------------------
// 1️⃣ Fixed schedule
// -------------------
const schedule = {
  "Saturday":   [{chore: "ঝাড়ু", person: "Sam"}],
  "Sunday":     [{chore: "ময়লা ফেলা", person: "Nur"}],
  "Monday":     [{chore: "ঝাড়ু", person: "Ashmit"}],
  "Tuesday":    [{chore: "ময়লা ফেলা", person: "Imti"}],
  "Wednesday":  [{chore: "ঝাড়ু", person: "Nur"}],
  "Thursday":   [{chore: "ময়লা ফেলা", person: "Sam"}],
  "Friday":     [{chore: "ঝাড়ু", person: "Imti"}],
  // next Saturday → continue rotation
  "NextSaturday": [{chore: "ময়লা ফেলা", person: "Ashmit"}]
};

// -------------------
// 2️⃣ Get today
// -------------------
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const today = days[new Date().getDay()];
const todaysChores = schedule[today];

// -------------------
// 3️⃣ Display duties on page
// -------------------
const dutyDiv = document.getElementById("duty");
const completed = {};

todaysChores.forEach(item => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <b>${item.chore}</b> - ${item.person}<br><br>
    <button onclick="markDone('${item.chore}', '${item.person}', this)">Complete</button>
  `;
  dutyDiv.appendChild(div);
});

// -------------------
// 4️⃣ Enable Notification
// -------------------
function enableNotification() {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      notifyTodaysChores();
    }
  });
}

// -------------------
// 5️⃣ Notify today's chores
// -------------------
function notifyTodaysChores() {
  todaysChores.forEach(item => {
    if (Notification.permission === "granted") {
      new Notification("Daily Duty", { 
        body: `আজ তোমার কাজ: ${item.chore} - ${item.person}`,
        icon: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
      });
    }
  });
}

// -------------------
// 6️⃣ Complete Button + Animation
// -------------------
function markDone(chore, person, btn) {
  completed[chore + "_" + person] = true;

  localStorage.setItem(chore + "_" + person, 1);

  btn.innerText = "✔ Done";
  btn.classList.add("done");
  btn.parentElement.classList.add("fade");

  if (Notification.permission === "granted") {
    new Notification("Daily Duty", {
      body: `${chore} complete ✅`
    });
  }
}

// -------------------
// 7️⃣ Penalty logic (optional)
// -------------------
function checkPenalty() {
  todaysChores.forEach(item => {
    if(!completed[item.chore + "_" + item.person]){
      const key = item.chore + "_penalty";
      const currentPenalty = localStorage.getItem(key) || 1;
      localStorage.setItem(key, currentPenalty*2);
    } else {
      const key = item.chore + "_penalty";
      localStorage.setItem(key, 1);
    }
  });
}
