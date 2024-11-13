import { Stack } from "expo-router";


export default function RootLayout(){

    return(
        <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen name="(hidden)/matchsquad" options={{title:'Match Squad'}}/>
        <Stack.Screen name="(hidden)/playerinfo" options={{title:'Player Info'}}/>
        <Stack.Screen name="(hidden)/matchhighlights" options={{title:'Match Highlights'}}/>
        </Stack>
    )
}