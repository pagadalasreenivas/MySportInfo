import { playerInfo } from "@/data/PlayerInfo";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SquadComponentBB({ squad }: { squad: any }) {
    const startingLineUp = squad?.players;
    const route = useRouter();
    const routeToPlayerInfo= (player:any) =>{
        route.navigate({
            pathname:'/BasketBall/(hidden)/playerinfoBB',
            params:{
                data:JSON.stringify(player)
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText]}>NO.</Text>
                <Text style={[styles.cell, styles.headerText]}>Name</Text>
            </View>
            <View>
                {startingLineUp?.map((item: any, index: number) => (
                    <TouchableOpacity key={index} style={styles.row} onPress={() => routeToPlayerInfo(item)}>
                        <Text style={styles.cell}>{item.player.jerseyNumber}</Text>
                        <Text style={styles.cell}>{item.player.name}</Text>
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
