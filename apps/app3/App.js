import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [receita, setReceita] = useState('');
  const [despesa, setDespesa] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularEconomia = () => {
    const receitaNum = parseFloat(receita.replace(',', '.'));
    const despesaNum = parseFloat(despesa.replace(',', '.'));
    if (!receitaNum || !despesaNum || despesaNum > receitaNum) {
      setResultado('Preencha os campos corretamente!');
      return;
    }
    const economia = receitaNum - despesaNum;
    const porcentagem = (economia / receitaNum) * 100;
    let mensagem = '';
    if (porcentagem > 15) {
      mensagem = 'Invista seu dinheiro';
    } else if (porcentagem >= 10) {
      mensagem = 'Vamos investir no próximo mês';
    } else {
      mensagem = 'Vamos continuar tentando';
    }
    setResultado(`Você economizou ${porcentagem.toFixed(2)}% do seu dinheiro este mês.\n${mensagem}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Controle de Despesas</Text>
        <Text style={styles.subtitle}>Insira os valores do mês</Text>

        <Text style={styles.label}>Receita (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 3000"
          keyboardType="numeric"
          value={receita}
          onChangeText={setReceita}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Despesa (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2200"
          keyboardType="numeric"
          value={despesa}
          onChangeText={setDespesa}
          placeholderTextColor="#aaa"
        />

        <View style={styles.buttonContainer}>
          <Button title="Calcular Economia" color="#4F8EF7" onPress={calcularEconomia} />
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