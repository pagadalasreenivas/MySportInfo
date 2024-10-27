import { footballLive } from "@/data/FootballLiveData";
import axios from "axios";
import { useState } from "react";
import { Text, View ,StyleSheet, ActivityIndicator, FlatList} from "react-native"
import FootBallLiveCard from "./FootballLiveCard";
export default function FootBallComponent(){
 {/*const fetchLiveData = async () =>{
      try{
        const response = await axios.get('https://v3.football.api-sports.io/fixtures?live=all', {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '9697ddac89f48ab045f5f97b62cb4ed4',
          }
        })
        console.log(response.data);
      }catch(error){
        console.log(error);
      }
    };
    fetchLiveData();*/}
  const footballdata = footballLive;
  const [loading ,setLoading] = useState<boolean>(false);
  const [error,setError] = useState<string>();

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
      }
    
      if (error) {
        return <Text>Error: {error}</Text>; // Show error message if any
      }
    return (
        <FlatList data={footballdata.response} renderItem={({item})=>(
            <FootBallLiveCard livedata={item}/>
        )}/>
    );
}

  