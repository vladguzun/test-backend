import React, { useState } from 'react';
import { PiStudentFill } from 'react-icons/pi';

interface LoginModalProps {
  isRegister: boolean;
  onToggleRegister: () => void;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onRegister: (email: string, password: string) => Promise<boolean>;
  isVisible: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isRegister, onToggleRegister, onLogin, onRegister, isVisible }) => {
  const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (form.email === '' || form.password === '') {
      setError('Email and Password cannot be empty');
      return;
    }

    const success = isRegister
      ? await onRegister(form.email, form.password)
      : await onLogin(form.email, form.password);

    if (!success) {
      setError('Incorrect email or password');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="flex flex-col items-center p-8 bg-[#424242] rounded-lg shadow-lg w-[90vw] sm:w-[30vw] h-[50vh]">
        <PiStudentFill className="text-white mb-4" size={50} />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A9A9A]"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A9A9A]"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <div className="flex flex-col items-center w-full mt-auto">
          <button
            onClick={handleSubmit}
            className="w-full mb-2 bg-[#585858] text-white py-3 rounded-lg shadow-md hover:bg-[#6E6E6E] focus:outline-none focus:ring-2 focus:ring-[#9A9A9A]"
          >
            {isRegister ? 'Sign up' : 'Log in'}
          </button>
          <button
            onClick={onToggleRegister}
            className="text-[#9A9A9A] hover:underline"
          >
            {isRegister ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
