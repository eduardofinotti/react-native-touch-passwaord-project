import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#ECF2FF'
    },

    constainerAuth: {
        flex: 1, 
        alignContent: 'center', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        marginBottom: 10
    },

    buttonAuth: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center', 
        width: '80%', 
        height: 45, 
        backgroundColor: '#3C71FF', 
        marginBottom: 30,
        borderRadius:5
    },

    textButtonAuth: {
        color: '#fff', 
        fontWeight: 'bold',
        fontSize: 17
    }
})