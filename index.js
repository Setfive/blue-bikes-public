const sqlite3 = require('sqlite3');
const fs = require("fs");
const restify = require("restify");

const Importer = {
    db: null,

    run: function run(which) {

        if(which == "seed") {
            this.init()
                .then(() => this.insertFiles());

        }else if(which == "server"){
            this.init()
                .then(() => this.server());
        }
    },

    server: function server() {
        console.log("Launching server...");

        const server = restify.createServer({strictFormatters: false});
        server.get('/', (req, res, next) => {
            const index = fs.readFileSync("web/index.html", "utf8");

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(index);
            next();
        });

        server.get('/data', (req, res, next) => {
            this.getData().then(result => {
               res.send(result);
                next();
            });
        });

        server.listen(8080, function() {
            console.log('%s listening at %s', server.name, server.url);
        });
    },

    getData: function getData() {
        return new Promise((resolve, reject) => {
            const data = {medianTripTime: 0, mostPopularRoute: "", avgBirthYear: 0,
                          percentByDay: {monday: 0, tuesday: 0, wednesday: 0, thursday:0, friday: 0, saturday: 0, sunday: 0}
            };

            resolve(data);
        });
    },

    init: function init() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database('./db/bluebikes.db', sqlite3.OPEN_READWRITE, err => {
                if (err) {
                    console.error(err.message);
                    reject(err.message);
                    process.exit(-1);
                }

                console.log('Connected to the database!');
                resolve(true);
            });
        });
    },

    insertFiles: function insertFiles() {
        return new Promise(async (resolve, reject) => {
            console.log("In insert files!");
            resolve(true);
        });
    },

};

Importer.run(process.argv[2]);
