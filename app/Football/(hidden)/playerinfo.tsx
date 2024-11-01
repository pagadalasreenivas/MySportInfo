import { player } from '@/data/FootballLiveData';
import { Image as ExpoImage } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function PlayerInfoFootball() {
    const { data } =useLocalSearchParams();
    const [player,setPlayerData] = useState(data ? JSON.parse(data as string):{});
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ExpoImage source={{ uri: player?.player_image }} style={styles.image} />
            <Text style={styles.name}>{player?.player_complete_name}</Text>
            <Text style={styles.country}>{player?.player_country || 'Country Unknown'}</Text>

            <View style={styles.personalContainer}>
                <Text style={styles.sectionHeader}>PERSONAL INFORMATION</Text>
                <Text style={styles.info}>Date Of Birth: {player.player_birthdate}</Text>
                <Text style={styles.info}>Age: {player.player_age}</Text>
                <Text style={styles.info}>Role: {player.player_type}</Text>
            </View>

            <View style={styles.careerContainer}>
                <Text style={styles.sectionHeader}>CAREER STATISTICS</Text>
                <Text style={styles.info}>Matches Played: {player.player_match_played}</Text>
                <Text style={styles.info}>Goals: {player.player_goals}</Text>
                <Text style={styles.info}>Assists: {player.player_assists}</Text>
                <Text style={styles.info}>Minutes Played: {player.player_minutes}</Text>
                <Text style={styles.info}>Yellow Cards: {player.player_yellow_cards}</Text>
                <Text style={styles.info}>Red Cards: {player.player_red_cards}</Text>
                <Text style={styles.info}>Total Shots: {player.player_shots_total}</Text>
                <Text style={styles.info}>Tackles: {player.player_tackles}</Text>
                <Text style={styles.info}>Interceptions: {player.player_interceptions}</Text>
                <Text style={styles.info}>Clearances: {player.player_clearances}</Text>
                <Text style={styles.info}>Pass Accuracy: {player.player_passes_accuracy}%</Text>
                <Text style={styles.info}>Rating: {player.player_rating}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    name: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    country: {
        color: 'gray',
        fontSize: 16,
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    info: {
        fontSize: 14,
        marginBottom: 5,
        color: 'black',
    },
    personalContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 20,
    },
    careerContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 20,
    },
});
