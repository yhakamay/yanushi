export default function VideoListSkelton() {
  return (
    <ul className="flex flex-wrap gap-4 not-prose w-dvw animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <li className="h-48 w-80 bg-slate-400 rounded-lg" key={index}></li>
      ))}
    </ul>
  );
}
