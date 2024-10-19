"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

function getLanguage(extension) {
  switch (extension?.toLowerCase()) {
    case "js":
      return "javascript";
    case "jsx":
      return "jsx";
    case "ts":
      return "typescript";
    case "tsx":
      return "tsx";
    case "html":
      return "html";
    case "css":
      return "css";
    case "py":
      return "python";
    case "md":
      return "markdown";
    case "xml":
      return "xml";
    case "sql":
      return "sql";
    case "java":
      return "java";
    case "rs":
      return "rust";
    case "cpp":
    case "cc":
    case "cxx":
      return "cpp";
    case "php":
      return "php";
    case "go":
      return "go";
    case "sh":
    case "bash":
      return "shell";
    case "rb":
      return "ruby";
    case "swift":
      return "swift";
    case "yml":
    case "yaml":
      return "yaml";
    case "json":
      return "json";
    case "c":
      return "c";
    case "cs":
      return "csharp";
    case "scala":
      return "scala";
    case "kt":
      return "kotlin";
    case "dart":
      return "dart";
    default:
      return;
  }
}

export default function Code({
  content,
  language,
  editable = false,
  className,
  ...props
}) {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "p-4 overflow-x-auto bg-card text-primary/80 text-sm font-medium",
        className
      )}
    >
      <CodeMirror
        value={content}
        editable={editable}
        placeholder={"type or paste the text..."}
        autoFocus={true}
        basicSetup={{
          foldGutter: false,
          lineNumbers: false,
          highlightActiveLine: false,
        }}
        theme={theme == "light" ? githubLight : githubDark}
        {...(!getLanguage(language)
          ? { extensions: [] }
          : { extensions: [loadLanguage(getLanguage(language))] })}
        {...props}
      />
    </div>
  );
}
