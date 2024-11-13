import { Ionicons } from "@expo/vector-icons";
import { Text, View ,StyleSheet, TouchableOpacity} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
export default function BattersComponent({score}:{score:any}){
    const batter  = score.batting;
    const bowler = score.bowling;
    const route  = useRouter();

    const routeToPlayerInfo = async (id: string) => {
      const apiKey = Constants.expoConfig?.extra?.cricketApiKey;
  
      try {
          const response = await axios.get("https://api.cricapi.com/v1/players_info", {
              params: { apikey: apiKey, id: id },
          });
          const playerData = response.data; 
          route.push({
              pathname: '/Cricket/(hidden)/playerdata',
              params: { data: JSON.stringify(playerData) },
          });
      } catch (error) {
          console.error("Failed to fetch player data:", error);
      }
  };
    return (
        <View>
        <ScrollView contentContainerStyle={styles.scrollv}>
        <View style={styles.batterCard}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Batter</Text>
          <Text style={styles.headerStat}>R</Text>
          <Text style={styles.headerStat}>B</Text>
          <Text style={styles.headerStat}>4s</Text>
          <Text style={styles.headerStat}>6s</Text>
          <Text style={styles.headerStat}>SR</Text>
        </View>
      
        <View>
          {batter.map((batsman:any, index:any) => (
            <TouchableOpacity key={index} style={styles.batsmanRow} onPress={()=> routeToPlayerInfo(batsman.batsman.id)}>
             <View style={styles.batterInfo}>
                <Text style={styles.batsmanName}>{batsman.batsman.name}</Text>
                <Text style={styles.dismissalText} numberOfLines={2}>{batsman["dismissal-text"]}</Text>
            </View>
              <Text style={styles.batsmanStat}>{batsman.r}</Text>
              <Text style={styles.batsmanStat}>{batsman.b}</Text>
              <Text style={styles.batsmanStat}>{batsman["4s"]}</Text>
              <Text style={styles.batsmanStat}>{batsman["6s"]}</Text>
              <Text style={styles.batsmanStat}>{batsman.sr}</Text>
              <AntDesign style={styles.batsmanStat} name="right" size={15} color="black" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Bowler</Text>
          <Text style={styles.headerStat}>O</Text>
          <Text style={styles.headerStat}>M</Text>
          <Text style={styles.headerStat}>R</Text>
          <Text style={styles.headerStat}>W</Text>
          <Text style={styles.headerStat}>ER</Text>
        </View>
        <View>
        {bowler.map((bowler:any, index:any) => (
            <TouchableOpacity key={index} style={styles.batsmanRow} onPress={()=> routeToPlayerInfo(bowler.bowler.id)}>
             <View style={styles.batterInfo}>
                <Text style={styles.batsmanName}>{bowler.bowler.name}</Text>
            </View>
              <Text style={styles.batsmanStat}>{bowler.o}</Text>
              <Text style={styles.batsmanStat}>{bowler.m}</Text>
              <Text style={styles.batsmanStat}>{bowler.r}</Text>
              <Text style={styles.batsmanStat}>{bowler.w}</Text>
              <Text style={styles.batsmanStat}>{bowler.eco}</Text>
              <AntDesign style={styles.batsmanStat} name="right" size={15} color="black" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    batterCard: {
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 15,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      paddingRight:1
    },
    headerRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    batsmanRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 16,
      width: '40%',  // Adjust width for the batter's name
    },
    batsmanName: {
      fontSize: 14,
      width: '40%',  // Same width as headerText to align properly
    },
    headerStat: {
      fontWeight: 'bold',
      fontSize: 16,
      width: '10%',  // Same width for all stat columns
      textAlign: 'center',
    },
    batsmanStat: {
      fontSize: 14,
      width: '10%',  // Ensure all stats align under headers
      textAlign: 'center',
    },
    batterInfo: {
        flexDirection: 'row',  // Stack batter name and dismissal vertically
        width: '40%',  // Ensure this is the same as batsmanName for alignment
      },
      dismissalText: {
        fontSize: 12,
        color: 'gray',  // Styling dismissal info
        width: '40%',  // Match the width with batsmanName to align
        marginBottom: 5,  // Space between dismissal and stats
      },
      scrollv:{
        flexGrow:1,
        paddingBottom:20
      },
  });
  