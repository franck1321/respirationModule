import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useState} from 'react'
import TransitionRespiration from '../component/TransitionRespiration'

export default function RespirationPage() {
  const [enabled, setEnabled] = useState(false)
  const returnDisabled = () => {
    return (
      <View style={styles.respiration}>
        <View style={styles.div_top_text}>
          <Text style={styles.top_text}>Bubule veut être plus grande, veux-tu l'aider à grandir ?</Text>
        </View>
        <View style={styles.image}>
          <Image 
             source={require('../../assets/bulle_normale.gif')}
             style={styles.bulles}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={() => setEnabled(true)}>
            <Text style={styles.text_btn} >Aide là</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const returnEnabled = () => <TransitionRespiration />
  return !enabled ? returnDisabled() : returnEnabled();
}

const styles = StyleSheet.create({
  text_btn: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',

  },
  btn: {
    marginTop: 100,
    backgroundColor: '#2038A6',
    height: 50,
    width: 175,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  div_top_text: {
    marginBottom: 100,
  },
  top_text: {
    color: '#2038A6',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  respiration: {
    top:150,
    bottom:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulles: {
    height: 200,
    width: 200,
  }, 
});