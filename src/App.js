import logo from './logo.svg';
import './App.css';

function App() {
  const a = 2;
  const b = 4;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          data-testid="customId"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          <li>apple</li>
          <li>peach</li>
          <li>watermelon</li>
        </ul>
        <h1 data-testid="title">hello</h1>
        <span title="sum">{a+b}</span>
      </header>
    </div>
  );
}

export default App;
