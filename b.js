const c = require("./c")

const b = async (createNode, node) => {
  console.log(`b started`)
  await c(createNode, node)
  console.log(`b finished`)
}

module.exports = b
