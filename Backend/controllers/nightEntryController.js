// Notify guard
await createNotification(guardId, "New night entry request submitted");

// Guard approves → notify student
await createNotification(entry.student, "Your night entry was approved by guard");

await createAuditLog(
   req.user.id,
   "GUARD_APPROVED_NIGHT_ENTRY",
   `Night entry id:${entry._id}`
);

// Warden approves → notify student
await createNotification(entry.student, "Your night entry was approved by warden");

await createAuditLog(
   req.user.id,
   "WARDEN_APPROVED_NIGHT_ENTRY",
   `Night Entry ID:${entry._id}`
);
