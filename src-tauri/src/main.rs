// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command] 
fn display(file: &str, folder: &str, converted: &str) -> String {
    format!("Converting '{0}' to '{1}' storing in '{2}'", 
    file, converted, folder)
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