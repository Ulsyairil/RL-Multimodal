export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">Training Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Active reinforcement learning runs across multimodal pipelines.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active runs', value: '12', delta: '+3 today' },
          { label: 'Queued jobs', value: '847', delta: '23% utilization' },
          { label: 'Avg reward', value: '0.87', delta: '+0.02 since last sync' },
          { label: 'Data throughput', value: '14.2k', delta: 'samples/min' },
        ].map((stat) => (
          <article key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="mt-0.5 text-xs text-emerald-600">{stat.delta}</p>
          </article>
        ))}
      </div>

      <section className="mt-8">
        <h3 className="text-sm font-semibold text-gray-900">Recent Training Runs</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500">
                <th className="pb-2 pr-4 font-medium">Run ID</th>
                <th className="pb-2 pr-4 font-medium">Pipeline</th>
                <th className="pb-2 pr-4 font-medium">Status</th>
                <th className="pb-2 pr-4 font-medium">Reward</th>
                <th className="pb-2 font-medium">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ['run-0482', 'Vision-Language RL', 'Running', '0.91', '4h 12m'],
                ['run-0481', 'Object Detection', 'Completed', '0.88', '2h 05m'],
                ['run-0480', 'Audio Captioning', 'Running', '0.83', '6h 41m'],
                ['run-0479', 'Reward Model Sweep', 'Failed', '0.62', '0h 18m'],
                ['run-0478', 'Policy Optimization', 'Completed', '0.94', '3h 33m'],
                ['run-0477', 'Multimodal Fusion', 'Running', '0.86', '5h 09m'],
                ['run-0476', 'Human Preference Ranking', 'Queued', '—', '—'],
                ['run-0475', 'Confidence Calibration', 'Completed', '0.89', '1h 47m'],
              ].map(([id, pipeline, status, reward, duration]) => (
                <tr key={id} className="text-gray-700">
                  <td className="whitespace-nowrap py-2.5 pr-4 font-mono text-xs">{id}</td>
                  <td className="py-2.5 pr-4">{pipeline}</td>
                  <td className="py-2.5 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      status === 'Running' ? 'bg-emerald-50 text-emerald-700' :
                      status === 'Completed' ? 'bg-blue-50 text-blue-700' :
                      status === 'Failed' ? 'bg-red-50 text-red-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-2.5 pr-4 font-mono text-xs">{reward}</td>
                  <td className="whitespace-nowrap py-2.5 text-gray-500">{duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}