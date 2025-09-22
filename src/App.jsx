import React, { useState } from 'react';
import CongratsScreen from './components/CongratsScreen';
// import SignupScreen from './components/SignupScreen';

function App() {
  // const [currentScreen, setCurrentScreen] = useState('signup');

  return (
    <div className="min-h-screen">
      { <CongratsScreen />}
    </div>
  );
}

export default App;