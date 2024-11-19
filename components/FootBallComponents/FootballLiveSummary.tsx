import { newsData } from '@/data/CricNewsData';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import FootBallLiveCard from './FootballLiveCard';
import axios from 'axios';
import Constants from 'expo-constants';
import { GlobalContext } from '@/hooks/globalContext';
import { useFocusEffect } from 'expo-router';

const FootBallLiveSummary = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { footballLivedata, setFootballLiveData } = useContext(GlobalContext);

  const fetchLiveData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://apiv3.apifootball.com/?action=get_events&match_live=1', {
        params: {
          APIkey: Constants.expoConfig?.extra?.footballApikey,
        },
      });

      const res = response.data;
      if (Array.isArray(res) && res.length > 0) {
        setFootballLiveData(res);
      } else {
        setError("No live matches available at the moment.");
      }
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

  const fetchData = () => {
    try {
      const filteredNews = newsData.newsList.filter((news: any) => news?.story);
      setData(filteredNews);
    } catch {
      setError("Error fetching news data.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchLiveData();
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const single = footballLivedata[0];

  return (
    <View>
      <View>
        {footballLivedata.length > 0 ? (
          <FlatList
            data={[single]}
            renderItem={({ item }) => <FootBallLiveCard livedata={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No live matches to display.</Text>
          </View>
        )}
      </View>

      <Text style={styles.newsSectionTitle}>Latest Football News Articles</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItemContainer}>
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
    backgroundColor: '#f4f4f4',
    padding: 15,
  },
  liveMatchContainer: {
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    elevation: 2,
  },
  newsSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginVertical: 15,
  },
  newsItemContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffe5e5',
    borderRadius: 12,
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  errorText: {
    color: '#d32f2f',
    fontWeight: '700',
    fontSize: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
});

export default FootBallLiveSummary;
