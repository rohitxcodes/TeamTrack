async function inviteUserToGroupService({ groupId, email, invitedBy }) {
  // TODO: implement core invite flow.
  // Steps: validate existing membership, validate pending invite, create invite.
  throw new Error("TODO: implement inviteUserToGroupService");
}

async function getMyInvitationsService({ email }) {
  // TODO: implement pending invites query with group populate.
  throw new Error("TODO: implement getMyInvitationsService");
}

async function acceptInvitationService({ inviteId, user }) {
  // TODO: implement accept flow.
  // Steps: validate invitation, create membership, update invitation status.
  throw new Error("TODO: implement acceptInvitationService");
}

async function rejectInvitationService({ inviteId, user }) {
  // TODO: implement reject flow.
  // Steps: validate invitation ownership, mark invitation REJECTED.
  throw new Error("TODO: implement rejectInvitationService");
}

async function cancelInvitationService({ inviteId, user }) {
  // TODO: implement cancel flow.
  // Steps: find invitation, verify inviter/admin privileges, cancel/delete invitation.
  throw new Error("TODO: implement cancelInvitationService");
}

module.exports = {
  inviteUserToGroupService,
  getMyInvitationsService,
  acceptInvitationService,
  rejectInvitationService,
  cancelInvitationService,
};
