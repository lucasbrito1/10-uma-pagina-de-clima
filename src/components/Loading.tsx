import { RefreshCw } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center gap-[0.625rem] font-[700] text-gray">
      <RefreshCw className="animate-spin" />
      Carregando dados...
    </div>
  );
}
