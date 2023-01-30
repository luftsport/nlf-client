const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');
const { exec } = require('child_process');

var branch = 'unknown';

exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
    if (err) {
        // handle error
    } else {

        const gitInfo = gitDescribeSync({
            dirtyMark: false,
            dirtySemver: false
        });

        gitInfo.version = version;

        gitInfo.buildtime = new Date();

        gitInfo.branch = stdout.trim();

        const file = resolve(__dirname, '..', 'src', 'environments', 'version.ts');
        writeFileSync(file,
            `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
    /* tslint:disable */
    export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
    /* tslint:enable */
    `, { encoding: 'utf-8' });

        console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
    }
});



