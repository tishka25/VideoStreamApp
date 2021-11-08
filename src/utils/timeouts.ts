class Timeouts{
    private timeouts: any = new Object();
    constructor(){
    }

    /**
     * Sets callback to be executed after a given timeout with a given ID. 
     * If a timeout with the current ID already exists, it will be rescheduled again
     * 
     * @param {string} id 
     * @param {Function} callback 
     * @param {number} timeout 
     * @returns {string} - id of the scheduled timeout
     */
    setTimeout(id: string | number, callback: ()=>void, timeout: number){
        this.clear(id);
        this.timeouts[id] = setTimeout(async()=>{
            // if(document.hidden)
            //     return;
            if(callback.constructor.name == "AsyncFunction"){
                await callback();
            }else{
                callback();
            }
        }, timeout);
        return id;
    }
    /**
     * Sets callback to be executed after a given interval with a given ID. 
     * If an interval with the current ID already exists, it will be rescheduled again
     * 
     * @param {string} id 
     * @param {Function} callback 
     * @param {number} timeout 
     * @returns {string} - id of the scheduled interval
     */
    setInterval(id: string | number, callback: ()=>void, timeout: number){
        this.clear(id);
        this.timeouts[id] = setInterval(async()=>{
            // if(document.hidden)
            //     return;
            if(callback.constructor.name == "AsyncFunction"){
                await callback();
            }else{
                callback();
            }
        }, timeout);
        return id;
    }
    

    clear(id: string | number){
        if(this.timeouts[id]){
            clearTimeout(this.timeouts[id]);
            clearInterval(this.timeouts[id]);
            delete this.timeouts[id];
        }
    }
}

// Singleton
export default new Timeouts();