import type { Theme } from '@mui/material';
import type {
  LiteCoinAddresses,
  LiteCoinAddress,
  MessageHistory,
  Message,
} from '@services/echoApi';

import React, {
  useState,
  useEffect,
} from 'react';
import {
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  StringSelect,
  MessagesList,
} from '@components/index';
import EchoApi from '@services/echoApi';
import { formatDisplayedLiteCoinAddresses } from '@utils/index';

const useStyles = makeStyles((_: Theme) => ({
  row: {
    marginTop: '50px',
    padding: '0 100px',
    display: 'flex',
    gap: '20px',
  },
  messagesContainer: {

  },
}));

export function MessagesPage()
{
  const [ userAddresses, setUserAddresses ] = useState<Array<LiteCoinAddress>>([]);
  const [ selectedAddress, setSelectedAddress ] = useState<string>('');
  const [ userMessage, setUserMessage ] = useState<string>('');
  const [ allMessages, setAllMessages ] = useState<Array<Message>>([]);

  useEffect(() => {
    EchoApi.getUserAddresses().then((res: LiteCoinAddresses) => {
      setUserAddresses(res.addresses);
      if (res.addresses.length > 0)
        changeSelectedAddress(res.addresses[0].address.addr);
    });
    getAllMessages();
  }, []);

  function changeSelectedAddress(address: string)
  {
    EchoApi.setUserAddress(address);
    setSelectedAddress(address);
  }

  function getAllMessages()
  {
    EchoApi.getMessages().then((res: MessageHistory) => {
      if (res.messages.length > 0)
        setAllMessages(res.messages);
    });
  }

  function sendMessage()
  {
    EchoApi.sendMessage(userMessage).then((res: boolean) => {
      if (res)
      {
        getAllMessages();
        setUserMessage('');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <h1>Coucou</h1>
      <div className={classes.row}>
        <StringSelect
          inputLabel='Address'
          label='address'
          defaultValue={selectedAddress}
          values={formatDisplayedLiteCoinAddresses(userAddresses, { includeAmount: true })}
          onChange={(event) => changeSelectedAddress(event.target.value)}
          style={{ width: '20%' }}
        />
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={userMessage}
          onChange={(event) => setUserMessage(event.target.value)}
          style={{ width: '100%' }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
        >SEND</Button>
      </div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <MessagesList messages={allMessages}/>
      </Grid>
    </React.Fragment>
  );
}
