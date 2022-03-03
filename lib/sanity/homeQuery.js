import groq from "groq";

export const homeQuery = groq`
  *[_type == "post"] {
    _id,
    "category": categorySet[0],
    title,
    publishedAt,
    "slug": slug.current,
    "categories":   category[]->{title, slug},
    mainImage,
    body,
  }
`;
