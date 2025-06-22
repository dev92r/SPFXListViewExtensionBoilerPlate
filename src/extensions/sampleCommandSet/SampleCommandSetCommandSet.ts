import {
  BaseListViewCommandSet,
   Command,
   IListViewCommandSetExecuteEventParameters,
   ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { CommandIds } from '../../types/enums/commandIds';
import { ICommandSetCommandSetProperties } from '../../types/interfaces/commandSetProperties';
import { getSP } from '../../services/pnpjs-config';
import { ensureCustomList } from '../../services/CommandControlList';

export default class SampleCommandSetCommandSet extends BaseListViewCommandSet<ICommandSetCommandSetProperties> {

  public async onInit(): Promise<void> {
    // initial state of the command's visibility..
    const compareOneCommand: Command = this.tryGetCommand(CommandIds.Command2);
    compareOneCommand.visible = false;
    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);
    getSP(this.context);
    await ensureCustomList()
    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case CommandIds.Command1:
        alert(`Hello world! One`)
        break;
      case CommandIds.Command2:
        alert(`Hello world! Two`)
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    const compareOneCommand: Command = this.tryGetCommand(CommandIds.Command2);
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = this.context.listView.selectedRows?.length === 1;
    }
    // TODO: Add your logic here
    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }
}
