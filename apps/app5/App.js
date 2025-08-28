import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [energia, setEnergia] = useState('');
  const [sono, setSono] = useState('');
  const [estresse, setEstresse] = useState('');
  const [dica, setDica] = useState(null);

  const gerarDica = () => {
    const energiaNum = parseInt(energia);
    const sonoNum = parseInt(sono);
    const estresseNum = parseInt(estresse);
    if (
      isNaN(energiaNum) || energiaNum < 1 || energiaNum > 10 ||
      isNaN(sonoNum) || sonoNum < 1 || sonoNum > 10 ||
      isNaN(estresseNum) || estresseNum < 1 || estresseNum > 10
    ) {
      setDica('Preencha todos os campos com valores de 1 a 10.');
      return;
    }
    let sugestao = '';
    if (energiaNum < 5) {
      sugestao += 'Tente praticar exercícios físicos e se alimentar melhor.\n';
    } else {
      sugestao += 'Continue mantendo sua rotina saudável!\n';
    }
    if (sonoNum < 6) {
      sugestao += 'Procure dormir mais cedo e evitar telas antes de dormir.\n';
    } else {
      sugestao += 'Ótima qualidade de sono!\n';
    }
    if (estresseNum > 6) {
      sugestao += 'Busque momentos de lazer, meditação ou converse com alguém.\n';
    } else {
      sugestao += 'Seu nível de estresse está sob controle!\n';
    }
    setDica(sugestao.trim());
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Monitoramento de Saúde</Text>
        <Text style={styles.subtitle}>Avalie seu bem-estar geral (1 a 10)</Text>

        <Text style={styles.label}>Nível de energia</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 7"
          keyboardType="numeric"
          value={energia}
          onChangeText={setEnergia}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Qualidade do sono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 8"
          keyboardType="numeric"
          value={sono}
          onChangeText={setSono}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Nível de estresse</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 4"
          keyboardType="numeric"
          value={estresse}
          onChangeText={setEstresse}
          placeholderTextColor="#aaa"
        />

        <View style={styles.buttonContainer}>
          <Button title="Gerar Dica" color="#4F8EF7" onPress={gerarDica} />
        </View>

        {dica && (
          <Text style={styles.result}>{dica}</Text>
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