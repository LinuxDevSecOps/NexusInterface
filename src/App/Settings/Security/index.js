// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import WaitingMessage from 'components/WaitingMessage';
import { switchSettingsTab } from 'actions/ui';
import { isCoreConnected } from 'selectors';
import Login from './Login';
import Encrypted from './Encrypted';
import Unencrypted from './Unencrypted';

/**
 * SettingsSecurity Page on Settings Page
 *
 * @class SettingsSecurity
 * @extends {React.Component}
 */
@connect(
  state => ({
    locked: state.core.info.locked,
    coreConnected: isCoreConnected(state),
  }),
  { switchSettingsTab }
)
class SettingsSecurity extends React.Component {
  /**
   *Creates an instance of SettingsSecurity.
   * @param {*} props
   * @memberof SettingsSecurity
   */
  constructor(props) {
    super(props);
    props.switchSettingsTab('Security');
  }

  /**
   * Component's Renderable JSX
   *
   * @returns
   * @memberof SettingsSecurity
   */
  render() {
    const { locked, coreConnected } = this.props;
    if (!coreConnected) {
      return (
        <WaitingMessage>
          {__('Connecting to Nexus Core')}
          ...
        </WaitingMessage>
      );
    }

    if (locked === undefined) {
      return <Unencrypted />;
    } else if (locked) {
      return <Login />;
    } else {
      return <Encrypted />;
    }
  }
}
export default SettingsSecurity;
