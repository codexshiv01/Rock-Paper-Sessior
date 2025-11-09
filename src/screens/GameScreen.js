import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CameraView from '../components/CameraView';
import GameResult from '../components/GameResult';
import GameStats from '../components/GameStats';
import { COLORS, RESULT_DISPLAY_DURATION } from '../utils/constants';
import { getComputerMove, determineWinner } from '../utils/gameLogic';

const GameScreen = ({ navigation }) => {
  const [gameState, setGameState] = useState('waiting'); // waiting, showing_result
  const [playerMove, setPlayerMove] = useState(null);
  const [computerMove, setComputerMove] = useState(null);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });

  const handleGestureDetected = (gesture) => {
    console.log('🎮 handleGestureDetected called with gesture:', gesture);
    console.log('🎮 Current gameState:', gameState);
    
    if (gameState !== 'waiting') {
      console.log('⚠️ Game is not in waiting state, ignoring gesture');
      return;
    }

    console.log('✅ Processing gesture:', gesture);
    const compMove = getComputerMove();
    const gameResult = determineWinner(gesture, compMove);

    console.log('🎲 Player:', gesture, 'vs Computer:', compMove, 'Result:', gameResult);

    setPlayerMove(gesture);
    setComputerMove(compMove);
    setResult(gameResult);
    setGameState('showing_result');

    // Update stats
    setStats((prevStats) => {
      const newStats = {
        ...prevStats,
        wins: gameResult === 'win' ? prevStats.wins + 1 : prevStats.wins,
        losses: gameResult === 'lose' ? prevStats.losses + 1 : prevStats.losses,
        draws: gameResult === 'draw' ? prevStats.draws + 1 : prevStats.draws,
      };
      console.log('📊 Updated stats:', newStats);
      return newStats;
    });

    console.log('⏱️ Will return to waiting state after', RESULT_DISPLAY_DURATION, 'ms');
    // Return to waiting state after displaying result
    setTimeout(() => {
      console.log('🔄 Returning to waiting state');
      setGameState('waiting');
      setPlayerMove(null);
      setComputerMove(null);
      setResult(null);
    }, RESULT_DISPLAY_DURATION);
  };

  const handleReset = () => {
    setStats({ wins: 0, losses: 0, draws: 0 });
    setGameState('waiting');
    setPlayerMove(null);
    setComputerMove(null);
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Play Game</Text>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          onGestureDetected={handleGestureDetected}
          isActive={gameState === 'waiting'}
        />
      </View>

      <View style={styles.bottomContainer}>
        {gameState === 'showing_result' && playerMove && computerMove && result && (
          <GameResult
            playerMove={playerMove}
            computerMove={computerMove}
            result={result}
            visible={gameState === 'showing_result'}
          />
        )}

        <GameStats wins={stats.wins} losses={stats.losses} draws={stats.draws} />

        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator,
            { backgroundColor: gameState === 'waiting' ? COLORS.success : COLORS.warning }
          ]}>
            <Text style={styles.statusText}>
              {gameState === 'waiting' ? '🎮 Ready - Show your gesture!' : '⏳ Processing...'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.light,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  resetButton: {
    padding: 8,
  },
  resetButtonText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  bottomContainer: {
    backgroundColor: COLORS.background,
  },
  statusContainer: {
    padding: 16,
  },
  statusIndicator: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statusText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GameScreen;




