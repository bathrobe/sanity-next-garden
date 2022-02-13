import groq from "groq";

export const graphQuery = groq`
  *[_type == "post"] {
    _id,
    title,
    "slug": slug.current,
    "backlinks": *[references(^._id)],
  }
`
