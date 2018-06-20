const fs = require('fs')
      path = require('path')
      os = require('os')

var path = path.join(__dirname, 'fedora_space.txt')
var file = String(fs.readFileSync(path)).split('\n')
var size = []

for (let line of file) {
  let match = line.match(/[^\ \	]*/)[0]
  if (match) size.push(match)
}

let all = 0.0
for (let unit of size) {
  let lchar = unit[unit.length - 1]
  let num = parseFloat(unit.replace(lchar, ''))

  if (lchar === 'T') num = num
  if (lchar === 'G') num = num / 1024
  if (lchar === 'M') num = num / 1024 / 1024
  if (lchar === 'K') num = num / 1024 / 1024 / 1024
  all += num
}
console.log(all.toFixed(2), 'TB')
