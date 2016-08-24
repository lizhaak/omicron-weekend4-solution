// process.env for Heroku DB authentication
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/omicron';
}

module.exports = connectionString;
