// Enumeración para los tipos de dispositivos
enum DeviceType {
  LIGHT = "Light",
  SWITCH = "Switch",
}

// Interfaz para representar un dispositivo
type Device={
    id          : string;
    device_type : DeviceType;
    name        : string;
    description : string;
    is_on       : boolean;
    is_favorite : boolean;
};


export {Device, DeviceType};