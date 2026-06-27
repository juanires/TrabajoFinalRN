import AsyncStorage from "@react-native-async-storage/async-storage";
import { Device } from "../utils/common";

//Identificacion para el almacenamiento de datos en AsyncStorage
const base_key = "@TrabajoFinal_RN:";
const KEY      = base_key+"DEVICE";

/**
 * Obtiene todos los dispositivos almacenados en AsyncStorage.
 *
 * @returns Promise<Device[]> Lista de dispositivos almacenados o [] en caso de error.
 */
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

/**
 * Obtiene un dispositivo por su ID.
 *
 * @param id Identificador del dispositivo a buscar.
 * @returns Promise<Device | null> Dispositivo encontrado o null si no existe o hay error.
 */
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

/**
 * Agrega un nuevo dispositivo al almacenamiento.
 *
 * @param device Dispositivo a guardar.
 * @returns Promise<boolean> true si se guarda correctamente, false en caso de error.
 */
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

/**
 * Actualiza un dispositivo existente.
 *
 * @param updatedDevice Dispositivo con los datos actualizados.
 * @returns Promise<boolean> true si se actualiza correctamente, false en caso de error.
 */
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

/**
 * Guarda una lista completa de dispositivos en AsyncStorage.
 *
 * @param devices Array de dispositivos a guardar.
 * @returns Promise<boolean> true si se guarda correctamente, false en caso de error.
 */
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

/**
 * Elimina un dispositivo por su ID.
 *
 * @param id Identificador del dispositivo a eliminar.
 * @returns Promise<boolean> true si se elimina correctamente, false en caso de error.
 */
export const deleteDevice = async (id: string): Promise<boolean> => {
  try {
    console.log("Eliminando task id:", JSON.stringify(id));
    const device_list = await getAllDevices();
    const new_device_list= device_list.filter((device) => device.id !== id);
    await saveAllDevice(new_device_list);
    return true;
  } 
  catch (error) {
    console.log("Error eliminando device:", error);
    return false;
  }
};

/**
 * Elimina todos los dispositivos almacenados en AsyncStorage.
 *
 * @returns Promise<boolean> true si se elimina correctamente, false en caso de error.
 */
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
