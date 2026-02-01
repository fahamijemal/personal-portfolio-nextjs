import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, MessageSquare, Eye } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: projectsCount },
    { count: postsCount },
    { count: messagesCount },
    { count: unreadCount },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false),
  ]);

  const stats = [
    {
      title: "Total Projects",
      value: projectsCount || 0,
      icon: FolderKanban,
      color: "text-blue-500",
    },
    {
      title: "Blog Posts",
      value: postsCount || 0,
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Messages",
      value: messagesCount || 0,
      icon: MessageSquare,
      color: "text-orange-500",
    },
    {
      title: "Unread Messages",
      value: unreadCount || 0,
      icon: Eye,
      color: "text-red-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/projects"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
            >
              Add New Project
            </a>
            <a
              href="/admin/blog"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
            >
              Write Blog Post
            </a>
            <a
              href="/admin/messages"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
            >
              View Messages
            </a>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Welcome Back!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage your portfolio content from this dashboard. You can add new
              projects, write blog posts, view contact messages, and update site
              settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
