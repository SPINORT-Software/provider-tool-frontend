import React from 'react';

import menuData from './json/menu-items.json';
import menuUtils from "./utils";

export default menuData.roles.common.map(menuUtils.makeMenuItems);

