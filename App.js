import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Button,
    FlatList,
    Keyboard,
    Image,
    Text
} from 'react-native';

export default function App() {
    const [cidade, setCidade] = useState('');
    const [apiResponse, setApiResponse] = useState([]);
    const [notFound, setNotFound] = useState(false)

    const searchCity = (cidade) => {
        setCidade(cidade);
    }

    const buscarCidades = () => {
        setApiResponse([]);

        fetch('https://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric&q=' + cidade + '&appid=8a0c8437588d7b3c9d8188ce516e9abc')
            .then((response) => response.json())
            .then((response) => {
                if (response.cod && response.cod == 200) {
                    setNotFound(false);
                } else {
                    setNotFound(true);
                }
                setApiResponse([response])
                Keyboard.dismiss()
            })
        ;
    }

    return (
        <View style={styles.container}>
            <View style={styles.busca}>
                <TextInput
                    placeholder="Insira o nome da cidade"
                    style={styles.buscaInput}
                    value={cidade}
                    onChangeText={searchCity}
                />
                <Button title="Buscar" onPress={buscarCidades} />
            </View>
            {
                notFound ? (
                    <Text style={styles.notFoundMessage}>Nenhum resultado encontrado</Text>
                ) : (
                    <FlatList
                        data={apiResponse}
                        renderItem={ forecast => (
                            <View style={styles.card}>
                                <View style={styles.cardItem}>
                                    <View>
                                        <View style={styles.cardCityName}>
                                            <Text>{forecast.item.name}</Text>
                                        </View>
                                        <View style={styles.cardInformacoes}>
                                            <Text style={styles.cardIformacao}>
                                                <Image style={styles.cardImage} source={require('./Icons/celsius.png')} />
                                                &nbsp;&nbsp;
                                                Sensação térmica: {forecast.item.main.feels_like + " \u00B0" + "C"}
                                            </Text>
                                            <Text style={styles.cardIformacao}>
                                                <Image style={styles.cardImage} source={require('./Icons/sunset.png')} />
                                                &nbsp;&nbsp;Hora do pôr do sol: {new Date(forecast.item.sys.sunset * 1000).toLocaleTimeString()}
                                            </Text>
                                            <Text style={styles.cardIformacao}>
                                                <Image style={styles.cardImage} source={require('./Icons/sunrise.png')} />
                                                &nbsp;&nbsp;Hora do nascer do sol: {new Date(forecast.item.sys.sunrise * 1000).toLocaleTimeString()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff'
    },
    buscaInput: {
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        textAlign: 'left',
        marginBottom: 10,
        flexGrow: 0.9
    },
    busca: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    notFoundMessage: {
        color: 'red'
    },
    card: {
        marginBottom: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12
    },
    cardItem: {
        flexDirection: 'row',
    },
    cardImage: {
        width: 35,
        height: 35
    },
    cardCityName: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    cardInformacoes: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        flexWrap: 'wrap'
    },
    cardIformacao: {
        marginTop: 10,
        marginHorizontal: 2,
    }
}); 