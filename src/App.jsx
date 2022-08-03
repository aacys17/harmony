import Install from './components/Install';
import Home from './components/Home';
import Client from './components/client';

function App() {

  if (window.ethereum) {
    // return <Client />;
    return <Home />;
  } else {
    return <Install />
  }
}

export default App;