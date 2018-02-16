import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import SetBackground from '../../actions/backgroundImage.jsx'
import SetProfile from '../../actions/profileImage.jsx'
import axios from 'axios'
import { Dropdown, Grid, Label, Item, Image, Menu, Segment, Form,Icon, Button, Header, Modal } from 'semantic-ui-react'

class TrainerProfile extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        store: this.props.store,
        brand: this.props.brand
        // id : this.props.id || null,
        // username : this.props.user || null,
        // goals : this.props.goals || null,
        // backgroundImage: this.props.backgroundImage,
        // ProfileImage: 'https://my.webinarninja.com/images/avatar-default.png',
        // editing: false
      }
      this.handleBackground = this.handleBackground.bind(this)
      this.handleProfile = this.handleProfile.bind(this)
      this.edit = this.edit.bind(this)
      this.getProfileImg = this.getProfileImg.bind(this)

      this.getProfileImg()

  }

  componentWillReceiveProps(nextProps) {
    this.setState({goals: nextProps.goals})
  }

  getProfileImg(){
        axios.get("https://fitpics.s3.amazonaws.com/public/" + 4 + "/profilePicture")
        .then((response) => {
          this.setState({
            ProfileImage: `data:image/jpg;base64,${response.data}`
          });
        }).catch(err => console.log('axios error: ', err));

        //probably want a redux dispatch here for rest of components
  }



  handleBackground(){
    console.log('handling background')
    var file = document.getElementById('file').files;
    // console.log(file)
    if (file) {
      console.log('what is FIlereader???', FileReader)
      var BackReader = new FileReader
      BackReader.onload = (e) => {
        var payload = { uri: e.target.result }
        this.setState({
          backgroundImage: e.target.result
        })
      this.props.dispatch(SetBackground(e.target.result))
      };
      BackReader.readAsDataURL(file[0]);

      var formData = new FormData();
      formData.append("image", file[0]);
      // formData.append('user', this.state.id);
    }
  }

  edit(){
    this.setState({
      editing: !this.state.editing
    })
  }

  handleProfile(){
    console.log('handling profile')
    var file = document.getElementById('Profile').files;
    console.log(file)
    if (file) {
      var ProReader = new FileReader
      // console.log(FileReader)
      ProReader.onload = (e) => {
        var payload = { uri: e.target.result }
        this.setState({
          ProfileImage: e.target.result
        })
      this.props.dispatch(SetProfile(e.target.result))
      };
      ProReader.readAsDataURL(file[0]);

      var formData = new FormData();
      formData.append("image", file[0]);
      // formData.append('user', this.state.id);
    }
  }

render() {
  // console.log('gimme dat state', this.state)
  return(
    <div style={{padding: '3%', backgroundColor:'white', height:'100%'}}>
      <Grid columns={2} centered style={{height: '90%', backgroundColor:'#f6f6f6', padding: '3%'}}>
        <Grid.Column centered style={{alignItems: 'center', width:'40%'}}>
          <Image avatar src={this.state.store.profile_data.profilePictureURL} size='small' style={{transform: "rotate(90deg)"}}/>  
          <h1 style={{marginBottom: 0}}>      
            {this.state.store.fullName}
          </h1>
          <div>
            <Icon name='star'/>
            <Icon name='star'/>
            <Icon name='star'/>
            <Icon name='star'/>
            <Icon name='star half empty'/>
          </div>
          {/* <caption>Personal Trainer</caption> */}
          <div style={{width: '50%'}} >
            <h2>Specialties</h2>
            <Label style={{margin:'2%'}}>Weight Loss</Label>
            <Label style={{margin:'2%'}}>Strenght Training</Label>
            <Label style={{margin:'2%'}}>HIT</Label>
            <Label style={{margin:'2%'}}>Toning</Label>
            <Label style={{margin:'2%'}}>Bulking</Label>
          </div>    
        </Grid.Column>
        <Grid.Column centered style={{alignItems: 'center', width:'40%'}}>
          <div>
            <div>
            {/* <hr/> */}
              <h2> Description </h2>
              <p> 
                Your in-home or building gym trainer, but if you don’t have access to a gym, come train with me in my private, waterfront, luxury gym! Message me for special price!
                I enjoy working closely with people to achieve their health and fitness goals. These goals include weight loss, improving general strength and conditioning or targeted fitness training. 
                I do that by developing and implementing a custom fitness plan which is combined 
                with motivational techniques and dietary advice to achieve maximum results.
                I'm certified by the National Academy of Sports Medicine and I'm an accredited Insanity® instructor.
                Fitness is my passion and I truly enjoy helping people to feel good about themselves.   
              </p>
            </div>
          </div>
        </Grid.Column>
        <hr style={{width: '90%'}}/>
        <Grid.Row style={{alignItems: 'center'}} >
          <Grid.Column centered style={{alignItems: 'center', width:'40%', height:'20vh', backgroundColor:'#DCDCDC', margin: '3%'}}>
            <div>
              <h2>Certification</h2>
              <p style={{color: '#868e96'}}>Certified Personal Trainer - American Council Exercise <br/> Medical Exercise Specialist - ACE</p>
            </div>
          </Grid.Column>

          <Grid.Column centered style={{alignItems: 'center', width:'40%', height:'20vh', backgroundColor:'#DCDCDC', margin: '3%'}}>
            <div>
              <h2>Specialties</h2>
              <Label style={{margin:'2%'}}>Weight Loss</Label>
              <Label style={{margin:'2%'}}>HIT</Label>
              <Label style={{margin:'2%'}}>Toning</Label>
              <Label style={{margin:'2%'}}>Bulking</Label>
              <Label style={{margin:'2%'}}>Strenght Training</Label>
            </div> 
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </div>
    )
  }
}
{/* <div id='test' className='container'>
</div>
<img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
<div className='container' style={{justifyConetent:'center'}}>
  <img src={this.state.ProfileImage} style={{maxWidth: 250, maxHeight:250, display: 'block', margin:'0 auto'}} />
</div> */}

const mapStoreToProps = (store) => {
  console.log('TrainerProfileStore', store);
  // var stuff = store.auth
  return {
     store: store.auth,
     brand: store.branding
    // id: store.auth.id,
    // user: store.auth.fullName,
    // goals: store.auth.goals,
    // backgroundImage: store.branding.backgroundImg,
    // ProfileImage: store.branding.profileImg
  };
};

export default withRouter(connect(
  mapStoreToProps
)(TrainerProfile));