/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const type = `OnlyOneNodeHere`

const node = {
  id: `only-node`,
  title: `My first node's original title`,
  internal: {
    contentDigest: `yep`,
    type,
  },
}

exports.sourceNodes = async ({ actions, reporter, getNode }) => {
  await actions.createNode(node)
}

exports.onCreateDevServer = async ({ actions, reporter, getNode }) => {
  reporter.log(`-----------------------------`)
  reporter.log(`Starting interval node update`)
  reporter.log(`-----------------------------`)
  reporter.log(``)
  let lastTitle
  setInterval(async () => {
    const time = Date.now()
    const title = `My only node updated at ${time}`

    const updatedNode = getNode(`only-node`)

    if (lastTitle) {
      const nodeTitleDidntUpdateSinceLastTime = lastTitle === updatedNode.title

      const logMessage = nodeTitleDidntUpdateSinceLastTime
        ? `❌\tUpdated node title isn't updated`
        : `✅\tUpdated node has an updated title`

      console.log(`${logMessage}: "${updatedNode.title}"`)
    }

    lastTitle = updatedNode.title

    const nodeToUpdateWith = {
      ...node,
      title,
      internal: {
        contentDigest: String(time),
        type,
      },
    }

    reporter.log(`👐\tUpdating node with title: "${title}"`)

    await actions.createNode(nodeToUpdateWith)
    reporter.log(``)
  }, 3000)
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
