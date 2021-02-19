/*----------------------------
Styles - Global
----------------------------*/

// Includes all global sections and component styling. Add all global styling direct to the theme.scss so we pull it in as a single import.

import '../../styles/theme.scss';

/*----------------------------
Scripts - Global
----------------------------*/

// Plugins

import 'lazysizes';

// Vue Components

import '../components/AddToCart';
import '../components/CartItem';

// Vue App Instances

import '../apps/Header';
import '../apps/Cart';
import '../apps/Main';

// Components

import '../components/smooth-scroll';
import '../components/modals';
import '../components/dismissible-notifications';
import '../components/select-dropdown';
import '../components/single-toggle';
import '../components/email-subscribe';
import '../components/social-share';

// Sections

import '../sections/header';

// Templates

import '../templates/article';
import '../templates/product';
import '../templates/customers/addresses';
import '../templates/customers/login';

// Global plugin init

import cssVars from 'css-vars-ponyfill';
import vhCheck from 'vh-check';

document.addEventListener('DOMContentLoaded', () => {
  vhCheck();
  cssVars({});
});
