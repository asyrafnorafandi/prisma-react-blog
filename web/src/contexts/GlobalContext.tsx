import { createContext, useState } from 'react';
import { GlobalContextProps } from '../interfaces';

export const GlobalContext = createContext<GlobalContextProps>({ loginModal: false, toggleLoginModal: () => {} });

function GlobalContextProvider(props: any) {
  const [loginModal, setLoginModal] = useState(false);

  function toggleLoginModal() {
    setLoginModal(!loginModal);
  }

  return <GlobalContext.Provider value={{ loginModal, toggleLoginModal }}>{props.children}</GlobalContext.Provider>;
}

export default GlobalContextProvider;
