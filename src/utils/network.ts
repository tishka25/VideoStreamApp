import constant, { BASE_URL } from "./constants";
import system from "./system";
import user from "./user";

export default new class Network{
    private timeDiffenceCache: number = 0;
    constructor(){
        this._postData = this._postData.bind(this);
        this._getJSON = this._getJSON.bind(this);
        this.getChannels = this.getChannels.bind(this);
        this.getChannelsProgramme = this.getChannelsProgramme.bind(this);
        this.getTimeDifferenceFromSofia = this.getTimeDifferenceFromSofia.bind(this);
    }

    private _getJSON(url: string, parse = true): Promise<any> {
        return new Promise((resolve , reject)=>{
            var xhr = new XMLHttpRequest();
            xhr.timeout = constant.NETWORK_TIMEOUT_TIME;
            xhr.open("GET", url, true);
            console.log("Opening XHR:", url);
            xhr.onload = function() {
                if (xhr.status === 200 && xhr.response) {
                    resolve(parse ? JSON.parse(xhr.response): xhr);
                } 
                else {
                    console.log(xhr.responseText);
                    reject({status: xhr.status, responseText: xhr.responseText});
                }
            };
            xhr.onerror = function(e){
                reject(e);
            }
            xhr.ontimeout = function(e) {
                reject(e);
            }
            xhr.send();
        });
    }

    private _postData(url:string, data = {}, content_type?: string){
        return new Promise((resolve, reject)=>{
            console.log("Opening:", url, data);
            var xhr = new XMLHttpRequest();
            xhr.timeout = constant.NETWORK_TIMEOUT_TIME;
            xhr.addEventListener("readystatechange", function () {
                try {
                    if (this.readyState === 4) {
                        if(this.status == 200){
                            resolve(JSON.parse(xhr.response));
                        }else{
                            reject({status: xhr.status, responseText: xhr.responseText});
                        }
                    }
                } catch (error) {
                    reject(error);
                }
            });
            xhr.open("POST", url);
            if(content_type)
                xhr.setRequestHeader("Content-Type", content_type);
            xhr.onerror = function(e){
                reject(e);
            }
            xhr.ontimeout = function(e){
                reject(e);
            }
            xhr.send(data);
        });
    }

    async _formData(url: string, data: any){
        const formData = new FormData();
        //Convert Object to FormData
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        //
        return await this._postData(url, formData)
    }

    async getChannels(){
        return await this._getJSON(constant.CHANNEL_LIST_API_URL);
    }

    async getChannelsProgramme(cid = ""){
        const _url = constant.CHANNEL_PROGRAMME_LIST_API_URL + ((cid != "") ? "&cid=" + cid : "");
        return await this._getJSON(_url);
    }

    async getRecordings(cid: string | number){
        const _url = `${constant.CHANNEL_RECORDINGS_LIST_API_URL}&cid=${cid}`;
        return await this._getJSON(_url);
    }

    async userSignIn(signInCode: string){
        const _url = constant.SIGN_IN_URL + "&code=" + signInCode;
        return await this._getJSON(_url);
    }

    async userSignOut(){
        await this._getJSON(BASE_URL + "logout");
    }

    async sendUserStatistics(bandwidth: number, cid: string | number, isLive: boolean, host: string) {
        var _url = constant.SEND_USER_STATISTICS_API_URL + "&bw=" + bandwidth + "&cid=" + cid + "&live=" + isLive + "&host=" + host;
        return await this._getJSON(_url);
    }

    async addToHistory(data: any){
        return await this._formData(constant.ADD_TO_HISTORY_API_URL, data);
    }

    async getHistory(){
        return await this._getJSON(constant.HISTORY_LIST_API_URL);
    }

    async getStreamUrls(cid: string | number){
        //Generate url from cid
        var q = user.calculateQ();
        const url = constant.CHANNEL_URL_API_URL + "&cid=" + cid + "&q=" + q + "&app=" + system.getName();
        return await this._getJSON(url);
    }

    async getRecordingURLs(bid: string | number){
        const _url = constant.GET_RECORDING_API_URL + "&bid=" + bid + "q=" + user.calculateQ() + "&player=" + system.getName()
                    + '&mquality=1';
        return await this._getJSON(_url);
    }

    async getDurationOfDVR(){
        return await this._getJSON(constant.GET_DURATION_OF_DVR);
    }

    async searchArchive(query: string, fastSearch = false){
        const _url = constant.SEARCH_ARCHIVE + `${(fastSearch) ? "&fword=1" : ""}`;
        return await this._formData(_url, { text: query });
    }
    
    async getTimeDifferenceFromSofia(force = false){
        if(force || this.timeDiffenceCache == null){
            const data = await this._getJSON(constant.GET_CURRENT_DATE_IN_SOFIA_API_URL);
            var _serverDate = Date.parse(data);
            // var _serverDate = 1612465871000;
            console.log("_serverDate: " + _serverDate);
            var _clientDate = Date.now();
            // var _clientDate = 1612469471000;
            console.log("_clientDate: " + _clientDate);
            this.timeDiffenceCache = _serverDate.valueOf() - _clientDate;
            console.log("time difference in minutes: " , (this.timeDiffenceCache / (1000 * 60)) );
        }
        return this.timeDiffenceCache;
    }

    async checkUserForDuplicateSession(){
        const response = await this._getJSON(constant.CHECK_DUPLICATE_SESSION_API_URL);
        return response;
    }

    async checkUserSubscription(){
        return await this._getJSON(constant.CHECK_SUBSCRIPTION_API_URL);
    }

    async sendAppDescription(email: string){
        const data = "dev=" + system.getName() + "&name=" + email;
        return await this._postData(constant.SEND_APP_DESC_AND_EMAIL_API_URL, data, "application/x-www-form-urlencoded");
    }

    async checkPersonalAnnounce(){
        return await this._getJSON(constant.CHECK_PERSONAL_ANNOUNCEMENTS);
    }

    async checkGlobalAnnounce(){
        return await this._getJSON(constant.CHECK_GLOBAL_ANNOUNCEMENTS);
    }

    async getNextBid(currentBid: string | number){
        const _url = constant.GET_NEXT_BID + "&bid=" + currentBid;
        return await this._getJSON(_url);
    }


    async handleServerConnection(){
        return new Promise(async (resolve, reject)=>{
            const onRetry = ()=>{
                this.handleServerConnection()
                    .then(resolve)
                    .catch(reject);
            }
            try {
                const res = await this._getJSON(BASE_URL, false);
                const isSuccess = (res.status >= 200 && res.status <= 299);
                if(isSuccess)
                    resolve(res);
                else
                    throw new Error("No network connection");
            } catch (error) {
                console.log(error);
                // navigation.showNetworkTryAgainModal(onRetry);
            }
        });
    }

}();