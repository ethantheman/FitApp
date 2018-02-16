console.log('Hello World!');
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import Bypass from '../actions/bypass.jsx'
import about from './about.jsx';
import contact from './contact.jsx';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import Auth from '../actions/authorize.jsx'

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
 } from 'react-router-dom';
import gql from 'graphql-tag';
import { Dropdown, Grid, Item, Image, Menu, Segment, Form,Icon, Button, Header, Modal } from 'semantic-ui-react'

const s3 = require('../../utilities/s3_utilities.js');
const _ = require('underscore');
const q = gql`
  query loginUser($username: String!, $password: String!){
    loginUser(username: $username, password: $password) {
      id
      fullName
      username
      type
      email
      profile_data
      Spotter {
        id
        trainer{
          id
          fullName
          profile_data
        }
        client{
          id
          fullName
          profile_data
        }
      }
      Exercise_Plan {
        id
        name
        regimen
        trainer{
          id
          fullName
        }
        client{
          id
          fullName
          profile_data
        }
      }
      Personal_Record {
        id
        data
      }
      Chat_Room {
        id
        room_id
        user {
          id
          fullName
          profile_data
        }
      }
      connection_requests
    }}`


  //   }
  // }
// query { loginUser(username: "test", password: "test") {
//       id
//       fullName
//       username
//       type
//       email
//       profile_data
//       Spotter {
//         id
//         trainer {
//           id
//           fullName
//         }
//         client {
//           id
//           fullName
//         }
//       }
// } }



