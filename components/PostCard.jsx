import Link from "next/link"
import dayjs from "dayjs"
export default function PostCard({post}) {
  let statusEmoji = "";
  let status = "🌱"
  let categoryEmoji = "";
  switch (status) {
    case "seedling":
      statusEmoji = "🌱";
      break;
    case "herb":
      statusEmoji = "🌿";
      break;
    case "evergreen":
      statusEmoji = "🌲";
      break;
  }

  const { category } = post
    switch (category) {
    case "book":
      categoryEmoji = "📚";
      break;
    case "journal":
      categoryEmoji = "🗓️";
      break;
    case "note":
      categoryEmoji = "📜‍";
      break;
    case "code":
      categoryEmoji = "👨‍💻";
      break;
    case "link":
      categoryEmoji = "🔗";
      break;
  }

  return (
    <Link href={`/posts/${post.slug}`}>
    <a

      key={post.id}
      href="#"
      class="flex my-4 flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <p className="text-4xl pl-8">{categoryEmoji}</p>
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
 <span className="text-gray-600 text-base">{dayjs(post.publishedAt).format("MMMM D, YYYY")} / {post.category}</span>

      </div>
    </a>
    </Link>
  );
}
