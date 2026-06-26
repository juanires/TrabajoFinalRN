import AsyncStorage from "@react-native-async-storage/async-storage";
import { Device } from "../utils/common";

const base_key = "@TrabajoFinal_RN:";
const KEY      = base_key+"DEVICE";

export const getAllDevices = async (): Promise<Device[]> => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } 
  catch (error) {
    console.log("Error cargando tasks:", error);
    return [];
  }
};

export const getDeviceById = async (id: string): Promise<Device | null> => {
  try {
    const device_list = await getAllDevices();
    const found = device_list.find((device) => device.id === id) || null;
    console.log("Device obtenida id:", id, "->", JSON.stringify(found));
    return found;
  } catch (error) {
    console.log("Error obteniendo device por id:", error);
    return null;
  }
};

export const addDevice = async (device: Device): Promise<boolean> => {
  try {
    const device_list = (await getAllDevices())
    const new_device_list = [...device_list,device];
    await AsyncStorage.setItem(KEY, JSON.stringify(new_device_list));
    console.log("Guardada device:", JSON.stringify(device));
    return true;
  } catch (error) {
    console.log("Error guardando device:", error);
    return false;
  }
};

export const updateDevice = async (updatedDevice: Device): Promise<boolean> => {
  try {
    const device_list = await getAllDevices();
    const new_device_list = device_list.map((device) =>
      device.id === updatedDevice.id ? updatedDevice : device
    );
    await saveAllDevice(new_device_list);
    console.log("Device actualizada:", JSON.stringify(updatedDevice));
    return true;
  } catch (error) {
    console.log("Error actualizando device:", error);
    return false;
  }
};

const saveAllDevice = async (devices: Device[]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(devices));
    console.log("Devices guardadas:", JSON.stringify(devices));
    return true;
  }
  catch (error) {
    console.log("Error guardando device:", error);
    return false;
  }
};

export const deleteDevice = async (id: string): Promise<boolean> => {
  try {
    console.log("Eliminando task id:", JSON.stringify(id));
    const device_list = await getAllDevices();
    const new_device_list= device_list.filter((device) => device.id !== id);
    await saveAllDevice(new_device_list);
    // return  new_device_list;
    return true;
  } 
  catch (error) {
    console.log("Error eliminando device:", error);
    // return [];
    return false;
  }
};

export const deleteAllDevices = async (): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem(KEY);
        console.log("Devices borrados");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
