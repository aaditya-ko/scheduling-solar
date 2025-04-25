export default function TeamPage() {
  // Sample team data
  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      role: "Installation Lead",
      email: "john.smith@midwestsolar.com",
      phone: "(555) 123-4567",
      projects: 42,
      avgInstallTime: "9.5 hours",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Senior Installer",
      email: "sarah.johnson@midwestsolar.com",
      phone: "(555) 234-5678",
      projects: 38,
      avgInstallTime: "10.2 hours",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Installer",
      email: "michael.brown@midwestsolar.com",
      phone: "(555) 345-6789",
      projects: 27,
      avgInstallTime: "11.8 hours",
    },
    {
      id: 4,
      name: "Jessica Davis",
      role: "Installer",
      email: "jessica.davis@midwestsolar.com",
      phone: "(555) 456-7890",
      projects: 31,
      avgInstallTime: "10.9 hours",
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Junior Installer",
      email: "david.wilson@midwestsolar.com",
      phone: "(555) 567-8901",
      projects: 18,
      avgInstallTime: "12.5 hours",
    },
  ]

  // Sample team performance data
  const teamPerformance = [
    { month: "January", installations: 12, avgTime: "10.8 hours" },
    { month: "February", installations: 15, avgTime: "10.5 hours" },
    { month: "March", installations: 18, avgTime: "10.2 hours" },
    { month: "April", installations: 16, avgTime: "10.0 hours" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Installation Team</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Projects
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Avg. Install Time
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
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{member.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.email}</div>
                    <div className="text-sm text-gray-500">{member.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.projects}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.avgInstallTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Team Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Month
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Installations Completed
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Average Installation Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamPerformance.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.installations}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
