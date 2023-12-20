import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import Voice from '@react-native-voice/voice';
import { COLORS } from '../Constant/Color';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Navigation from '../../Service/Navigation';

const SpeechToText = (props) => {
    const [started, setStarted] = useState('');
    const [ended, setEnded] = useState('');
    const [results, setResults] = useState([]);


    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechStart = (e) => {
        console.log(e);
        setStarted(':OK');
    };

    const onSpeechEnd = (e) => {
        console.log(e);
        setEnded(':OK');
    };

   
    const onSpeechResults = (e) => {
        console.log(e);
        const hypotheses = e.value;
      
        if (hypotheses.length > 0) {
          const highestConfidenceText = hypotheses[0];
          console.log('Recognized text:', highestConfidenceText);
          setResults([highestConfidenceText]); // Chỉ hiển thị kết quả cao nhất
          // ...
        }
      };

    const startRecognizing = async () => {
        try {
            await Voice.start('en-US');
            setStarted('');
            setEnded('');
            setResults('');
        } catch (e) {
            console.log(e);
        }
    };

    const stopRecognizing = async () => {
        try {
            await Voice.stop();
            await Voice.destroy();
            setStarted('');
            setEnded('');
            setResults('');
        } catch (e) {
            console.log(e);
        }
    };


    



    return (
        <View style={{ flex: 1 }}>
           
            <Text style={{ color: COLORS.white, alignSelf: 'center', marginTop: 20, fontSize: 20 }}>
                Voice to Message
            </Text>

            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 50 }} onPress={() => startRecognizing()}>
                <Image source={require('../../Assets/mic.jpg')} style={{ width: 100, height: 100 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 50, justifyContent: 'space-evenly' }}>
                <Text style ={{color:COLORS.white,fontWeight:'bold'}}>Started{started}</Text>
                <Text style ={{color:COLORS.white,fontWeight:'bold'}}>Ended {ended} </Text>
                <Text style ={{color:COLORS.white,fontWeight:'bold'}}onPress={stopRecognizing}>Restart </Text>
                
                <Text style ={{color:COLORS.white,fontWeight:'bold'}}onPress={() => Navigation.back()}>Exit</Text>
               
            </View>
            <View style={{flex:1, backgroundColor:COLORS.white, borderRadius:25}}>
            <ScrollView horizontal style={{ alignSelf: 'center', marginTop: 50 }}>
                {results && results.length > 0 ? (
                    results.map((item, index) => (
                        <Text key={index} style={{ textAlign: 'center' ,fontSize:16}}>
                            {item}
                        </Text>
                    ))
                ) : (
                    <Text>No results available</Text>
                )}

            </ScrollView>
            </View>
            <TouchableOpacity style={styles.stopButton}>
                  <Button style={styles.stopButtonText}>Send</Button>
                </TouchableOpacity>
            
        </View>

    );
};

export default SpeechToText;


const styles = StyleSheet.create({
    stopButton: {
        marginTop: 16,
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 8,
      },
      stopButtonText: {
        color: COLORS.red,
        textAlign: 'center',
        fontWeight: 'bold',
      },
})


