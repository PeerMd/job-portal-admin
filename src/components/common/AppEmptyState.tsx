import { Briefcase } from "lucide-react";

interface AppEmptyStateProps {
  message?: string;
}

const AppEmptyState = ({ message = "No data found" }: AppEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400 space-y-3">
      <Briefcase size={40} className="text-gray-300" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default AppEmptyState;
