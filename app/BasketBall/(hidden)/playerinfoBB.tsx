import { singlePlayerInfo } from '@/data/BasketBallLiveData';
import { Image as ExpoImage } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function PlayerInfoBasketBall() {
    const { data } = useLocalSearchParams();
    const play = data? JSON.parse(data as string):{}
    const defaultLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ9Ht6stNWCbSEatvEI4R4f8mYM6Gq_lGVK_aKacSNmJCBnIJMcw6LcO46lC6kC4mnqUQ&usqp=CAU';

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ExpoImage source={{ uri: defaultLogo }} style={styles.image} />
            <Text style={styles.name}>{play.player.name}</Text>
            <Text style={styles.country}>{play?.player.country.name}</Text>

            <View style={styles.personalContainer}>
                <Text style={styles.sectionHeader}>PERSONAL INFORMATION</Text>
                <Text style={styles.info}>Date Of Birth: {new Date(play.player.dateOfBirthTimestamp * 1000).toLocaleDateString()}</Text>
                <Text style={styles.info}>Jersey Number: {play.jerseyNumber}</Text>
                <Text style={styles.info}>Height: {play.player.height} cm</Text>
            </View>

            <View style={styles.careerContainer}>
                <Text style={styles.sectionHeader}>MATCH STATISTICS</Text>
                <Text style={styles.info}>Seconds Played: {play.statistics.secondsPlayed}</Text>
                <Text style={styles.info}>Points: {play.statistics.points}</Text>
                <Text style={styles.info}>Two-Point Shots Made: {play.statistics.twoPointsMade} / {play.statistics.twoPointAttempts}</Text>
                <Text style={styles.info}>Three-Point Shots Made: {play.statistics.threePointsMade} / {play.statistics.threePointAttempts}</Text>
                <Text style={styles.info}>Free Throws Made: {play.statistics.freeThrowsMade} / {play.statistics.freeThrowAttempts}</Text>
                <Text style={styles.info}>Field Goals Made: {play.statistics.fieldGoalsMade} / {play.statistics.fieldGoalAttempts}</Text>
                <Text style={styles.info}>Rebounds: {play.statistics.rebounds}</Text>
                <Text style={styles.info}>Assists: {play.statistics.assists}</Text>
                <Text style={styles.info}>Steals: {play.statistics.steals}</Text>
                <Text style={styles.info}>Turnovers: {play.statistics.turnovers}</Text>
                <Text style={styles.info}>Blocks: {play.statistics.blocks}</Text>
                <Text style={styles.info}>Personal Fouls: {play.statistics.personalFouls}</Text>
                <Text style={styles.info}>Plus/Minus: {play.statistics.plusMinus}</Text>
                <Text style={styles.info}>Field Goal Percentage: {play.statistics.fieldGoalPct}%</Text>
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
