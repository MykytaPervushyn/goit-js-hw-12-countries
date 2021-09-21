import '../css/common.css';
import countryCardTpl from '../templates/country-card.hbs'
import countriesListTpl from '../templates/countries-list.hbs'
import API from './api-service';
import getRefs from './get-refs';
import debounce from 'lodash/debounce';

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const refs = getRefs();
const DELAY = 500;

refs.searchForm.addEventListener('input', debounce(onSearch, DELAY));


function onSearch(e) {
    const searchQuery = e.target.value.trim();

    API.fetchCountryByName(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError);
    }



function renderCountryCard(country) {
    if (country.length === 1) {
        refs.cardContainer.innerHTML = countryCardTpl(country);
    return
    } else if (country.length >= 2 && country.length <= 10) {
        refs.cardContainer.innerHTML = countriesListTpl(country)
        return
    } else if (country.length > 10) {
    refs.cardContainer.innerHTML = ''
    alert({ text: 'Too many matches found. Please enter a more specific query!', })
    return
    } 
        onFetchError()
}


function onFetchError(error) {
    refs.cardContainer.innerHTML = ''
    alert({ text: 'Not found entered country!', })
}