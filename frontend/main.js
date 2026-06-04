const form = document.getElementById('loginForm');
const msg = document.getElementById('message');
const forgot = document.getElementById('forgotBtn');

function showMessage(text, isError = true) {
  msg.textContent = text;
  msg.style.color = isError ? 'var(--danger)' : 'green';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    showMessage(data.message || 'Logged in', false);
    // In a real app you'd persist token and redirect
  } catch (err) {
    showMessage(err.message || 'Network error');
  }
});

forgot.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = prompt('Enter your account email for password reset:');
  if (!email) return;
  try {
    const res = await fetch('/api/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    showMessage(data.message || 'If account exists, reset link sent.', false);
  } catch (err) {
    showMessage('Unable to request reset');
  }
});
