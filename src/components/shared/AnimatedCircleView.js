import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

class AnimatedCircleView extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: this.props.duration || 3000,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: this.props.duration || 3000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  }

  render() {
    const movingStyle = {
      transform: [
        {
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100] // Adjust this value to control the movement distance
          })
        }
      ]
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={[{  }, movingStyle]}>
            {this.props.content}
        </Animated.View>
      </View>
    );
  }
}

export default AnimatedCircleView;
