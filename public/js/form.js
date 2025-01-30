document.addEventListener("DOMContentLoaded", () => {
  const dateField = document.getElementById("dateCreation");
  if (dateField) {
    dateField.value = new Date().toISOString();
  }
});

