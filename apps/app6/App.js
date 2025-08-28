import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [meta, setMeta] = useState('');
  const [realizado, setRealizado] = useState('');
  const [feedback, setFeedback] = useState(null);

  const sugerirExercicio = (metaNum) => {
    if (metaNum < 3) return 'Sugestão: Caminhada leve ou alongamento.';
    if (metaNum < 5) return 'Sugestão: Corrida moderada ou bicicleta.';
    if (metaNum < 7) return 'Sugestão: Treino funcional ou HIIT.';
    return 'Sugestão: Descanse ou tente um novo desafio!';
  };

  const verificarProgresso = () => {
    const metaNum = parseInt(meta);
    const realizadoNum = parseInt(realizado);
    if (isNaN(metaNum) || metaNum < 1 || isNaN(realizadoNum) || realizadoNum < 0) {
      setFeedback('Preencha os campos corretamente!');
      return;
    }
    let progresso = (realizadoNum / metaNum) * 100;
    let mensagem = '';
    if (progresso >= 100) {
      mensagem = 'Parabéns! Você atingiu sua meta de exercícios.';
    } else if (progresso >= 70) {
      mensagem = 'Ótimo progresso! Está quase lá.';
    } else if (progresso >= 40) {
      mensagem = 'Continue se esforçando, você está indo bem.';
    } else {
      mensagem = 'Vamos aumentar o ritmo!';
    }
    mensagem += '\n' + sugerirExercicio(metaNum);
    setFeedback(`Progresso: ${progresso.toFixed(2)}%\n${mensagem}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Rastreamento de Exercícios</Text>
        <Text style={styles.subtitle}>Acompanhe seu progresso e receba sugestões</Text>

        <Text style={styles.label}>Meta semanal (nº de exercícios)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 5"
          keyboardType="numeric"
          value={meta}
          onChangeText={setMeta}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Exercícios realizados</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 3"
          keyboardType="numeric"
          value={realizado}
          onChangeText={setRealizado}
          placeholderTextColor="#aaa"
        />

        <View style={styles.buttonContainer}>
          <Button title="Verificar Progresso" color="#4F8EF7" onPress={verificarProgresso} />
        </View>

        {feedback && (
          <Text style={styles.result}>{feedback}</Text>
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