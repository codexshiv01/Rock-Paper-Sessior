import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, GESTURE_EMOJIS, GAME_RESULTS } from '../utils/constants';
import { getResultMessage } from '../utils/gameLogic';

const GameResult = ({ playerMove, computerMove, result, visible }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
    }
  }, [visible]);

  if (!visible) return null;

  const getResultColor = () => {
    switch (result) {
      case GAME_RESULTS.WIN:
        return COLORS.success;
      case GAME_RESULTS.LOSE:
        return COLORS.error;
      case GAME_RESULTS.DRAW:
        return COLORS.warning;
      default:
        return COLORS.gray;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.movesContainer}>
        <View style={styles.moveBox}>
          <Text style={styles.moveLabel}>You</Text>
          <Text style={styles.moveEmoji}>{GESTURE_EMOJIS[playerMove]}</Text>
          <Text style={styles.moveName}>{playerMove.toUpperCase()}</Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.moveBox}>
          <Text style={styles.moveLabel}>Computer</Text>
          <Text style={styles.moveEmoji}>{GESTURE_EMOJIS[computerMove]}</Text>
          <Text style={styles.moveName}>{computerMove.toUpperCase()}</Text>
        </View>
      </View>

      <View style={[styles.resultBadge, { backgroundColor: getResultColor() }]}>
        <Text style={styles.resultText}>{getResultMessage(result)}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    borderRadius: 20,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  movesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  moveBox: {
    alignItems: 'center',
  },
  moveLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
    fontWeight: '500',
  },
  moveEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  moveName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  vs: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  resultBadge: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.light,
  },
});

export default GameResult;




