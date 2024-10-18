import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useState } from "react";

export default function Schedule() {
    const { data } = useLocalSearchParams();
    const [scheduleData,setData] = useState(data ? JSON.parse(data as string):[]);
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
                <View key={match.id} style={styles.matchContainer}>
                    <Text style={styles.matchTitle}>{match.name}</Text>
                    <Text>{match.date}</Text>
                    <Text>{match.venue}</Text>
                    <Text>{match.status}</Text>
                    <Text>{matchStatus}</Text>
                </View>
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
