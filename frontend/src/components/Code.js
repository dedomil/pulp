"use client";

export default function Code({ content }) {
  return (
    <pre className="h-[calc(100dvh-15.35rem)] p-4 overflow-x-auto bg-card text-primary/80 text-sm font-mono font-semibold">
      <code>{content}</code>
    </pre>
  );
}
