import { ActivityIndicator, FlatList, Text, View } from "react-native"
import CricketLiveScoreCard from "./CricketLiveMatchCard";
import { useEffect, useState } from "react";
import axios from "axios";


export default function CricketComponent(){
  const [liveData,setLiveData] = useState<any[]>([]);
  const [loading ,setLoading] = useState<boolean>(true);
  const [error,setError] = useState<string>();

  useEffect(()=>{

    const fetchLiveData = async () =>{
      try{
        const response = await axios.get("https://api.cricapi.com/v1/currentMatches", {
          params: {
            apikey: '6a9c069d-f6e1-4aa0-bcff-0c55372af748',
            offset: 0,
          },
        })
      setLiveData(response.data.data);
      }catch(error){
        if(axios.isAxiosError(error)){
          setError(error.message);
        }else{
          setError("An Unexpected error has occurred.");
        }
      }finally{
        setLoading(false);
      }
    };
    fetchLiveData();
  },[]);

  const filterMatches =  liveData.filter((match: { matchEnded: any; status: string; }) => (!match.matchEnded) && (match.status!='Match not started'));

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Show error message if any
  }

  
    return (
      <FlatList
      data={filterMatches}
      renderItem={({item}) => (
        <CricketLiveScoreCard liveData={item}/>
      )}
      />
    );
}