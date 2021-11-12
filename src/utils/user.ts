import datetime from "./datetime";
import memory from "./memory";
import network from "./network";
var md5 = require('md5');

// UserDTO
// {
//     "uid": "15076",
//         "email": "a@b.com", 
//         "sub_till": "2021-04-11", 
//         "sub_till_78": "2021-04-11", 
//         "pop": "1", 
//         "b": "1", 
//         "code": "181458571349", 
//         "name": null, 
//         "tel": null, 
//         "bo": "0", 
//         "ad": "0", 
//         "us": "0", 
//         "paying": true, 
//         "paying78": true, 
//         "player": "clappr", 
//         "nonce": 4653139, 
//         "t": 1602869032, 
//         "boo": 0, 
//         "u_prm": "0", 
//         "u_paid": "1"
// }

export default new class User {
    private userDTO:any = new Object();
    private hash = "";
    constructor() {

        this.signIn = this.signIn.bind(this);
        this.calculateQ = this.calculateQ.bind(this);
        this.autoSignIn = this.autoSignIn.bind(this);
        this.checkDuplicateSession = this.checkDuplicateSession.bind(this);
        this.checkSubscription = this.checkSubscription.bind(this);
        this.addHistory = this.addHistory.bind(this);
        this.checkSubscriptionAtStartup = this.checkSubscriptionAtStartup.bind(this);
        this.signOut = this.signOut.bind(this);
        this.getActiveSubscription = this.getActiveSubscription.bind(this);
        this.get = this.get.bind(this);
    }

    checkSubscriptionAtStartup(userResponse: any){
        try {
            const subriptionTill = new Date(Date.parse(userResponse["sub_till"]));
            subriptionTill.setHours(23, 59, 59);
            return (datetime.get() < subriptionTill);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async autoSignIn(){
        const info = await this.getInfo();
        if(info)
            return await this.signIn(info.code);
        return false;
    }

    /**
     * 
     * @param {String} signInCode - the sign in code
     * @returns {boolean}
     * - TRUE if sign in was successful
     * - FALSE if credentials were not correct
     */
    async signIn(signInCode: string) {
        try {
            const userResponse = await network.userSignIn(signInCode);
            console.log("User response:", userResponse);
            if(userResponse){
                userResponse["activeSubscription"] = this.checkSubscriptionAtStartup(userResponse);
                Object.assign(this.userDTO, userResponse);
                await memory.save("user", userResponse);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async signOut(){
        //Remove local storage
        await memory.clearAll();
        //
    }

    async getInfo(){
        return await memory.load("user");
    }

    get(){
        return this.userDTO;
    }

    getActiveSubscription(){
        return this.userDTO.activeSubscription ? true : false;
    }

    getSubscriptionDate(){
        const subscriptionDate = new Date(Date.parse(this.userDTO["sub_till"]));
        subscriptionDate.setHours(23, 59, 59);
        if(isNaN(subscriptionDate.getTime()))
            return new Date(0);
        return subscriptionDate;
    }

    async setPrefferedQuality(index: number | string){
        this.userDTO.quality = index;
        await memory.save("preffered-quality", index);
    }

    async getPrefferedQuality(){
        if(this.userDTO.quality == null || this.userDTO.quality == undefined){
            const q = await memory.load("preffered-quality") || 0;
            await this.setPrefferedQuality(q);
            return q;
        }else{
            return this.userDTO.quality;
        }
    }

    /**
     * 
     * @param {String} bid - The broadcast ID of the show that was watched
     * @param {Number} length - The duration of stream (in Miliseconds)
     * @param {Number} time - To which time the user has watched the stream (in Miliseconds)
     */
    async addHistory(bid: string | number, length: number, time: number){
        //Convert length and time to seconds from ms
        length /= 1000;
        time /= 1000;
        return await network.addToHistory({ bid, length, time });
    }

    calculateQ() {
        var sinceEpoch = Date.now() / 1000;;
        var serverTime;
        if (this.userDTO.hasOwnProperty("t") && this.userDTO.t != undefined && this.userDTO.t != null) {
            serverTime = this.userDTO.t;
        }
        else {
            serverTime = sinceEpoch;
        }
        var timeDelta = serverTime - sinceEpoch;
        var secs = Math.floor(Date.now() / 1000 - timeDelta);
        var cookie = "";
        var clear = cookie + this.userDTO.uid + ("" + secs);
        var hash = md5(clear);

        return hash;
    }

    async sendStatistics(bandwidth: number, cid: string | number, isLive: boolean, host: string) {
        return await network.sendUserStatistics(bandwidth, cid, isLive, host);
    }

    async checkDuplicateSession(){
        return await network.checkUserForDuplicateSession();
    }

    async checkSubscription(){
        const response = await network.checkUserSubscription();
        this.userDTO["activeSubscription"] = response;
        return response;
    }

    async checkPersonalAnnounce(){
        return await network.checkPersonalAnnounce();
    }

    async checkGlobalAnnounce(){
        return await network.checkGlobalAnnounce();
    }    

}();