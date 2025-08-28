import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const generos = [
  'Ação',
  'Comédia',
  'Drama',
  'Terror',
  'Romance',
  'Ficção Científica',
  'Animação',
  'Aventura',
];

const filmesPorGenero = {
  'Ação': ['John Wick', 'Mad Max: Estrada da Fúria', 'Gladiador'],
  'Comédia': ['As Branquelas', 'Superbad', 'O Âncora'],
  'Drama': ['Forrest Gump', 'O Poderoso Chefão', 'Clube da Luta'],
  'Terror': ['Invocação do Mal', 'Corra!', 'O Iluminado'],
  'Romance': ['Titanic', 'Diário de uma Paixão', 'Como Eu Era Antes de Você'],
  'Ficção Científica': ['Interestelar', 'Matrix', 'Blade Runner 2049'],
  'Animação': ['Toy Story', 'Divertida Mente', 'Shrek'],
  'Aventura': ['Indiana Jones', 'Jurassic Park', 'Piratas do Caribe'],
};

export default function App() {
  const [selecionados, setSelecionados] = useState([]);
  const [recomendacoes, setRecomendacoes] = useState([]);

  const toggleGenero = (genero) => {
    setSelecionados((prev) =>
      prev.includes(genero)
        ? prev.filter((g) => g !== genero)
        : [...prev, genero]
    );
  };

  const gerarRecomendacoes = () => {
    let filmes = [];
    selecionados.forEach((genero) => {
      filmes = filmes.concat(filmesPorGenero[genero]);
    });
    setRecomendacoes(filmes.length ? filmes : ['Nenhum gênero selecionado.']);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>🎬</Text>
        <Text style={styles.title}>Recomendações de Filmes</Text>
        <Text style={styles.subtitle}>Selecione seus gêneros favoritos:</Text>
        <ScrollView style={{ maxHeight: 180, width: '100%' }}>
          {generos.map((genero) => (
            <TouchableOpacity
              key={genero}
              style={[styles.generoBtn, selecionados.includes(genero) && styles.generoBtnAtivo]}
              onPress={() => toggleGenero(genero)}
            >
              <Text style={[styles.generoText, selecionados.includes(genero) && styles.generoTextAtivo]}>{genero}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.gerarBtn} onPress={gerarRecomendacoes}>
            <Text style={styles.gerarBtnText}>Gerar Recomendações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.limparBtn} onPress={() => { setSelecionados([]); setRecomendacoes([]); }}>
            <Text style={styles.limparBtnText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        {recomendacoes.length > 0 && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTitulo}>Filmes recomendados:</Text>
            {recomendacoes.map((filme, idx) => (
              <Text key={idx} style={styles.resultadoFilme}>{filme}</Text>
            ))}
          </View>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 48,
    marginBottom: 8,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4E2D8', // bege retrô
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF8F0', // bege claro
    borderRadius: 16,
    padding: 32,
    shadowColor: '#6B4226', // marrom escuro
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    width: 340,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C97D60', // laranja queimado
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D4263', // azul retrô
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B4226', // marrom escuro
    marginBottom: 16,
    fontFamily: 'sans-serif',
  },
  generoBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#C97D60', // laranja queimado
    marginBottom: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#6B4226',
  },
  generoBtnAtivo: {
    backgroundColor: '#2D4263', // azul retrô
    borderColor: '#2D4263',
  },
  generoText: {
    fontSize: 16,
    color: '#FFF8F0', // bege claro
    fontFamily: 'sans-serif',
  },
  generoTextAtivo: {
    color: '#F4E2D8', // bege retrô
    fontWeight: 'bold',
  },
  gerarBtn: {
    backgroundColor: '#b0b0b0', // laranja queimado mais claro
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6B4226',
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
  },
  gerarBtnText: {
    color: '#6B4226', // marrom escuro
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  resultado: {
    marginTop: 18,
    alignItems: 'center',
  },
  resultadoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C97D60', // laranja queimado
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },
  resultadoFilme: {
    fontSize: 16,
    color: '#2D4263', // azul retrô
    marginBottom: 4,
    fontFamily: 'sans-serif',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 12,
    marginTop: 18,
    marginBottom: 10,
  },
  limparBtn: {
    backgroundColor: '#C97D60', // laranja queimado
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6B4226',
    flex: 1,
  },
  limparBtnText: {
    color: '#FFF8F0', // bege claro
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});