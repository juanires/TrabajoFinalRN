
enum DeviceType {
  LIGHT = "Light",
  SWITCH = "Switch",
}
type Device={
    id          : string;
    device_type : DeviceType;
    name        : string;
    description : string;
    is_on       : boolean;
    is_favorite : boolean;
};


export {Device, DeviceType};