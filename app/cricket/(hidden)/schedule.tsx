import { View, Text, StyleSheet, ScrollView, Touchable } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Constants from "expo-constants";

export default function Schedule() {
    const { data } = useLocalSearchParams();
    const [scheduleData,setData] = useState(data ? JSON.parse(data as string):[]);
    const[error,setError] = useState<string>();
    const route = useRouter();
    const handleFetchScoreCard = async (id: string) => {
      
        try {
          const response = await axios.get("https://api.cricapi.com/v1/match_scorecard", {
            params: {
              apikey: Constants.expoConfig?.extra?.cricketApiKey,
              id: id,
            },
          });
      
          const scoreCardData = response.data;
          console.log(scoreCardData);
      
          // Use router to navigate
          route.push({
            pathname: '/Cricket/(hidden)/scorecard',
            params: { data: JSON.stringify(scoreCardData) },
          });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred.");
          }
        } 
      };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {scheduleData.data.matchList.sort((a: { date: string | number | Date; },b: { date: string | number | Date; }) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateA - dateB; 
            }).map((match: any) => {
                let matchStatus = '';
                if((match.matchStarted) && (match.matchEnded)){
                    matchStatus = 'Concluded'
                }else if((match.matchStarted) && (!match.matchEnded))
                {
                    matchStatus ='Live'
                }
                else{
                    matchStatus = 'Upcoming'
                }
                return(
                <TouchableOpacity key={match.id} style={styles.matchContainer} onPress={()=> handleFetchScoreCard(match.id)}>
                    <Text style={styles.matchTitle}>{match.name}</Text>
                    <Text>{match.date}</Text>
                    <Text>{match.venue}</Text>
                    <Text>{match.status}</Text>
                    <Text>{matchStatus}</Text>
                </TouchableOpacity>
            );
        })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    matchContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 5,
        elevation: 3,
    },
    matchTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});
