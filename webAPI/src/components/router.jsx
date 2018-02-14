import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LogIn from './logIn.jsx';
import SignUp from './signUp.jsx';
import ClientProfile from './Client/ClientProfile.jsx'
import Logout from '../actions/userLogout.jsx'
import TrainerProfile from './Trainer/TrainerProfile.jsx'
import WorkoutPlans from './Trainer/WorkoutPlans.jsx'
import Roster from './Trainer/TrainerRoster.jsx'
import NewsFeed from './Trainer/NewsFeed.jsx'
import ClientAnalytics from './Client/ClientAnalytics.jsx'
import ClientTeam from './Client/ClientTeam.jsx'
import TrainerSettings from './Trainer/TrainerSettings.jsx'
import Chat from './Chat.jsx'
import Photos from './Client/Photos.jsx';

import Main from './main.jsx'
import { Dropdown, Grid, Item, Image, Menu, Segment, Icon, Button, Header, Modal } from 'semantic-ui-react'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';


class Header1 extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        auth: this.props.auth || null,
        type: this.props.type || null,
        activeItem: 'home' 
        
      }
      this.handleClick = this.handleClick.bind(this)
      this.handleItemClick = this.handleItemClick.bind(this)
      console.log('does this have auth', this.props)
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentWillReceiveProps (nextProps){
    console.log('inside header', nextProps)
    if(!this.state.auth){
    this.setState({
      auth: nextProps.auth,
      type: nextProps.type
    })
    }
  }

    handleClick() {
      console.log('dafuq', this.props)
      this.props.dispatch(Logout())
      this.setState({auth:null, type:null}, this.props.history.push('/'))
    }

  render() {
    console.log('what is the router props', this.props)
    console.log('what is the state of the router', this.state)
    if(!this.state.type){
      const { activeItem } = this.state
    return(
      <Main/>
    )
  } else if(this.state.type === 'Client'){
    const { activeItem } = this.state
    return(
      <div>

        <Segment color='#FFFCF9' style={{width: '100%'}}>
        <Item.Image size='mini' src='https://fitpics.s3.amazonaws.com/public/GreenBlack.jpg' style={{display: 'inline-block', width: '5%'}}/>

          <Menu  pointing secondary style={{width:'95%', float:'right'}}>
            <Menu.Item name='Profile' as={Link} to="/"/>
            <Menu.Item name='Photos' as={Link} to="/Photos"/>
            <Menu.Item name='Analytics' as={Link} to="/Analytics"/>
            <Menu.Item name='Planner' as={Link} to="/signUp"/>
            <Menu.Item name='Team' as={Link} to="/Team"/>
            <Menu.Item name='Chat' as={Link} to="/Chat"/>
            
            
            <Menu.Menu position='right'>
              <Menu.Item name='Settings' as={Link} to="/Settings"/>
              <Menu.Item name='Log Out' onClick={this.handleClick}/>
            </Menu.Menu>
          </Menu>
        </Segment>
          <Route exact path='/Team' component={ClientTeam}/>
          <Route exact path='/' component={ClientProfile}/>
          <Route exact path='/Settings' component={ClientProfile}/>
          <Route exact path='/Analytics' component={ClientAnalytics}/>
          <Route exact path='/Photos' component={Photos}/>
          <Route exact path='/Chat' component={Chat}/>
        </div>
      //   <div style={{textAlign:'left', backgroundColor: 'rgba(0,0,0, 0.3)'}}>
      //   <ul>
      //   <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to="/">Profile</Link></button>
      //   <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/signUp'>Photos</Link></button>
      //   <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/Analytics'>Analytics</Link></button>
      //   <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/signUp'>Planner</Link></button>
      //   <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/Team'>Team</Link></button>
      //   <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/signUp'>Chat</Link></button>
      //   <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/Settings'>Settings</Link></button>

      //   <button className="btn btn-secondary btn-lg" onClick={this.handleClick} style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}>Log out</button>
      //   </ul>
      //   </div> 

      //    <hr/> 

      // </div>
      )
  } else if(this.state.type === 'Trainer'){
    const { activeItem } = this.state
    return(
      <div>

        <Segment color='#FFFCF9' style={{width: '100%'}}>
          <Menu  pointing secondary >
            <Menu.Item name='Profile' as={Link} to="/"/>
            <Menu.Item name='News Feed' as={Link} to="/Updates"/>
            <Menu.Item name='Roster' as={Link} to="/Roster"/>
            <Menu.Item name='Workout Plan' as={Link} to="/WorkoutPlans"/>
            <Menu.Item name='Chat' as={Link} to="/Chat"/>
            <Menu.Item name='Settings' as={Link} to="/Settings"/>
            <Menu.Item name='Trainer/Client' as={Link} to="/Settings"/>
            <Menu.Item name='Log Out' as={Link} to="/Settings"/>
            {/* <Menu.Menu position='right'>
              <Menu.Item name='Log In' as={Link} to="/"/>
              <Menu.Item name='Sign Up' as={Link} to='/signUp'/>
            </Menu.Menu> */}
          </Menu>
        </Segment>
        <Route exact path='/' component={TrainerProfile}/>
        <Route exact path='/WorkoutPlans' component={WorkoutPlans}/>
        <Route exact path='/Roster' component={Roster}/>
        <Route exact path='/Updates' component={NewsFeed}/>
        <Route exact path='/Settings' component={TrainerSettings}/>
        <Route exact path='/Chat' component={Chat}/>
      </div>

      // <div stlye={{backgroundColor: 'rgba(0,0,0, 0.9)'}}>
      //   <div style={{textAlign:'left', backgroundColor: 'rgba(0,0,0, 0.3)'}}>
      //     <ul>
      //       <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to="/">Profile</Link></button>
      //       <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/Updates'>News Feed</Link></button>
      //       <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/Roster'>Roster</Link></button>
      //       <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/WorkoutPlans'>Workout Plans</Link></button>
      //       <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/Chat'>Chat</Link></button>
      //       <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/Settings'>Settings</Link></button>
      //       <button className="btn btn-secondary btn-lg" onClick={this.handleClick} style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}>Log out</button>
      //       <button className="btn btn-secondary btn-lg" onClick={this.handleClick} style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}>Switch to Client Profile</button>
      //     </ul>
      //   </div>
      //   <hr/>

      //   <Route exact path='/' component={TrainerProfile}/>
      //   <Route exact path='/WorkoutPlans' component={WorkoutPlans}/>
      //   <Route exact path='/Roster' component={Roster}/>
      //   <Route exact path='/Updates' component={NewsFeed}/>
      //   <Route exact path='/Settings' component={TrainerSettings}/>
      //   <Route exact path='/Chat' component={Chat}/>
      // </div>
      )
  }
              /*<div>
        <div style={{textAlign:'left', backgroundColor: 'rgba(0,0,0, 0.2)'}}>
        <ul>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to="/">Profile</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/analytics'>Analytics</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/measurements'>Measurements</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/progress'>Progress Photos</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/weekly'>Your Week</Link></button>
        <button className="btn btn-secondary btn-lg" onClick={this.handleClick} style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}>Log out</button>
        </ul>
        </div>

        <hr/>

        <Route exact path='/' component={Profile}/>
        <Route exact path='/weekly' component={Weekly}/>
        <Route exact path='/measurements' component={Measure}/>
        <Route exact path='/analytics' component={Analytics}/>
        <Route exact path='/progress' component={Progress}/>
      </div>*/
    }
}

