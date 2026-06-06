interface AppSkeletonProps {
  rows?: number;
}

const AppSkeleton = ({ rows = 5 }: AppSkeletonProps) => {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-10 bg-gray-100 animate-pulse rounded flex-1" />
          <div className="h-10 bg-gray-100 animate-pulse rounded w-24" />
          <div className="h-10 bg-gray-100 animate-pulse rounded w-24" />
          <div className="h-10 bg-gray-100 animate-pulse rounded w-16" />
        </div>
      ))}
    </div>
  );
};

export default AppSkeleton;
