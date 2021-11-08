import constants from "./constants";

export default new class System {
    constructor(){

    }

    getName(){
        return `${constants.APP_NAME}-${constants.APP_VERSION}`;
    }
}();