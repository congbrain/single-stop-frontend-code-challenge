const childProcess = require('child_process');

childProcess.execSync('sh ./bin/setup.sh', {stdio:[0,1,2]});
