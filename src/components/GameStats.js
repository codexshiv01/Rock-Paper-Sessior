import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import { calculateWinRate } from '../utils/gameLogic';

const GameStats = ({ wins, losses, draws }) => {
  const totalGames = wins + losses + draws;
  const winRate = calculateWinRate(wins, losses, draws);

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <StatItem label="Wins" value={wins} color={COLORS.success} />
        <StatItem label="Losses" value={losses} color={COLORS.error} />
        <StatItem label="Draws" value={draws} color={COLORS.warning} />
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Games: {totalGames}</Text>
        <Text style={styles.winRateLabel}>Win Rate: {winRate}%</Text>
      </View>
    </View>
  );
};

const StatItem = ({ label, value, color }) => (
  <View style={styles.statItem}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.background,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: '600',
  },
  winRateLabel: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default GameStats;




