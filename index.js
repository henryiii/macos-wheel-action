const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

const fs = require('fs');

async function install(version_in) {
    const full_version = version_in.trim();
    let splits = full_version.split('.');
    splits.pop();
    const version = splits.join('.');
    const python = `python${version}`;
    const installer_name = `python-${full_version}-macosx10.9.pkg`;
    const url = `https://www.python.org/ftp/python/${full_version}/${installer_name}`;

    await core.group('Download Python', async () => {
        await exec.exec('curl', [url, '-o', installer_name]);
    });

    await core.group('Install Python', async () => {
        await exec.exec('sudo', ['installer', '-pkg', installer_name, '-target', '/']);
        await exec.exec(python, ['--version']);
    });

    await core.group('Install core tools', async () => {
        await exec.exec(python, ['-m', 'ensurepip']);
        await exec.exec(python, ['-m', 'pip', 'install', 'setuptools', 'twine', 'wheel']);
    });

}

async function main() {
    const versions_str = core.getInput('versions');
    const versions = versions_str.split(',');

    for (version of versions) {
        await install(version);
    }

}

main().catch((e) => core.setFailed(e.message));
