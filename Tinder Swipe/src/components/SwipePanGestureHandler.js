import React from 'react';
import { Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler, withSpring, runOnJS } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SwipePanGestureHandler = (props) => {

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            // with the context (ctx), we track the original start positions
            ctx.startX = props.x.value;
            ctx.startY = props.y.value;
      
            // keep the y value for figuring out the image rotation direction
            props.originY.value = event.y;
        },
        onActive: (event, ctx) => {
            // user is actively touching and moving the image
            props.x.value = ctx.startX + event.translationX;
            props.y.value = ctx.startY + event.translationY;
            },
        onEnd: (event, ctx) => {
            // dragged 40 percent of the screen's width
            const thresh = SCREEN_WIDTH * 0.4;
        
            // how much the user moved the image horizontally
            const dist = ctx.startX + event.translationX;
        
            if (dist > thresh) {
                // swiped right
                runOnJS(props.onSnap)(true);
                // props.onSnap(true);
            } else if (dist < -1 * thresh) {
                // swiped left
                runOnJS(props.onSnap)(false);
                // props.onSnap(false);
            } else {
                // no left or right swipe, so 'jump' back to the initial position
                props.x.value = withSpring(0);
                props.y.value = withSpring(0);
            }
        },
    })

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            {props.children}
        </PanGestureHandler>
    );
}

export default SwipePanGestureHandler;