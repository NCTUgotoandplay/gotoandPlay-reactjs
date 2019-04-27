import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import { withStyles } from '@material-ui/core/styles';

const CustomExpansionPanel = withStyles(theme => ({
  root: {
    width: '100%'
  }
}))(ExpansionPanel);

export default CustomExpansionPanel;
