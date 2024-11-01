import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CricketLiveScoreCard from "./CricketLiveMatchCard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useFocusEffect } from 'expo-router'; // Import useFocusEffect

// Cache structure
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

export default function CricketComponent() {
  const [liveData, setLiveData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
    return <Text>No live matches available.</Text>;
  }

  const filterMatches = liveData.filter(
    (match: { matchEnded: boolean; status: string }) =>
      !match.matchEnded && match.status !== "Match not started"
  );

  return (
    <FlatList
      data={filterMatches}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <CricketLiveScoreCard liveData={item} />
      )}
      ListEmptyComponent={<Text>No live matches to display</Text>}
    />
  );
}
