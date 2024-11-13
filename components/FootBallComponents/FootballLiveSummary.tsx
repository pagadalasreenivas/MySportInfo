import { newsData } from '@/data/CricNewsData';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import FootBallLiveCard from './FootballLiveCard';
import axios from 'axios';
import Constants from 'expo-constants';
import { GlobalContext } from '@/hooks/globalContext';
import { useFocusEffect } from 'expo-router';

const FootBallLiveSummary = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true); // Initially true to show loading indicator
  const [error, setError] = useState("");
  const {footballLivedata,setFootballLiveData } = useContext(GlobalContext);

  const fetchLiveData = async () => {
    // Fetch new data from the API
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get('https://apiv3.apifootball.com/?action=get_events&match_live=1', {
        params: {
          APIkey: Constants.expoConfig?.extra?.footballApikey
        }
      });

      const res = response.data;
      setFootballLiveData(res);
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


  // Function to fetch news data
  const fetchData = () => {
    try {
      const filteredNews = newsData.newsList.filter((news: any) => news?.story);
      setData(filteredNews);
    } catch (err) {
      setError("Error fetching news data.");
    }
  };

  // UseEffect to fetch data on mount and re-fetch on screen focus
  useFocusEffect(
    React.useCallback(() => {
      fetchLiveData(); // Fetch live match data
      fetchData(); // Fetch news data
    }, []) // Empty dependency ensures it runs only when screen is focused
  );

  // Show loading spinner until both live data and news data are fetched
  if (loading) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render error message if something went wrong
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // Find the current match based on team names
  const teamNames = ["India", "Australia", "Karnataka", "Andhra", "England", "West Indies"];
  const single = footballLivedata[0];

  return (
    <View style={styles.container}>
      <View style={styles.liveMatchContainer}>
        {/* Render live match only if available */}
        <FlatList
      data={[single]}
      renderItem={({ item }) => (
        <FootBallLiveCard livedata={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={<Text>No live matches to display</Text>} // Fallback when there are no items
    />
      </View>

      <Text style={styles.newsSectionTitle}>Latest Football News Articles</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.story.hline}</Text>
            <Text style={styles.description}>{item.intro}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  liveMatchContainer: {
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  liveMatchHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  newsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 15,
  },
  itemContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 8,
  },
  errorText: {
    color: '#c62828',
    fontWeight: '600',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
});

export default FootBallLiveSummary;
