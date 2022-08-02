import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {useEffect, useState, useRef} from 'react';

export default function TransitionRespiration() {
    const dlg = {
        1 : {
            reponse : "Regarde la bulle",
            size: 0,
        },
        2 : {
            reponse : "Prend une inspiration par le nez et prépare toi à aider bubulle !",
            size: 0,
        },
        3 : {
            reponse : "Bloque ta respiration, ton air ne doit pas s'échaper",
            size: 0,
        },
        4 : {
            reponse : "Soufle par la bouche, pas trop fort, pour gonfler bubulle",
            size: 0.2,
        },
        5 : {
            reponse : "On recommence, inspire",
            size: -0.05,
        },
        6 : {
            reponse : "Ensuite bloque ta respiration",
            size: -0.05,
        },
        7 : {
            reponse : "Enfin soufle par la bouche",
            size: 0.2,
        },
    }
    const img = {
        normal : require('../../assets/bulle_normale.gif'),
        gonfle : require('../../assets/bulle_gonfle.gif'),
    }

    const [dlgText, setDlgText] = useState(dlg[1].reponse)
    const [dlgImage, setDlgImage] = useState(require('../../assets/bulle_normale.gif'))
    const [dlgTimer, setDlgTimer] = useState(5);
    const [dlgSize, setDlgSize] = useState(1)
    const [view, setView] = useState(1)
    const scale = useRef(new Animated.Value(1)).current;
    const scale2 = useRef(new Animated.Value(1)).current;
    var index = 2;
    var tmp = 1.2;
    var tmp2 = 1.7;
    
    useEffect (() => {
        var timerDlg = setInterval(() => {
            if (index == 8) {
                index = 5;
            }
            tmp += dlg[index].size;
            setDlgText(prevDlg => dlg[index].reponse);
            if (index == 4 || index == 7) {
                setDlgImage(prevDlg => img.gonfle);
                Animated.timing(scale, {
                    toValue: tmp,
                    useNativeDriver : false,
                    duration: 6000
                }).start();
            } else {
                setDlgImage(prevDlg => img.normal);
                Animated.timing(scale, {
                    toValue: tmp,
                    useNativeDriver : false,
                    duration: 6000
                }).start();
            }
            console.log(tmp);
            setDlgSize(prevDlg => prevDlg + dlg[index].size);
            
            index++;
        }, 6000)
        var timer = setInterval(() => {
            setDlgTimer( prevDlg => {
                if (prevDlg <= 0) {
                    return 5;
                }
                return prevDlg - 1
            });
        }, 1000);
        var end = setTimeout(() => {
            clearInterval(timer);
            clearInterval(timerDlg);
            setView(2);
        }, 180000)
    }, []);

    return (view == 1 ? 
        <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.text}>{dlgText}</Text>
            <Text style={styles.timer}>{dlgTimer}s</Text>
        </View>
        <View style={styles.container_img}>
            <Animated.Image 
                source={dlgImage}
                style={[styles.bulle, { transform : [{scale}] }]}
          / >
        </View>
    </View>
    :
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.text}>Bulle est super grande grâce à toi ! Bravo !</Text>
        </View>
        <View style={styles.container_img}>
            <Image 
                source={img.normal}
                style={styles.bulle2}
          / >
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        top : 100,
    },
    container_text : {
        justifyContent : 'center',
        alignItems : 'center',
        height :180,
    }, 
    text : {
        fontSize : 25,
        marginLeft : 10,
        marginRight : 10,
        color : '#2038A6',
    },
    timer : {
        fontSize : 50,
        marginTop : 40,
        color : '#2038A6',
    },
    container_img : {
        height: 500,
        alignItems : 'center',
        justifyContent : 'center',
    },
    bulle : {
        height: 100,
        width: 100,
        backgroundColor : 'transparent'
    },
    bulle2 : {
        height: 400,
        width: 400,
        backgroundColor : 'transparent'
    }
});