import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { ButtonGroup } from "react-native-elements";
//THIS IS FOR THE CLIENT
class FooterNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.index
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    const buttons = ["Home", "Plan", "Data", "Photos", "Team"];
    if (this.state.selectedIndex !== selectedIndex) {
      this.setState({ selectedIndex }, () => {
        this.props.nav.navigate(buttons[selectedIndex]);
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedIndex: nextProps.index
    });
  }
  render() {
    const buttons = ["Home", "Plan", "Data", "Photos", "Team"];

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={this.state.selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 50 }}
        selectedButtonStyle={{ backgroundColor: "#2196F3" }}
        selectedTextStyle={{ color: "white" }}
      />
    );
  }
}

export default FooterNav;
