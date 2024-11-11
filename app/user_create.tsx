import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from '../scripts/firebase-config';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function CreateUser() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCreateUser, setErrorCreateUser] = useState("");

    const validarCampos = () => {
        if (nome === "") {
            setErrorCreateUser("Informe o nome");
        } else if (email === "") {
            setErrorCreateUser("Informe o email");
        } else if (password === "") {
            setErrorCreateUser("Informe uma senha");
        } else {
            setErrorCreateUser("");
            createUser();
        }
    }

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                set(ref(db, 'user/' + user.uid), {
                    nome: nome,
                    email: email,
                });
                router.push('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorCreateUser(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            {errorCreateUser && (
                <Text style={styles.alert}>{errorCreateUser}</Text>
            )}

            <Text style={styles.titulo}>Novo Cadastro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validarCampos}
            >
                <Text style={styles.textButton}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    titulo: {
        color: "#fff",
        fontSize: 30,
        marginBottom: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: "#4A90E2",  
        padding: 30,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FF3333',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 20,
        width: '100%',
        color: '#333',
        borderWidth: 0, 
        outlineStyle: 'none', 
    },
    button: {
        backgroundColor: '#003366',  
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
    textButton: {
        fontSize: 22,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
});
