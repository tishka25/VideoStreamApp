import AsyncStorage from "@react-native-async-storage/async-storage";


export default new class Memory {
    constructor(){

    }

    async save(key: string, data: Object){
        AsyncStorage.setItem(key, JSON.stringify(data));
    }

    async load(key: string){
        try {
            const str = await AsyncStorage.getItem(key);
            if(!str)
                throw "Error";
            return JSON.parse(str);
        } catch (error) {
            console.log("Could not parse key:", key);
            return null;
        }
    }

    async clear(key: string){
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log("Could not parse delete:", key);
            return null;
        }
    }

    async clearAll(){
        try {
            return await AsyncStorage.clear();
        } catch (error) {
            console.log("Could not clear local storage", error);
            return null;
        }
    }

}();