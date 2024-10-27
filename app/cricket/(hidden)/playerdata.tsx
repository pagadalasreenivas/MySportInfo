import { playerInfo } from '@/data/PlayerInfo';
import {Image as ExpoImage} from 'expo-image';
import React from 'react';
import { Text, View, Image, StyleSheet, FlatList, ScrollView } from 'react-native';

const playerData = playerInfo;

const statsOrder = ['m', 'inn', 'runs', 'avg', '4s', '6s', "50s","100s", "200s"];
const bowlingStatsOrder =["m", "inn", "b", "runs", "wkts", "bbi", "bbm", "econ", "avg", "sr", "5w", "10w"];


// Group stats by stat type (rows) and matchtype (columns)
const groupStats = (stats: { fn: string; matchtype: string; stat: string; value: string; }[]) => {
    const battingGrouped: { [key: string]: { [key: string]: string } } = {}; 
  stats.forEach(({ fn, matchtype, stat, value }) => {
    
    if (!battingGrouped[stat] && fn.includes('batting')) {
      battingGrouped[stat] = {};
    }
    if(fn.includes('batting')){
    battingGrouped[stat][matchtype] = value;
    }
  });
  return battingGrouped;
};

const groupBowlingStats = (stats: { fn: string; matchtype: string; stat: string; value: string; }[]) => {
    const bowlingGrouped: { [key: string]: { [key: string]: string } } = {}; 
  stats.forEach(({ fn, matchtype, stat, value }) => {
    
    if (!bowlingGrouped[stat] && fn.includes('bowling')) {
      bowlingGrouped[stat] = {};
    }
    if(fn.includes('bowling')){
    bowlingGrouped[stat][matchtype] = value;
    }
  });
  return bowlingGrouped;
};

const CareerStats = ({ stats }: { stats: { fn: string; matchtype: string; stat: string; value: string; }[] }) => {
  const groupedStats = groupStats(stats);
  const bolwingStats = groupBowlingStats(stats);

  return (
    <View style={styles.careerContainer}>
      <Text style={styles.sectionTitle}>CAREER STATS</Text>
      <ScrollView>
      <Text style={styles.sectionTitle}>Batting</Text>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Stats</Text>
            <Text style={styles.headerCell}>Test</Text>
            <Text style={styles.headerCell}>ODI</Text>
            <Text style={styles.headerCell}>T20I</Text>
            <Text style={styles.headerCell}>IPL</Text>
          </View>
          {statsOrder.map((statKey) => (
            <View style={styles.tableRow} key={statKey}>
              <Text style={styles.tableCell}>{statKey}</Text>
              <Text style={styles.tableCell}>{groupedStats[statKey]?.['test'] || '-'}</Text>
              <Text style={styles.tableCell}>{groupedStats[statKey]?.['odi'] || '-'}</Text>
              <Text style={styles.tableCell}>{groupedStats[statKey]?.['t20i'] || '-'}</Text>
              <Text style={styles.tableCell}>{groupedStats[statKey]?.['ipl'] || '-'}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Bowling</Text>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Stats</Text>
            <Text style={styles.headerCell}>Test</Text>
            <Text style={styles.headerCell}>ODI</Text>
            <Text style={styles.headerCell}>T20I</Text>
            <Text style={styles.headerCell}>IPL</Text>
          </View>
          {bowlingStatsOrder.map((statKey) => (
            <View style={styles.tableRow} key={statKey}>
              <Text style={styles.tableCell}>{statKey}</Text>
              <Text style={styles.tableCell}>{bolwingStats[statKey]?.['test'] || '-'}</Text>
              <Text style={styles.tableCell}>{bolwingStats[statKey]?.['odi'] || '-'}</Text>
              <Text style={styles.tableCell}>{bolwingStats[statKey]?.['t20i'] || '-'}</Text>
              <Text style={styles.tableCell}>{bolwingStats[statKey]?.['ipl'] || '-'}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default function PlayerData() {
  return (
    <View style={styles.container}>
      {/* Player Image and Basic Info */}
      <ExpoImage 
  source={{ uri: playerData.data.playerImg }} 
  style={styles.image} 
/>
      <Text style={styles.name}>{playerData.data.name}</Text>
      <Text style={styles.country}>{playerData.data.country}</Text>

      {/* Personal Information Container */}
      <View style={styles.personalContainer}>
        <Text style={styles.sectionHeader}>PERSONAL INFORMATION</Text>
        <Text style={styles.info}>Date Of Birth: {playerData.data.dateOfBirth}</Text>
        <Text style={styles.info}>Place Of Birth: {playerData.data.placeOfBirth}</Text>
        <Text style={styles.info}>Role: {playerData.data.role}</Text>
        <Text style={styles.info}>Batting Style: {playerData.data.battingStyle}</Text>
        <Text style={styles.info}>Bowling Style: {(playerData.data as { bowlingStyle?: string }).bowlingStyle ?? '-'}</Text>
      </View>

      <ScrollView style={styles.career}>
      <CareerStats stats={playerData.data.stats} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    flex:1
  },
  career:{
    width:'100%',
    flexGrow:1
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  country: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  personalContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 20,
  },
  careerContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center'
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10, // Increase vertical padding
    paddingHorizontal: 5, // Add horizontal padding for spacing between columns
  },
  tableRow: {
    flexDirection: 'row',
    marginVertical: 10, // Increase vertical margin between rows
  },
  tableCell: {
    flex: 1,
    paddingVertical: 10, // Add vertical padding for each cell
    paddingHorizontal: 5, // Add horizontal padding for each cell
    borderBottomWidth: 1, // Optional: Add border for better visibility
  },
});
