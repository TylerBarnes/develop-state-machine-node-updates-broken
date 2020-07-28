const b = require("./b")

const a = async (createNode, node) => {
  console.log(`a started`)
  await b(createNode, node)
  console.log(`a finished`)
}

module.exports = a
