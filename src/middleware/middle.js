import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../styles/mainStyle';
import PropTypes from 'prop-types';
import {UrlTile} from 'react-native-maps';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const randomize = (data = []) => {
  let index = Math.floor(Math.random() * (data.length - 0 + 1)) + 0;
  return data[index];
};
const mapProviders = [
  {
    id: 'standard',
    indicator: require('../../assets/img/satellite_map_mode.png'),
    name: 'ORS Mapsufer',
    server: ['a', 'b', 'c'],
    tiles: [
      {
        url: `https://tile.osmand.net/hd/{z}/{x}/{y}.png`,
        maxZoom: 19,
        size: 512,
        key: 'standard',
      },
    ],
    styles: StyleSheet.create({
      label: {
        flex: 1,
        fontSize: responsiveFontSize(1.5),
        color: colors.whitePure,
        backgroundColor: colors.materialBlue500,
        padding: 3,
        marginBottom: 1,
        width: responsiveWidth(25),
        borderBottomRightRadius: 10,
        borderTopRightRadius: 0,
        opacity: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
    }),
  },
  {
    id: 'satellite',
    indicator: require('../../assets/img/hybrid_map_mode.png'),
    name: 'ESRI World',
    tiles: [
      {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 19,
        size: 512,
        key: 'satellite',
      },
    ],
    styles: StyleSheet.create({
      label: {
        flex: 1,
        fontSize: responsiveFontSize(1.5),
        color: colors.whitePure,
        backgroundColor: colors.materialBlue500,
        padding: 3,
        marginBottom: 1,
        width: responsiveWidth(25),
        borderBottomRightRadius: 10,
        borderTopRightRadius: 0,
        opacity: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
    }),
  },
  {
    id: 'hybrid',
    indicator: require('../../assets/img/road_map_mode.png'),
    name: 'ESRI Hybrid',
    tiles: [
      {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 19,
        size: 512,
        key: 'hybrid',
      },
      {
        url: 'https://maps.heigit.org/openmapsurfer/tiles/hybrid/webmercator/{z}/{x}/{y}.png',
        maxZoom: 19,
        size: 512,
        key: 'ors.hybrid',
      },
    ],
    styles: StyleSheet.create({
      label: {
        flex: 1,
        fontSize: responsiveFontSize(1.5),
        color: colors.whitePure,
        backgroundColor: colors.materialBlue500,
        padding: 3,
        marginBottom: 1,
        width: responsiveWidth(25),
        borderBottomRightRadius: 10,
        borderTopRightRadius: 0,
        opacity: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
    }),
  },
];

export const MODE_ORS_ROADS = mapProviders[0];
export const MODE_ESRI_SATELLITE = mapProviders[1];
export const MODE_ESRI_HYBRID = mapProviders[2];

export default class MapCustomTile extends Component {
  renderMapCustomTiles = provider => {
    let renderedTiles = [];
    provider.tiles.forEach(tile => {
      renderedTiles.push(
        <UrlTile
          key={tile.key}
          urlTemplate={tile.url}
          maximumZ={tile.maxZoom}
        />,
      );
    });
    return renderedTiles;
  };

  static defaultProps = {
    mode: MODE_ORS_ROADS,
  };

  static propTypes = {
    mode: PropTypes.oneOf(mapProviders).isRequired,
  };

  render() {
    let provider = mapProviders.filter(
      provider => provider.id == this.props.mode.id,
    );
    provider = provider.length > 0 ? provider[0] : {tiles: []};
    return this.renderMapCustomTiles(provider);
  }
}
