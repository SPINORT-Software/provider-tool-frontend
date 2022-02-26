import React from 'react';
import menuUtils from "../common/utils";
import menuData from './json/menu-items.json';

export default menuData.roles['external-partner'].map(menuUtils.makeMenuItems);




