"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { formatDate } from "@/lib/utils";
import { Eye, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockPastes = [
  {
    id: "1",
    language: "javascript",
    createdAt: "2023-06-10T12:00:00Z",
    views: 42,
  },
  {
    id: "2",
    title: "Python Data Analysis",
    language: "python",
    createdAt: "2023-06-09T15:30:00Z",
    views: 28,
  },
  {
    id: "3",
    title: "CSS Grid Layout",
    language: "css",
    createdAt: "2023-06-08T09:45:00Z",
    views: 35,
  },
  {
    id: "4",
    title: "SQL Query Optimization",
    language: "sql",
    createdAt: "2023-06-07T18:20:00Z",
    views: 19,
  },
  {
    id: "5",
    title: "Go Concurrency Patterns",
    language: "go",
    createdAt: "2023-06-06T11:10:00Z",
    views: 56,
  },
];

function Me() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {mockPastes.map((paste, index) => (
          <Link href={"/"} key={index}>
            <Card className="hover:border-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-xl font-extrabold truncate">
                    {paste.title ?? "Untitled"}
                  </span>
                  <Badge className="text-sm">{paste.language}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm mb-2">
                  <Clock className="mr-2 h-4 w-4" />
                  {formatDate(paste.createdAt)}
                </div>
                <div className="flex items-center text-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  {paste.views} views
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Me;
