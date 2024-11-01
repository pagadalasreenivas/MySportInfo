import SquadComponentBB from "@/components/BasketBallComponents/SqauadComponentBasketBall";
import { squadInfo } from "@/data/BasketBallLiveData";
import axios from "axios";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View ,Text, ScrollView,Image,StyleSheet} from "react-native";

export default function GameSquad(){
    const {data} = useLocalSearchParams();
    const [matchInfo, setMatchInfo] = useState(data ? JSON.parse(data as string) : squadInfo);
    const [homeaway, setHomeaway] = useState(true);
    console.log(JSON.stringify(matchInfo));
    const homeTeamId = 3436
    const awayTeamId = 3436

    /*
    const fetchTeamLogos = async (homeTeamId: string, awayTeamId: string) => {
        try {
            const homeLogoResponse = await axios.get(`https://basketapi1.p.rapidapi.com/api/basketball/team/${homeTeamId}/image`,{
                headers:{
                    'x-rapidapi-key': Constants.expoConfig?.extra?.basketballApikey,
                    'x-rapidapi-host': Constants.expoConfig?.extra?.basketballHost
                }
            }); // Fetch home team logo
        
            
           /* const awayLogoResponse = await axios.get(`https://basketapi1.p.rapidapi.com/api/basketball/team/${awayTeamId}/image`,{
                headers:{
                    'x-rapidapi-key': Constants.expoConfig?.extra?.basketballApikey,
                    'x-rapidapi-host': Constants.expoConfig?.extra?.basketballHost
                }
            }); 
            const blob = new Blob([homeLogoResponse.data], { type: 'text/plain' });
            const url = URL.createObjectURL(blob); // Create a URL for the Blob
            console.log(url);
            
        } catch (error) {
            console.error("Error fetching team logos:", error);
        }
    }

    useEffect(() =>{
        fetchTeamLogos(homeTeamId.toString(),awayTeamId.toString());
    })*/
    

    return(
        <View style={styles.container}>
        <View style={styles.tabsContainer}>
            <TouchableOpacity
                style={[styles.tabButton, homeaway ? styles.activeTab : styles.inactiveTab]}
                onPress={() => setHomeaway(true)}
            >
                <Text style={homeaway ? styles.activeText : styles.inactiveText}>Home Team</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tabButton, !homeaway ? styles.activeTab : styles.inactiveTab]}
                onPress={() => setHomeaway(false)}
            >
                <Text style={!homeaway ? styles.activeText : styles.inactiveText}>Away Team</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.contentContainer}>
            {homeaway
                ? <SquadComponentBB squad={matchInfo.home} />
                : <SquadComponentBB squad={matchInfo.away} />}
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    tabsContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: '#007bff',
    },
    inactiveTab: {
        backgroundColor: '#e0e0e0',
    },
    activeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    inactiveText: {
        color: '#555',
    },
    contentContainer: {
        flex: 1,
        alignSelf: 'stretch',
    },
    img: {
        width: '100%', // makes the image take up the full width of the container
        height: 200, // set height as needed
        resizeMode: 'contain', // adjust the image aspect ratio within the boundaries
        alignSelf: 'center', // centers the image horizontally
        marginVertical: 20, // add spacing if needed
    },
    formationContainer:{
        alignContent:'center'
    },
    formationText:{
        fontWeight:'bold',
        textAlign:'center'
    }
});

