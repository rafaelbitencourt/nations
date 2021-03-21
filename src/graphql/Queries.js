import { Client, ClientCustom } from '../api/api';
import { gql } from '@apollo/client';

const mergeCustom = (countries, countriesCustom) => {
    return countries.map(country => {
        var countryCustom = countriesCustom?.find(x => x.numericCode === country.numericCode);
        return countryCustom ? {...country, ...countryCustom, custom: true} : country;
    });
}

const listCountriesCustom = (countries) => {
    var numericCodes = countries.map(x => x.numericCode);
    var result = ClientCustom
        .query({
            query: gql`
                query {
                    countries(where: {numericCode_in: ["${numericCodes.join('","')}"]}) {
                        numericCode
                        area
                        population
                        populationDensity
                        capital
                    }
                }
            `
        }).then(result => mergeCustom(countries, result.data.countries));

    return result;
}

export const countCountries = (filter) => 
    Client
        .query({
        query: gql`
            query {
                Country(filter: ${filter}) {
                    numericCode
                }
            }
        `
        })
        .then(result => result.data.Country.length);

export const listCountries = (offset, first, filter, properties) => 
    Client
        .query({
        query: gql`
            query {
                Country(offset: ${offset}, first: ${first}, filter: ${filter}, orderBy: name_asc) {
                    ${properties}
                }
            }
        `
        })
        .then(result => listCountriesCustom(result.data.Country));

export const getCountry = (numericCode, properties) =>
        Client
            .query({
            query: gql`
                query {
                    Country(filter: { numericCode: "${numericCode}" }) {
                        ${properties}                        
                    }
                }
            `
            })
            .then(result => listCountriesCustom(result.data.Country)
                .then(countries => countries[0]));

export const getToken = (name, password) =>
        ClientCustom
            .query({
            query: gql`
                query {
                    token(name:"${name}", password:"${password}")    
                }
            `
            })
            .then(result => result.data.token);                
            