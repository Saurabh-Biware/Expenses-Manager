import {
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    cardView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .5)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 3,
            },
            android: {
                elevation: 5
            },
        }),
        borderRadius: 7,
        width: width * 0.9
    },

    buttonStyle: {
        width: width * 0.8,
        backgroundColor: '#23abc4',
    },

    inputsRow: {
        flexDirection: 'row',
        marginTop: 20,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 7,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 2,
            },
            android: {
                elevation: 5
            },
        }),
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: width * 0.8,
        alignItems: 'center'
    },

    blackIconStyle: {
        fontSize: 20,
        color: 'gray',
    },

    inputStyle: {
        fontSize: 18,
    },
    
});
