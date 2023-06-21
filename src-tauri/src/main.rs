// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path; 
use std::process::Command;

#[tauri::command] 
fn display(start: &str, end: &str, format: &str) -> String {
    let file = Path::new(start).file_name().unwrap().to_str().unwrap();
    let folder = Path::new(end).file_name().unwrap().to_str().unwrap();
    let converted = [Path::new(start).file_stem().unwrap().to_str().unwrap(), format].join("");

    let finale = [end, "/", Path::new(start).file_stem().unwrap().to_str().unwrap(), format].join("");

     let hi = Command::new("sh")
            .arg("-c")
            .arg(format!("ffmpeg -i \"{0}\" \"{1}\"", start, finale))
            .output();
        
    format!("Converted '{0}' to '{2}' and placing in folder '{1}'", file, folder, converted)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![display])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// test w/ "yarn tauri dev"
// export w/ "yaurn tauri build"
// gen icons w/ "arn tauri icon ./src-tauri/icons/toku.png"