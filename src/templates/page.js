import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => <h1>{data.onlyOneNodeHere.title}</h1>

export const pageQuery = graphql`
  {
    onlyOneNodeHere {
      title
    }
  }
`
