import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CricketLiveSummary from "@/components/CricketComponent/CricketLiveSummary";
import FootBallLiveSummary from "@/components/FootBallComponents/FootballLiveSummary";
import BasketBallComponent from "@/components/BasketBallComponents/BasketBallComponent";
import LoadingCard from "@/components/Card";  // Assuming this is your loading skeleton
import { useEffect, useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Cricket");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingCard />;  // Show loading component while data is fetched
  }

  const tabs = [
    { title: "Cricket", component: <CricketLiveSummary /> },
    { title: "Football", component: <FootBallLiveSummary /> },
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
        {tabs.map(
          (tab) =>
            activeTab === tab.title && (
              <View key={tab.title} style={styles.componentContainer}>
                {tab.component}
              </View>
            )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tabContainer: {
    flexDirection: "column",
    paddingVertical: 10,
    flex:1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  componentContainer: {
    flex: 1,
  },
});
