import { GESTURES } from './constants';

/**
 * Analyzes hand landmarks to detect Rock, Paper, or Scissors gesture
 * @param {Array} landmarks - Hand landmarks from TensorFlow hand detection
 * @returns {string} - Detected gesture: 'rock', 'paper', 'scissors', or 'none'
 */
export const detectGesture = (landmarks) => {
  if (!landmarks || landmarks.length === 0) {
    return GESTURES.NONE;
  }

  // Get finger tip and base points
  const fingers = {
    thumb: { tip: landmarks[4], base: landmarks[2] },
    index: { tip: landmarks[8], base: landmarks[6] },
    middle: { tip: landmarks[12], base: landmarks[10] },
    ring: { tip: landmarks[16], base: landmarks[14] },
    pinky: { tip: landmarks[20], base: landmarks[18] },
  };

  const wrist = landmarks[0];

  // Check if each finger is extended
  const isFingerExtended = (finger) => {
    // Calculate distance from tip to wrist vs base to wrist
    const tipToWrist = calculateDistance(finger.tip, wrist);
    const baseToWrist = calculateDistance(finger.base, wrist);
    // More lenient threshold - tip should be significantly further from wrist than base
    return tipToWrist > baseToWrist * 1.05; // 5% threshold (reduced from 10%)
  };

  // Special check for thumb (different orientation)
  // For front camera, thumb extends outward (positive x direction typically)
  const isThumbExtended = () => {
    const thumbTip = fingers.thumb.tip;
    const thumbBase = fingers.thumb.base;
    const indexBase = landmarks[5];
    
    // Check if thumb tip is further from index base than thumb base
    const thumbTipToIndex = calculateDistance(thumbTip, indexBase);
    const thumbBaseToIndex = calculateDistance(thumbBase, indexBase);
    
    // Also check if thumb tip is above thumb base (y coordinate)
    const thumbRaised = thumbTip.y < thumbBase.y; // Lower y = higher on screen
    
    return thumbTipToIndex > thumbBaseToIndex * 0.85 || thumbRaised;
  };

  const extendedFingers = {
    thumb: isThumbExtended(),
    index: isFingerExtended(fingers.index),
    middle: isFingerExtended(fingers.middle),
    ring: isFingerExtended(fingers.ring),
    pinky: isFingerExtended(fingers.pinky),
  };

  const extendedCount = Object.values(extendedFingers).filter(Boolean).length;

  // Debug logging (can be removed later)
  if (Math.random() < 0.1) { // Log 10% of the time to avoid spam
    console.log('🔍 Gesture detection:', {
      extendedFingers,
      extendedCount,
      thumb: extendedFingers.thumb,
      index: extendedFingers.index,
      middle: extendedFingers.middle,
    });
  }

  // Gesture detection logic (more lenient)
  // ROCK: Most fingers closed (0-2 extended, but thumb doesn't count as much)
  const nonThumbExtended = [extendedFingers.index, extendedFingers.middle, extendedFingers.ring, extendedFingers.pinky].filter(Boolean).length;
  if (nonThumbExtended <= 1) {
    return GESTURES.ROCK;
  }

  // PAPER: Most fingers extended (3-5 extended)
  if (extendedCount >= 3 || nonThumbExtended >= 3) {
    return GESTURES.PAPER;
  }

  // SCISSORS: Index and middle finger extended, others closed
  // More lenient: allow thumb to be extended
  if (extendedFingers.index && extendedFingers.middle && nonThumbExtended === 2) {
    return GESTURES.SCISSORS;
  }

  // If we have 2 extended fingers but not index+middle, it might be paper
  if (nonThumbExtended === 2) {
    // If index and middle are both extended, it's scissors
    if (extendedFingers.index && extendedFingers.middle) {
      return GESTURES.SCISSORS;
    }
    // Otherwise, might be transitioning to paper
    return GESTURES.PAPER;
  }

  // Default to none if gesture is truly ambiguous
  // But be more lenient - if we have some fingers extended, assume paper
  if (extendedCount >= 2) {
    return GESTURES.PAPER;
  }

  return GESTURES.NONE;
};

/**
 * Calculates Euclidean distance between two 3D points
 * @param {Object} point1 - {x, y, z}
 * @param {Object} point2 - {x, y, z}
 * @returns {number} - Distance between points
 */
const calculateDistance = (point1, point2) => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const dz = (point1.z || 0) - (point2.z || 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

/**
 * Validates if the gesture has been stable for a certain period
 * @param {Array} gestureHistory - Array of recent gestures
 * @param {number} requiredStability - Number of consecutive same gestures needed
 * @returns {string|null} - Stable gesture or null
 */
export const validateStableGesture = (gestureHistory, requiredStability = 2) => {
  if (!gestureHistory || gestureHistory.length < requiredStability) {
    return null;
  }

  // Get the last N gestures
  const recentGestures = gestureHistory.slice(-requiredStability);
  const firstGesture = recentGestures[0];

  // First check: all recent gestures must be the same and not 'none'
  if (
    firstGesture &&
    firstGesture !== GESTURES.NONE &&
    recentGestures.every((g) => g === firstGesture)
  ) {
    return firstGesture;
  }

  // Second check: if we have more gestures, check if last 2-3 are the same
  if (gestureHistory.length >= requiredStability) {
    const lastFew = gestureHistory.slice(-Math.min(3, gestureHistory.length));
    const lastGesture = lastFew[lastFew.length - 1];
    
    // Check if last 2 gestures are the same
    if (lastFew.length >= 2) {
      const lastTwo = lastFew.slice(-2);
      if (lastTwo[0] === lastTwo[1] && lastTwo[0] !== GESTURES.NONE) {
        return lastTwo[0];
      }
    }
    
    // Third check: majority voting (more lenient)
    const gestureCounts = {};
    lastFew.forEach(g => {
      if (g && g !== GESTURES.NONE) {
        gestureCounts[g] = (gestureCounts[g] || 0) + 1;
      }
    });
    
    const gestureEntries = Object.entries(gestureCounts);
    if (gestureEntries.length > 0) {
      // Find the most common gesture
      const mostCommon = gestureEntries.reduce((a, b) => 
        a[1] > b[1] ? a : b
      );
      
      // If most common gesture appears in at least 60% of recent gestures
      if (mostCommon && mostCommon[1] >= Math.ceil(lastFew.length * 0.6)) {
        return mostCommon[0];
      }
    }
  }

  return null;
};




