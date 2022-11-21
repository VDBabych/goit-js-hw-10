export function createMarkup(data, option) {
    if (option === 1) {
        return data.map(el => {
        return `<li>
        <p>
        <img src="${el.flags.svg}" alt="" width="25" />
        ${el.name.official}</p>
        </li>`
        }).join('')
    }
    if (option === 2) {
        return `<h2>
        <img src="${data[0].flags.svg}" alt="" width="25" />
        ${data[0].name.official}</h2>
        <p><span>Capital:</span> ${data[0].capital[0]}</p>
        <p><span>Population:</span> ${data[0].population}</p>
        <p><span>Languages:</span> ${Object.values(data[0].languages).join(', ')}</p>`
    }
}