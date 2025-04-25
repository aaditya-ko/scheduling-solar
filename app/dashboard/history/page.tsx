export default function HistoryPage() {
  // Sample history data
  const historyItems = [
    {
      id: 1,
      date: "2025-04-15",
      address: "123 Main St, Anytown, IL",
      estimatedTime: "10 Hours, 30 Minutes",
      actualTime: "11 Hours, 15 Minutes",
      parameters: {
        driveTime: 45,
        numEmployees: 3,
        roofAzimuth: 180,
        roofPitch: 30,
        numSolarPanels: 24,
        inclementWeather: false,
      },
    },
    {
      id: 2,
      date: "2025-04-12",
      address: "456 Oak Ave, Springfield, IL",
      estimatedTime: "8 Hours, 15 Minutes",
      actualTime: "8 Hours, 45 Minutes",
      parameters: {
        driveTime: 30,
        numEmployees: 4,
        roofAzimuth: 165,
        roofPitch: 25,
        numSolarPanels: 18,
        inclementWeather: false,
      },
    },
    {
      id: 3,
      date: "2025-04-08",
      address: "789 Pine Rd, Chicago, IL",
      estimatedTime: "12 Hours, 45 Minutes",
      actualTime: "13 Hours, 30 Minutes",
      parameters: {
        driveTime: 60,
        numEmployees: 3,
        roofAzimuth: 190,
        roofPitch: 35,
        numSolarPanels: 32,
        inclementWeather: true,
      },
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Installation History</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estimated Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actual Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Difference
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyItems.map((item) => {
                // Calculate time difference
                const estimatedHours = Number.parseInt(item.estimatedTime.split(" ")[0])
                const estimatedMinutes = Number.parseInt(item.estimatedTime.split(" ")[2])
                const actualHours = Number.parseInt(item.actualTime.split(" ")[0])
                const actualMinutes = Number.parseInt(item.actualTime.split(" ")[2])

                const estimatedTotalMinutes = estimatedHours * 60 + estimatedMinutes
                const actualTotalMinutes = actualHours * 60 + actualMinutes
                const diffMinutes = actualTotalMinutes - estimatedTotalMinutes

                const diffHours = Math.floor(Math.abs(diffMinutes) / 60)
                const diffRemainingMinutes = Math.abs(diffMinutes) % 60
                const diffText = `${diffMinutes >= 0 ? "+" : "-"} ${diffHours}h ${diffRemainingMinutes}m`

                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.estimatedTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.actualTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={diffMinutes > 0 ? "text-red-500" : "text-green-500"}>{diffText}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
