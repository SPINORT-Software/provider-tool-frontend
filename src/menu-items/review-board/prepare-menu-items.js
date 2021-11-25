import React from 'react';

import menuData from './json/menu-items.json';
import menuUtils from "../common/utils";

const reviewBoardMenuItems = menuData.roles['review-board'].map(menuUtils.makeMenuItems);
export default reviewBoardMenuItems;

