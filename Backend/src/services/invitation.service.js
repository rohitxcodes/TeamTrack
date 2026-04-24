const Invitation = require("../models/Invitation.model");
const Membership = require("../models/Membership.model");
async function inviteUserToGroupService({ groupId, email, invitedBy }) {
  try {
    if (!groupId || !email || !invitedBy) {
      throw new Error("Something is missing");
    }
    const invite = await Invitation.create({
      email: email,
      invitedBy: invitedBy,
      group: groupId,
    });
    return invite;
  } catch (err) {
    console.error("error is :", err);
    throw new Error("error in making invitation");
  }
}

async function getMyInvitationsService({ email }) {
  // TODO: implement pending invites query with group populate.
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const invitation = await Invitation.find({ email });
    console.log(invitation);
    return invitation;
  } catch (err) {
    console.error("error is :", err);
    throw new Error("error in fetching invitations");
  }
}

async function acceptInvitationService({ inviteId, user }) {
  if (!inviteId || !user) throw new Error("invalid inviteId or user");
  try {
    const accept = await Invitation.findById(inviteId);
    if (!accept) {
      throw new Error("Invitation not found");
    }

    const existingMembership = await Membership.findOne({
      user: user._id,
      group: accept.group,
    });

    if (accept.status === "ACCEPTED") {
      if (existingMembership) {
        if (existingMembership.status !== "ACTIVE") {
          existingMembership.status = "ACTIVE";
          await existingMembership.save();
        }
        return { membership: existingMembership, invitation: accept };
      }

      const recoveredMembership = await Membership.create({
        user: user._id,
        group: accept.group,
        role: "MEMBER",
        status: "ACTIVE",
      });
      return { membership: recoveredMembership, invitation: accept };
    }

    if (accept.status !== "PENDING") {
      throw new Error("Invitation is not pending");
    }

    const member =
      existingMembership ||
      (await Membership.create({
        user: user._id,
        group: accept.group,
        role: "MEMBER",
        status: "ACTIVE",
      }));

    if (member.status !== "ACTIVE") {
      member.status = "ACTIVE";
      await member.save();
    }

    const update = await Invitation.findByIdAndUpdate(
      inviteId,
      { $set: { status: "ACCEPTED" } },
      { new: true, runValidators: true },
    );
    return { membership: member, invitation: update };
  } catch (err) {
    throw new Error("ERROR in accepting invite");
  }
}

async function rejectInvitationService({ inviteId, user }) {
  // TODO: implement reject flow.
  // Steps: validate invitation ownership, mark invitation REJECTED.
  if (!inviteId || !user) throw new Error("invalid inviteId or user");
  try {
    const update = await Invitation.findByIdAndUpdate(
      inviteId,
      { $set: { status: "REJECTED" } },
      { new: true, runValidators: true },
    );
    console.log(update);
  } catch (err) {
    throw new Error("TODO: implement rejectInvitationService");
  }
}

async function cancelInvitationService({ inviteId, user }) {
  // TODO: implement cancel flow.
  // Steps: find invitation, verify inviter/admin privileges, cancel/delete invitation.
  if (!inviteId || !user) throw new Error("invalid inviteId or user");
  try {
    const invite = await Invitation.findById(inviteId);
    if (!invite) {
      throw new Error("Invitation not found");
    }
    await Invitation.findByIdAndDelete(inviteId);
  } catch (err) {
    throw new Error("ERROR:Invite not canceled");
  }
}

module.exports = {
  inviteUserToGroupService,
  getMyInvitationsService,
  acceptInvitationService,
  rejectInvitationService,
  cancelInvitationService,
};
