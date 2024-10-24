import { newsData } from '@/data/CricNewsData';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const FootBallLiveSummary = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

/*
  useEffect(() => {
    const fetchCricketNews = async () => {
      const url = "https://unofficial-cricbuzz.p.rapidapi.com/news/list";
      const headers = {
        "x-rapidapi-key": "c5192a7728msh255b0b9b4d46750p1994f8jsndc4a28a90e8a",
        "x-rapidapi-host": "unofficial-cricbuzz.p.rapidapi.com",
      };

      try {
        const response = await fetch(url, { method: 'GET', headers: headers });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonResponse = await response.json();
        const fliterR = jsonResponse.newsList.filter((news:any)=> news?.story)
        console.log(fliterR);
        setData(fliterR); // Adjust based on the actual response structure
        console.log(jsonResponse);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCricketNews();
  }, []);
  */

  useEffect(() => {
    const fetchData = () => {
      try {
        const fliterR = newsData.newsList.filter((news: any) => news?.story);
        setData(fliterR);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false); // Set loading to false after data processing
      }
    };

    fetchData(); // Call the function to filter data
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item,index) => index.toString()} // Adjust based on actual item structure
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.story.hline}</Text>
          <Text style={styles.description}>{item.intro}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default FootBallLiveSummary;
