import { bbdata } from "@/data/BasketBallLiveData";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native"
import BasketBallLiveCard from "./BasketBallLiveMatchCard";
import { FlatList } from "react-native";
export default function BasketBallComponent(){
  const basketballData = bbdata;
  const [loading ,setLoading] = useState<boolean>(false);
  const [error,setError] = useState<string>();

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
      }
    
      if (error) {
        return <Text>Error: {error}</Text>; // Show error message if any
      }
    return (
        <FlatList data={basketballData.response} renderItem={({item})=>(
            <BasketBallLiveCard livedata={item}/>
        )}/>
    );
}

