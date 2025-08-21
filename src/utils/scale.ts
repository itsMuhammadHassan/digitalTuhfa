import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5.5" screen mobile device
const GUIDELINE_BASE_WIDTH = 375; // iPhone X width
const GUIDELINE_BASE_HEIGHT = 812; // iPhone X height

export const scale = (size: number) => (SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / GUIDELINE_BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;

export const fontScale = (size: number) => {
  const scaled = moderateScale(size);
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

