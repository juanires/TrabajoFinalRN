import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Device } from "../utils/common";
import { View , Text} from "react-native";

export default function FavoriteDeviceScreen() {
    const [device, setDevice] = useState<Device[]>([]);

    return (
    <SafeAreaView style= {{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <View>
            <Text>ESTA ES LA FavoriteDeviceScreen</Text> 

            {/* P2. Botonoes para agregar los dispositivos
                -> SWITCH
                -> LIGHT */}
        </View>
    </SafeAreaView>
    );
}