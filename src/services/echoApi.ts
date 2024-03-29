import { invoke } from '@tauri-apps/api/tauri';

export interface AddressWithRest
{
  addr: string,
  rest: string | null,
}

export interface Message
{
  address: AddressWithRest,
  timestamp: number,
  content: string,
}

export interface MessageHistory
{
  messages: Array<Message>,
}
export interface LiteCoinAddress
{
  address: AddressWithRest,
  amount: number,
}

export interface LiteCoinAddresses
{
  addresses: Array<LiteCoinAddress>,
}

class EchoApi
{
  private userAddress?: string;

  constructor(userAddress?: string)
  {
    const userAddress_ = userAddress || sessionStorage.getItem('userAddress');
    if (userAddress_)
      this.setUserAddress(userAddress_);
  }

  public setUserAddress(userAddress: string)
  {
    this.userAddress = userAddress;
    sessionStorage.setItem('userAddress', userAddress);
  }

  public sendMessage(message: string): Promise<boolean>
  {
    if (!this.userAddress)
      throw new Error('InvalidUserAddress');
    return invoke('send_message', { user_address: this.userAddress, message });
  }

  public async getMessages(): Promise<MessageHistory>
  {
    return invoke('get_messages');
  }

  public async getUserAddresses(): Promise<LiteCoinAddresses>
  {
    return invoke('get_users_addresses');
  }
}

export default new EchoApi();