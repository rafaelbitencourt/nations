import { ClientCustom } from 'api'
import { gql } from '@apollo/client';

const saveCountry = (country) =>
    ClientCustom
        .mutate({
            mutation: gql`
                mutation {
                    saveCountry(country:{
                        numericCode: "${country.numericCode}"
                        area: ${country.area}
                        population: ${country.population}
                        populationDensity: ${country.populationDensity}
                        capital: "${country.capital}"
                    }){
                        numericCode
                        area
                        population
                        populationDensity
                        capital
                    }
                }
            `
        }).then(result => result.data.country);

const removeCountry = (country) =>
        ClientCustom
            .mutate({
                mutation: gql`
                    mutation {
                        removeCountry(country:{
                            numericCode: "${country.numericCode}"
                        }){
                            numericCode
                        }
                    }
                `
            }).then(result => result.data.country);        

export {
    saveCountry,
    removeCountry
}            