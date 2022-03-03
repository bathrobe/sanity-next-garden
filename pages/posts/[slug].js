import Link from "next/link";
import LinkedRefs from "../../components/LinkedRefs.jsx";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import { client } from "../../lib/sanity/client";
import urlFor from "../../lib/sanity/urlFor";
import { postQuery } from "../../lib/sanity/postQuery";
import Layout from "../../components/Layout.jsx";
import dayjs from "dayjs";
import Book from "../../components/Book.jsx"
import OGLink from "../../components/OGLink.jsx"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
export default function Post({ post }) {
  
  return (
    <Layout>
      <article className="max-w-container mx-auto">
        <h1 className="text-4xl font-serif">{post?.title}</h1>
        <p className="pt-6">
          {dayjs(post?.publishedAt).format("MMMM D, YYYY")}
        </p>
              <p className="py-2 text-gray-400 italic uppercase text-sm">{post?.category}</p>
        <hr className="pb-8 mt-2" />
        {post?.category === "link" ? <OGLink url={post?.relatedUrl}/> : ""}
        {post?.category === "book" ? <Book book={post?.book}/> : ""}
        {post?.body ? (
          <PortableText
            className="max-w-xl"
            value={post?.body}
            components={{
              list: {
                bullet: ({ children }) => <ul className="mt-xl ml-2">{children}</ul>,
                number: ({ children }) => <ol className="mt-lg ml-2">{children}</ol>,
              },
              types: {
                image: ({ value }) => <img src={value.imageUrl} />,
                code: ({ value }) => <SyntaxHighlighter language={value.language}>{value.code}</SyntaxHighlighter>,
              },
              marks: {
                internalLink: ({ children, value }) => (
                  <Link href={`/posts/${value.slug.current}`}>
                    <a className="text-blue-400 hover:underline">{children}</a>
                  </Link>
                ),
                link: ({ children, value }) => (
                  <a
                    className="text-pink-400 hover:underline"
                    target="_blank"
                    href={value.href}
                  >
                    {children}
                  </a>
                ),
              },

              // li: (props) => (<li className="pl-4 py-3">-{props.children}</li>),
              // code: (props) => "code here",
              // image: (props) => (<div className="pt-2 pb-6"><img src={urlFor(props?.asset).url()}/></div>
              //   ),
              // link: props => (<a className="text-pink-500 hover:underline" target="_blank"href={props?.href}>{props.children}</a>),
              // internalLink: (props) => (
              //   <Link href={`/posts/${props?.slug.current}`}>
              //     <a className="text-blue-400 hover:underline">{props?.children}</a>
              //   </Link>
              // ),
            }}
          />
        ) : (
          ""
        )}
        {post?.backlinks?.length > 0 ? (
          <LinkedRefs backlinks={post.backlinks} />
        ) : (
          ""
        )}
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
