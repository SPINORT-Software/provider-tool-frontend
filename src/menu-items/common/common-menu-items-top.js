import React from 'react';

import menuData from './json/menu-items-top.json';
import menuUtils from "./utils";

export default menuData.roles.common_top.map(menuUtils.makeMenuItems);

