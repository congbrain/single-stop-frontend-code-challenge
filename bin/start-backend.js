const childProcess = require('child_process');

childProcess.execSync('sh ./bin/start-backend.sh', {stdio:[0,1,2]});
