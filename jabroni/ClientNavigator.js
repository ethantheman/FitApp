import SwipeNavigator from 'react-native-swipe-navigation'
import DailyWorkouts from './DailyWorkouts'
import Diet from './Diet'
import Profile from './profile'
import LogOut from './logOut.js'
import Data from './DataHome.js'
import DataDiet from './DataScreen.js'
import BodyComposition from './bodyComposition'
import Chat from './Chat.js'
import VideoChat from './VideoChat.js'
import DailyInputs from './DailyInputs.js'
import TeamScreen from './TeamScreen.js'
import PlanScreen from './PlanScreen.js'
import Camera from './Camera.js'

const ProfileNavigator = new SwipeNavigator({

  //FIRST TAB SET (Inputs/Profile)
  Home: {
    screen: Profile,
    right: 'DailyDiet',
    left: 'DailyWorkouts',
    top: 'LogOut',
    bottom: 'DailyInputs',
    top: 'LogOut',
    type: 'over'
  },

  Camera: {
    screen: Camera,
    type: 'push',
  },

  DailyInputs: {
    screen: DailyInputs,
    // right: 'DailyDiet',
    top: 'Profile',
    // left: 'DailyWorkouts',
    color: '#FFFFFF',
    type: 'push'
  },

  DailyWorkouts: {
    screen: DailyWorkouts,
    // bottom: 'DailyInputs',
    // top: 'LogOut',
    right: 'Profile',
    color: '#FFFFFF',
    type: 'over',
  },

  DailyDiet: {
    screen: Diet,
    // bottom: 'DailyInputs',
    left: 'Profile',
    // top: 'LogOut',
    color: '#FFFFFF',
    type: 'over',
  },
  
  LogOut: {
    screen: LogOut,
    type: 'over'
  },

  //SECOND TAB SET (Data)
  DataDiet: {
    screen: DataDiet,
    type: 'over',
    color: '#FFFFFF'
  },

  DataBodyComposition:{
    screen: BodyComposition,
    type: 'over',
    color: '#FFFFFF'
  },

  Data: {
    screen: Data,
    color: '#FFFFFF',
    type: 'over',
    top: 'DataDiet',
    bottom: 'DataBodyComposition'
  },

  //THIRD TAB SET (PLAN)
  Plan: {
    screen: PlanScreen,
    type: 'over'
  },
  //FOUTH TAB SET (TEAM)
  Team: {
    screen: TeamScreen,
    type: 'over'
  },
  //CHAT MESSAGING AND VIDEO ROUTES
  Messages:{
    screen: Chat,
    type: 'over',
    color: '#FFFFFF'
  },

  Video: {
    screen: VideoChat,
    type: 'over',
    color: '#FFFFFF'
  }

})

export default ProfileNavigator
