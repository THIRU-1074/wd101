document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    const tableBody = document.getElementById("entriesTable");
  
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const dobError = document.getElementById("dobError");
    const termsError = document.getElementById("termsError");
  
    // Load data from localStorage
    loadTableData();
  
    form.addEventListener("submit", function(e) {
      e.preventDefault();
  
      // Clear previous errors
      clearErrors();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const acceptTerms = document.getElementById("acceptTerms").checked;
  
      // Validate all fields
      let valid = true;
  
      if (!name) {
        nameError.classList.remove("hidden");
        valid = false;
      }
      if (!email || !validateEmail(email)) {
        emailError.classList.remove("hidden");
        valid = false;
      }
      if (!password) {
        passwordError.classList.remove("hidden");
        valid = false;
      }
  
      // Validate date of birth
      const age = calculateAge(new Date(dob));
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()); // 55 years ago
      const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()); // 18 years ago
  
      if (!dob || new Date(dob) < minDate || new Date(dob) > maxDate) {
        dobError.classList.remove("hidden");
        valid = false;
      }
  
      // Validate terms
      if (!acceptTerms) {
        termsError.classList.remove("hidden");
        valid = false;
      }
  
      if (!valid) return;
  
      const entry = { name, email, password, dob, acceptTerms };
  
      // Save to localStorage
      saveEntry(entry);
  
      // Update the table
      addEntryToTable(entry);
  
      // Reset form
      form.reset();
    });
  
    function clearErrors() {
      nameError.classList.add("hidden");
      emailError.classList.add("hidden");
      passwordError.classList.add("hidden");
      dobError.classList.add("hidden");
      termsError.classList.add("hidden");
    }
  
    function calculateAge(dob) {
      const diffMs = Date.now() - dob.getTime();
      const ageDate = new Date(diffMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  
    function saveEntry(entry) {
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.push(entry);
      localStorage.setItem("entries", JSON.stringify(entries));
    }
  
    function loadTableData() {
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.forEach(entry => addEntryToTable(entry));
    }
  
    function addEntryToTable(entry) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border px-4 py-2">${entry.name}</td>
        <td class="border px-4 py-2">${entry.email}</td>
        <td class="border px-4 py-2">${entry.password}</td>
        <td class="border px-4 py-2">${entry.dob}</td>
        <td class="border px-4 py-2">${entry.acceptTerms ? "true" : "false"}</td>
      `;
      tableBody.appendChild(row);
    }
  });
  