// Event listener for birth date change to auto-fill the initial part of the personal code
document.getElementById("birthDate").addEventListener("change", function () {
    const birthDate = new Date(this.value);
    const today = new Date();

    // Validate the birth date: must be a valid date and not in the future
    if (isNaN(birthDate) || birthDate > today) {
        alert("Please enter a valid birth date.");
        this.value = ""; // Clear the invalid birth date
        document.getElementById("personalCode").value = ""; // Clear the personal code field
        return;
    }

    const year = birthDate.getFullYear();
    const month = String(birthDate.getMonth() + 1).padStart(2, '0'); // Month index starts from 0
    const day = String(birthDate.getDate()).padStart(2, '0');

    // Determine the first digit of the personal code based on gender and birth year
    let firstDigit;
    const gender = document.getElementById("gender").value;
    if (gender === "male") {
        firstDigit = year < 2000 ? "3" : "5";
    } else {
        firstDigit = year < 2000 ? "4" : "6";
    }

    // Format the personal code as "xyymmdd____"
    const partialPersonalCode = `${firstDigit}${String(year).slice(2)}${month}${day}`;
    document.getElementById("personalCode").value = partialPersonalCode;
});

// Event listener for gender change to update personal code if birth date is already entered
document.getElementById("gender").addEventListener("change", function () {
    if (document.getElementById("birthDate").value) {
        // Trigger birth date change event to update the personal code
        document.getElementById("birthDate").dispatchEvent(new Event("change"));
    }
});

// Allow user to manually input the last four digits of the personal code
document.getElementById("personalCode").addEventListener("input", function () {
    // Regex to ensure the personal code format: x-yy-mm-dd- followed by up to 4 user-entered digits
    const requiredFormat = /^(\d\d{2}\d{2}\d{2})(\d{0,4})$/;
    const match = this.value.match(requiredFormat);

    // Only allow the user to modify the last four digits of the personal code
    if (match) {
        this.value = match[1] + match[2]; // Preserve auto-filled part, allow manual entry of last four digits
    } else {
        this.value = document.getElementById("personalCode").value; // Revert to last valid state if format is incorrect
    }
});

// Form submission handler to gather all form data
document.getElementById("clientForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const formData = {
        gender: document.getElementById("gender").value,
        firstName: document.getElementById("firstName").value,
        middleName: document.getElementById("middleName").value,
        lastName: document.getElementById("lastName").value,
        birthDate: document.getElementById("birthDate").value,
        personalCode: document.getElementById("personalCode").value,
        education: document.getElementById("education").value,
        lastInstitution: document.getElementById("lastInstitution").value,
        graduationYear: document.getElementById("graduationYear").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        maritalStatus: document.getElementById("maritalStatus").value,
        spouseName: document.getElementById("spouseName").value,
        professionalStatus: document.getElementById("professionalStatus").value,
    };
});
