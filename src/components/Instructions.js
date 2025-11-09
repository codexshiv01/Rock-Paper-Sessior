import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, GESTURE_EMOJIS } from '../utils/constants';

const Instructions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Play</Text>
      
      <View style={styles.instructionItem}>
        <Text style={styles.stepNumber}>1</Text>
        <Text style={styles.stepText}>
          Show your hand gesture to the camera
        </Text>
      </View>

      <View style={styles.instructionItem}>
        <Text style={styles.stepNumber}>2</Text>
        <Text style={styles.stepText}>
          Hold the gesture steady for detection
        </Text>
      </View>

      <View style={styles.instructionItem}>
        <Text style={styles.stepNumber}>3</Text>
        <Text style={styles.stepText}>
          The app will automatically play against you!
        </Text>
      </View>

      <View style={styles.gesturesSection}>
        <Text style={styles.gesturesTitle}>Available Gestures:</Text>
        <View style={styles.gesturesRow}>
          <GestureItem emoji={GESTURE_EMOJIS.rock} label="Rock" />
          <GestureItem emoji={GESTURE_EMOJIS.paper} label="Paper" />
          <GestureItem emoji={GESTURE_EMOJIS.scissors} label="Scissors" />
        </View>
      </View>
    </View>
  );
};

const GestureItem = ({ emoji, label }) => (
  <View style={styles.gestureItem}>
    <Text style={styles.gestureEmoji}>{emoji}</Text>
    <Text style={styles.gestureLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    backgroundColor: COLORS.background,
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: 'center',
    lineHeight: 32,
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    color: COLORS.dark,
    flex: 1,
  },
  gesturesSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
  gesturesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 12,
    textAlign: 'center',
  },
  gesturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gestureItem: {
    alignItems: 'center',
  },
  gestureEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  gestureLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
});

export default Instructions;




