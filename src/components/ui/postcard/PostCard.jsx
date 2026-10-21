import { Link } from "react-router";
import postService from "../../../appwrite/post";

function PostCard({ $id, title, description, featuredImage }) {
  const imageUrl = featuredImage ? postService.previewFile(featuredImage) : null;

  return (
    <Link
      to={`/post/${$id}`}
      className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article className="relative isolate aspect-[3/2] w-full overflow-hidden rounded-2xl border border-border bg-[#0d0d0f] shadow-sm transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0">

        {/* Image layer: oversized by 1px to hide edge seams, zoom lives here */}
        <div className="absolute inset-0 overflow-hidden">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              decoding="async"
              className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] max-w-none object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
            />
          )}
        </div>

        {/* Vignette: edge darkening plus eased bottom fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.7)_28%,rgba(0,0,0,0.3)_56%,transparent_82%)] transition-opacity duration-500 group-hover:opacity-90"
        />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5 sm:p-7">
          <span
            aria-hidden="true"
            className="h-0.5 w-10 origin-left scale-x-50 rounded-full bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
          />
          <h2 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-2xl">
            {title}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-white/75 drop-shadow sm:text-base">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;