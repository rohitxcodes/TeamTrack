export function MemberCard({ membership }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between gap-3">
      <div>
        <p className="font-medium text-slate-900">
          {membership?.user?.name || "Unnamed user"}
        </p>
        <p className="text-xs text-slate-500">
          {membership?.user?.email || "No email"}
        </p>
      </div>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
        {membership?.role || "MEMBER"}
      </span>
    </div>
  );
}

// PropTypes removed to avoid dependency on 'prop-types'
