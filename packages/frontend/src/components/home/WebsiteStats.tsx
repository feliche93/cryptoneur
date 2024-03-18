import {
  activeUsers,
  activeUsers30Days,
  averageSessionDuration30Days,
  runReport,
} from '@/lib/analytics'
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ClockIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

export const revalidate = 60 * 60 * 1 // 24 hours

export default async function WebsiteStats() {
  const [activeUsers30DaysData, activeUsersData, averageSessionDuration30DaysData] =
    await Promise.all([
      runReport(activeUsers30Days),
      runReport(activeUsers),
      runReport(averageSessionDuration30Days),
    ])

  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">
          Stats
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Website Traffic Development 📊
        </p>
      </div>
      <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-4 px-5 max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-lg p-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-center items-center space-x-2">
              <GlobeAltIcon className="h-5 w-5 text-secondary" />
              <h2>Website Visits</h2>
            </div>
            <p className="bg-base-300 rounded-full px-2 py-1 text-sm h-fit text-center">Lifetime</p>
          </div>
          <p className="font-bold text-4xl py-4">{activeUsersData[0]?.value}</p>
        </div>

        <div className="bg-base-100 rounded-lg p-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-center items-center space-x-2">
              <GlobeAltIcon className="h-5 w-5 text-secondary" />
              <h2>Website Visits</h2>
            </div>
            <p className="bg-base-300 rounded-full px-2 py-1 text-sm h-fit  text-center">
              Last 30 days
            </p>
          </div>
          <p className="font-bold text-4xl py-4">{activeUsers30DaysData[0]?.value}</p>
          {activeUsers30DaysData[2]?.value > 0 ? (
            <div className="flex flex-row space-x-2 items-center text-success">
              <ArrowUpCircleIcon className="h-5 w-5 " />
              <p>{`${activeUsers30DaysData[2]?.value.toFixed(1)} %`}</p>
            </div>
          ) : (
            <div className="flex flex-row space-x-2 items-center text-error">
              <ArrowDownCircleIcon className="h-5 w-5 " />
              <p>{`${activeUsers30DaysData[2]?.value.toFixed(1)} %`}</p>
            </div>
          )}
        </div>

        <div className="bg-base-100 rounded-lg p-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-center items-center space-x-2">
              <ClockIcon className="h-5 w-5 text-secondary" />
              <h2>Session Duration</h2>
            </div>
            <p className="bg-base-300 rounded-full px-2 py-1 text-sm h-fit  text-center">
              Last 30 days
            </p>
          </div>
          <p className="font-bold text-4xl py-4">
            {averageSessionDuration30DaysData[0]?.value}{' '}
            <span className=" font-normal text-base">seconds</span>
          </p>
          {averageSessionDuration30DaysData[2]?.value > 0 ? (
            <div className="flex flex-row space-x-2 items-center text-success">
              <ArrowUpCircleIcon className="h-5 w-5 " />
              <p>{`${averageSessionDuration30DaysData[2]?.value.toFixed(1)} %`}</p>
            </div>
          ) : (
            <div className="flex flex-row space-x-2 items-center text-error">
              <ArrowDownCircleIcon className="h-5 w-5 " />
              <p>{`${activeUsers30DaysData[2]?.value.toFixed(1)} %`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
