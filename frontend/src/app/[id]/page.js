"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import Code from "@/components/Code";
import { formatDate } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetPulpQuery } from "@/services/queries";
import { useLocalStorage, useDebounceCallback } from "usehooks-ts";
import { Copy, Trash2, FileText, Eye } from "lucide-react";
import {
  useDeletePulpMutation,
  useUpdatePulpMutation,
} from "@/services/mutations";
import { useRouter } from "next-nprogress-bar";

export default function Page({ params }) {
  const { toast } = useToast();
  const router = useRouter();

  const [pulps] = useLocalStorage("pulps", []);
  const [creatorPulpData] = pulps.filter((e) => e.id == params.id);

  const { isError, isPending, data } = useGetPulpQuery(params.id);

  const [title, setTitle] = useState(data?.title);
  const updateMutation = useUpdatePulpMutation();
  const deleteMutation = useDeletePulpMutation();

  const updatePulp = useDebounceCallback(async ({ name, value }) => {
    await updateMutation.mutateAsync(
      { ...creatorPulpData, [name]: value },
      {
        onSuccess: () => {
          toast({
            title: "updated successfully",
          });
        },
        onError: (e) => {
          if (e.response.data.error.name == "ZodError") {
            toast({
              variant: "destructive",
              title: e.response.data.error.issues
                .map((i) => i.message)
                .join("\n"),
            });
          }
        },
      }
    );
  }, 1000);

  function updateTitle(value) {
    updatePulp({ name: "title", value });
    setTitle(value);
  }

  async function deletePulp() {
    console.log(creatorPulpData);
    deleteMutation.mutateAsync(creatorPulpData, {
      onSuccess: () => {
        toast({
          title: "deleted successfully",
        });
        router.push("/");
      },
      onError: (e) => {
        if (e.response.data.error.name == "ZodError") {
          toast({
            variant: "destructive",
            title: e.response.data.error.issues
              .map((i) => i.message)
              .join("\n"),
          });
        }
      },
    });
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

  async function handleRaw() {
    window.open(`https://pulp.dedomil.workers.dev/${params.id}?raw`);
  }

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

  return (
    <main className="flex-grow container mx-auto px-4 py-4">
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center space-x-2">
          <Input
            className="text-xl font-semibold text-primary/90 truncate border-none px-[2px] py-0"
            spellCheck="false"
            value={title || data.title}
            placeholder={"untitled"}
            disabled={!creatorPulpData}
            onChange={(e) => updateTitle(e.target.value)}
          />
          <div className="flex space-x-2">
            {creatorPulpData && (
              <Button variant="destructive" size="sm" onClick={deletePulp}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleRaw}>
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Code
          content={data.content}
          language={data.language}
          editable={creatorPulpData}
          onChange={(value) => updatePulp({ name: "content", value })}
          className={"h-[calc(100dvh-14.6rem)]"}
        />
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
