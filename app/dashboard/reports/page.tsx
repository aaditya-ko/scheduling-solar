export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Monthly Performance Report */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Monthly Performance</h2>
          <p className="text-gray-500 mb-4">Summary of installation times vs. predictions for the current month</p>
          <div className="h-40 bg-gray-100 rounded flex items-center justify-center mb-4">
            <span className="text-gray-400">Chart Placeholder</span>
          </div>
          <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View Report
          </button>
        </div>

        {/* Efficiency Analysis */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Efficiency Analysis</h2>
          <p className="text-gray-500 mb-4">Analysis of factors affecting installation efficiency</p>
          <div className="h-40 bg-gray-100 rounded flex items-center justify-center mb-4">
            <span className="text-gray-400">Chart Placeholder</span>
          </div>
          <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View Report
          </button>
        </div>

        {/* Team Performance */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Team Performance</h2>
          <p className="text-gray-500 mb-4">Comparison of installation times by team</p>
          <div className="h-40 bg-gray-100 rounded flex items-center justify-center mb-4">
            <span className="text-gray-400">Chart Placeholder</span>
          </div>
          <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View Report
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Report Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Generated Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Q1 2025 Performance Summary
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-01</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Quarterly</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                  <button className="text-blue-600 hover:text-blue-900">Download</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  March 2025 Installation Analysis
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-03-31</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                  <button className="text-blue-600 hover:text-blue-900">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
