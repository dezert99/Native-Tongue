import React from "react";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import axios from "axios";
import ChatItem from "./chat_item";
import {UserContext} from '../../../contexts/userContext';


const Chat = require("twilio-chat");


class ChatScreen extends React.Component {
    constructor(props, UserContext) {
      super(props);
  
      this.state = {
        text: "",
        messages: [],
        loading: false,
        channel: null,
      };
      // console.log("ROOM 1:", this.context.user.user_id);
      
      this.scrollDiv = React.createRef();
    }
    // login = () => {
    //   const {email} = this.context.user.email
    //   const {room} = this.context.user_id
    //   if (email && room) {
    //     this.props.history.push("chat", { room, email });
    //   }
    // }
    joinChannel = async (channel) => {
        if (channel.channelState.status !== "joined") {
         await channel.join();
       }
     
       this.setState({ 
           channel:channel, 
           loading: false 
       });
     
       channel.on("messageAdded", this.handleMessageAdded);
       this.scrollToBottom();
     };
     
     
     handleMessageAdded = (message) => {
       console.log("in message added")
       const { messages } = this.state;
       this.setState({
           messages: [...messages, message],
         },
         this.scrollToBottom
       );
     };
     
     scrollToBottom = () => {
       const scrollHeight = this.scrollDiv.current.scrollHeight;
       const height = this.scrollDiv.current.clientHeight;
       const maxScrollTop = scrollHeight - height;
       this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
     };
     componentDidMount = async () => {
        const { location } = this.props;
        console.log("LOCATION:", this.context.user.email)

        const email = this.props.email || this.context.user.email
        const room = this.props.room || this.context.user.user_id
        
        let token = "";

      
        this.setState({ loading: true });
      
        try {
          token = await this.getToken(email);
        } catch {
          throw new Error("Unable to get token, please reload this page");
        }
        const client = await Chat.Client.create(token);

        client.on("tokenAboutToExpire", async () => {
          const token = await this.getToken(email);
          client.updateToken(token);
        });
      
        client.on("tokenExpired", async () => {
          const token = await this.getToken(email);
          client.updateToken(token);
        });
        client.on("channelJoined", async (channel) => {
            // getting list of all messages since this is an existing channel
            const messages = await channel.getMessages();
            this.setState({ messages: messages.items || [] });
            this.scrollToBottom();
          });
        
          try {
            console.log("ROOM 2:", room)
            const channel = await client.getChannelByUniqueName(room.toString());
            console.log("in the join channel", channel)
            this.joinChannel(channel);
          } catch(err) {
            try {
              console.log("in the catch, error:", err)
              const channel = await client.createChannel({
                uniqueName: room,
                friendlyName: room,
              });
          
              this.joinChannel(channel);
            } catch {
              throw new Error("Unable to create channel, please reload this page");
            }
          }
      }
      getToken = async (email) => {
        const response = await axios.get(`http://localhost:5000/token/${email}`);
        const { data } = response;
        return data.token;
      }
      sendMessage = () => {
        const { text, channel } = this.state;
        if (text) {
          this.setState({ loading: true });
          channel.sendMessage(String(text).trim());
          this.setState({ text: "", loading: false });
        }
      };
      render() {
        const { loading, text, messages, channel } = this.state;
        const { location } = this.props;
        const { state } = location || {};
        console.log("CONTEXT:",this.context.user.email)
        const email = this.props.email || this.context.user.email
        const room = this.props.user_id || this.context.user.user_id
        console.log(this.state)

        return (
          <Container component="main" maxWidth="md">
            <Backdrop open={loading} style={{ zIndex: 999}}>
              <CircularProgress style={{ color: "white" }} />
            </Backdrop>
      
            <CssBaseline />
      
            <Grid container direction="column" style={styles.mainGrid}>
              <Grid item style={styles.gridItemChatList} ref={this.scrollDiv}>
                <List dense={true}>
                    {messages &&
                      messages.map((message) => 
                        <ChatItem
                          key={message.index}
                          message={message}
                          email={email}/>
                      )}
                </List>
              </Grid>
      
              <Grid item style={styles.gridItemMessage}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center">
                  <Grid item style={styles.textFieldContainer}>
                    <TextField
                      required
                      style={styles.textField}
                      placeholder="Enter message"
                      variant="outlined"
                      multiline
                      rows={2}
                      value={text}
                      disabled={!channel}
                      onChange={(event) =>
                        this.setState({ text: event.target.value })}
                      />
                  </Grid>
                  
                  <Grid item>
                    <IconButton
                      style={styles.sendButton}
                      onClick={this.sendMessage}
                      disabled={!channel}>
                      <Send style={styles.sendIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        );
      }
  }
  ChatScreen.contextType = UserContext;
  const styles = {
    textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
    // textFieldContainer: { flex: 1, marginRight: 12 },
    textFieldContainer: { flex: 1},
    // gridItem: { paddingTop: 12, paddingBottom: 12 },
    gridItemChatList: { overflow: "auto", height: "70vh" },
    gridItemMessage: { marginTop: 12, marginBottom: 12 },
    sendButton: { backgroundColor: "#3f51b5" },
    sendIcon: { color: "white" },
    // mainGrid: { paddingTop: 100, borderWidth: 1 },
  };
  

  export default ChatScreen;