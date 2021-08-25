import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

export function LoginModal() {
  const { loginModal, toggleLoginModal } = useContext(GlobalContext);
  const [backdrop, setBackdrop] = useState('bg-opacity-70');
  const [cardOrigin, setCardOrigin] = useState('translate-y-96');

  useEffect(() => {
    if (loginModal) {
      setTimeout(() => {
        setBackdrop('bg-opacity-70');
        setCardOrigin('translate-y-0 opacity-100');
        console.log('changed');
      }, 100);
    } else {
      setTimeout(() => {
        setBackdrop('bg-opacity-0');
        setCardOrigin('translate-y-36 opacity-0');
        console.log('changed');
      }, 100);
    }
  }, [loginModal]);

  return (
    <div className={`absolute z-10 inset-0 ${loginModal ? '' : 'hidden'}`}>
      <div
        className={`fixed w-full h-screen inset-0 bg-black ${backdrop} transition-all duration-300`}
        onClick={toggleLoginModal}
      ></div>
      <div className="flex w-full h-screen items-center justify-center z-20">
        <div
          className={`p-6 bg-white rounded-xl shadow-md m-3 transition-all duration-300 w-80 z-30 transform ${cardOrigin}`}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
