"use client";

import Link from "next/link";
// import { formatDate } from "@/lib/utils";
// import { Eye, Clock } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "usehooks-ts";

function Me() {
  const [pulps] = useLocalStorage("pulps", []);

  if (!pulps.length) {
    return (
      <main className="flex h-[calc(100vh-4.6rem)] container items-center justify-center mx-auto px-4 py-6">
        <h1 className="text-2xl font-extrabold">no pulps created</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {pulps.map((pulp, index) => (
          <Link href={`/${pulp.id}`} key={index}>
            <Card className="hover:border-primary transition-colors duration-300">
              <CardHeader>
                {/* // justify-between tha yaha */}
                <CardTitle className="flex justify-center items-center">
                  <span className="text-xl font-extrabold truncate">
                    {pulp.id}
                  </span>
                  {/* <Badge className="text-sm">{pulp.language}</Badge> */}
                </CardTitle>
              </CardHeader>
              {/* <CardContent>
                <div className="flex items-center text-sm mb-2">
                  <Clock className="mr-2 h-4 w-4" />
                  {formatDate(pulp.createdAt)}
                </div>
                <div className="flex items-center text-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  {pulp.views} views
                </div>
              </CardContent> */}
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Me;
