
import urlFor from "../lib/sanity/urlFor";
const Book = ({book}) => {
  return (
    <div className="">
     <img src={urlFor(book.image).url()}/> 
      <h2 className="font-serif text-2xl py-4 font-medium"><a href={book.url}>{book.title}</a></h2>
    </div>
  )
}

export default Book
