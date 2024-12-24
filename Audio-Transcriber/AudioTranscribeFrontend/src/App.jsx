import { useState } from "react";
import "./App.css";
import AudioUploder from "./components/AudioUploader";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <h1>Audio Transcriber</h1> */}
      <AudioUploder />
    </div>
  );
}

export default App;
