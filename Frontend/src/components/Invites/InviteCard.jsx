export function PendingInviteCard({ invite, onAccept, onReject }) {
  return (
    <article className="rounded-xl border border-slate-200 p-4 space-y-3">
      <div>
        <p className="font-semibold text-slate-900">
          {invite?.group?.name || "Group invitation"}
        </p>
        <p className="text-sm text-slate-600">{invite?.email}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="tt-btn-primary text-sm"
          onClick={() => onAccept?.(invite._id)}
        >
          Accept
        </button>
        <button
          type="button"
          className="tt-btn-secondary text-sm"
          onClick={() => onReject?.(invite._id)}
        >
          Reject
        </button>
      </div>
    </article>
  );
}

export function AcceptedInviteCard({ invite }) {
  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <p className="font-semibold text-slate-900">
        {invite?.group?.name || "Group invitation"}
      </p>
      <p className="text-sm text-slate-600">{invite?.email}</p>
      <p className="mt-2 text-xs text-emerald-700 uppercase tracking-[0.12em] font-semibold">
        Accepted
      </p>
    </article>
  );
}

// PropTypes declarations removed to avoid dependency on 'prop-types'
