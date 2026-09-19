const stats = [
  { label: 'Total Revenue', value: '$128,450.00', trend: '+12.5%', direction: 'up', note: 'vs last 30 days', accent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/15 dark:text-emerald-400' },
  { label: 'Active Users', value: '12,480', trend: '+8.2%', direction: 'up', note: 'vs last 30 days', accent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/15 dark:text-emerald-400' },
  { label: 'Conversion Rate', value: '3.24%', trend: '-0.4%', direction: 'down', note: 'vs last 30 days', accent: 'text-rose-600 bg-rose-50 dark:bg-rose-500/15 dark:text-rose-400' },
]

const sources = [
  { label: 'Direct', pct: 40, bar: 'bg-sky-500' },
  { label: 'Organic Search', pct: 35, bar: 'bg-indigo-500' },
  { label: 'Social Media', pct: 15, bar: 'bg-emerald-500' },
  { label: 'Referral', pct: 10, bar: 'bg-amber-500' },
]

const orders = [
  { id: '#ORD-9842', customer: 'Jane Cooper', date: 'Sep 18, 2026', amount: '$240.00', status: 'Paid', tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' },
  { id: '#ORD-9841', customer: 'Cody Fisher', date: 'Sep 18, 2026', amount: '$85.50', status: 'Pending', tone: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400' },
  { id: '#ORD-9840', customer: 'Esther Howard', date: 'Sep 17, 2026', amount: '$1,200.00', status: 'Paid', tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' },
  { id: '#ORD-9839', customer: 'Robert Fox', date: 'Sep 17, 2026', amount: '$45.00', status: 'Failed', tone: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400' },
]

const card = 'rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800'

export default function Content() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">
            Welcome back, Alex — here is what is happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <span aria-hidden="true">📅</span> Last 30 Days
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            <span aria-hidden="true">📥</span> Export
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className={`${card} p-5`}>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-slate-400">{s.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${s.accent}`}>
              <svg
                className={`h-3.5 w-3.5 ${s.direction === 'down' ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 7-7 7 7M12 19V5" />
              </svg>
              {s.trend}
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-slate-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Revenue Analytics</h2>
            <div className="flex rounded-lg bg-gray-100 p-0.5 dark:bg-slate-700">
              <button type="button" className="rounded-md bg-white px-3 py-1 text-sm font-medium text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-300">
                7D
              </button>
              <button type="button" className="rounded-md px-3 py-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-slate-300 dark:hover:text-slate-100">
                30D
              </button>
            </div>
          </div>
          <div className="p-5">
            <svg className="h-40 w-full" viewBox="0 0 320 160" preserveAspectRatio="none" role="img" aria-label="Revenue trend going up over the past week">
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <g stroke="#e2e8f0" strokeDasharray="3 3">
                <line x1="0" y1="40" x2="320" y2="40" />
                <line x1="0" y1="80" x2="320" y2="80" />
                <line x1="0" y1="120" x2="320" y2="120" />
              </g>
              <path
                d="M0 128 46 104 92 112 137 74 183 92 229 52 274 66 320 40 L320 160 L0 160 Z"
                fill="url(#revFill)"
              />
              <polyline
                points="0,128 46,104 92,112 137,74 183,92 229,52 274,66 320,40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-2 flex justify-between text-xs text-gray-400 dark:text-slate-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="border-b border-gray-100 px-5 py-4 dark:border-slate-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Traffic Sources</h2>
          </div>
          <div className="space-y-4 p-5">
            {sources.map((src) => (
              <div key={src.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-slate-300">{src.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{src.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-gray-100 dark:bg-slate-700">
                  <div className={`h-2 rounded-full ${src.bar}`} style={{ width: `${src.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${card} mt-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-slate-700">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Filter
            </button>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Filter Status
              <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 dark:border-slate-700 dark:text-slate-500">
                <th scope="col" className="px-5 py-3 font-medium">Order ID</th>
                <th scope="col" className="px-5 py-3 font-medium">Customer</th>
                <th scope="col" className="px-5 py-3 font-medium">Date</th>
                <th scope="col" className="px-5 py-3 font-medium">Amount</th>
                <th scope="col" className="px-5 py-3 font-medium">Status</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/40">
                  <td className="px-5 py-3 font-medium text-indigo-600 dark:text-indigo-400">{o.id}</td>
                  <td className="px-5 py-3 text-gray-800 dark:text-slate-200">{o.customer}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-slate-400">{o.date}</td>
                  <td className="px-5 py-3 text-gray-800 dark:text-slate-200">{o.amount}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${o.tone}`}>{o.status}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      aria-label={`Actions for order ${o.id}`}
                      className="grid place-items-center rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <circle cx="5" cy="12" r="1.6" />
                        <circle cx="12" cy="12" r="1.6" />
                        <circle cx="19" cy="12" r="1.6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 dark:border-slate-700">
          <p className="text-sm text-gray-500 dark:text-slate-400">Showing 1 to 4 of 128 results</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
              disabled
            >
              &lt; Prev
            </button>
            <button type="button" className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white">1</button>
            <button type="button" className="rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700">2</button>
            <button type="button" className="rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700">3</button>
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}