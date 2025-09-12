 const defaultAdmin = {
      name: 'Admin',
      email: 'admin31@gmail.com',
      password: 'admin123',
      role: 'admin'
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.some(user => user.email === defaultAdmin.email)) {
      users.push(defaultAdmin);
      localStorage.setItem('users', JSON.stringify(users));
    }

    document.getElementById('showRegister').addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('loginForm').classList.remove('active');
      document.getElementById('registerForm').classList.add('active');
    });

    document.getElementById('showLogin').addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('registerForm').classList.remove('active');
      document.getElementById('loginForm').classList.add('active');
    });
 
    document.getElementById('registerForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;

      let users = JSON.parse(localStorage.getItem('users')) || [];
      const isExistingUser = users.some(user => user.email === email);

      if (isExistingUser) {
        alert('This email is already registered.');
        return;
      }

      users.push({ name, email, password, role: 'user' });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');

      document.getElementById('registerForm').reset();
      document.getElementById('registerForm').classList.remove('active');
      document.getElementById('loginForm').classList.add('active');
      document.getElementById('loginEmail').value = email;
    });

    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const matchedUser = users.find(user => user.email === email && user.password === password);

      if (matchedUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
        alert(`Welcome, ${matchedUser.name}`);
        window.location.href = matchedUser.role === 'admin' ? 'admin.html' : 'dashboard.html';
      } else {
        alert('Invalid credentials.');
      }

      document.getElementById('loginPassword').value = '';
    });

    sessionStorage.setItem("isAdmin", "true");