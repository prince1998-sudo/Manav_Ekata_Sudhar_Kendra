// ENABLE REGISTER BUTTON WHEN TERMS ARE CHECKED
const checkbox = document.getElementById("agreeTerms");
const registerBtn = document.getElementById("registerBtn");
if (checkbox && registerBtn) {
  registerBtn.disabled = true;
  checkbox.addEventListener("change", () => {
    registerBtn.disabled = !checkbox.checked;
  });
}

// MEMBER REGISTRATION
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    let members = JSON.parse(localStorage.getItem("members")) || [];

    // Check if email already registered
    const alreadyExists = members.find(m => m.email === email);
    if (alreadyExists) {
      alert("A member with this email already exists.");
      return;
    }

    const username = (firstName + lastName).toLowerCase();
    const newUser = {
      firstName,
      lastName,
      dob,
      gender,
      email,
      password,
      username
    };

    members.push(newUser);
    localStorage.setItem("members", JSON.stringify(members));
    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

// MEMBER LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginInput = document.getElementById("loginUsername").value.trim();
    const loginPassword = document.getElementById("loginPassword").value;

    const members = JSON.parse(localStorage.getItem("members")) || [];

    const user = members.find(
      m =>
        (m.email === loginInput || m.username === loginInput.toLowerCase()) &&
        m.password === loginPassword
    );

    if (!user) {
      alert("Invalid username or password.");
    } else {
      localStorage.setItem("loggedInUser", user.email);
      window.location.href = "dashboard.html";
    }
  });
}

const forgotBtn = document.getElementById("forgotPassword");
if (forgotBtn) {
  forgotBtn.addEventListener("click", function () {
    const emailPrompt = prompt("Enter your registered email:");

    const members = JSON.parse(localStorage.getItem("members")) || [];
    const user = members.find(m => m.email === emailPrompt);

    if (!user) {
      alert("No user found with that email.");
      return;
    }

    // Generate a fake reset code (in real-world, this should be a secure token)
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("resetCode", resetCode);
    localStorage.setItem("resetEmail", emailPrompt);

    // Send email using EmailJS

    emailjs.init("6q3g1tcGw7NY19oLt"); // Public Key
    emailjs.send("service_b9highj", "service_b9highj", {
      to_email: emailPrompt,
      to_name: user.firstName,
      reset_code: resetCode
    }).then(function (response) {
      alert("Reset code sent to your email.");
      window.location.href = "reset.html";
    }, function (error) {
      console.log("FAILED...", error);
      alert("Failed to send reset email. Try again.");
    });
  });
}
