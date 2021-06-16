import { parse } from 'json2csv';
import _ from 'lodash';

/**
 * CLI output functions
 */
export default class out {

    constructor() {
    }

    /**
     * Log object to JSON, Table, CSV etc.
     * @param {*} thingy thing to output
     * @param {outputType} type Json, Table or CSV
     */
    static log(thingy, type) {

        if (!type) {
            console.log(thingy);
            return;
        }

        switch (type) {
            case outputType.Json:
                console.log(JSON.stringify(thingy, null, 2));
                break;
            case outputType.Table:
                console.table(thingy);
                break;
            case outputType.Csv:
                toCSV(thingy);
                break;
            default:
                console.log(thingy);
        }
    }

    static json(thingy) {
        this.log(thingy, outputType.Json)
    }

    static table(thingy) {
        this.log(thingy, outputType.Table)
    }

    static csv(thingy) {
        this.log(thingy, outputType.Csv)
    }
}

export const outputType = {
    Json: 'json',
    Table: 'table',
    Csv: 'csv'
}

function toCSV(thingy, opts) {
    try {
        if(!_.isEmpty(thingy))
            console.log(parse(thingy, opts));
    } catch (err) {
        console.error(err);
    }
}