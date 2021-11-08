import network from "./network"

export default new class DateTime {
    private diff = 0;
    constructor() {
        this.get = this.get.bind(this);
        this.now = this.now.bind(this);
        this.generateDate = this.generateDate.bind(this);
    }

    async init(){
        this.diff = await network.getTimeDifferenceFromSofia(true);
    }

    get() {
        // Only for testing 
        // const offset1HourAhead = new Date(Date.now());
        // offset1HourAhead.setHours(offset1HourAhead.getHours() + 1);
        // return new Date(offset1HourAhead.valueOf() + this.diff);
        //
        return new Date(Date.now() + this.diff);

    }

    now(){
        return (this.get()).valueOf();
    }


    generateDate(dateString: string, hourString?: string) {
        const date = this.get();
        if(hourString){
            const split = hourString.split(":");
            date.setHours(parseInt(split[0]), parseInt(split[1]), parseInt(split[2]));
        }
        const splitDate = dateString.split("-");
        date.setFullYear(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]));
        return date;
    }

}();