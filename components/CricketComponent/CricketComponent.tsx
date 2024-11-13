import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CricketLiveScoreCard from "./CricketLiveMatchCard";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useFocusEffect } from 'expo-router';
import { GlobalContext } from "@/hooks/globalContext";

const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_THRESHOLD = 5 * 60 * 1000;

export default function CricketComponent() {
  const [liveData, setLiveData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<"live" | "upcoming">("live");
  const{cricketLivedata,setCricketLiveData} = useContext(GlobalContext);

  useFocusEffect(
    useCallback(() => {
      const fetchLiveData = async () => {
        const now = Date.now();
        const cacheKey = "currentMatches";
        console.log("Current Cache State:", cache);

        if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_THRESHOLD)) {
          console.log("Using cached data");
          setLiveData(cache[cacheKey].data);
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get("https://api.cricapi.com/v1/currentMatches", {
            params: {
              apikey: Constants.expoConfig?.extra?.cricketApiKey,
              offset: 0,
            },
          });

          cache[cacheKey] = {
            data: response.data.data,
            timestamp: now,
          };
          setLiveData(response.data.data);
          console.log("Fetching new data");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchLiveData();
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!liveData || liveData.length === 0) {
    return <Text>No matches available.</Text>;
  }

  // Filtered data based on selected tab
  const liveMatches = liveData.filter(
    (match: { matchEnded: boolean; status: string }) =>
      !match.matchEnded && match.status !== "Match not started"
  );
  const upcomingMatches = liveData.filter(
    (match: { matchEnded: boolean; status: string }) =>
      !match.matchEnded && match.status === "Match not started"
  );

  return (
    <View style={styles.container}>
      {/* Tabs for Live and Upcoming */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "live" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setSelectedTab("live")}
        >
          <Text style={selectedTab === "live" ? styles.activeText : styles.inactiveText}>Live</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "upcoming" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setSelectedTab("upcoming")}
        >
          <Text style={selectedTab === "upcoming" ? styles.activeText : styles.inactiveText}>Upcoming</Text>
        </TouchableOpacity>
      </View>

      {/* Display matches based on selected tab */}
      <FlatList
        data={selectedTab === "live" ? liveMatches : upcomingMatches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CricketLiveScoreCard liveData={item} />}
        ListEmptyComponent={<Text>No matches to display in this category</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  inactiveTab: {
    backgroundColor: '#e0e0e0',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#555',
  },
});
