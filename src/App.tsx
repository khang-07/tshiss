import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { copyFile, BaseDirectory } from '@tauri-apps/api/fs';
import "./App.css";



function App() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [msg, setMsg] = useState("");

  async function display(start: String, end: String, format: String) {
    // format should include the . in .mp3
    let file = start.split("/")[start.split("/").length - 1];

    let folder = end.split("/")[end.split("/").length - 1];

    let converted = file.split(".")[0] + format;

    setMsg(await invoke("display", { file, folder, converted }));
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
      
      console.log(path);
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
          </article>
        <p>Work in Progress</p>
      </div>
  );
}

export default App;
