import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { matchstats } from '@/data/BasketBallLiveData';
import { useLocalSearchParams } from 'expo-router';

const MatchHighlights = () => {
  const { data } = useLocalSearchParams();

  // Parse the data prop if it exists, otherwise use matchstats.statistics
  const [matchInfo, setMatchInfo] = useState(() => {
    if (data) {
      try {
        const parsedData = JSON.parse(data as string);
        if (Array.isArray(parsedData.statistics)) {
          return parsedData.statistics;
        }
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
    return matchstats.statistics;
  });

  useEffect(() => {
    console.log("MatchInfo:", matchInfo);
  }, [matchInfo]);

  // Check if matchInfo is an array before mapping
  if (!Array.isArray(matchInfo)) {
    console.error("matchInfo is not an array:", matchInfo);
    return <Text>Error: Invalid data format</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {matchInfo.map((periodData, index) => (
        <View key={index} style={styles.periodContainer}>
          <Text style={styles.periodTitle}>Period: {periodData.period}</Text>

          {periodData.groups?.map((group: { groupName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; statisticsItems: any[]; }, groupIndex: React.Key | null | undefined) => (
            <View key={groupIndex} style={styles.groupContainer}>
              <Text style={styles.groupTitle}>{group.groupName}</Text>
              {group.statisticsItems?.map((stat, statIndex) => (
                <View key={statIndex} style={styles.statItem}>
                  <Text style={styles.statName}>{stat.name}</Text>
                  <View style={styles.valuesContainer}>
                    <Text style={styles.homeValue}>Home: {stat.home}</Text>
                    <Text style={styles.awayValue}>Away: {stat.away}</Text>
                  </View>
                  <Text style={styles.comparisonText}>
                    Comparison Code: {stat.compareCode}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

// Styles for the Match Highlights page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  periodContainer: {
    marginBottom: 25,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  periodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#303f9f',
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3949ab',
    marginBottom: 10,
  },
  statItem: {
    backgroundColor: '#e8eaf6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  statName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5c6bc0',
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  homeValue: {
    color: '#1b5e20',
    fontWeight: '600',
  },
  awayValue: {
    color: '#c62828',
    fontWeight: '600',
  },
  comparisonText: {
    fontSize: 12,
    color: '#616161',
  },
});

export default MatchHighlights;
