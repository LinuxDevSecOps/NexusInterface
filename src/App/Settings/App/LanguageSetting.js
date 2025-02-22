// External
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

// Internal
import languages from 'data/languages';
import { updateSettings } from 'actions/settings';
import SettingsField from 'components/SettingsField';
import Select from 'components/Select';

const Flag = styled.img({
  marginRight: '.5em',
  verticalAlign: 'middle',
});

const languageOptions = languages.map(lang => ({
  value: lang.code,
  display: (
    <span>
      <Flag src={lang.flag} />
      <span className="v-align">{lang.name}</span>
    </span>
  ),
}));

const mapStateToProps = state => ({
  locale: state.settings.locale,
});

const mapDispatchToProps = dispatch => ({
  updateSettings: updates => dispatch(updateSettings(updates)),
});

/**
 * Internal JSX for Language Settings
 *
 * @class LanguageSetting
 * @extends {Component}
 */
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class LanguageSetting extends Component {
  /**
   * Handle Change
   *
   * @memberof LanguageSetting
   */
  handleChange = locale => {
    this.props.updateSettings({ locale });
    location.reload();
  };

  /**
   * Component's Renderable JSX
   *
   * @returns
   * @memberof LanguageSetting
   */
  render() {
    return (
      <SettingsField label={__('Language')}>
        <Select
          options={languageOptions}
          value={this.props.locale}
          onChange={this.handleChange}
        />
      </SettingsField>
    );
  }
}
export default LanguageSetting;
