// ---------- LOGIN FUNCTION ----------
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("appSection").style.display = "block";
  } else {
    document.getElementById("loginMessage").innerText = "Invalid username or password.";
  }
}

// ---------- DATA ----------
const dutyNumbers = [
  "156/4", "156/6", "156/10", "213/4", "213/6", "213/8", "213/10", "213/12",
  "213/14", "213/16", "213/18", "213/20",
  // बाकी सभी duty numbers यहाँ डालें जैसे आपने पहले भेजे थे
];

const busNumbers = [
  4990, 5034, 5036
  // जितने भी bus नंबर हैं, सभी यहां जोड़ सकते हैं
];

// Driver Numbers (example, add your list here)
const driverNumbers = [
  "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010"
];

let savedData = [];

const container = document.getElementById('form-container');

function createRow(dutyNo) {
  const row = document.createElement('div');
  row.innerHTML = `
    <table>
      <tr>
        <td><input type="text" value="${dutyNo}" readonly /></td>
        <td>
          <input list="busList" placeholder="Bus No" />
          <datalist id="busList">
            ${busNumbers.map(b => `<option value="${b}">`).join('')}
          </datalist>
        </td>
        <td>
          <input list="driverList" placeholder="Driver No" maxlength="4" />
          <datalist id="driverList">
            ${driverNumbers.map(d => `<option value="${d}">`).join('')}
          </datalist>
        </td>
        <td><input type="number" placeholder="Out KM" oninput="autoTotal(this)" /></td>
        <td><input type="number" placeholder="In KM" oninput="autoTotal(this)" /></td>
        <td><input type="number" placeholder="Total KM" readonly /></td>
        <td><button onclick="saveRow(this)">Save</button></td>
        <td><button onclick="resetRow(this)">Reset</button></td>
      </tr>
    </table>
  `;
  container.appendChild(row);
}

dutyNumbers.forEach(createRow);

function autoTotal(input) {
  const row = input.closest("tr");
  const outKm = parseInt(row.children[3].querySelector("input").value) || 0;
  const inKm = parseInt(row.children[4].querySelector("input").value) || 0;
  const totalKm = inKm - outKm;
  row.children[5].querySelector("input").value = totalKm > 0 ? totalKm : '';
}

function saveRow(button) {
  const row = button.closest('tr');
  const inputs = row.querySelectorAll('input');
  const values = Array.from(inputs).map(input => input.value);
  savedData.push(values);
  
  // Mark row as saved by changing its background color to yellow
  row.style.backgroundColor = 'yellow';
}

function resetRow(button) {
  const row = button.closest('tr');
  const inputs = row.querySelectorAll('input');
  inputs.forEach(input => {
    if (!input.readOnly) input.value = '';
  });
  
  // Reset background color to default when row is reset
  row.style.backgroundColor = '';
}

function downloadCSV() {
  if (savedData.length === 0) {
    alert("No data to download!");
    return;
  }

  let csv = "Duty No,Bus No,Driver No,Out KM,In KM,Total KM\n";
  savedData.forEach(row => {
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kilometer_records.csv";
  a.click();
}
