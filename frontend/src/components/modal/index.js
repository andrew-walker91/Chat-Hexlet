import Add from './AddChannel';
import Remove from './RemoveChannel';
import Rename from './RenameChannel';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
