// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod echo_api;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
          echo_api::get_users_addresses,
          echo_api::send_message,
          echo_api::get_messages,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}