//login
class LogIn extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        ClientUsername : '',
        ClientPassword : '',
        TrainerUsername: '',
        TrainerPassword: ''
      }
      this.onClientPasswordChange = this.onClientPasswordChange.bind(this);
      this.onClientUsernameChange = this.onClientUsernameChange.bind(this);
      this.handleClientButtonClick = this.handleClientButtonClick.bind(this);
      this.onTrainerPasswordChange = this.onTrainerPasswordChange.bind(this);
      this.onTrainerUsernameChange = this.onTrainerUsernameChange.bind(this);
      this.handleTrainerButtonClick = this.handleTrainerButtonClick.bind(this);
      this.logIn = this.logIn.bind(this)
  }

  componentDidMount() {
    //runs only once we can set a general init dispatch/action here
    // this.props.dispatch(ChangeUser('Jason'))
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    //need to basically set props here which is anmnoying
  }

  onClientPasswordChange(e) {
    this.setState({
      ClientPassword: e.target.value
    },()=>{console.log(this.state.ClientPassword)})
  }

  onClientUsernameChange(e) {
    this.setState({
      ClientUsername : e.target.value
    },()=>{console.log(this.state.ClientUsername)})
  }

  onTrainerPasswordChange(e) {
    this.setState({
      TrainerPassword: e.target.value
    },()=>{console.log(this.state.TrainerPassword)})
  }

  onTrainerUsernameChange(e) {
    this.setState({
      TrainerUsername : e.target.value
    },()=>{console.log(this.state.TrainerUsername)})
  }

  handleTrainerButtonClick(){
    var payload = {
      ClientUsername: this.state.TrainerUsername,
      ClientPassword: this.state.TrainerPassword,
      type: 'Trainer'
    }

    console.log('THIS IS THE PAYLOAD', payload)
    this.props.dispatch(Bypass(payload))
    // this.props.dispatch(ChangeUser(payload))
  }

  logIn(type){
    // e.preventDefault();
    // console.log('what is state rn?', this.state, e.target)
    // var type = e.target.id
    // console.log('type', type)
    if(type === 'Client'){
    var values = {
      username: this.state.ClientUsername,
      password: this.state.ClientPassword
    }
  } else if(type === 'Trainer'){
    var values = {
      username: this.state.TrainerUsername,
      password: this.state.TrainerPassword
    }
  }
    this.props.client.query({
      query: q,
      variables: {
        username: values.username.toLowerCase(),
        password: values.password
      }
    }).then(({data}) => {
      if (!data.loginUser) {
        alert('Invalid username or password!', 'Please try again.');
      } else {
        var Exercise_Plan = data.loginUser.Exercise_Plan.map((val, key) => {
          temp = Object.assign({}, val)
          console.log('TEMP IS: ', temp);
          console.log('the parsed regimen is: ', JSON.parse(val.regimen));
          temp.regimen = JSON.parse(val.regimen)
          return temp
        })
        // get list of photo keys
        s3.getPhotosList(data.loginUser.id).then((list) => {
          let l = _.pluck(list, 'key');
          if (l.includes(data.loginUser.id+'/')) {
            l.splice(l.indexOf(data.loginUser.id+'/'), 1);
          }
          let fixedList = [];
          l.forEach(url => {
            // get rid of the id/ at beginning of string
            let t = url.split('/');

            // splice out and store the timestamp at end of string separately
            let v = t[1].split('TIMESTAMP=');
            console.log('timestamp: ', v[1]);

            // replace the single quote with a forward slash
            let s = v[0].split("'").join('/');

            let u = "http://res.cloudinary.com/dvhehr6k8/image/upload/" + s;

            fixedList.push([u, v[1]]);
          });
          console.log('finally, l is: ', fixedList);
          let payload = {
            type: type,
            PR: data.loginUser.Personal_Record,
            id: data.loginUser.id,
            Exercise_Plan: Exercise_Plan,
            Chat_Room: data.loginUser.Chat_Room,
            auth: data.loginUser.type,
            id: data.loginUser.id,
            fullName: data.loginUser.fullName,
            email: data.loginUser.email,
            spotters: data.loginUser.Spotter,
            goals: JSON.parse(data.loginUser.profile_data).goals,
            connection_requests: data.loginUser.connection_requests,
            photoKeys: fixedList,
            profile_data: JSON.parse(data.loginUser.profile_data)
          }
          console.log('whats the payload', payload)
          this.props.dispatch(Auth(payload))
        }).catch((e) => {
          console.log('the s3 error is: ', e);
        })
      }
    }).catch((err) => {
      console.log('log in error: ', err);
      alert('error logging in!', 'Check console for details');
      this.setState({
        error: true
      });
    })
  }


  handleClientButtonClick(){
    var payload = {
      ClientUsername: this.state.ClientUsername,
      ClientPassword: this.state.ClientPassword,
      type: 'Client'
    }

    console.log('THIS IS THE PAYLOAD', payload)
    this.props.dispatch(Bypass(payload))
    // this.props.dispatch(ChangeUser(payload))
  }

  render() {
    console.log('heres the state', this.state, this.props)
    return (
      
        <div >
          <Segment style={{ position:'fixed',  width: '100%' , zIndex: 2}}>
            <Item.Image size='tiny' src='https://fitpics.s3.amazonaws.com/public/GreenBlack.jpg' style={{display: 'inline-block', width:'5%'}}/>
            {/* <Image src='https://fitpics.s3.amazonaws.com/public/GreenBlack.jpg' size='mini'/> */}
            
            <Menu  pointing secondary style={{width:'95%', float:'right'}}>
              <b style={{marginRight: '2%', display:'inline-block'}}>Fit Hero</b>
              <Menu.Item name='Home' as={Link} to="/"/>
              <Menu.Item name='About' as={Link} to="/about"/>
              <Menu.Item name='Contact' as={Link} to="/contact"/>
              <Menu.Menu position='right'>
                {/* <Menu.Item name='Log In' as={Link} to="/"/> */}
                {/* <Menu.Item name='Sign Up' as={Link} to='/signUp'/> */}
              </Menu.Menu>

              {/* NAV RIGHT */}
              <Menu.Menu position='right'>
                <Dropdown item  text='Log In / Sign Up'>
                  <Dropdown.Menu fluid style={{width: '20em', wordWrap: 'break-word', backgroundColor:'#211e1f', color:'white', padding: '5%'}}>
                  <h2 style={{textAlign: 'center'}}>Join For Free</h2>
                  <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-line', padding:'5%'}}>Meet a trainer or build your own workouts, and start tracking your results and more!</p>
                  {/* Drop Down Log In Button Modal Window */}
                  <Modal style={{height: '50%', width: '50%'}} center trigger={<Dropdown.Item><Button fluid primary>Log In</Button></Dropdown.Item>}>
                    <Modal.Header>Login</Modal.Header>
                    <Modal.Content >
                      {/* <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' /> */}
                      <Modal.Description>
                      <div style={{float: 'left', width: '48%'}}>
                          <Header>Member</Header>
                          <Segment style={{backgroundColor:'#2185d0'}} >
                              <Form size='tiny' inverted >
                                <Form.Input label='User Name' onChange={this.onClientUsernameChange} placeholder="User Name" value={this.state.ClientUsername}/>
                                <Form.Input label='Password' onChange={this.onClientPasswordChange} placeholder='Password' type='password' value={this.state.ClientPassword} />
                              <Button id='Client' type='submit' onClick={()=>{this.logIn('Client')}}>Enter</Button>
                            </Form>
                          </Segment>
                        </div>

                        <div style={{float:'right', width: '48%'}}>
                          <Header>Trainer</Header>
                          <Segment inverted>
                            <Form size='tiny' inverted>
                                <Form.Input label='User Name' onChange={this.onTrainerUsernameChange} placeholder="User Name" value={this.state.TrainerUsername}/>
                                <Form.Input label='Password' onChange={this.onTrainerPasswordChange} placeholder='Password' type='password' value={this.state.TrainerPassword}/>
                              <Button id='Trainer' type='submit' onClick={()=>{this.logIn('Trainer')}}>Enter</Button>
                            </Form>
                          </Segment>
                        </div>
                          {/* <input onChange={this.onTrainerUsernameChange} placeholder="Username" value={this.state.TrainerUsername} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
                          <input onChange={this.onTrainerPasswordChange} placeholder='Password' type='password' value={this.state.TrainerPassword} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
                          <button onClick={this.logIn} id='Trainer' className="btn btn-lg btn-block" type='button' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif'}}>
                          <span id='Trainer' className="glyphicon glyphicon-search">Enter</span>
                          </button> */}
                        {/* <p>We've found the following gravatar image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p> */}
                        
                          
                          {/* <input onChange={this.onClientUsernameChange} placeholder="Username" value={this.state.ClientUsername} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
                          <input onChange={this.onClientPasswordChange} placeholder='Password' type='password' value={this.state.ClientPassword} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
                          <button onClick={this.logIn} id='Client' className="btn btn-lg btn-block" type='button' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif'}}>
                          <span id='Client' className="glyphicon glyphicon-search">Enter</span>
                          </button> */}
                        {/* <p>We've found the following gravatar image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p> */}
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>

                  <Dropdown.Item as={Link} to='/signUp'><Button fluid secondary style={{backgroundColor: 'white', color: 'black'}} >SignUp</Button></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Menu>
          </Segment>

          {/* <Route exact path='/' component={LogIn}/> */}

          <Route exact path="/about" />
          <Route exact path='/contact' />
          <Route exact path='/signUp' />
      </div>
       
      // <div className="container" style={{backgroundColor:'rgba(0,0,0,0.2)', textAlign:'center'}}>
      //   {/* <h1 style={{fontFamily: 'Sans-Serif', color:'white'}}> Welcome </h1> */}
      //   <div style={{flexDirection:'row'}}>
      //     <div style={{position:'absolute', right:'50px', padding:'10px', backgroundColor:'rgba(0,0,0,0.2)'}}>
      //       <h2> Trainer? </h2>
      //     </div>
      //     <div style={{position:'absolute', left:'50px', padding:'10px', backgroundColor:'rgba(0,0,0,0.2)'}}>
      //       <h2> Client? </h2>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    foo: store.example.foo,
    user: store.example.user,
    password: store.example.password
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(LogIn)));