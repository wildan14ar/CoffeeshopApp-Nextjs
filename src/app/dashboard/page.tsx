export default function DashboardPage() {
    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Dashboard</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Total Users</h2>
                    <p className="text-3xl text-blue-600">1,230</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Total Products</h2>
                    <p className="text-3xl text-blue-600">320</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Total Orders</h2>
                    <p className="text-3xl text-blue-600">1,045</p>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Orders</h2>
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <th className="py-2 px-4 text-left">Order ID</th>
                            <th className="py-2 px-4 text-left">User</th>
                            <th className="py-2 px-4 text-left">Status</th>
                            <th className="py-2 px-4 text-left">Total</th>
                            <th className="py-2 px-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-600">
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">#001</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">John Doe</td>
                            <td className="py-2 px-4 text-green-600">Completed</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">$150.00</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">2024-09-27</td>
                        </tr>
                        <tr className="border-b dark:border-gray-600">
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">#002</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">Jane Smith</td>
                            <td className="py-2 px-4 text-yellow-600">Pending</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">$75.00</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">2024-09-26</td>
                        </tr>
                        <tr className="border-b dark:border-gray-600">
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">#003</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">Alice Johnson</td>
                            <td className="py-2 px-4 text-red-600">Canceled</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">$50.00</td>
                            <td className="py-2 px-4 text-gray-900 dark:text-gray-300">2024-09-25</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
