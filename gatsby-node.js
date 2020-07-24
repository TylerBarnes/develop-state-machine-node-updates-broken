/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.sourceNodes = async ({ actions, reporter, getNode }) => {
  const type = `OnlyOneNodeHere`

  const node = {
    id: `only-node`,
    title: `My first node's original title`,
    internal: {
      contentDigest: `yep`,
      type,
    },
  }
  await actions.createNode(node)

  setTimeout(() => {
    reporter.log(`-----------------------------`)
    reporter.log(`Starting interval node update`)
    reporter.log(`-----------------------------`)
    reporter.log(``)
    setInterval(() => {
      const time = Date.now()

      node.internal = {
        contentDigest: String(time),
        type,
      }

      const title = `My only node updated at ${time}`
      reporter.log(`👐\tUpdating node with title: "${title}"`)

      actions.createNode({
        ...node,
        title,
      })

      const updatedNode = getNode(`only-node`)

      console.log(`❌\tUpdated node title isn't updated: ${updatedNode.title}`)
      reporter.log(``)
    }, 3000)
  }, 6000)
}

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allOnlyOneNodeHere {
        nodes {
          id
          title
        }
      }
    }
  `)

  await Promise.all(
    data.allOnlyOneNodeHere.nodes.map(node =>
      actions.createPage({
        path: `/`,
        component: `${__dirname}/src/templates/page.js`,
        context: {
          id: node.id,
        },
      })
    )
  )
}
