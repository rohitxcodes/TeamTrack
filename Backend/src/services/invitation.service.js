const Invitation = require("../models/Invitation.model");
const Membership = require("../models/Membership.model");
const Group = require("../models/Group.model");
const User = require("../models/User.model");
async function inviteUserToGroupService({ groupId, email, invitedBy }) {
  try {
    if (!groupId || !email || !invitedBy) {
      throw new Error("groupId, email and invitedBy are required");
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Invalid email address");
    }

    // prevent inviting yourself
    const inviterUser = await User.findById(invitedBy).select("email");
    if (inviterUser && inviterUser.email === normalizedEmail) {
      throw new Error("You cannot invite yourself");
    }

    const group = await Group.findById(groupId).select("_id");
    if (!group) throw new Error("Group not found");

    // if the email belongs to an existing user, ensure they're not already a member
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      const existingMembership = await Membership.findOne({
        user: existingUser._id,
        group: groupId,
      });
      if (existingMembership && existingMembership.status === "ACTIVE") {
        throw new Error("User is already a member of this group");
      }
    }

    const existing = await Invitation.findOne({
      email: normalizedEmail,
      group: groupId,
      status: "PENDING",
    });
    if (existing) throw new Error("Invitation already pending for this user");

    const invite = await Invitation.create({
      email: normalizedEmail,
      invitedBy: invitedBy,
      group: groupId,
    });
    return invite;
  } catch (err) {
    console.error("inviteUserToGroupService error:", err);
    throw new Error(err.message || "error in making invitation");
  }
}

async function getMyInvitationsService({ email }) {
  // TODO: implement pending invites query with group populate.
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const invitation = await Invitation.find({ email }).populate(
      "group",
      "name",
    );
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
    console.error("acceptInvitationService error:", err);
    throw new Error(err.message || "ERROR in accepting invite");
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
    return update;
  } catch (err) {
    console.error("rejectInvitationService error:", err);
    throw new Error(err.message || "TODO: implement rejectInvitationService");
  }
}

async function cancelInvitationService({ inviteId, user }) {
  // TODO: implement cancel flow.
  // Steps: find invitation, verify inviter/admin privileges, cancel/delete invitation.
  try {
    if (!inviteId || !user) throw new Error("invalid inviteId or user");

    const invite = await Invitation.findById(inviteId);
    if (!invite) throw new Error("Invitation not found");

    if (invite.invitedBy.toString() !== user._id.toString()) {
      throw new Error("Not authorized to cancel this invitation");
    }

    await Invitation.findByIdAndDelete(inviteId);
    return invite;
  } catch (err) {
    console.error("cancelInvitationService error:", err);
    throw new Error(err.message || "ERROR:Invite not canceled");
  }
}

module.exports = {
  inviteUserToGroupService,
  getMyInvitationsService,
  acceptInvitationService,
  rejectInvitationService,
  cancelInvitationService,
};
