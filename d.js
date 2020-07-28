const d = async (createNode, node) => {
  console.log(`d started`)
  await createNode(node)
  console.log(`d successfully awaited createNode`)
}

module.exports = d
