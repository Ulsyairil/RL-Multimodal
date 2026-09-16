export default function Content({ pad = true }) {
  return (
    <main>
      <section className="border-b border-gray-200 bg-slate-50">
        <div className={`mx-auto max-w-7xl px-4 ${pad ? 'py-14' : 'pb-14'}`}>
          <h1 className={pad ? 'mt-2 text-3xl font-extrabold text-gray-900' : 'mt-0 text-3xl font-extrabold text-gray-900'}>
            Welcome to your workspace
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            This heading and the paragraphs that follow must never sit underneath
            the fixed navigation bar. The selected fix offsets page content below
            the header and constrains the navbar's height and stacking level so
            nothing collides at any viewport width.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-xl font-bold text-gray-900">Recent projects</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Model training pipeline', 'Monitor re-runs, eval metrics, and data drift across team experiments.'],
            ['Label validation setup', 'Configure review queues and reconcile disagreements before release.'],
            ['Deployment dashboard', 'Track rollout health, traffic shifts, and rollback triggers in real time.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="text-xl font-bold text-gray-900">Documentation</h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          Long-form reference content lives here. Scroll this page and confirm the
          header stays pinned to the top, the mobile menu appears below the
          small-screen breakpoint, and no horizontal scrolling creeps in from long
          labels in the bar.
        </p>
      </section>
    </main>
  )
}