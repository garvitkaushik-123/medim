import style from "./SortViews.module.css";

function SortViews({ displayPosts, setDisplayPosts }) {
  function handleClick(e) {
    e.preventDefault();
    console.log("fdsflkjdslkjflkdsjfldksfj");
    const updatedPosts = [...displayPosts];
    updatedPosts.sort(
      (postA, postB) => -postA.views.length + postB.views.length
    );
    console.log(updatedPosts);
    setDisplayPosts(updatedPosts);
  }
  return (
    <div className={style.ops} onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
        />
      </svg>

      <p>Sort By view</p>
    </div>
  );
}

export default SortViews;
