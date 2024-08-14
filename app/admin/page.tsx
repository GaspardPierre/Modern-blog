import Link from 'next/link'
import { getPostCount, getUserCount, getNewCommentCount, getRecentActivities, getMostCommentedPosts } from '@/lib/adminStats'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminDashboard() {
  const postCount = await getPostCount();
  const userCount = await getUserCount();
  const newCommentCount = await getNewCommentCount();
  const recentActivities = await getRecentActivities();
  const mostCommentedPosts = await getMostCommentedPosts();

  const cards = [
    { title: 'Total Posts', value: postCount.toString(), color: 'bg-primary-500' },
    { title: 'Total Users', value: userCount.toString(), color: 'bg-secondary-500' },
    { title: 'New Comments', value: newCommentCount.toString(), color: 'bg-accent-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card key={index} className={`${card.color} text-white`}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-2">
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">by {activity.user}</p>
                </div>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">{activity.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most Commented Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {mostCommentedPosts.map((post, index) => (
              <li key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="font-medium text-gray-800">{post.title}</p>
                  <span className="text-sm text-gray-500">{post.commentCount} comments</span>
                </div>
                <Link href={`/admin/posts/edit/${post.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: "/admin/posts/new", title: "Create New Post", description: "Start writing a new blog post" },
          { href: "/admin/posts", title: "Manage Posts", description: "View and edit all blog posts" },
          { href: "/admin/users", title: "Manage Users", description: "View and edit user accounts" },
          { href: "/admin/comments", title: "Review Comments", description: "Moderate recent comments" },
        ].map((item, index) => (
          <Link key={index} href={item.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}