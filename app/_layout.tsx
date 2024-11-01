import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";


export default function DrawerLayout() {

  useEffect(() => {
    console.log('Available Routes:', Object.keys(Drawer));
  }, []);
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: 'Home' }}/>
      <Drawer.Screen name="cricket/index" options={{title:'Cricket'}}/>
      <Drawer.Screen name="football/index" options={{title:'Football'}}/>
      <Drawer.Screen name="basketball/index" options={{title:'BasketBall'}}/>
    </Drawer>
  );
}
