import React, { useState, useEffect, ChangeEvent, ReactText } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground,Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';

import citys from '../../services/pt.json';
import dist from '../../services/pt_districts.json';

const Home = () => {
    const [districts, setDistricts] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedDistrict, setSelectedDistrict] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
     
    const navigation = useNavigation();

    useEffect(() => {
        const districts = dist.map(district => district.admin);

        setDistricts(districts);
    }, [])

    useEffect(() => {
        if(selectedDistrict === '0')
        {
            return;
        }

        const cidades = citys.filter(city => city.admin === selectedDistrict).map(city => city.city);

        setCities(cidades);
    }, [selectedDistrict])

    function handleNavigateToPoints()
    {
        navigation.navigate('Points', {
            city: selectedDistrict,
            district: selectedCity,
        });
    }

    function handlSelectedDistrict(value: string)
    {
        const district = value;

        setSelectedDistrict(district);
    }
    
    function handlSelectedCity(value: string)
    {
        const city = value;

        setSelectedCity(city);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding': undefined}>
            <ImageBackground 
                source={require('../../assets/home-background.png')} 
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de recolha de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de recolha de forma eficiente.</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Picker style={styles.input} selectedValue={selectedDistrict} onValueChange={(itemValue, itemIndex) => {
                        handlSelectedDistrict(String(itemValue))
                    }}>
                      <Picker.Item label="Selecione um Distrito" value="0" />
                      {districts.map(dist => (
                            <Picker.Item key={dist} label={dist} value={dist}></Picker.Item>
                       ))}
                    </Picker>

                    <Picker style={styles.input} selectedValue={selectedCity} onValueChange={(itemValue, itemIndex) => {
                        handlSelectedCity(String(itemValue))
                    }}>
                      <Picker.Item label="Selecione uma Cidade" value="0" />
                      {cities.map(city => (
                            <Picker.Item key={city} label={city} value={city}></Picker.Item>
                       ))}
                    </Picker>

                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#fff" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

/**
 * 
 * const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
 *  <TextInput 
        style={styles.input}
        placeholder="Escreva o distrito"
        autoCorrect={false}
        value={district}
        onChangeText={setDistrict}
    />
    <TextInput 
        style={styles.input}
        placeholder="Escreva a cidade"
        autoCorrect={false}
        value={city}
        onChangeText={setCity}
    />
 */

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  }); 

export default Home;