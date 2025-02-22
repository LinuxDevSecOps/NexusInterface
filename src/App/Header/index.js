// External
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

// Internal Global
import Icon from 'components/Icon';
import HorizontalLine from 'components/HorizontalLine';
import { consts, timing, animations } from 'styles';
import * as color from 'utils/color';
import { isCoreConnected } from 'selectors';

// Internal Local
import LogInStatus from './StatusIcons/LogInStatus';
import StakingStatus from './StatusIcons/StakingStatus';
import SyncStatus from './StatusIcons/SyncStatus';
import MyAddresses from './StatusIcons/MyAddresses';
import CoreStatus from './CoreStatus';
import logoFull from './logo-full-beta.sprite.svg';

const HeaderComponent = styled.header(({ theme }) => ({
  gridArea: 'header',
  position: 'relative',
  top: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to bottom, rgba(0,0,0,.6), transparent)',
  color: theme.primary,
  zIndex: 1,
}));

const LogoLink = styled(Link)(({ theme }) => ({
  position: 'relative',
  animation: `${animations.fadeInAndExpand} ${timing.slow} ${
    consts.enhancedEaseOut
  }`,
  transitionProperty: 'filter',
  transitionDuration: timing.normal,
  transitionTimingFunction: 'ease-out',
  filter: `drop-shadow(0 0 8px ${color.fade(
    color.lighten(theme.primary, 0.2),
    0.3
  )})`,

  '&:hover': {
    filter: `drop-shadow(0 0 10px ${theme.primary}) brightness(110%)`,
  },
}));

const Logo = styled(Icon)(({ theme }) => ({
  display: 'block',
  height: 50,
  width: 'auto',
  fill: theme.primary,
}));

const StatusIcons = styled.div({
  position: 'absolute',
  top: 24,
  right: 40,
  animation: `${animations.fadeIn} ${timing.slow} ${consts.enhancedEaseOut}`,
  display: 'flex',
  alignItems: 'center',
  fontSize: 20,
});

const UnderHeader = styled.div(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  textAlign: 'center',
  color: theme.foreground,
}));

/**
 * Handles the App Header
 *
 * @class Header
 * @extends {Component}
 */
@connect(state => ({ coreConnected: isCoreConnected(state) }))
class Header extends Component {
  /**
   * Component's Renderable JSX
   *
   * @returns
   * @memberof Header
   */
  render() {
    const { coreConnected } = this.props;

    return (
      <HeaderComponent>
        <LogoLink to="/">
          <Logo icon={logoFull} />
        </LogoLink>

        <UnderHeader>
          <HorizontalLine />
          <CoreStatus {...this.props} />
        </UnderHeader>

        {coreConnected && (
          <StatusIcons>
            <SyncStatus {...this.props} />
            <LogInStatus {...this.props} />
            <StakingStatus {...this.props} />
            <MyAddresses {...this.props} />
          </StatusIcons>
        )}
      </HeaderComponent>
    );
  }
}

export default Header;
