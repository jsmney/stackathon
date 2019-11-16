import React, {useState, useEffect} from 'react'
import {Animated, Easing} from 'react-native'

export const EaseIn = props => {
  const [easeInAnim] = useState(new Animated.Value(0)) // Initial value
  useEffect(() => {
    Animated.timing(easeInAnim, {
      toValue: 100,
      easing: Easing.in,
      duration: 500
    }).start()
  }, [])

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style
      }}
    >
      {props.children}
    </Animated.View>
  )
}

const FadeInView = props => {
  const [fadeAnim] = useState(new Animated.Value(0)) // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start()
  }, [])

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  )
}

export default FadeInView
