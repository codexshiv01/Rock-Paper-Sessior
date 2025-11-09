import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, GESTURE_EMOJIS } from '../utils/constants';
import Instructions from '../components/Instructions';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Rock Paper Scissors</Text>
          <Text style={styles.subtitle}>Play with Hand Gestures!</Text>
          <View style={styles.emojiRow}>
            <Text style={styles.emoji}>{GESTURE_EMOJIS.rock}</Text>
            <Text style={styles.emoji}>{GESTURE_EMOJIS.paper}</Text>
            <Text style={styles.emoji}>{GESTURE_EMOJIS.scissors}</Text>
          </View>
        </View>

        <Instructions />

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('Game')}
          activeOpacity={0.8}
        >
          <Text style={styles.playButtonText}>Start Playing</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ using React Native & TensorFlow.js
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  emojiRow: {
    flexDirection: 'row',
    gap: 20,
  },
  emoji: {
    fontSize: 48,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    margin: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonText: {
    color: COLORS.light,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default HomeScreen;




