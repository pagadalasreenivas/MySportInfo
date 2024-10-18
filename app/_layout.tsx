import { Stack} from "expo-router";
import { Drawer } from "expo-router/drawer";


export default function RootLayout() {
  return (

    <Drawer>
      <Drawer.Screen name="index" options={{ title: 'Home' }}/>
      <Drawer.Screen name="cricket/index" options={{title:'Cricket'}}/>
      <Drawer.Screen name="Football/index" options={{title:'Football'}}/>
      <Drawer.Screen name="BasketBall/index" options={{title:'BasketBall'}}/>
      <Drawer.Screen name="Tennis/index" options={{title:'Tennis'}}/>
    </Drawer>

  );
}
