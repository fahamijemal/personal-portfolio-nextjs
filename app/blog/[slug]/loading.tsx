export default function BlogPostLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-10 w-48 bg-muted rounded mb-8" />
        <div className="h-64 bg-muted rounded mb-8" />
        <div className="h-12 w-3/4 bg-muted rounded mb-4" />
        <div className="h-5 w-48 bg-muted rounded mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-4 w-full bg-muted rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
