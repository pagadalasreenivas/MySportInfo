import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function BasketBallLiveCard({ livedata }: { livedata: any }) {
    const defaultLogo = 'https://www.logodesignlove.com/images/classic/nba-logo.jpg';
    const [loading, setLoading] = useState(false);
    const [teamLogos, setTeamLogos] = useState({ home: defaultLogo, away: defaultLogo });
    const route = useRouter();

    // Delay function
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Fetch team logos based on the team IDs from livedata
    /*const fetchTeamLogos = async (homeTeamId: string, awayTeamId: string) => {
        try {
            setLoading(true); // Set loading to true before fetching
            const homeLogoResponse = await axios.get(`https://basketapi1.p.rapidapi.com/api/basketball/team/${homeTeamId}/image`,{
                headers:{
                    'x-rapidapi-key': Constants.expoConfig?.extra?.basketballApikey,
                    'x-rapidapi-host': Constants.expoConfig?.extra?.basketballHost
                }
            }); // Fetch home team logo
            
            await delay(4000); // Delay for 250ms before the next request
            
            const awayLogoResponse = await axios.get(`https://basketapi1.p.rapidapi.com/api/basketball/team/${awayTeamId}/image`,{
                headers:{
                    'x-rapidapi-key': Constants.expoConfig?.extra?.basketballApikey,
                    'x-rapidapi-host': Constants.expoConfig?.extra?.basketballHost
                }
            }); // Fetch away team logo
            
            setTeamLogos({
                home: homeLogoResponse.data.logoUrl || defaultLogo, // Use actual response structure
                away: awayLogoResponse.data.logoUrl || defaultLogo,
            });
        } catch (error) {
            console.error("Error fetching team logos:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        fetchTeamLogos(livedata.homeTeam.id, livedata.awayTeam.id); // Call function to fetch logos
    }, [livedata.homeTeam.id, livedata.awayTeam.id]); // Fetch logos when the livedata changes
*/

    const routeToGameSquad = async (id: any) => {
        try {
            setLoading(true); // Set loading to true before fetching
            console.log(id);
            const response = await axios.get(`https://basketapi1.p.rapidapi.com/api/basketball/match/${id}/lineups`, {
                headers: {
                    'x-rapidapi-key': Constants.expoConfig?.extra?.basketballApikey,
                    'x-rapidapi-host': Constants.expoConfig?.extra?.basketballHost
                }
            });
            console.log(response.request._response);
            const res = JSON.parse(response.request._response);
            console.log(res);

            route.navigate({
                pathname: '/BasketBall/(hidden)/gamesquad',
                params: {
                    data: JSON.stringify(res)
                }
            });
        } catch (error) {
            console.log("Error fetching game squad:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const routeToMatchHighlights =  async(id:any) =>{
        try {
            setLoading(true); // Set loading to true before fetching
            console.log(id);
            const response = await axios.get(`https://basketapi1.p.rapidapi.com/api/basketball/match/${id}/statistics`, {
                headers: {
                    'x-rapidapi-key': Constants.expoConfig?.extra?.basketballApikey,
                    'x-rapidapi-host': Constants.expoConfig?.extra?.basketballHost
                }
            });
            console.log(response.request._response);
            const res = JSON.parse(response.request._response);
            console.log(res);

            route.navigate({
                pathname: '/BasketBall/(hidden)/matchHighlights',
                params: {
                    data: JSON.stringify(res)
                }
            });
        } catch (error) {
            console.log("Error fetching game squad:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    const toggleReaction = () =>{
        route.push({
          pathname:'/BasketBall/(hidden)/basketballreaction'
        })
      }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {livedata.season.name}
                </Text>
                <Text style={styles.quarter}>
                    {livedata.status.description}
                </Text>
            </View>
            <View style={styles.deetsContainer}>
                {/* Home Team */}
                <View style={styles.teamContainer}>
                    <Image
                        source={{ uri: teamLogos.home }}
                        style={styles.teamImage} 
                        resizeMode="contain"
                    />
                    <Text style={styles.teamName}>{livedata.homeTeam.name}</Text>
                </View>

                {/* Score */}
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{livedata.homeScore.display}-{livedata.awayScore.display}</Text>
                </View>

                {/* Away Team */}
                <View style={styles.teamContainer}>
                    <Image
                        source={{ uri: teamLogos.away }}
                        style={styles.teamImage} 
                        resizeMode="contain"
                    />
                    <Text style={styles.teamName}>{livedata.awayTeam.name}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => routeToGameSquad(livedata.id)}>
                    <Text style={styles.buttonText}>
                        {loading ? 'Loading...' : 'View Squads'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => routeToMatchHighlights(livedata.id)}>
                    <Text style={styles.buttonText}>
                        {loading ? 'Loading...' : 'Match Highlights'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => toggleReaction()}>
                    <Text style={styles.buttonText}>
                        {loading ? 'Loading...' : 'Add Your Reaction'}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
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
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
    teamContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    scoreContainer: {
        flex: 0.5,
        alignItems: 'center',
    },
    teamImage: {
        width: 80,
        height: 80,
        marginBottom: 5,
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
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        shadowOpacity: 0.5,
        marginHorizontal: 5, // Reduced margin to fit the buttons better
        flex: 1, // Ensure each button takes equal space
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12, // Adjust text size for better fit
        textAlign: 'center', // Ensure text is centered
        flexWrap: 'wrap', // Allow text to wrap if needed
      },
      buttonContainer: {
        flexDirection: 'row', // Keep buttons in a row
        justifyContent: 'space-between', // Distribute buttons evenly across the width
        width: '100%', // Ensure buttons take up full width of container
        paddingHorizontal: 10, // Add padding to the container for better spacing
      },
});
