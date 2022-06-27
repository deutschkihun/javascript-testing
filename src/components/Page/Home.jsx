import React from 'react'
import '../../index.css'

export const Home = () => {
    const a = 2;
    const b = 4;
    return (
      <div className="App">
        <header className="App-header">
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
          <ul data-testid="navbar">
            <li>apple</li>
            <li>peach</li>
            <li>watermelon</li>
            <li data-testid="deutschkihun">deutschkihun</li>
          </ul>
          <h1 data-testid="title">hello</h1>
          <span title="sum">{a+b}</span>
          <a href='/menu' data-testid='menu'>Go to menu page</a>
        </header>
      </div>
    );
}

