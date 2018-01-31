import React from 'react';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

import { View } from 'react-native';

class Svg3Right extends React.Component {
    render() {
        return (
        <View style={{flex:1}}>
            <Svg
                height="75"
                width="75"
            >
            {/*CENTER*/}
                <Circle
                    x="30"
                    y="30"
                    r="3"
                    stroke="black"
                    strokeWidth="1"
                    fill="white" />
            {/*LEFT*/}
                <Circle
                    x="20"
                    y="30"
                    r="3"
                    stroke="black"
                    strokeWidth="1"
                    fill="white"  />
            {/*RIGHT*/}
                <Circle
                    x="40"
                    y="30"
                    r="3"
                    stroke="black"
                    strokeWidth="1"
                    fill="black" />
            </Svg>
        </View>
        );
    }
}

export default Svg3Right