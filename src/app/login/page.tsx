'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError('Nieprawidłowy login lub hasło');
    } else {
      // Przekierowanie po udanym logowaniu
      window.location.href = '/dashboard';
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 100 }}>
      <h1>Zaloguj się</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type='submit'>Zaloguj się</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
