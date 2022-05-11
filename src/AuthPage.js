import { useState } from 'react';
import { signIn, signUp, getUser } from './services/fetch-utils.js';

export default function AuthPage({ setUser }) {
  // you'll need to track the form state of the email and password for sign in, and separate state for sign up
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [{ email: signInEmail, password: signInPassword }, setSignInFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSignIn(e) {
    e.preventDefault();

    // sign the user in using the form state
    await signIn(signInEmail, signInPassword);

    const {
      access_token,
      user: { email },
    } = getUser();

    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    setEmail(email);
    setToken(access_token);
  }

  async function handleSignUp(e) {
    e.preventDefault();

    // sign the user up using the form state
    await signUp(signUpEmail, signUpPassword);

    const {
      access_token,
      user: { email },
    } = getUser();

    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    setEmail(email);
    setToken(access_token);
  }

  return (
    <div className="auth">
      <h1>
        <em>Boardzo</em>
      </h1>
      {/* on submit, sign the user up using the function defined above */}
      <form onSubmit={handleSignUp}>
        <label>
          Email
          {/* on change, update the form state for email */}
          <input
            required
            type="email"
            onChange={(e) => setSignUpEmail(e.target.value)}
            name="email"
          />
        </label>
        <label>
          Password
          {/* on change, update the form state for password */}
          <input
            required
            type="password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            name="password"
          />
        </label>
        <button>Sign Up</button>
      </form>
      {/* on submit, sign the user in using the function defined above */}
      <form onSubmit={handleSignIn}>
        <label>
          Email
          {/* on change, update the form state for email */}
          <input
            required
            type="email"
            onChange={(e) => setSignInFormData(e.target.value)}
            name="email"
          />
        </label>
        <label>
          Password
          {/* on change, update the form state for password */}
          <input
            required
            type="password"
            onChange={(e) => setSignInFormData(e.target.value)}
            name="password"
          />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  );
}
