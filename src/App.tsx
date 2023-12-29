import React, {useEffect, useState} from 'react';
import AppStacks from './config/AppStacks';
import SplashLayout from './components/layouts/SplashLayout';

function App() {
  const [isSplashDisplay, setIsSplashDisplay] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSplashDisplay(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <>{isSplashDisplay ? <SplashLayout /> : <AppStacks />}</>;
}

export default App;
