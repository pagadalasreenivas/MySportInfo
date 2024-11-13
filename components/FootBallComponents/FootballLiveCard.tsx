import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View,Text,Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FootBallLiveCard({livedata}:{livedata:any}){
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const route = useRouter();
    const routeToMatchSqauds = (squadData:any) =>{

            route.push({
                pathname:'/Football/(hidden)/matchsquad',
                params:{data:JSON.stringify(squadData)}
            })
    }

    const routeToMatchHighlights = (squadData:any) =>{
        route.push({
            pathname:'/Football/(hidden)/matchhighlights',
            params:{data:JSON.stringify(squadData)}
        })
    }
    const defaultLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRTYHk6DOEXbdmxSrU_oSMWlTUUz90of4erH6eiEJZEv8TRuW7mrP6BGq_Eul9kLQ75s&usqp=CAU';
    return(
        <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>
                {livedata.league_name}-{livedata.league_year}-{livedata.match_round}
            </Text>
            <Text style={styles.quarter}>
                {livedata.match_status}
            </Text>
        </View>
        <View style={styles.deetsContainer}>
            {/* Home Team */}
            <View style={styles.teamContainer}>
                <Image
                    source={{ uri: livedata.team_home_badge|| defaultLogo }}
                    style={styles.teamImage} // Add styles to the image
                    resizeMode="contain" // Adjust how the image is displayed
                />
                <Text style={styles.teamName}>{livedata.match_hometeam_name}</Text>
            </View>

             {/* Score */}
             <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{livedata.match_hometeam_score}-{livedata.match_awayteam_score}</Text> 
                </View>

            {/* Away Team */}
            <View style={styles.teamContainer}>
                <Image
                    source={{ uri: livedata.team_away_badge || defaultLogo}}
                    style={styles.teamImage} // Add styles to the image
                    resizeMode="contain" // Adjust how the image is displayed
                />
                <Text style={styles.teamName}>{livedata.match_awayteam_name}</Text>
            </View>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity  style={styles.button} onPress={() => routeToMatchSqauds(livedata)}>
        <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'View Squads'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.button} onPress={() => routeToMatchHighlights(livedata)}>
        <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'View Highlights'}
                </Text>
            </TouchableOpacity>
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
        fontSize: 11,
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
    button: {
        backgroundColor: '#007bff',
        padding:10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        shadowOpacity:0.5,
        marginHorizontal:10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer:{
        flexDirection:'row'
    }
})