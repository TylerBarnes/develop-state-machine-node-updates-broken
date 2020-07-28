const d = require("./d")

const c = async (createNode, node) => {
  console.log(`c started`)
  await d(createNode, node)
  console.log(`c finished`)
}

module.exports = c
