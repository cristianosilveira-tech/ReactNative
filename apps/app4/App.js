import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [numeroAleatorio, setNumeroAleatorio] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);

  const verificarPalpite = () => {
    const palpiteNum = parseInt(palpite);
    if (!palpiteNum || palpiteNum < 1 || palpiteNum > 100) {
      setMensagem('Digite um número válido entre 1 e 100.');
      return;
    }
    setTentativas(tentativas + 1);
    if (palpiteNum === numeroAleatorio) {
      setMensagem(`Parabéns! Você acertou o número ${numeroAleatorio} em ${tentativas + 1} tentativas. O jogo será reiniciado.`);
      setTimeout(() => {
        setNumeroAleatorio(Math.floor(Math.random() * 100) + 1);
        setTentativas(0);
        setPalpite('');
        setMensagem('Novo número gerado! Tente adivinhar.');
      }, 3000);
    } else if (palpiteNum < numeroAleatorio) {
      setMensagem('O número é maior!');
    } else {
      setMensagem('O número é menor!');
    }
    setPalpite('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Jogo de Adivinhação</Text>
        <Text style={styles.subtitle}>Tente adivinhar o número entre 1 e 100</Text>

        <Text style={styles.label}>Seu palpite:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite um número"
          keyboardType="numeric"
          value={palpite}
          onChangeText={setPalpite}
          placeholderTextColor="#aaa"
        />

        <View style={styles.buttonContainer}>
          <Button title="Verificar" color="#4F8EF7" onPress={verificarPalpite} />
        </View>

        {mensagem !== '' && (
          <Text style={styles.result}>{mensagem}</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: 320,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F8EF7',
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    fontFamily: 'sans-serif',
  },
  label: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 12,
    fontFamily: 'sans-serif',
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
    color: '#222',
    fontFamily: 'sans-serif',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  result: {
    fontSize: 20,
    color: '#4F8EF7',
    marginTop: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});