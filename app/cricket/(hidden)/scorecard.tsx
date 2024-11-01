import BattersComponent from "@/components/CricketComponent/BattersComponent";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View,Text, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function ScoreCard(){
  const { data } = useLocalSearchParams();
  const [scoreData, setScoreData] = useState(data ? JSON.parse(data as string) : {});
  const [openCards, setOpenCards] = useState<Array<boolean>>([]);

  useEffect(() => {
    if (scoreData?.data?.scorecard && scoreData.data.scorecard.length > 0) {
      setOpenCards(Array(scoreData.data.scorecard.length).fill(false));
    }
  }, [scoreData]);

  const toggleDropdown = (index: number) => {
    setOpenCards((prevState) => {
      const updatedOpenCards = [...prevState];
      updatedOpenCards[index] = !updatedOpenCards[index];
      return updatedOpenCards;
    });
  };

  if (!scoreData?.data?.scorecard) {
    return <Text>No score data available.</Text>;
  }

  return(
    <View>
      <Text style={styles.matchStatus}>{scoreData.data.status}</Text>
      <ScrollView>
        {scoreData.data.scorecard.map((scorecard: any, index: number) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleDropdown(index)} style={styles.cardHeader}>
              <Text>{scorecard.inning}                                              {scoreData.data.score[index].r}/{scoreData.data.score[index].w}</Text>
              <Ionicons
                name={openCards[index] ? "chevron-up-outline" : "chevron-down-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>

            {openCards[index] && (
              <View>
                <BattersComponent score={scorecard}/>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        paddingTop:10,
        paddingBottom: 20,
        margin: 10,
        alignContent:'center',
        paddingLeft:10,
        paddingRight:10,
        flexBasis:'auto'
      },
      matchStatus:{
        textAlign:'center',
        fontWeight:'bold'
      }
})
