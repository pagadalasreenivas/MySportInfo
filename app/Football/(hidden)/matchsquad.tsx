import SquadComponent from "@/components/FootBallComponents/SquadComponent";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { matchData } from "@/data/FootballLiveData";
import { ScrollView } from "react-native-gesture-handler";

export default function FootBallMatchSquad() {
    const { data } = useLocalSearchParams();
    const [matchInfo, setMatchInfo] = useState(data ? JSON.parse(data as string) : {});
    const [homeaway, setHomeaway] = useState(true);

    return (
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
                {
                    homeaway ? 
                    <View style={styles.formationContainer}>
                        <Text style={styles.formationText}>Home Team Formation Strategy:{matchInfo.match_hometeam_system}</Text>
                    <Image style={styles.img} source= {require('@/assets/images/4-2-3-1.jpg')}/>
                    </View>
                     :
                     <View style={styles.formationContainer}>
                        <Text style={styles.formationText}>Away Team Formation Strategy:{matchInfo.match_awayteam_system}</Text>
                         <Image style={styles.img}source = {require('@/assets/images/4-3-2-1 .jpg')}/>
                    </View>
                }
                {homeaway
                    ? <SquadComponent squad={matchInfo.lineup?.home.length > 0 ? matchInfo.lineup?.home : matchData.lineup?.home} />
                    : <SquadComponent squad={matchInfo.lineup?.away.length > 0 ? matchInfo.lineup?.away : matchData.lineup?.away} />}
            </ScrollView>
        </View>
    );
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
