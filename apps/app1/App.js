import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));
    if (!pesoNum || !alturaNum) {
      setResultado('Preencha os campos corretamente!');
      return;
    }
    const alturaEmMetros = alturaNum / 100;
    const imc = pesoNum / (alturaEmMetros * alturaEmMetros);
    let classificacao = '';
    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
      classificacao = 'Peso normal';
    } else if (imc < 30) {
      classificacao = 'Sobrepeso';
    } else {
      classificacao = 'Obeso';
    }
    setResultado(`Seu IMC é: ${imc.toFixed(2)}\nClassificação: ${classificacao}`);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculadora de IMC</Text>
        <Text style={styles.subtitle}>Preencha os dados abaixo</Text>

        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 70"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Altura (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 170"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
          placeholderTextColor="#aaa"
        />

        <View style={styles.buttonContainer}>
          <Button title="Calcular IMC" color="#4F8EF7" onPress={calcularIMC} />
        </View>

        {resultado && (
          <Text style={styles.result}>{resultado}</Text>
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