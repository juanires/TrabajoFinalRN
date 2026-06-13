import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Device } from "../utils/common";
import { View , Text} from "react-native";

export default function ManageDeviceScreen() {
    const [device, setDevice] = useState<Device[]>([]);

    return (
    <SafeAreaView style= {{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <View>
            <Text>ESTA ES LA ManageDeviceScreen</Text> 

            {/* P3. Se muestra el boton on/of en en cual se puede prender o apagar el dispositivo 
             */}
        </View>
    </SafeAreaView>
    );
}