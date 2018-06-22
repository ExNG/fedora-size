const axios = require('axios')
const filesize = require('filesize')
const url = 'https://dl.fedoraproject.org/pub/DIRECTORY_SIZES.txt'

axios.get(url)
  .then((response) => {
    let file = response.data
    let lines = file.split('\n')
    let sizes = []

    for (let line of lines) {
      if (!line) continue

      let size = line.match(/[0-9a-zA-Z\.]*[^\ \t]/)[0]
      let lchar = size[size.length - 1]
      let num = parseFloat(size.replace(lchar, ''))

      if (lchar === 'T') num *= 1000 * 1000 * 1000 * 1000
      if (lchar === 'G') num *= 1000 * 1000 * 1000
      if (lchar === 'M') num *= 1000 * 1000
      if (lchar === 'K') num *= 1000
      if (lchar === 'B') num = num

      num = parseInt(num)
      sizes.push(num)
    }

    let sum = 0
    for (let unit of sizes) {
      sum += unit
    }
    console.log(filesize(sum))
  })
