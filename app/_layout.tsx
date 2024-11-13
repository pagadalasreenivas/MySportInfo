import { GlobalContext } from "@/hooks/globalContext";
import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";


export default function DrawerLayout() {

  const [cricketLivedata, setCricketLiveData] = useState();
  const [footballLivedata,setFootballLiveData] = useState();
  const [basketBallLivedata,setBasketballLiveData] = useState();
  return (
    <GlobalContext.Provider value={{cricketLivedata,setCricketLiveData,footballLivedata,setFootballLiveData,basketBallLivedata,setBasketballLiveData}} >
    <Drawer>
      <Drawer.Screen name="index" options={{title:'Home'}}/>
    </Drawer>
    </GlobalContext.Provider>
  );
}
