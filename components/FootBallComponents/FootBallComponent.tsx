import { Text, View ,StyleSheet} from "react-native"
export default function FootBallComponent(){
    const batter  = [
            {
              "batsman": {
                "id": "53b7aeeb-f966-4398-a1cf-6f29d27d934c",
                "name": "Zak Crawley"
              },
              "dismissal": "stumped",
              "bowler": {
                "id": "0d5e9bb0-a824-437c-b090-0d285c5a4a41",
                "name": "Noman Ali"
              },
              "catcher": {
                "id": "78b310fd-7403-4abf-83e4-8ac8357be790",
                "name": "Mohammad Rizwan"
              },
              "dismissal-text": "st rizwan b noman ali",
              "r": 3,
              "b": 8,
              "4s": 0,
              "6s": 0,
              "sr": 37.5,
              "": 0
            },
            {
              "batsman": {
                "id": "180036fe-fcb5-4fcf-ba8a-28bb2b750cc6",
                "name": "Ben Duckett"
              },
              "dismissal": "catch",
              "bowler": {
                "id": "62258cb1-4389-418d-a086-c69b75a5ad9e",
                "name": "Sajid Khan"
              },
              "catcher": {
                "id": "78b310fd-7403-4abf-83e4-8ac8357be790",
                "name": "Mohammad Rizwan"
              },
              "dismissal-text": "c rizwan b sajid khan",
              "r": 0,
              "b": 2,
              "4s": 0,
              "6s": 0,
              "sr": 0,
              "": 0
            },
            {
              "batsman": {
                "id": "81b084df-4619-4d99-8500-3792fd8eef32",
                "name": "Ollie Pope"
              },
              "dismissal-text": "batting",
              "r": 21,
              "b": 30,
              "4s": 2,
              "6s": 0,
              "sr": 70,
              "": 0
            },
            {
              "batsman": {
                "id": "1ee41e9e-e219-4df2-9861-2360b28bb307",
                "name": "Joe Root",
                "altnames": [
                  "root"
                ]
              },
              "dismissal-text": "batting",
              "r": 12,
              "b": 26,
              "4s": 1,
              "6s": 0,
              "sr": 46.15,
              "": 0
            }];
    return (
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
          {batter.map((batsman, index) => (
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
  });
  