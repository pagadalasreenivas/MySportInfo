import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import FootBallLiveCard from "./FootballLiveCard";
import Constants from "expo-constants";
import { useFocusEffect } from 'expo-router'; // Import useFocusEffect

// Cache structure
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

export default function FootBallComponent() {
  const [footballdata, setFootballdata] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Set loading to true initially
  const [error, setError] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      const fetchLiveData = async () => {
        const now = Date.now();
        const cacheKey = "liveFootballData";

        // Log the current cache state
        console.log("Current Cache State:", cache);

        // Check if cached data exists and if it's still valid
        if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_THRESHOLD)) {
          console.log("Using cached data");
          setFootballdata(cache[cacheKey].data); // Use cached data
          setLoading(false);
          return;
        }

        // Fetch new data from the API
        try {
          setLoading(true); // Set loading to true before fetching
          const response = await axios.get('https://apiv3.apifootball.com/?action=get_events&match_live=1', {
            params: {
              APIkey: Constants.expoConfig?.extra?.footballApikey
            }
          });

          const res = response.data;
          console.log(res);

          // Cache the new data along with the current timestamp
          cache[cacheKey] = {
            data: res,
            timestamp: now,
          };
          setFootballdata(res);
          console.log("Fetching new data");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred.");
          }
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };

      fetchLiveData();
    }, []) // Dependency array empty to run only on focus
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
  if (error) return <Text>Error: {error}</Text>; // Show error message if any

  if (!footballdata || footballdata.length === 0) {
    return <Text>No live matches available.</Text>; // Fallback when there are no live matches
  }

  return (
    <FlatList
      data={footballdata}
      renderItem={({ item }) => (
        <FootBallLiveCard livedata={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={<Text>No live matches to display</Text>} // Fallback when there are no items
    />
  );
}
