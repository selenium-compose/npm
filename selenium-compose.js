#!/usr/bin/env node

const fs = require("fs"),
  path = require("path"),
  realpath = fs.realpathSync(process.argv[1]),
  downloadRelease = require('download-github-release'),
  targz = require('targz');

// Script directory absolute path
const dir = path.dirname(realpath)

// available platforms https://nodejs.org/api/process.html#process_process_platform
// and available builds https://github.com/apzuk/selenium-compose/releases
const platforms = {
  "darwin": "darwin",
  "linux": "linux",
  "win32": "windows"
}

// available platforms https://nodejs.org/api/process.html#process_process_arch
// and available builds https://github.com/apzuk/selenium-compose/releases
const archs = {
  "ia32": "386",
  "x64": "amd64",
  "arm": "arm"
}

// If binary exists - execute it! Otherwise download the latest
// release from github and execute it!
if (fs.existsSync(dir + "/selenium-compose")) {
  execute()
} else{
  console.log("Missing binary. Installing selenium-compose...")
  console.log("Platform:" + process.platform)
  console.log("Arch:" + process.arch)
  downloadRelease("selenium-compose", "selenium-compose", dir, filterRelease, filterAsset, true)
    .then(function() {
      targz.decompress({
        src: path.join(dir, name),
        dest: dir
      }, function(err){
        if(err) { throw "Untar" + err }
        execute()
      });
    })
    .catch(function(err) {
      throw err;
    });
}

function filterRelease(release) {
  return release.prerelease === false;
}

function filterAsset(asset) {
  if ( asset.name.indexOf(platforms[process.platform] + "_" + archs[process.arch]) >= 0 ) {
    name = asset.name
    return true
  }
  return false
}

function execute() {
  const { spawn } = require('child_process')

  const exec = spawn(path.dirname(realpath) + "/selenium-compose", process.argv.slice(2))

  process.on('SIGINT', function() {
    exec.emit('SIGINT')
  });
  exec.stdout.on('data', function (data) {
    console.log(data.toString());
  });
}
