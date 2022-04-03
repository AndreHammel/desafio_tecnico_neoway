import React from 'react';

import Header from './components/header';
import Register from './components/register';
import Search from './components/search';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Register />
        <Search />
      </div>
    </div>
  );
}

export default App;
