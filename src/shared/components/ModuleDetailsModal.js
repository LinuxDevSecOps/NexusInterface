// External
import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { join } from 'path';

// Internal
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import ExternalLink from 'components/ExternalLink';
import { openConfirmDialog } from 'actions/overlays';
import { modulesDir } from 'consts/paths';
import { timing } from 'styles';
import deleteDirectory from 'utils/promisified/deleteDirectory';
import warningIcon from 'images/warning.sprite.svg';
import linkIcon from 'images/link.sprite.svg';
import trashIcon from 'images/trash.sprite.svg';

const DeleteModule = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
});

const DeleteButton = styled.div(({ theme }) => ({
  cursor: 'pointer',
  color: theme.mixer(0.25),
  transition: `color ${timing.normal}`,
  '&:hover': {
    color: theme.danger,
  },
}));

const Row = styled.div({
  display: 'grid',
  gridTemplateAreas: '"label value"',
  gridTemplateColumns: '1fr 2fr',
  alignItems: 'start',
  columnGap: '1em',
  marginBottom: '.6em',
});

const Label = styled.div(({ theme }) => ({
  gridArea: 'label',
  textAlign: 'right',
  color: theme.mixer(0.875),
}));

const Value = styled.div({
  gridArea: 'value',
  wordBreak: 'break-word',
});

const Field = ({ label, children }) => (
  <Row>
    <Label>{label}</Label>
    <Value>{children}</Value>
  </Row>
);

const CheckMark = styled.span({
  cursor: 'default',
  userSelect: 'none',
});

/**
 * Module details modal, for viewing details of both installed modules
 * and modules being installed
 *
 * @class ModuleDetailsModal
 * @extends {React.Component}
 */
@connect(
  null,
  { openConfirmDialog }
)
class ModuleDetailsModal extends React.Component {
  /**
   *
   *
   * @memberof ModuleDetailsModal
   */
  confirmDelete = () => {
    this.props.openConfirmDialog({
      question: `Delete ${this.props.module.displayName}?`,
      callbackYes: async () => {
        const moduleDir = join(modulesDir, this.props.module.dirName);
        await deleteDirectory(moduleDir);
        location.reload();
      },
    });
  };

  /**
   *
   *
   * @returns
   * @memberof ModuleDetailsModal
   */
  render() {
    const { module, forInstall, install } = this.props;
    const { host, owner, repo, commit } = module.repository || {};
    const repoUrl = module.repository
      ? `https://${host}/${owner}/${repo}/tree/${commit}`
      : null;
    return (
      <Modal>
        <Modal.Header className="relative">
          {__('Module Details')}
          {!forInstall && (
            <DeleteModule>
              <DeleteButton skin="plain" onClick={this.confirmDelete}>
                <Icon icon={trashIcon} />
              </DeleteButton>
            </DeleteModule>
          )}
        </Modal.Header>
        <Modal.Body>
          <Field label={__('Module name')}>{module.name}</Field>
          <Field label={__('Display name')}>{module.displayName}</Field>
          <Field label={__('Module type')}>{module.type}</Field>
          <Field label={__('Version')}>{module.version}</Field>
          <Field label={__('Module Specifications version')}>
            {
              <span className={module.deprecated ? 'error' : undefined}>
                <span className="v-align">{module.specVersion}</span>
                {module.deprecated && (
                  <span className="error space-left">
                    <Icon icon={warningIcon} />
                    <span className="v-align space-left">(deprecated)</span>
                  </span>
                )}
              </span>
            }
          </Field>
          <Field label={__('Description')}>
            {module.description || (
              <span className="dim">{__('Not provided')}</span>
            )}
          </Field>
          <Field label={__('Author')}>
            {module.author ? (
              <div>
                <span>{module.author.name}</span>
                {!!module.author.email && (
                  <span className="space-left">
                    -
                    <ExternalLink
                      className="space-left"
                      href={`mailto:${module.author.email}`}
                    >
                      {module.author.email}
                    </ExternalLink>
                  </span>
                )}
              </div>
            ) : (
              <span className="dim">{__('No information')}</span>
            )}
          </Field>
          <Field label={__('Source code')}>
            {module.repository ? (
              <div>
                <Tooltip.Trigger tooltip={repoUrl}>
                  <ExternalLink href={repoUrl}>
                    <span className="v-align">{__('Visit repository')}</span>
                    <Icon icon={linkIcon} className="space-left" />
                  </ExternalLink>
                </Tooltip.Trigger>

                {module.isFromNexus && (
                  <Tooltip.Trigger
                    tooltip={__('This module is developed by Nexus')}
                  >
                    <CheckMark>&nbsp;&nbsp;✔</CheckMark>
                  </Tooltip.Trigger>
                )}

                {!module.repoOnline && (
                  <div className="error">
                    <Icon icon={warningIcon} />
                    <span className="v-align space-left">
                      {__('This repository does not exist or is private')}
                    </span>
                  </div>
                )}
                {!module.repoVerified && (
                  <div className="error">
                    <Icon icon={warningIcon} />
                    <span className="v-align space-left">
                      {__(
                        'This repository is not verified to be the real source code of this module'
                      )}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="error">
                <Icon icon={warningIcon} />
                <span className="v-align space-left">
                  {__('No information')}
                </span>
              </div>
            )}
          </Field>
          <Field label={__('Module hash')}>
            {module.hash ? (
              <span className="monospace">{module.hash}</span>
            ) : (
              <span className="dim">{__('Not available')}</span>
            )}
          </Field>
        </Modal.Body>

        {!!forInstall && <Installer module={module} install={install} />}
      </Modal>
    );
  }
}

export default ModuleDetailsModal;

/**
 * Module Installer
 * =============================================================================
 */

const InstallerWarning = styled.div({
  fontSize: '.9em',
});

/**
 * Install section at the bottom of Module Details modal
 *
 * @class Installer
 * @extends {React.Component}
 */
class Installer extends React.Component {
  state = {
    installing: false,
  };

  /**
   *
   *
   * @memberof Installer
   */
  install = async () => {
    this.setState({ installing: true });
    try {
      await this.props.install();
    } finally {
      this.setState({ installing: false });
    }
  };

  /**
   *
   *
   * @returns
   * @memberof Installer
   */
  render() {
    const { module } = this.props;
    const { installing } = this.state;
    const btnLabel = module.invalid
      ? __('Module is invalid')
      : installing
      ? __('Installing Module...')
      : __('Install Module');

    return (
      <Modal.Footer separator style={{ textAlign: 'center' }}>
        {!module.invalid && !module.isFromNexus && (
          <InstallerWarning>
            {__(`Warning: This module is written by a third party, Nexus is NOT
              responsible for its quality or legitimacy. Please make sure to do
              your due diligence before installing third party modules and use
              them with your own risk.`)}
          </InstallerWarning>
        )}
        <Button
          skin="primary"
          wide
          className="mt1"
          disabled={installing || !!module.invalid}
          onClick={this.install}
        >
          {btnLabel}
        </Button>
      </Modal.Footer>
    );
  }
}
