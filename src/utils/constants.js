// Game constants
export const GESTURES = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
  NONE: 'none',
};

export const GAME_RESULTS = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
};

// Game rules: key beats value
export const GAME_RULES = {
  [GESTURES.ROCK]: GESTURES.SCISSORS,
  [GESTURES.PAPER]: GESTURES.ROCK,
  [GESTURES.SCISSORS]: GESTURES.PAPER,
};

// Gesture emojis for display
export const GESTURE_EMOJIS = {
  [GESTURES.ROCK]: '✊',
  [GESTURES.PAPER]: '✋',
  [GESTURES.SCISSORS]: '✌️',
  [GESTURES.NONE]: '❓',
};

// Colors
export const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  background: '#f9fafb',
  dark: '#1f2937',
  light: '#ffffff',
  gray: '#6b7280',
};

// Hand detection confidence threshold
export const DETECTION_CONFIDENCE = 0.6;

// Game settings
export const COUNTDOWN_DURATION = 3;
export const RESULT_DISPLAY_DURATION = 2000;




