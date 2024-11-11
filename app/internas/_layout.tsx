import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: "#F60"},   
                tabBarStyle: {backgroundColor: "#070A52"},   
                headerTitleAlign: 'center',
                headerTintColor: '#FFF',
                tabBarActiveTintColor: "#F60", 
                tabBarInactiveTintColor: "#FFF" 
            }}
        >
            <Tabs.Screen name="tasks" options={{
                headerTitle: "Tarefas",
                tabBarLabel: "Tarefas",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "check-circle-outline" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="user" options={{
                headerTitle: "Dados do Usuário",
                tabBarLabel: "Dados Usuário",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "account" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="about" options={{
                headerTitle: "Sobre o aplicativo",
                tabBarLabel: "Sobre o App",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "information-outline" color={color} size={32}/>
                )
            }} />
        </Tabs>
    );
}
