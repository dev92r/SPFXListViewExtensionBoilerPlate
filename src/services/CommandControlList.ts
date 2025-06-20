import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/presets/all";
import { getSP } from "./pnpjs-config";
import { COMMAND_CONTROL_CENTER_LIST_NAME } from "../constants/Constants";
import { COMMAND_CONTROL_CENTER_FIELDS } from "../constants/CommandControlCenterFields";
import {
  FieldUserSelectionMode,
  UrlFieldFormatType,
} from "@pnp/sp/presets/all";
import { DEFAULT_ITEMS } from "../constants/CommandControlCenterDefaultItems";

export const ensureCustomList = async (): Promise<void> => {
  const listTitle = COMMAND_CONTROL_CENTER_LIST_NAME;
  const sp = getSP();

  try {
    const lists = await sp.web.lists.select("Title")();
    const exists = lists.some((l) => l.Title === listTitle);

    if (!exists) {
      await sp.web.lists.add(listTitle, COMMAND_CONTROL_CENTER_LIST_NAME, 100);

      const list = sp.web.lists.getByTitle(listTitle);
      const defaultView = await list.defaultView();
      const existingFields = (await list.fields.select("InternalName")()).map(
        (f) => f.InternalName
      );

      for (const field of COMMAND_CONTROL_CENTER_FIELDS) {
        const { name, type, choices } = field;

        if (existingFields.includes(name)) continue;

        switch (type) {
          case "Choice":
            await list.fields.addChoice(name, { Choices: choices || [] });
            break;

          case "Boolean":
            await list.fields.addBoolean(name);
            break;

          case "UserMulti":
            {
              const multiUserField = await list.fields.addUser(name, {
                SelectionMode: FieldUserSelectionMode.PeopleAndGroups,
              });
              await list.fields
                .getById(multiUserField.Id!)
                .update({ AllowMultipleValues: true }, "SP.FieldUser");
            }
            break;

          case "UserSingle":
            await list.fields.addUser(name, {
              SelectionMode: FieldUserSelectionMode.PeopleAndGroups,
            });
            break;

          case "Url":
            await list.fields.addUrl(name, {
              DisplayFormat: UrlFieldFormatType.Hyperlink,
            });
            break;

          case "Text":
            await list.fields.addText(name);
            break;

          default:
            console.warn(`Unsupported field type: ${type}`);
        }

        await list.views.getById(defaultView.Id).fields.add(name);
      }

      for (const item of DEFAULT_ITEMS) {
        await list.items.add({
          Title: item.Title,
          CommandType: item.CommandType,
          Target: item.Target,
          HideCommand: item.HideCommand,
          CustomCommandID: item.CustomCommandID || null,
        });
      }

      console.log(`List '${listTitle}' created successfully`);
    }
  } catch (error) {
    console.error(`Error ensuring custom list:`, error);
  }
};
