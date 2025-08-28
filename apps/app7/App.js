import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const preferencias = [
  'Praias',
  'Montanhas',
  'Cidades Históricas',
  'Aventura',
  'Natureza',
];

const destinos = {
  'Praias': {
    destino: 'Fernando de Noronha',
    atividades: ['Mergulho', 'Passeio de barco', 'Praia do Sancho'],
  },
  'Montanhas': {
    destino: 'Campos do Jordão',
    atividades: ['Trilhas', 'Teleférico', 'Parque Amantikir'],
  },
  'Cidades Históricas': {
    destino: 'Ouro Preto',
    atividades: ['Museus', 'Igrejas', 'Centro Histórico'],
  },
  'Aventura': {
    destino: 'Bonito',
    atividades: ['Rapel', 'Flutuação', 'Cachoeiras'],
  },
  'Natureza': {
    destino: 'Foz do Iguaçu',
    atividades: ['Cataratas', 'Parque das Aves', 'Passeio de barco'],
  },
};

export default function App() {
  const [preferencia, setPreferencia] = useState(null);
  const [sugestao, setSugestao] = useState(null);

  const gerarSugestao = () => {
    if (!preferencia) {
      setSugestao('Selecione uma preferência para receber recomendações.');
      return;
    }
    const info = destinos[preferencia];
    setSugestao(`Destino recomendado: ${info.destino}\nAtividades sugeridas: ${info.atividades.join(', ')}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Planejamento de Viagens</Text>
        <Text style={styles.subtitle}>Escolha sua preferência de viagem:</Text>
        <ScrollView style={{ maxHeight: 120, width: '100%' }}>
          {preferencias.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.prefBtn, preferencia === item && styles.prefBtnAtivo]}
              onPress={() => setPreferencia(item)}
            >
              <Text style={[styles.prefText, preferencia === item && styles.prefTextAtivo]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.gerarBtn} onPress={gerarSugestao}>
          <Text style={styles.gerarBtnText}>Gerar Sugestão</Text>
        </TouchableOpacity>
        {sugestao && (
          <Text style={styles.result}>{sugestao}</Text>
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
  prefBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  prefBtnAtivo: {
    backgroundColor: '#4F8EF7',
  },
  prefText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'sans-serif',
  },
  prefTextAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gerarBtn: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 18,
    marginBottom: 10,
  },
  gerarBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
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