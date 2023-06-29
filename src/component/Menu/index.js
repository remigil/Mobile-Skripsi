import react from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';
import { IconAkun, IconInformasi, IconNgawas, ImageAkun, ImageInformasi, ImageNgawas } from '../../assets/Assets';

const Menu = ({title, active, onpress,}) => {
const icon  =()=> {
    if (title === "Ngawas") return <IconNgawas/>;
    if (title === "Ngawas") return <IconAkun/>;
    if (title === "Ngawas") return <IconInformasi/>;
    return <IconInformasi/>
}

    return(
        <TouchableOpacity style={styles.container(active)}onPress={onPress}>
            <View style={styles.icon}>
            <Icon/>
            <Text>styles={styles.text(active)}{title. replace(' ', '\n')}</Text>
            </View>
        </TouchableOpacity>

    )
}
export default Menu

const styles = StyleSheet.create({
    container: {
        alignItems: ' center',
        // backgroundColor: active ? '#01796F' : '#FFFFFF',
        borderRadius: 10,
        padding: 8,
        // borderColor : '#FFFFFF',
        // borderWidth: active ? 0 : 2,
    },
    text: active => ({
        fontSize:14,
        fontFamily: 'OpenSans-Bold',
        color : active ? 'white' : '#01796F',
        textAlign: 'center'
    }),

})