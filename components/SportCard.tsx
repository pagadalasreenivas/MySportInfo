import { View,Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SportCard({sport}:{sport:string}){
    return(
        <TouchableOpacity style={styles.card}>
            <Text style ={styles.cardText}>{sport}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: 'black',   // Background color of the card
      padding: 70,                  // Padding inside the card
      borderRadius: 20,             // Rounded corners
      elevation: 3,                 // Shadow for Android
      shadowColor: '#000',          // Shadow properties for iOS
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      margin: 15,                   // Margin around each card
      alignItems: 'center',         // Center the text horizontally
    },
    cardText: {
      color: '#fff',                // Text color
      fontSize: 20,                 // Font size
      fontWeight: 'bold',           // Bold text
    },
  });