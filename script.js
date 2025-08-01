// Registration Logic
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.find(user => user.username === username);
    if (userExists) {
      alert('Username already exists!');
      return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! Please login.');
    window.location.href = "dashboard.html";
  });
}

// Login Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
      localStorage.setItem('loggedInUser', username);
      window.location.href = "dashboard.html";
    } else {
      alert('Invalid username or password');
    }
  });
}
