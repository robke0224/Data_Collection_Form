// Validate all required fields in the current step
function validateStepFields(stepNumber) {
    const stepElement = document.getElementById(`step${stepNumber}`);
    const requiredFields = stepElement.querySelectorAll("[required]");
    let allValid = true;

    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            allValid = false;
            field.classList.add("error"); // Highlight the field if empty
        } else {
            field.classList.remove("error"); // Remove highlight if valid
        }
    });

    if (!allValid) {
        alert("Please fill in all mandatory fields.");
    }

    return allValid;
}

// Validate personal code input
document.getElementById("personal-code").addEventListener("input", function () {
    const personalCode = this.value;

    // Allow only numbers and limit to 11 characters
    if (!/^\d*$/.test(personalCode)) {
        this.value = personalCode.replace(/\D/g, ""); // Remove non-numeric characters
    }
    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11); // Limit to 11 characters
    }
});

// Handle marital status change
document
    .getElementById("marital-status")
    .addEventListener("change", function () {
        document.getElementById("spouse-info").style.display =
            this.value === "married" ? "block" : "none";
    });

// Handle profession status change
document
    .getElementById("profession-status")
    .addEventListener("change", function () {
        const value = this.value;
        document.getElementById("study-info").style.display =
            value === "studying" || value === "workingandstudying" ? "block" : "none";
        document.getElementById("work-info").style.display =
            value === "working" || value === "workingandstudying" ? "block" : "none";
        document.getElementById("unemployment-info").style.display =
            value === "unemployed" ? "block" : "none";
        document.getElementById("leave-info").style.display =
            value === "parental-leave" ? "block" : "none";
    });

// Start survey
function startSurvey() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("survey-form").style.display = "block";
    document.getElementById("step1").style.display = "block";

    document.getElementById("progress-container").style.display = "block";
    document.getElementById("progress-message").style.display = "block";
    updateProgressBar();
    updateProgressMessage();
}

// Calculate birthdate based on personal code
function calculateBirthdate() {
    const personalCode = document.getElementById("personal-code").value;
    if (personalCode.length === 11) { // Ensure personal code is exactly 11 digits
        const centuryCode = personalCode.charAt(0);
        const year = parseInt(personalCode.substring(1, 3), 10);
        const month = parseInt(personalCode.substring(3, 5), 10);
        const day = parseInt(personalCode.substring(5, 7), 10);

        let fullYear;
        if (centuryCode === "3" || centuryCode === "4") {
            fullYear = 1900 + year;
        } else if (centuryCode === "5" || centuryCode === "6") {
            fullYear = 2000 + year;
        } else {
            document.getElementById("birthdate").value = "";
            return;
        }

        const birthdate = `${fullYear}-${String(month).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
        document.getElementById("birthdate").value = birthdate;
    } else {
        document.getElementById("birthdate").value = ""; // Clear if not valid
    }
}

// Toggle qualification fields based on education level
function toggleQualificationFields() {
    const education = document.getElementById("education").value;
    const qualificationFields = document.getElementById("qualification-fields");

    if (
        education === "vocational" ||
        education === "higher-college" ||
        education === "higher-university"
    ) {
        qualificationFields.style.display = "block";
    } else {
        qualificationFields.style.display = "none";
    }
}

// Progress tracking variables
let currentStep = 1;
const totalSteps = 5;

// Update the progress bar
function updateProgressBar() {
    const progress = ((currentStep - 1) / totalSteps) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
}

// Update the progress message
function updateProgressMessage() {
    const message = `Užpildyta: ${Math.round(
        ((currentStep - 1) / totalSteps) * 100
    )}% (${currentStep} iš ${totalSteps} etapų)`;
    document.getElementById("progress-message").innerText = message;
}

// Move to the next step
function nextStep(stepNumber) {
    if (!validateStepFields(currentStep)) {
        return; // Stop progression if validation fails
    }

    document.getElementById(`step${currentStep}`).style.display = "none";
    currentStep = stepNumber;
    if (currentStep <= totalSteps) {
        document.getElementById(`step${currentStep}`).style.display = "block";
        updateProgressBar();
        updateProgressMessage();
    } else {
        displayThankYouMessage();
    }
}

// Handle form submission with validation
document.querySelector("#survey-form-content").addEventListener("submit", function (event) {
    if (!validateStepFields(currentStep)) {
        event.preventDefault(); // Stop submission if validation fails
        return;
    }

    event.preventDefault(); // Prevent the default form submission
    displayThankYouMessage(); // Show the Thank You message directly
});

// Display a thank you message with animation
function displayThankYouMessage() {
    document.body.innerHTML = `
        <div style="text-align: center; margin-top: 50px; animation: fadeIn 6s;">
            <h1 style="animation: zoomIn 5s;">Ačiū!</h1>
            <p style="animation: fadeIn 6s;">Jūsų atsakymai pateikti sėkmingai😊</p>
        </div>
    `;

    // Add animations using JavaScript-defined styles
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerHTML = `
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        @keyframes zoomIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        div, h1, p {
            opacity: 0;
            animation-fill-mode: forwards;
        }
        .error {
            border: 2px solid red;
            background-color: #ffe6e6;
        }
    `;
    document.head.appendChild(styleSheet);
}
