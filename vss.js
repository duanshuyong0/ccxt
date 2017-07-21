"use strict";

const fs        = require ('fs')
const ccxt      = require ('./ccxt')
const countries = require ('./countries')
const asTable   = require ('as-table')
const util      = require ('util')

//-----------------------------------------------------------------------------

let packageJSON = fs.readFileSync ('./package.json', 'utf8')
let config = JSON.parse (packageJSON);
let version = config.version

//-----------------------------------------------------------------------------

console.log ('Old version: ', version)
let [ major, minor, patch ] = version.split ('.')
patch = (parseInt (patch) + 1).toString ()
version = [ major, minor, patch ].join ('.')
console.log ('New version: ', version)

process.exit ()

//-----------------------------------------------------------------------------

console.log ('Single-sourcing version', version, './package.json → ./ccxt/__init__.py')
let ccxtpyFilename = './ccxt/__init__.py'
let ccxtpy = fs.readFileSync (ccxtpyFilename, 'utf8')
let ccxtpyParts = ccxtpy.split (/\_\_version\_\_ \= \'[^\']+\'/)
let ccxtpyNewContent = ccxtpyParts[0] + "__version__ = '" + config.version + "'" + ccxtpyParts[1]
fs.truncateSync (ccxtpyFilename)
fs.writeFileSync (ccxtpyFilename, ccxtpyNewContent)
console.log ('Done.')

//-----------------------------------------------------------------------------

console.log ('Single-sourcing version', version, './package.json → ./ccxt.js')
let ccxtjsFilename = './ccxt.js'
let ccxtjs = fs.readFileSync (ccxtjsFilename, 'utf8')
let ccxtjsParts = ccxtpy.split (/var version \= \'[^\']+\'/)
let ccxtjsNewContent = ccxtjsParts[0] + "__version__ = '" + config.version + "'" + ccxtjsParts[1]
fs.truncateSync (ccxtjsFilename)
fs.writeFileSync (ccxtjsFilename, ccxtjsNewContent)
console.log ('Done.')

//-----------------------------------------------------------------------------

console.log ('Version single-sourced successfully.')