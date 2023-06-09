const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromisses = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    let dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`
    let logItem = `\n${dateTime}\t${uuid()}\t${message}`;

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromisses.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromisses.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    }
    catch(err){
        console.error(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
}

const errorLogger = (err, next) => {
    logEvents(`${err.name}\t${err.message}`, 'errLog.txt')
    next();
}

module.exports = { logger , errorLogger};