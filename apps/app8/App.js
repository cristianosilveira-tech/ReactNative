import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker } from 'react-native';

const condicoes = [
  { codigo: '0', nome: 'A VISTA', desconto: 25 },
  { codigo: '1', nome: 'Cheque (30 dias)', desconto: 20 },
  { codigo: '2', nome: 'Cartão Crédito (2x)', desconto: 10 },
  { codigo: '3', nome: 'Cartão Crédito (3x)', desconto: 5 },
  { codigo: 'outra', nome: 'Negociada com vendedor', desconto: 0 },
];

export default function App() {
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [codigo, setCodigo] = useState('0');
  const [resultado, setResultado] = useState(null);

  const calcularVenda = () => {
    const valorNum = parseFloat(valor.replace(',', '.'));
    const quantidadeNum = parseInt(quantidade);
    if (isNaN(valorNum) || valorNum <= 0 || isNaN(quantidadeNum) || quantidadeNum <= 0) {
      setResultado('Preencha os campos corretamente!');
      return;
    }
    const condicao = condicoes.find(c => c.codigo === codigo) || condicoes[4];
    const valorCompra = valorNum * quantidadeNum;
    const valorDesconto = condicao.desconto > 0 ? valorCompra * (condicao.desconto / 100) : 0;
    const valorFinal = valorCompra - valorDesconto;
    setResultado(
      `Tipo de pagamento: ${condicao.nome}\nValor da compra: R$ ${valorCompra.toFixed(2)}\nDesconto: R$ ${valorDesconto.toFixed(2)}\nValor final: R$ ${valorFinal.toFixed(2)}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculadora de Venda</Text>
        <Text style={styles.subtitle}>Informe os dados da compra</Text>

        <Text style={styles.label}>Valor do produto (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 100"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Condição de pagamento</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={codigo}
            style={styles.picker}
            onValueChange={(itemValue) => setCodigo(itemValue)}
          >
            {condicoes.map((c) => (
              <Picker.Item key={c.codigo} label={c.nome} value={c.codigo} />
            ))}
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Calcular" color="#4F8EF7" onPress={calcularVenda} />
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
  pickerContainer: {
    width: '100%',
    marginBottom: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 44,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  result: {
    fontSize: 18,
    color: '#4F8EF7',
    marginTop: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});