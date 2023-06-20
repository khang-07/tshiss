// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use std::path::Path; 

#[tauri::command] 
fn display(start: &str, end: &str, format: &str) -> String {
    // JS -> let folder = end.split("/")[end.split("/").collect().length - 1] : directory.split()[last element]
    // .split returns iterator, .collect turns iterator -> vector : too long tbh
    // file_name() -> w/o extension, file_stem() -> w/ extension : returns Option<&OsStr>

    let file = Path::new(start).file_name().unwrap().to_str().unwrap();
    let folder = Path::new(end).file_name().unwrap().to_str().unwrap();
    let converted = [Path::new(start).file_stem().unwrap().to_str().unwrap(), format].join("");

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