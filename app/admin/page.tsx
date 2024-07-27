
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Total Posts', value: '120', color: 'bg-blue-500' },
          { title: 'Total Users', value: '1,504', color: 'bg-green-500' },
          { title: 'New Comments', value: '23', color: 'bg-yellow-500' },
        ].map((card, index) => (
          <div key={index} className={`${card.color} rounded-lg shadow-md p-4 text-white`}>
            <h2 className="text-lg font-bold mb-2">{card.title}</h2>
            <p className="text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {[
            { action: 'New post published', user: 'John Doe', time: '2 hours ago' },
            { action: 'User registered', user: 'Jane Smith', time: '5 hours ago' },
            { action: 'Comment approved', user: 'Mike Johnson', time: 'Yesterday' },
          ].map((activity, index) => (
            <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2">
              <div>
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">by {activity.user}</p>
              </div>
              <span className="text-sm text-gray-500 mt-1 sm:mt-0">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/posts/new" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">Create New Post</h3>
          <p className="text-gray-600">Start writing a new blog post</p>
        </Link>
        <Link href="/admin/users" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-600">View and edit user accounts</p>
        </Link>
        <Link href="/admin/comments" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">Review Comments</h3>
          <p className="text-gray-600">Moderate recent comments</p>
        </Link>
      </div>
    </div>
  )
}