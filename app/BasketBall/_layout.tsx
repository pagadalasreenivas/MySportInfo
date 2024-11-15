import { Stack } from "expo-router";


export default function RootLayout(){

    return(
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="(hidden)/gamesquad" options={{title:'Match Squad'}}/>
      <Stack.Screen name="(hidden)/playerinfoBB" options={{title:'Player Info'}}/>
      <Stack.Screen name="(hidden)/matchHighlights" options={{title:'Match Highlights'}}/>
     </Stack>
    )
}