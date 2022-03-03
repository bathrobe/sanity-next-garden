import groq from "groq";

export const graphQuery = groq`
  *[_type == "post"] {
    _id,
    title,
    "category": categorySet[0],
    "slug": slug.current,
    "backlinks": *[references(^._id)],
  }
`
