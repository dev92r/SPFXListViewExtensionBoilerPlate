export const COMMAND_CONTROL_CENTER_FIELDS = [
  { name: "CommandType", type: "Choice", choices: ["OOB", "Custom"] },
  { name: "Target", type: "Choice", choices: ["Everyone", "Admin"] },
  { name: "HideCommand", type: "Boolean" },
  { name: "TargetMemberGroups", type: "UserMulti" },
  { name: "TargetAdminGroup", type: "UserSingle" },
  { name: "CustomCommandLink", type: "Url" },
  { name: "CustomCommandID", type: "Text" }
];