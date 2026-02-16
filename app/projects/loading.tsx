export default function ProjectsLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-10 w-40 bg-muted rounded mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className=" rounded-lg border border-border p-6 space-y-4">
              <div className="h-6 w-2/3 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-4/5 bg-muted rounded" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-muted rounded" />
                <div className="h-6 w-20 bg-muted rounded" />
                <div className="h-6 w-14 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
