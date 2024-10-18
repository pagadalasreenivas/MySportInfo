import { Text, View ,StyleSheet} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
export default function BattersComponent({score}:{score:any}){
    const batter  = score.batting;
    const bowler = score.bowling;
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
            <View key={index} style={styles.batsmanRow}>
             <View style={styles.batterInfo}>
                <Text style={styles.batsmanName}>{batsman.batsman.name}</Text>
                <Text style={styles.dismissalText} numberOfLines={2}>{batsman["dismissal-text"]}</Text>
            </View>
              <Text style={styles.batsmanStat}>{batsman.r}</Text>
              <Text style={styles.batsmanStat}>{batsman.b}</Text>
              <Text style={styles.batsmanStat}>{batsman["4s"]}</Text>
              <Text style={styles.batsmanStat}>{batsman["6s"]}</Text>
              <Text style={styles.batsmanStat}>{batsman.sr}</Text>
            </View>
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
            <View key={index} style={styles.batsmanRow}>
             <View style={styles.batterInfo}>
                <Text style={styles.batsmanName}>{bowler.bowler.name}</Text>
            </View>
              <Text style={styles.batsmanStat}>{bowler.o}</Text>
              <Text style={styles.batsmanStat}>{bowler.m}</Text>
              <Text style={styles.batsmanStat}>{bowler.r}</Text>
              <Text style={styles.batsmanStat}>{bowler.w}</Text>
              <Text style={styles.batsmanStat}>{bowler.eco}</Text>
            </View>
          ))}
        </View>
      </View>
      </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    batterCard: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    batsmanRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      width: '12%',  // Same width for all stat columns
      textAlign: 'center',
    },
    batsmanStat: {
      fontSize: 14,
      width: '12%',  // Ensure all stats align under headers
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
  