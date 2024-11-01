import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SquadComponent({ squad }: { squad: any }) {
    const startingLineUp = squad?.starting_lineups;
    const route = useRouter();
    const routeToPlayerInfo= async (id:any) =>{
        try{
            const response = await axios.get('https://apiv3.apifootball.com/?action=get_players', {
              params:{
                player_id:id,
                APIkey:Constants.expoConfig?.extra?.footballApikey
              }
            })
            const res = response.data;
            console.log(res[0]);
            route.navigate({
                pathname:'/Football/(hidden)/playerinfo',
                params: { data: JSON.stringify(res[0]) },
            })
          }catch(error){
            console.log(error);
          }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText]}>NO.</Text>
                <Text style={[styles.cell, styles.headerText]}>Name</Text>
            </View>
            <View>
                {startingLineUp?.map((item: any, index: number) => (
                    <TouchableOpacity key={index} style={styles.row} onPress={() => routeToPlayerInfo(item.player_key)}>
                        <Text style={styles.cell}>{item.lineup_number}</Text>
                        <Text style={styles.cell}>{item.lineup_player}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
    },
    header: {
        backgroundColor: '#f4f4f8',
        borderBottomWidth: 2,
        borderColor: '#ccc',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    headerText: {
        fontWeight: 'bold',
    },
});
