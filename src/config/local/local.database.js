import * as SecureStore from "expo-secure-store";

export const AddItemToStorage = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    return false;
  }
};

export const RemoveItemToStorage = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    return false;
  }
};

export const GetItemToStorage = async (key) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    return false;
  }
};