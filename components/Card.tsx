import { View,Text, StyleSheet } from "react-native";


export default function LoadingCard(){

    return (

        <View style={styles.container}>
            <Text style ={styles.cardText}>
                SportInfo.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        backgroundColor: 'black',  // Background color of the card
        flex: 1,                      // Take full screen
        justifyContent: 'center',     // Center vertically
        alignItems: 'center', 
      },
      cardText: {
        color: '#fff',               // Text color
        fontSize: 30,                // Font size
        fontWeight: 'bold',         // Bold text
        textAlign: 'center'
      },
});