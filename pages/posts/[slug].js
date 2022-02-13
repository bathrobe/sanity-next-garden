import Link from "next/link";
import LinkedRefs from "../../components/LinkedRefs.jsx";
import groq from "groq";
import PortableText from "react-portable-text";
import { client } from "../../lib/sanity/client";
import urlFor from "../../lib/sanity/urlFor";
import { postQuery } from "../../lib/sanity/postQuery";
import Layout from "../../components/Layout.jsx"
import dayjs from "dayjs"
export default function Post({ post }) {
  return (
    <Layout>
    <article className="max-w-container mx-auto">
      <h1 className="text-4xl font-serif">{post?.title}</h1>
      <p className="pt-6">{dayjs(post?.publishedAt).format("MMMM D, YYYY")}</p>
      <hr className="pb-8 mt-2"/>
        {post?.body ? <PortableText
        className="max-w-xl"
        content={post?.body}
        serializers={{
          li: (props) => (<li className="pl-4 py-3">-{props.children}</li>),
          image: (props) => (<div className="pt-2 pb-6"><img src={urlFor(props?.asset).url()}/></div> 
            ),
          link: props => (<a className="text-pink-500 hover:underline" target="_blank"href={props?.href}>{props.children}</a>),
          internalLink: (props) => (
            <Link href={`/posts/${props?.slug.current}`}>
              <a className="text-blue-400 hover:underline">{props?.children}</a>
            </Link>
          ),
        }}
      /> : "" }
  {post?.backlinks?.length > 0 ? <LinkedRefs backlinks={post.backlinks} /> : ""}
    </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  let slug;
  const post = await client.fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
