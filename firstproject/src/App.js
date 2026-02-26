import logo from './logo.svg';
import './App.css';
import { use } from 'react';
import Counter from './Components/Counter';

//roles in jsx
// ClassName insted of class
// just one element can be use
// comment
// 

function App() {

  const users = [
    {
      name: "ali",
      family: "doostdar"
    },
    {
      name: "reza",
      family: "jafari"
    },
    {
      name: "iman",
      family: "shirazi"
    }
  ]
  return (
    <div className="App">

      {users.map(User => (
        <div>
          <h2>{User.name}</h2>
          <h3>{User.family}</h3>
        </div>
      ))}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Hello World</h1>
        <Counter count="100" >
          this my Counter
        </Counter>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
