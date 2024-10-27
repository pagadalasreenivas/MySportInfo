import { StyleSheet, View,Text,Image } from "react-native";

export default function BasketBallLiveCard({livedata}:{livedata:any}){
    const defaultLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRTYHk6DOEXbdmxSrU_oSMWlTUUz90of4erH6eiEJZEv8TRuW7mrP6BGq_Eul9kLQ75s&usqp=CAU';
    return(
        <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>
                {livedata.league.name} - {livedata.league.season}
            </Text>
            <Text style={styles.quarter}>
                {livedata.status.long}
            </Text>
        </View>
        <View style={styles.deetsContainer}>
            {/* Home Team */}
            <View style={styles.teamContainer}>
                <Image
                    source={{ uri: livedata.teams.home.logo || defaultLogo }}
                    style={styles.teamImage} // Add styles to the image
                    resizeMode="contain" // Adjust how the image is displayed
                />
                <Text style={styles.teamName}>{livedata.teams.home.name}</Text>
            </View>

             {/* Score */}
             <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{livedata.scores.home.total}-{livedata.scores.away.total}</Text> 
                </View>

            {/* Away Team */}
            <View style={styles.teamContainer}>
                <Image
                    source={{ uri: livedata.teams.away.logo || defaultLogo}}
                    style={styles.teamImage} // Add styles to the image
                    resizeMode="contain" // Adjust how the image is displayed
                />
                <Text style={styles.teamName}>{livedata.teams.away.name}</Text>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row', // Align items in a row
        justifyContent: 'space-between', // Space between items
        width: '100%', // Ensure it takes full width
        paddingHorizontal: 10, // Optional: Add horizontal padding
    },
    quarter: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    deetsContainer: {
        flexDirection: 'row', // Change to row to align teams and score horizontally
        alignItems: 'center', // Center items vertically
        flex: 1,
        width: '100%', // Ensure full width
    },
    teamContainer: {
        flexDirection: 'column',
        alignItems: 'center', // Center team name under image
        flex: 1, // Allow it to grow to occupy space
    },
    scoreContainer: {
        flex: 0.5, // Set to occupy space for the score
        alignItems: 'center', // Center score
    },
    teamImage: {
        width: 80, // Set a fixed width
        height: 80, // Set a fixed height
        marginBottom: 5, // Add some space between image and text
    },
    teamName: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})