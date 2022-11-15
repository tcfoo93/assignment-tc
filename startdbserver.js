const { exec } = require('child_process');

exec('json-server --watch scripts/db.json --port=' + process.env.DB_PORT, (error, stdout, stderr) => {
    if (error) {
        return console.log(`error: ${error.message}`);
    }

    if (stderr) {
        return console.log(`stderr: ${stderr}`);
    }
});