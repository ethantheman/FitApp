import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import c3 from 'c3';
import SelectedClientProfile from './selectedClientProfile.jsx'
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import { Grid, Menu, Segment, Button, Container } from 'semantic-ui-react'
import BodyAnalytics from '../client/Graphs/bodyComp.jsx'
import DietAnalytics from '../client/Graphs/dietAnalytics.jsx'

class SelectedClient extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id: this.props.id,
        selected: 'Profile'
      }
      this.renderSelected = this.renderSelected.bind(this)
      this.select = this.select.bind(this)
  }
//WILL NEED TO ADD MORE GRAPHS HERE
   select(e, { name }){
    this.setState({
      selected : name
    })
  }

  renderSelected(){
    console.log('whats going on?', this.state)
    if(this.state.selected === 'Profile'){
        return(
          <Container style={{width:'80%', display:'inline-block'}}>
            <SelectedClientProfile />
          </Container>
        )
        }else if(this.state.selected === 'Body Analytics'){
        return(
          <Container style={{width:'80%', display:'inline-block'}}>
          <BodyAnalytics />
          </Container>
        )
        } else if(this.state.selected === 'Diet Analytics'){
          return(
          <Container style={{widht:'80%', display: 'inline-block'}}>
          <DietAnalytics />
          </Container>)
        }
        else if(this.state.selected === 'Workouts'){
          return(
            <Container>
            Workouts
            </Container>
            )
        }
  }

  render() {
    console.log('whats zeee state', this.state)
    return(
      <Grid>
        <Grid.Column width={3}>
          <Menu fluid vertical tabular>
      <Menu.Item active={this.state.selected === 'Profile'} onClick={this.select} value='Profile' name="Profile" />
      <Menu.Item active={this.state.selected === 'Body Analytics'} onClick={this.select} value='BodyAnalytics' name='Body Analytics' />
      <Menu.Item active={this.state.selected === 'Diet Analytics'} onClick={this.select} value='DietAnalytics' name='Diet Analytics' />
      <Menu.Item active={this.state.selected === 'Workouts'} onClick={this.select} value='Workouts' name='Workouts' />
                </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
           {this.renderSelected()}
          </Segment>
          <Button style={{backgroundColor:'#FFD166', bottom:'0'}}fluid onClick={this.props.cancel} >Back</Button>
        </Grid.Column>
      </Grid>
    )
  }

}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.id,
    user: store.example.user
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(SelectedClient)));