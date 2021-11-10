import network from "./network";

interface IRecordingItem {
    bid: string;
    time: string;
    name: string;
    title?: string;
    description?: string;
}

interface IRecordingList {
    [cid: string]: {
        [date: string] : IRecordingItem[]
    }
}

export interface RecordingItem extends IRecordingItem {
    date: string;
}

class Channels {
    constructor(){

    }

    private flattenRecordingList(cid: string| number, list: IRecordingList, days?: number): RecordingItem[]{
        const dateItems = list[cid];
        let dates = Object.keys(dateItems);
        if(days != undefined){
            dates = dates.slice(0, days);
        }
        const recordings = [];
        for(var date of dates){
            for(var dateItem of dateItems[date]){
                recordings.push({
                    date,
                    ...dateItem
                });
            }
            
        }
        return Array.from(recordings);
    }

    async getRecordings(cid: string | number, days?: number){
        try {
            const recordings = await network.getRecordings(cid);
            return this.flattenRecordingList(cid, recordings, days);
        } catch (error) {
            console.log("Could not get recordings:", error);
            return [];
        }
    }
}

export default new Channels();