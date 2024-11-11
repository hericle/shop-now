import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { auth } from '../scripts/firebase-config';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Index() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const validarCampos = () => {
        if (email === "") {
            setErrorLogin("Informe seu email!");
        } else if (password === "") {
            setErrorLogin("Informe sua senha!");
        } else {
            setErrorLogin(""); 
            login(); 
        }
    }

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setEmail(""); 
                setPassword(""); 
                setErrorLogin(""); 
                router.push("/internas/tasks"); 
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorLogin(errorMessage); 
            });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/shopnow_icone.png')} />

            {errorLogin && (
                <Text style={styles.alert}>{errorLogin}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address" 
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={validarCampos}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <Text 
                style={styles.textCreateAccount} 
                onPress={() => router.push('/user_create')}
            >
                Novo aqui? <Text style={styles.textLink}>Novo Cadastro.</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4A90E2",
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 30, 
    },
    alert: {
        fontSize: 16,
        color: '#FF0000', 
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: '100%',
        color: '#000', 
    },
    button: {
        backgroundColor: '#003366',
        paddingVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 25,  
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
    },
    textCreateAccount: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 15,
    },
    textLink: {
        color: '#003366',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
