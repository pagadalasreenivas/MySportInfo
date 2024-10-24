import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CricketLiveScoreCard from "./CricketLiveMatchCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { crickMatchData } from "@/data/CricketMatchData";

export default function CricketComponent() {
  const [liveData, setLiveData] = useState<any>(crickMatchData.data); // Set to null initially
  const [loading, setLoading] = useState<boolean>(false); // Set loading to true initially
  const [error, setError] = useState<string>("");

  /*
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await axios.get("https://api.cricapi.com/v1/currentMatches", {
          params: {
            apikey: '6a9c069d-f6e1-4aa0-bcff-0c55372af748',
            offset: 0,
          },
        });
        setLiveData(response.data.data); 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false); // Stop loading after data is fetched or error occurred
      }
    };
    fetchLiveData();
  }, []);*/


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator while fetching
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Show error message if any
  }

  if (!liveData || liveData.length === 0) {
    return <Text>No live matches available.</Text>; // Handle empty live data scenario
  }

  // Filter matches based on whether they have ended or not started
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
      ListEmptyComponent={<Text>No live matches to display</Text>} // Fallback when there are no filtered matches
    />
  );
}
