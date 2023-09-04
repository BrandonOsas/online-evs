declare module 'react-swipeable-views' {
  import * as React from 'react';

  type OnChangeIndexCallback = (index: number, indexLatest: number) => void;

  type OnTransitionEndCallback = () => void;

  type OnSwitchingCallback = (index: number, type: 'move' | 'end') => void;

  type AxisType = 'x' | 'x-reverse' | 'y' | 'y-reverse';

  export interface Actions {
    updateHeight: () => void;
  }

  type ActionCallback = (actions: Actions) => void;

  interface SpringConfig {
    duration: string;
    easeFunction: string;
    delay: string;
  }

  export interface SwipeableViewsProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'action'> {
    animateHeight?: boolean;
    animateTransitions?: boolean;
    axis?: AxisType;
    containerStyle?: React.CSSProperties;
    disabled?: boolean;
    disableLazyLoading?: boolean;
    enableMouseEvents?: boolean;
    hysteresis?: number;
    ignoreNativeScroll?: boolean;
    index?: number;
    onChangeIndex?: OnChangeIndexCallback;
    onSwitching?: OnSwitchingCallback;
    onTransitionEnd?: OnTransitionEndCallback;
    resistance?: boolean;
    style?: React.CSSProperties;
    slideStyle?: React.CSSProperties;
    springConfig?: SpringConfig;
    slideClassName?: string;
    threshold?: number;
    action?: ActionCallback;
  }

  interface SwipeableViewsState {
    indexCurrent?: number;
    indexLatest?: number;
    isDragging?: boolean;
    isFirstRender?: boolean;
    heightLatest?: number;
    displaySameSlide?: boolean;
  }

  const SwipeableViews: React.ComponentClass<SwipeableViewsProps, SwipeableViewsState>;

  export default SwipeableViews;
}
