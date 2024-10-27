import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CricketComponent from "@/components/CricketComponent/CricketComponent";
import LoadingCard from "@/components/Card";  // Assuming this is your loading skeleton
import { useEffect, useState } from "react";
import FootBallComponent from "@/components/FootBallComponents/FootBallComponent";
import BasketBallComponent from "@/components/BasketBallComponents/BasketBallComponent";
import CricketLiveSummary from "@/components/CricketComponent/CricketLiveSummary";
import FootBallLiveSummary from "@/components/FootBallComponents/FootballLiveSummary";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Cricket"); // State to track the active tab

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingCard />;  // Show loading component while data is fetched
  }

  const tabs = [
    { title: "Cricket", component: <CricketLiveSummary/> },
    { title: "Football", component: <FootBallLiveSummary/> },
    { title: "Basketball", component: <BasketBallComponent /> },
  ];

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.title}
            onPress={() => setActiveTab(tab.title)}
            style={[styles.tab, activeTab === tab.title && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab.title && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content based on active tab */}
      <View style={styles.contentContainer}>
        {tabs.map((tab) => (
          activeTab === tab.title && (
            <View key={tab.title} style={styles.componentContainer}>
              {tab.component}
            </View>
          )
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex:1
  },
  tabContainer: {
    flexDirection:'column',
    flex:1,
    backgroundColor: "white", // Tab background color
  },
  tab: {
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: "#e0e0e0", // Inactive tab background color
    borderRadius: 5, // Optional: add some rounded corners
  },
  activeTab: {
    backgroundColor: "#007BFF", // Active tab background color
  },
  tabText: {
    fontSize: 16,
    color: "#333", // Inactive tab text color
  },
  activeTabText: {
    color: "#fff", // Active tab text color
  },
  contentContainer: {
    flex: 11, // Use the remaining space for the content
    padding: 20,
  },
  componentContainer: {
    marginBottom: 30,
  },
});