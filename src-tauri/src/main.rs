// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command] 
fn display(start: &str, end: &str, format: &str) -> String {
    // JS -> let folder = end.split("/")[end.split("/").collect().length - 1];
    // directory.split()[last element];
    // .split returns iterator, .collect turns iterator -> vector
    let file = start.split("/").collect::<Vec<&str>>()[start.split("/").collect::<Vec<&str>>().len() - 1];
    let folder = end.split("/").collect::<Vec<&str>>()[end.split("/").collect::<Vec<&str>>().len() - 1];
    let converted = [file.split(".").collect::<Vec<&str>>()[0].to_string(), format.to_string()].concat();

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