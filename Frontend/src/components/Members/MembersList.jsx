import { MemberCard } from "./MemberCard";

export function MembersList({ members, loading, onRefresh, showRefresh }) {
  return (
    <div className="space-y-2">
      {showRefresh && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Members</h3>
          <button
            type="button"
            className="tt-btn-secondary text-sm"
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      )}
      {!showRefresh && (
        <h3 className="text-sm font-semibold text-slate-900">Members</h3>
      )}

      <div className="space-y-2 max-h-[28rem] overflow-auto pr-1">
        {members.length > 0 ? (
          members.map((membership) => (
            <MemberCard
              key={membership?._id || membership?.user?._id}
              membership={membership}
            />
          ))
        ) : (
          <p className="tt-muted text-sm">
            {loading ? "Loading members..." : "No members found."}
          </p>
        )}
      </div>
    </div>
  );
}

// PropTypes removed to avoid runtime dependency on 'prop-types'
