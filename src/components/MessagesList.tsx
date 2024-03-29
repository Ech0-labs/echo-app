import type { Message } from '@services/echoApi';
import type { Theme } from '@mui/material';

import React from 'react';
import { formatDate } from 'date-fns';
import { makeStyles } from '@mui/styles';
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { formatDisplayedAddress } from '@utils/addresses';

const useStyles = makeStyles((_: Theme) => ({
  list: {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper'
  },
  listItem: {
    alignItems: 'flex-start',
  }
}));

interface MessagesListProps
{
  messages: Array<Message>,
}

function formatTimestamp(timestamp: number): string
{
  return formatDate(timestamp, "yyyy-MM-dd hh:mm");
}

export function MessagesList(props: MessagesListProps)
{
  const {
    messages,
  } = props;

  const classes = useStyles();
  return (
    <List className={classes.list}>
      {
        messages.map((message, i) => (
          <ListItem key={i} className={classes.listItem}>
            <ListItemText
              primary={formatDisplayedAddress(message.address)}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {formatTimestamp(message.timestamp)}
                  </Typography>
                  {` - ${message.content}`}
                {i < messages.length - 1 ? <Divider variant="inset" component="li" /> : null }
                </React.Fragment>
              }
            />
          </ListItem>
        ))
      }
    </List>
  );
}