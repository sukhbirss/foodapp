import React, { useState } from 'react';
import { View, Text, StyleSheet,ImageBackground,ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const image = { uri: "https://images.unsplash.com/flagged/photo-1576918180571-85add0728420?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXBwJTIwZm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" };

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = price => {
    // price === '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image} blurRadius={2}>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => searchApi(term)}
        />
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <Text style={{color:'white',marginLeft:15}}>We have found {results.length} results</Text>
        <ScrollView>
          <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" />
          <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
          <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
});

export default SearchScreen;
