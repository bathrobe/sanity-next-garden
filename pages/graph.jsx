import Link from "next/link";
import Graph from "react-graph-network";
import Layout from "../components/Layout.jsx";
import { client } from "../lib/sanity/client.js";
import { graphQuery } from "../lib/sanity/graphQuery.js";

const makeNodes = (posts) => {
  const postNodes = posts?.map((post) => {
    let nodeObject = {
      id: post._id,
      title: post.title,
      slug: post.slug,
      type: post.category,
    };
    return nodeObject;
  });
  return postNodes;
};

const makeEdges = (posts) => {
  let edges = [];
  posts.map((post) => {
    return post.backlinks.map((backlink) => {
      edges.push({ source: backlink._id, target: post._id });
    });
  });
  return edges;
};

const Node = ({ node }) => {
  let color = "black";
  let categoryEmoji = "";
  switch (node.type) {
    case "link":
      color = "cyan";
      categoryEmoji = "🔗";
      break;
    case "book":
      color = "pink";
      categoryEmoji = "📚";
      break;
    case "note":
      color = "lightgreen";
      categoryEmoji = "📜‍";
      break;
    case "journal":
      color = "purple";
      categoryEmoji = "🗓️";
      break;
    case "code":
      color = "orange";
      categoryEmoji = "👨‍💻";
      break;
  }

  return (
    <>
  <defs>
    <linearGradient id="code" gradientTransform="rotate(90)">
      <stop offset="5%"  stop-color="orange" />
      <stop offset="95%" stop-color="red" />
    </linearGradient>
    <linearGradient id="journal" gradientTransform="rotate(90)">
      <stop offset="5%"  stop-color="purple" />
      <stop offset="95%" stop-color="pink" />
    </linearGradient>
    <linearGradient id="note" gradientTransform="rotate(90)">
      <stop offset="5%"  stop-color="lightgreen" />
      <stop offset="95%" stop-color="darkgreen" />
    </linearGradient>
    <linearGradient id="book" gradientTransform="rotate(90)">
      <stop offset="5%"  stop-color="yellow" />
      <stop offset="95%" stop-color="pink" />
    </linearGradient>
    <linearGradient id="link" gradientTransform="rotate(90)">
      <stop offset="5%"  stop-color="teal" />
      <stop offset="95%" stop-color="cyan" />
    </linearGradient>
  </defs>
      <Link href={`/posts/${node.slug}`}>
        <a className="hover:text-blue-300">
          <circle r={30} fill={`url('#${node.type}')`} ></circle>
          <text className="text-sm font-medium" x="-40" y="55">
    {categoryEmoji + node.title.slice(0,18) + "..."}
          </text>
        </a>
      </Link>
    </>
  );
};

const GraphPage = ({ posts }) => {
  const nodes = makeNodes(posts);
  const edges = makeEdges(posts);
  const data = {
    nodes: nodes,
    links: edges,
  };
  return (
    <Layout>
      <div>
        <div style={{ width: "100vw", height: "100vh" }}>
          <Graph
            data={data}
            id="graph"
            nodeDistance={5250}
            NodeComponent={Node}
            pullIn={true}
            enableDrag={true}
            hoverOpacity={0.6}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GraphPage;

export async function getStaticProps({ params }) {
  const posts = await client.fetch(graphQuery);

  return {
    props: {
      posts,
    },
  };
}
