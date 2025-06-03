import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AllPosts from "./component/posts/AllPosts";
import './App.css'

function App() {
  return (
    <div>
      <h1>Mon Blog</h1>
      <AllPosts />
    </div>
  );
}

export default App
