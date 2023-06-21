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

  async function convert() {
    await invoke("convert");
  }

  async function display(start: string, end: string, format: string): Promise<void> {
    if (start && end && format) {
      setMsg(await invoke("display", { start, end, format }));
    } else {
      setMsg("error: missing parameter");
    }
  }

  async function read(where: boolean): Promise<void> {
    try {
      const path = await open({
        multiple: false,
        directory: !where, // if choose start, no dir, bc needs file
        title: "Open File"  
      });

      where == true ? 
      setStart(path?.toString()!) : setEnd(path?.toString()!); // ! at the end guarantees no null error

     } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="container">
        <h1>welcome to tshiss!</h1>
          <article className="flex">
            <button onClick={() => read(true)}>{start}</button>
            <button onClick={() => read(false)}>{end}</button>

            <form className="row" 
              onSubmit={(e) => {
              e.preventDefault();
              display(start, end, format);

              console.log("submitted");
              }}
            >
            <input
              id="greet-input"
              onChange={(e) => {
                e.preventDefault();
                setFormat(e.currentTarget.value);
              }}
              placeholder="include '.' in '.mp4'"
            />
            <button type="submit">confirm</button>
            </form>

            <p>{msg}</p>

          </article>
        <p>work in progress :p</p>
      </div>
  );
}

export default App;
