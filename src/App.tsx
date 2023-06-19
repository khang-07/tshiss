import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { copyFile, BaseDirectory } from '@tauri-apps/api/fs';
import "./App.css";

function App() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [format, setFormat] = useState("");
  const [msg, setMsg] = useState("");

  async function display() {
    setMsg(await invoke("display", { start, end, format }));
  }

  async function read(where: boolean) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    try {
      const path = await open({
        multiple: false,
        directory: !where, // if choose startFile, no dir
        title: "Open File"  
      });

      where == true ? 
      setStart(path?.toString()!) : setEnd(path?.toString()!);
      // ! at the end guarantees no null -> no null error
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="container">
        <h1>Welcome to tShiss!</h1>
          <article className="flex">
            <button onClick={() => read(true)}>{start}</button>
            <button onClick={() => read(false)}>{end}</button>

            <form className="row" 
              onSubmit={(e) => {
              e.preventDefault();
              display();
              console.log("submitted");
              }}
            >
            <input
              id="greet-input"
              onChange={(e) => {
                e.preventDefault();
                setFormat(e.currentTarget.value); // not needed tbh
              }}
              placeholder="Enter format..."
            />
            <button type="submit">Confirm</button>
            </form>

            <p>{msg}</p>

          </article>
        <p>Work in Progress</p>
      </div>
  );
}

export default App;
