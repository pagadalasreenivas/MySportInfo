import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useFocusEffect } from 'expo-router'; // Import useFocusEffect
import BasketBallLiveCard from "./BasketBallLiveMatchCard";

// Cache structure
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

export default function BasketBallComponent() {
  const [basketballData, setBasketballData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Set loading to true initially
  const [error, setError] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      const fetchLiveData = async () => {
        const now = Date.now();
        const cacheKey = "liveBasketballData";

        // Log the current cache state
        console.log("Current Cache State:", cache);

        // Check if cached data exists and if it's still valid
        if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_THRESHOLD)) {
          console.log("Using cached data");
          setBasketballData(cache[cacheKey].data); // Use cached data
          setLoading(false);
          return;
        }

        // Fetch new data from the API
        try {
          setLoading(true); // Set loading to true before fetching
          const response = await axios.get('https://basketapi1.p.rapidapi.com/api/basketball/matches/live', {
            headers: {
              'x-rapidapi-key': Constants.expoConfig?.extra?.basketballApikey,
              'x-rapidapi-host': Constants.expoConfig?.extra?.basketballHost
            }
          });

          const res = JSON.parse(response.request._response);

          // Cache the new data along with the current timestamp
          cache[cacheKey] = {
            data: res,
            timestamp: now,
          };
          setBasketballData(res);
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

  if (!basketballData?.events || basketballData.events.length === 0) {
    return <Text>No live matches available.</Text>; // Fallback when there are no live matches
  }

  return (
    <FlatList
      data={basketballData.events}
      renderItem={({ item }) => (
        <BasketBallLiveCard livedata={item} />
      )}
      keyExtractor={(item, index) => index.toString()} // Key extractor for FlatList
      ListEmptyComponent={<Text>No live matches to display</Text>} // Fallback when there are no items
    />
  );
}
