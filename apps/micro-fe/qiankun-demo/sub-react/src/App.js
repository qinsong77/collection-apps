import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  function openSub () {
    if (!window.__POWERED_BY_QIANKUN__) {
      alert('当前已经是单独运行的子应用')
      return
    }

    // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
    window.open(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Sub React App
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <hr />
        <button onClick={() => openSub()} className="button">go to sub react</button>
      </header>
    </div>
  );
}

export default App;
