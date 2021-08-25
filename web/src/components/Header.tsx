import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { routeConfigs } from '../configs/Routes';
import { GlobalContext } from '../contexts/GlobalContext';
import reactLogo from '../imgs/react.svg';

export function Header() {
  const { toggleLoginModal } = useContext(GlobalContext);

  return (
    <div className="bg-gray-800 text-gray-100 flex justify-between">
      <div className="flex items-center">
        <img className="w-10 h-8" src={reactLogo} alt="react"></img>
        <Link to="/" className="p-4 text-xl text-white font-bold">
          Prisma React Blog
        </Link>
      </div>
      <div className="flex items-center justify-between">
        {routeConfigs.map(r => {
          return (
            <div
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white cursor-pointer"
              key={r.name}
              onClick={toggleLoginModal}
            >
              {r.logo}
            </div>
          );
        })}
      </div>
    </div>
  );
}
