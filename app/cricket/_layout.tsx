import { Stack } from "expo-router";



export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="(hidden)/scorecard" options={{title:'Match ScoreCard'}}/>
      <Stack.Screen name="(hidden)/schedule" options={{title:'Series Schedule'}}/>
      <Stack.Screen name="(hidden)/playerdata" options={{title:'Player Info'}}/>
    </Stack>
  );
}
