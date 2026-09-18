export default function Content({ pad = true }) {
  return (
    <>
      <section className="border-b border-gray-200 bg-slate-50">
        <div className={`mx-auto max-w-7xl px-4 ${pad ? 'py-14' : 'pb-14'}`}>
          <h1 className={`text-2xl font-bold ${pad ? 'mt-2' : 'mt-0'} text-gray-900`}>
            Projects
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            This fixed version constrains the sidebar to one viewport height.
            The header and footer stay pinned while only the navigation list
            scrolls, long labels wrap instead of forcing a horizontal
            scrollbar, and on small screens the sidebar becomes a closable
            overlay.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Objects pipeline', '12,400 items labeled, 3 in review.'],
            ['Scenes at dusk', '8,210 items labeled, 22 flagged.'],
            ['Packaging QA', '4,025 items labeled, 0 in review.'],
            ['Retail shelf stock', '2,910 items labeled, 11 in review.'],
            ['Aerial parcel scans', '6,030 items labeled, 4 in review.'],
            ['Document OCR pass', '9,872 items labeled, 40 in review.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">{title}</h2>
              <p className="mt-1 text-sm text-gray-600">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}