import {
  BaseListViewCommandSet,
   Command,
   IListViewCommandSetExecuteEventParameters,
   ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { CommandIds } from '../../types/enums/commandIds';
import { ICommandSetCommandSetProperties } from '../../types/interfaces/commandSetProperties';

export default class SampleCommandSetCommandSet extends BaseListViewCommandSet<ICommandSetCommandSetProperties> {

  public onInit(): Promise<void> {
    // initial state of the command's visibility..
    const compareOneCommand: Command = this.tryGetCommand(CommandIds.Command2);
    compareOneCommand.visible = false;
    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);
    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case CommandIds.Command1:
        alert(`${this.properties.sampleTextOne}`)
        break;
      case CommandIds.Command2:
        alert(`${this.properties.sampleTextTwo}`)
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
