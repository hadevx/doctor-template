const slitRows = [
  ["Cornea", "Clear",        "Clear"],
  ["AC",     "D&Q",          "D&Q"],
  ["Iris",   "Healthy",      "Healthy"],
  ["Pupil",  "RRR, (-) APD", "RRR, (-) APD"],
  ["Lens",   "Clear",        "Clear"],
];

function buildSlitLamp() {
  const tbody = document.getElementById("slitLampBody");
  slitRows.forEach(([struct, odDef, osDef]) => {
    const tr = document.createElement("tr");
    tr.innerHTML =
      `<td class="od-cell"><input type="text" value="${odDef}" data-struct="${struct}" data-side="od" /></td>` +
      `<td class="struct-cell">${struct}</td>` +
      `<td class="os-cell"><input type="text" value="${osDef}" data-struct="${struct}" data-side="os" /></td>`;
    tbody.appendChild(tr);
  });
}

function updateDate() {
  document.getElementById("datetime").textContent = new Date().toLocaleDateString("en-GB", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
  });
}

function v(id) { return document.getElementById(id).value; }
function sv(id, val) { const el = document.getElementById(id); if (el) el.value = val ?? ""; }
function line(label, val) { return val && val.trim() ? label + ": " + val.trim() + "\n" : ""; }

function copyAll() {
  const vaOD = (v("vaODNum") || "__") + "/20";
  const vaOS = (v("vaOSNum") || "__") + "/20";

  let slit = "\nSLIT LAMP:\n" + "─".repeat(52) + "\n";
  slit += "OD".padEnd(22) + "Structure".padEnd(14) + "OS\n" + "─".repeat(52) + "\n";
  document.querySelectorAll("#slitLampBody tr").forEach(tr => {
    const inputs = tr.querySelectorAll("input");
    const struct = tr.querySelector(".struct-cell")?.textContent ?? "";
    slit += (inputs[0]?.value ?? "").padEnd(22) + struct.padEnd(14) + (inputs[1]?.value ?? "") + "\n";
  });

  let text = "";
  text += line("PATIENT PRESENTED WITH", v("presentedWith"));
  text += line("KCO", v("kco"));
  text += line("O/E", v("oe"));
  text += "UAVA: OD " + vaOD + "   OS " + vaOS + "\n";
  text += slit;
  text += line("\nFUNDUS", v("fundus"));
  text += line("ORTHOPTIC", v("orthoptic"));
  text += line("FP", v("fp"));
  text += line("ABNORMAL HEAD POSTURE", v("ahp"));
  text += line("NYSTAGMUS", v("nystagmus"));
  text += line("EOM", v("eom"));
  text += line("ARCT", v("arct"));
  text += line("\nIMP", v("imp"));
  text += line("PLAN", v("plan"));

  navigator.clipboard.writeText(text.trim()).then(() => toast("Copied to clipboard")).catch(() => {
    const ta = Object.assign(document.createElement("textarea"), {
      value: text.trim(), style: "position:fixed;opacity:0"
    });
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    toast("Copied to clipboard");
  });
}

function clearForm() {
  if (!confirm("Clear all fields and reset to defaults?")) return;
  ["presentedWith","kco","oe","vaODNum","vaOSNum","fundus","orthoptic",
   "fp","ahp","nystagmus","eom","arct","imp","plan"].forEach(id => sv(id, ""));
  document.querySelectorAll("#slitLampBody input").forEach(inp => {
    const row = slitRows.find(r => r[0] === inp.dataset.struct);
    if (row) inp.value = inp.dataset.side === "od" ? row[1] : row[2];
  });
  toast("Form cleared");
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2400);
}

buildSlitLamp();
updateDate();
