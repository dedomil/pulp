"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCreatePulpMutation } from "@/services/mutations";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

export default function PastebinClone() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("txt");
  const [_, setPulps] = useLocalStorage("pulps", []);

  const router = useRouter();
  const mutation = useCreatePulpMutation();

  const handleSubmit = async () => {
    console.log({ title, content, language });
    await mutation.mutateAsync(
      { title, content, language },
      {
        onSuccess: ({ msg, ...data }) => {
          setPulps((previous) => [...previous, data]);
          router.push(data.id);
        },
        // todo: add error handling
      }
    );
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-6">
      <div className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          spellCheck={false}
          placeholder="enter a title for the pulp"
          className="text-xl py-6 text-primary/85 font-bold"
        />
        <Textarea
          value={content}
          rows={120}
          spellCheck={false}
          onChange={(e) => setContent(e.target.value)}
          placeholder="type or paste your code here..."
          className="h-[calc(100dvh-18.7rem)] sm:h-[calc(100dvh-15.2rem)] text-primary/85 w-full font-mono font-medium resize-none"
          required
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full sm:w-32 text-base font-bold">
              <SelectValue placeholder="select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>languages</SelectLabel> */}
                <SelectItem value="txt">plaintext</SelectItem>
                <SelectItem value="js">javascript</SelectItem>
                <SelectItem value="py">python</SelectItem>
                <SelectItem value="java">java</SelectItem>
                <SelectItem value="cs">c#</SelectItem>
                <SelectItem value="cpp">c++</SelectItem>
                <SelectItem value="php">php</SelectItem>
                <SelectItem value="rb">ruby</SelectItem>
                <SelectItem value="go">go</SelectItem>
                <SelectItem value="rs">rust</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full font-bold sm:w-auto text-base"
            disabled={!content}
          >
            create pulp
          </Button>
        </div>
      </div>
    </main>
  );
}
