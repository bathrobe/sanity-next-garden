import Link from "next/link";
import { client } from "../lib/sanity/client";
import Layout from "../components/Layout.jsx"
import { homeQuery } from "../lib/sanity/homeQuery";
import Intro from "../components/Intro.jsx"
export default function Home({ posts }) {
  return (
    <Layout>
    <div className="max-w-container mx-auto">
      <main>
      <Intro />
        <hr className="py-4"/>
        <ul>
          {posts.map((p) => (
            <li className="py-4 text-xl hover:underline" key={p._id}>
              <Link href={`/posts/${p.slug}`}>
                <a className="py-8" >{p.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const posts = await client.fetch(homeQuery);

  return {
    props: {
      posts,
    },
  };
}
