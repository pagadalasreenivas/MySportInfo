import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View, StyleSheet, ScrollView, SectionList } from "react-native";

// Sample data for highlights and statistics
const highlights = [
  { time: 12, home_scorer: "Player A", info: "Goal", score: "1-0" },
  { time: 35, away_scorer: "Player B", info: "Yellow Card", score: "1-0" },
  { time: 45, home_scorer: "Player C", info: "Goal", score: "2-0" },
];

const statistics = [
  { type: "Corners", home: "5", away: "2" },
  { type: "Shots On Goal", home: "5", away: "3" },
  { type: "Ball Possession", home: "55%", away: "45%" },
  // Add more statistics as needed
];


export default function MatchHighlights() {
const { data } = useLocalSearchParams();
const [gamedeets, setGamedeets] = useState(data ? JSON.parse(data as string) : {});
  // Filter highlights into Goals and Cards
  const goalHighlights = gamedeets.goalscorer;
  //const goalHighlights = highlights.filter(item => item.info === "Goal");
  const cardHighlights = gamedeets.cards;
  //const cardHighlights = highlights.filter(item => item.info.includes("Card"));
  const statistics = gamedeets.statistics;
  const sections = [
    { title: "Goals", data: goalHighlights, type: "goals" },
    { title: "Cards", data: cardHighlights, type: "cards" },
    { title: "Statistics", data: statistics, type: "statistics" },
  ];

  return (
    <SectionList
      style={styles.container}
      sections={sections}
      keyExtractor={(item, index) => index.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      renderItem={({ item, section }) => {
        if (section.type === "goals") {
          return (
            <View style={styles.eventContainer}>
              <Text style={styles.time}>{item.time}'</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.eventText}>
                  ⚽ {item.home_scorer || item.away_scorer}
                </Text>
                <Text style={styles.score}>{item.score}</Text>
              </View>
            </View>
          );
        } else if (section.type === "cards") {
          return (
            <View style={styles.eventContainer}>
              <Text style={styles.time}>{item.time}'</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.eventText}>
                  {item.home_fault || item.away_fault} received {item.info}
                </Text>
                <Text style={styles.score}>{item.score}</Text>
              </View>
            </View>
          );
        } else if (section.type === "statistics") {
          return (
            <View style={styles.statContainer}>
              <Text style={styles.statText}>{item.type}</Text>
              <Text style={styles.statText}>
                {item.home} - {item.away}
              </Text>
            </View>
          );
        }
        return null;
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f78b4",
    marginBottom: 12,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a90e2",
    marginTop: 20,
    marginBottom: 8,
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 4,
  },
  time: {
    width: 40,
    fontSize: 16,
    color: "#0277bd",
    fontWeight: "bold",
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  eventText: {
    fontSize: 16,
    color: "#00796b",
  },
  score: {
    fontSize: 14,
    color: "#c62828",
    fontWeight: "bold",
    marginTop: 4,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
  },
  statText: {
    fontSize: 16,
    color: "#4caf50",
  },
  separator: {
    height: 1,
    backgroundColor: "#b2ebf2",
    marginVertical: 8,
  },
});
