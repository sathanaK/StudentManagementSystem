const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
const count = document.getElementById("studentCount");
let students = JSON.parse(localStorage.getItem("students") || "[]");

function renderStudents() {
  list.innerHTML = "";
  count.textContent = `${students.length} student${students.length === 1 ? "" : "s"}`;
  if (students.length === 0) {
    list.innerHTML = '<tr class="empty"><td colspan="4">No students added yet.</td></tr>';
    return;
  }
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    [student.name, student.registerNo, student.department].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => {
      students.splice(index, 1);
      saveAndRender();
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    list.appendChild(row);
  });
}

function saveAndRender() {
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const student = {
    name: document.getElementById("studentName").value.trim(),
    registerNo: document.getElementById("registerNo").value.trim(),
    department: document.getElementById("department").value.trim()
  };
  if (!student.name || !student.registerNo || !student.department) return;
  students.push(student);
  form.reset();
  saveAndRender();
});

renderStudents();
