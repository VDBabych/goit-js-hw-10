import './css/styles.css';
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetch';
import { createMarkup } from './js/create-markup';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const deboucedOnInput = debounce(onInput, DEBOUNCE_DELAY);
inputEl.addEventListener('input', deboucedOnInput);



function onInput(e) {
    const pureTextFromInput = e.target.value.trim();
    if (pureTextFromInput) {
        fetchCountries(pureTextFromInput)
            .then(data => {
                if (data.length > 10) {
                    removeMurkup()
                    Notify.info('Too many matches found. Please enter a more specific name.')
                    return
                }
                if (data.length > 1) {
                    countryListEl.innerHTML = createMarkup(data, 1);
                    removeMurkup('div')
                }
                if (data.length === 1) {
                    removeMurkup('ul')
                    countryInfo.innerHTML = createMarkup(data, 2);
                }
            })
            .catch(err => {
                removeMurkup();
                Notify.failure('"Oops, there is no country with that name"');
            })
    } else {
        removeMurkup()
    }
}

function removeMurkup(opt) {
    if (countryInfo.innerHTML && opt !== 'ul') {
        countryInfo.innerHTML = '';
    }
    if (countryListEl.innerHTML && opt !== 'div') {
        countryListEl.innerHTML = '';
    }
}

