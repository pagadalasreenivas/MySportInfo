import { scorecard } from "@/data/ScoreCardCricket";
import { series } from "@/data/SeriesData";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key, useState } from "react";
import { View ,Text, StyleSheet,Image,TouchableOpacity} from "react-native";

export default function CricketLiveScoreCard({liveData}:{liveData:any}){
   const[loading,setLoading] = useState(false);
   const[scheduledata,setScheduledata] = useState<any>(series);
   const[error,setError]=useState("");
   const route = useRouter();
   const defaultLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRTYHk6DOEXbdmxSrU_oSMWlTUUz90of4erH6eiEJZEv8TRuW7mrP6BGq_Eul9kLQ75s&usqp=CAU';

   const handleFetchSchedule = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.cricapi.com/v1/series_info", {
        params: {
          apikey: Constants.expoConfig?.extra?.cricketApiKey ,
          id: id
        },
      });
  
      const fetchedData = response.data; 
      setScheduledata(fetchedData);
  
      route.navigate({
        pathname: '/cricket/(hidden)/schedule',
        params: { data: JSON.stringify(fetchedData) }
      });
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Stop loading after data is fetched or error occurred
    }
      
  };
  

  const handleFetchScoreCard = async (id: string) => {
    setLoading(true);
  
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
        pathname: '/cricket/(hidden)/scorecard',
        params: { data: JSON.stringify(scoreCardData) },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
    return(
        <View style={styles.card}>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>
                {liveData.name}
            </Text>
            </View>
            <View style={styles.deetsContainer}>
                    <View style={styles.teamContainer}>
                    <Image
                        source={{ uri: liveData?.teamInfo?.[0]?.img || defaultLogo  }}
                        style={styles.teamImage} // Add styles to the image
                        resizeMode="contain" // Adjust how the image is displayed
                    />
                    <Text style={styles.teamName}>{liveData.teams[0]}</Text>
                    </View>
                    <View style = {styles.scoreContainer}>
                        <Text style={styles.scoreText}>{liveData.score[0] ? `${liveData.score[0].r}-${liveData.score[0].w}/${liveData.score[0].o}` : 'Yet to Bat'}</Text>
                    </View>
            </View>
            <View style={styles.deetsContainer}>
                    <View style={styles.teamContainer}>
                    <Image
                        source={{ uri: liveData?.teamInfo?.[1]?.img || defaultLogo }}
                        style={styles.teamImage} // Add styles to the image
                        resizeMode="contain" // Adjust how the image is displayed
                    />
                    <Text style={styles.teamName}>{liveData.teams[1]}</Text>
                    </View>
                    <View style = {styles.scoreContainer}>
                    <Text style={styles.scoreText}>{liveData.score[1] ? `${liveData.score[1].r} - ${liveData.score[1].w}/${liveData.score[1].o}` : 'YET TO BAT'}</Text>
                    </View>
            </View>
            <View>
                <Text>{liveData.status}</Text>
            </View>
            <View  style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() =>handleFetchScoreCard(liveData.id)}>
                <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'View Scorecard'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleFetchSchedule(liveData.series_id)}>
                <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'View Schedule'}
                </Text>
            </TouchableOpacity>
        </View>
        </View>

    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        flexDirection:'column',
        paddingTop:10,
        paddingBottom: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
      },
      titleContainer :{
        flex:0.1,
      },
      title: {
        fontSize: 13,
        flex:0.1,
        fontWeight: 'bold',
        marginBottom: 10,
        alignContent:'center',
        textAlign:'center'
      },
      deetsContainer:{
        flexDirection: 'row', // Align children in a row
        alignItems: 'center', // Center items vertically
        flex: 1, // Make sure the container takes full width
      },
      teamContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Center team name under image
        flex: 0.5, // Allow it to grow to occupy space
        paddingLeft:50,
        paddingBottom:5
    },
    teamImage: {
        width: 30, // Set a fixed width
        height: 30, // Set a fixed height
        marginBottom: 5, // Add some space between image and text
    },
    teamName: {
        fontSize: 12,
        textAlign:'center',
        fontWeight:'bold',
        paddingLeft:10
    },
    scoreContainer: {
        flex: 0.5, // Allow it to grow to occupy space
        alignItems: 'center', // Align content to the right
        paddingRight: 10, // Add some padding to the right
    },
    teamNameContainer:{
        flexDirection:'row',
        flex:0.2
    },
    scoreText :{
        textAlign:'center',
        fontWeight:'bold'
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