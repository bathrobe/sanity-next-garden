import groq from "groq";

export const postQuery = groq`
  *[_type == "post"&& slug.current == $slug][0]{
    _id,
    title,
    "category": categorySet[0],
relatedUrl,
book,
"slug":slug.current,
    publishedAt,
    mainImage,
    "backlinks": *[references(^._id)],
    body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  }
  }
`;
