import React from 'react';

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconMessages } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconSitemap, IconMessages };

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const commonMenuItems = {
    id: 'application-common-group',
    type: 'group',
    title: 'Application',
    children: [
        {
            id: 'chat',
            title: <FormattedMessage id="chat" />,
            type: 'item',
            icon: icons.IconMessages,
            url: '/chat'
        },
    ]
};

export default commonMenuItems;
