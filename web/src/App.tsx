import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import reactLogo from './imgs/react.svg';
import { Home } from './pages';
import { routeConfigs } from './configs/Routes';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
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
                <Link
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                  to={r.path}
                >
                  {r.logo}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-10 bg-blue-50">
          <Switch>
            {routeConfigs.map(r => {
              return <Route path={r.path} exact component={r.component}></Route>;
            })}
          </Switch>
        </div>
      </div>
    </Router>
  );
}
