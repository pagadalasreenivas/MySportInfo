import LoadingCard from "@/components/Card";
import SportCard from "@/components/SportCard";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import CricketComponent from "@/components/CricketComponent/CricketComponent";

export default function Index() {
 /* const[isloading,setIsloading] = useState(true);

  useEffect(() =>{
    const timer = setTimeout(() => {
      setIsloading(false)
    },3000);
    return () => clearTimeout(timer);
  },[]);

  if(isloading){
    return(
      <LoadingCard/>
    )
  }*/


  return (
    <Text>Home Page</Text>
  );
}
