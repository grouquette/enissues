document.addEventListener("DOMContentLoaded", () => {
  const dateField = document.getElementById("date");
  if (dateField) {
    dateField.value = new Date().toISOString();
  }
});

