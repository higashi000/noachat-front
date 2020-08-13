import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Main extends React.Component {
   constructor(props: any) {
      super(props);

      this.state = {
         ws: null,
         userName: '',
         text: '',
         messages: [],
      };

      this.ws: WebSocket;
      this.handleTextChange = this.handleTextChange.bind(this);
   }

   handleTextChange(event: any) {
      let name = event.target.name;

      this.setState({[name]: event.target.value})
   }

   componentDidMount() {
      let ws: WebSocket = new WebSocket('ws://localhost:5000');

      ws.onopen = () => {
         this.setState({ws: ws});
      }

      ws.onmessage = getMsg => {
         console.log(getMsg.data);

         let data: string = getMsg.data;

         this.setState({
            messages: [
            ...this.state.messages,
            {
               getMsg,
            }
            ],
            text: '',
         })
      }
   }

   sendMsg() {
      this.state.ws.send('{"text":"' + this.state.userName + ": " + this.state.text + '"}')
   }

   render() {
      return (
         <div>
            <TextField id="outlined-basic" name="userName" label="名前" variant="outlined" value={this.state.userName} onChange={this.handleTextChange} />
         </div>
      )
   }
}
