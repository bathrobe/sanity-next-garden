import Link from "next/link";
import { client } from "../lib/sanity/client";
import Layout from "../components/Layout.jsx"
import { homeQuery } from "../lib/sanity/homeQuery";
import Intro from "../components/Intro.jsx"
import dayjs from "dayjs"
import PostCard from "../components/PostCard.jsx"
export default function Home({ posts }) {
  return (
    <Layout>
    <div className="max-w-container mx-auto">
      <main>
      <Intro />
        <hr className="py-4"/>
        <ul>
          {posts.map((p) => (
            <PostCard post={p}/>
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
