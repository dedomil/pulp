"use client";

import { Clock } from "lucide-react";
import Code from "@/components/Code";
import { formatDate } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPulpQuery } from "@/services/queries";
import { ClipboardCopy, FileText, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PastebinView({ params }) {
  const { toast } = useToast();
  const { isError, isPending, data } = useGetPulpQuery(params.id);

  if (isPending) {
    return (
      <main className="flex h-[calc(100vh-4.6rem)] container items-center justify-center mx-auto px-4 py-6">
        <LoaderIcon className="h-16 w-16 text-primary/90 animate-spin" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex h-[calc(100vh-4.6rem)] container items-center justify-center mx-auto px-4 py-6">
        <h1 className="text-2xl font-extrabold">pulp not found</h1>
      </main>
    );
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(data.content);
      toast({
        title: "copied to clipboard",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "clipboard api not available",
      });
    }
  }

  async function handleRaw() {}

  return (
    <main className="flex-grow container mx-auto px-4 py-6">
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <span className="text-xl font-bold text-primary/85 truncate">
            {data.title || "untitled"}
          </span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <ClipboardCopy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRaw}>
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Code content={data.content} language={data.language} />
        <div className="p-4 border-t flex justify-between items-center text-sm text-muted-foreground">
          <span className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {formatDate(data.createdAt)}
          </span>
          <span className="flex items-center">
            <Eye className="mr-1 h-4 w-4" />
            {data.views} views
          </span>
        </div>
      </div>
    </main>
  );
}