const mapStoreToProps = (store) => {
  console.log('router store', store);
  return {
    auth: store.auth.auth,
    type: store.auth.type
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Header1));








      // <div>
      //   <Segment style={{marginBottom: 0, position:'fixed', top:0,  width: '100%', zIndex: 2}}>
      //     <Item.Image size='mini' src='https://fitpics.s3.amazonaws.com/public/GreenBlack.jpg' style={{display: 'inline-block', width: '5%'}}/>
      //     {/* <Image src='https://fitpics.s3.amazonaws.com/public/GreenBlack.jpg' size='mini'/> */}
          
      //     <Menu  pointing secondary style={{width:'95%', float:'right'}}>
      //       <b style={{marginRight: '2%', display:'inline-block'}}>Fit Hero</b>
      //       <Menu.Item name='Home' as={Link} to="/"/>
      //       <Menu.Item name='About' as={Link} to="/about"/>
      //       <Menu.Item name='Contact' as={Link} to="/contact"/>
            // <Menu.Menu position='right'>
            //   {/* <Menu.Item name='Log In' as={Link} to="/"/> */}
            //   {/* <Menu.Item name='Sign Up' as={Link} to='/signUp'/> */}
            // </Menu.Menu>

      //       {/* NAV RIGHT */}
      //       <Menu.Menu position='right'>
      //         <Dropdown item  text='Sign In / Log In'>
      //           <Dropdown.Menu fluid style={{width: '20em', wordWrap: 'break-word', backgroundColor:'#211e1f', color:'white', padding: '5%'}}>
      //           <h2 style={{textAlign: 'center'}}>Join For Free</h2>
      //           <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-line', padding:'5%'}}>Meet a trainer or build your own workouts, and start tracking your results and more!</p>
      //           {/* Drop Down Log In Button Modal Window */}
      //           <Modal style={{height: '50%', width: '50%'}} center trigger={<Dropdown.Item><Button fluid primary>Log In</Button></Dropdown.Item>}>
      //             <Modal.Header>Login</Modal.Header>
      //             <Modal.Content >
      //               {/* <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' /> */}
      //               <Modal.Description>
      //                 <Header>Trainer</Header>
      //                 <p>We've found the following gravatar image associated with your e-mail address.</p>
      //                 <p>Is it okay to use this photo?</p>
      //                 <Header>Member</Header>
      //                 <p>We've found the following gravatar image associated with your e-mail address.</p>
      //                 <p>Is it okay to use this photo?</p>
      //               </Modal.Description>
      //             </Modal.Content>
      //           </Modal>

      //           <Dropdown.Item><Button fluid secondary style={{backgroundColor: 'white', color: 'black'}}>SignUp</Button></Dropdown.Item>
      //           </Dropdown.Menu>
      //         </Dropdown>
      //       </Menu.Menu>
      //     </Menu>
      //   </Segment>

      //   <div style={{background: 'url("http://gettheshot.ca/images/hero/Mark-Whitehead-Photography-Get-The-Shot-Studios-4.jpg") center', backgroundSize: 'cover', height: '65vh', marginTop: 0}}>
      //     {/* ?<Image src='http://gettheshot.ca/images/hero/Mark-Whitehead-Photography-Get-The-Shot-Studios-4.jpg' centered style={{margin: '-10' ,width: '100%', height: '100%', opacity: 0.7}} /> */}
      //   </div>
      //   {/* Info Blurb */}
      //   <Grid style={{backgroundColor: "#06D6A0", margin: 0, marginTop:'10'}} columns={4} >
      //     <Grid.Row centered>
      //       <Grid.Column >
      //         <Icon name='comments outline' size='huge'/>
      //         <span>Talk Live With Trainers</span>
      //       </Grid.Column>
      //       <Grid.Column >
      //         <Icon name='line chart' size='huge' />
      //         <span>Record Track and View Graphed Analysis of Workouts and Diet</span>
      //       </Grid.Column >
      //     </Grid.Row>

      //     <Grid.Row centered>
      //       <Grid.Column centered>
      //         <Icon name='calendar' size='huge' />
      //         <span>Structured Workout Regimen</span>
      //       </Grid.Column>
      //       <Grid.Column centered>
      //         <Icon name='user plus' size='huge' />
      //         <span>Find Real Professional Trainers</span>
      //       </Grid.Column>
      //     </Grid.Row>
      //   </Grid>

        // <Route exact path='/' component={LogIn}/>
      //   <Route exact path='/signUp' component={SignUp}/>
      // </div>