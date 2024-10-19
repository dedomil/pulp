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
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next-nprogress-bar";
import { Separator } from "@/components/ui/separator";
import Code from "@/components/Code";

export default function PastebinClone() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("txt");
  const [_, setPulps] = useLocalStorage("pulps", []);
  const [submit, setSubmit] = useState(false);

  const router = useRouter();
  const mutation = useCreatePulpMutation();

  const handleSubmit = async () => {
    console.log({ title, content, language });
    setSubmit(true);
    await mutation.mutateAsync(
      { title, content, language },
      {
        onSuccess: ({ msg, ...data }) => {
          setPulps((previous) => [...previous, data]);
          router.push(data.id);
        },
        onError: () => {
          setSubmit(false);
        },
        // todo: add error handling
      }
    );
  };

  return (
    // <main className="flex-grow container mx-auto px-4 py-6">
    //   <div className="space-y-4 border rounded-lg">
    //     <Input
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       spellCheck={false}
    //       placeholder="enter a title for the pulp"
    //       className="text-lg py-5 text-primary/85 font-bold border-none"
    //     />
    //     <Separator className="m-0" />
    //     <Textarea
    //       value={content}
    //       rows={120}
    //       spellCheck={false}
    //       onChange={(e) => setContent(e.target.value)}
    //       placeholder="type or paste your code here..."
    //       className="h-[calc(100dvh-18.7rem)] sm:h-[calc(100dvh-15.2rem)] text-primary/85 w-full font-mono resize-none border-none"
    //       required
    //     />
    //     <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
    //       <Select value={language} onValueChange={setLanguage}>
    //         <SelectTrigger className="w-full sm:w-32  font-bold">
    //           <SelectValue placeholder="select a language" />
    //         </SelectTrigger>
    //         <SelectContent>
    //           <SelectGroup>
    //             {/* <SelectLabel>languages</SelectLabel> */}
    //             <SelectItem value="txt">plaintext</SelectItem>
    //             <SelectItem value="js">javascript</SelectItem>
    //             <SelectItem value="py">python</SelectItem>
    //             <SelectItem value="java">java</SelectItem>
    //             <SelectItem value="cs">c#</SelectItem>
    //             <SelectItem value="cpp">c++</SelectItem>
    //             <SelectItem value="php">php</SelectItem>
    //             <SelectItem value="rb">ruby</SelectItem>
    //             <SelectItem value="go">go</SelectItem>
    //             <SelectItem value="rs">rust</SelectItem>
    //           </SelectGroup>
    //         </SelectContent>
    //       </Select>
    //       <Button
    //         type="submit"
    //         onClick={handleSubmit}
    //         className="w-full font-bold sm:w-auto"
    //         disabled={!content || submit}
    //       >
    //         create pulp
    //       </Button>
    //     </div>
    //   </div>
    // </main>

    <main className="flex-grow container mx-auto px-4 py-4">
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center space-x-2">
          <Input
            className="text-xl font-semibold text-primary/90 truncate border-none px-[2px] py-0 rounded-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            spellCheck={false}
            placeholder="untitled"
          />
        </div>
        <Code
          content={content}
          language={language}
          editable
          onChange={(value) => setContent(value)}
          className={"h-[calc(100dvh-15.85rem)]"}
        />
        <div className="p-4 border-t flex justify-center items-center text-sm space-x-3 text-muted-foreground">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full sm:w-32 font-bold">
              <SelectValue placeholder="select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
            className="w-full font-bold sm:w-auto"
            disabled={!content || submit}
          >
            create pulp
          </Button>
        </div>
      </div>
    </main>
  );
}
