import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';

export function LoginView() {
  const { login } = useAppState();
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = (event) => {
    event.preventDefault();
    login(form);
  };

  return (
    <section className="screen shell">
      <div className="panel login-panel">
        <h1 className="brand">NoirStream</h1>
        <p className="subtitle">Private Screening Access</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
          </label>

          <button type="submit">Enter Lounge</button>
        </form>
      </div>
    </section>
  );
}
