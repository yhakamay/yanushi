export default function VideoListSkelton() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <li className="flex flex-col" key={index}>
          <div className="skeleton aspect-video rounded-lg mb-4"></div>
          <div className="skeleton rounded-lg h-6 mb-1"></div>
          <div className="skeleton rounded-lg h-6 mb-2"></div>
          <div className="skeleton rounded-lg h-4 w-24 mb-2"></div>
        </li>
      ))}
    </ul>
  );
}
