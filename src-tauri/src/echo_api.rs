use tauri;

#[derive(serde::Serialize)]
pub struct AddressWithRest {
  rest: Option<String>,
  addr: String,
}

#[derive(serde::Serialize)]
pub struct LiteCoinAddress {
  amount: f32,
  address: AddressWithRest,
}

#[derive(serde::Serialize)]
pub struct LiteCoinAddresses {
  addresses: Vec<LiteCoinAddress>,
}

#[tauri::command]
pub async fn get_users_addresses() -> Result<LiteCoinAddresses, String> {
  let mut addresses: Vec<LiteCoinAddress> = vec![];
  for i in 1..10 {
    if i%2 == 0 {
      addresses.push(LiteCoinAddress {
        amount: (i as f32) / 10.0,
        address: AddressWithRest {
          addr: format!("Addr {}", i),
          rest: Some("Jean Michel".to_string()),
        }
      })
    } else {
      addresses.push(LiteCoinAddress {
        amount: (i as f32) / 10.0,
        address: AddressWithRest {
          addr: format!("Addr {}", i),
          rest: None,
        }
      })
    }
  }
  Ok(LiteCoinAddresses {
    addresses
  })
}

#[tauri::command]
pub async fn send_message(user_address: String, message: String) -> Result<bool, String> {
  println!("{user_address}");
  println!("{message}");
  Ok(true)
}

#[derive(serde::Serialize)]
struct Message {
  address: AddressWithRest,
  timestamp: u128,
  content: String,
}

#[derive(serde::Serialize)]
pub struct MessageHistory {
  messages: Vec<Message>,
}

#[tauri::command]
pub async fn get_messages() -> Result<MessageHistory, String> {
  let mut messages: Vec<Message> = vec![];
  for i in 1..10 {
    messages.push(Message {
      address: AddressWithRest {
        addr: format!("Address {}", i),
        rest: Some("Patoche".to_string()),
      },
      timestamp: i,
      content: format!("Message {}", i),
    });
  }
  Ok(MessageHistory {
    messages
  })
}