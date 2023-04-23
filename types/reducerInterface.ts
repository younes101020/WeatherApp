import { ICity } from './interfaces';

export interface State {
    city: ICity,
    cityOnChange: string,
    citySugg: ICity[]
}

export interface ISetCityAction {
    type: 'SET_CITY',
    payload: ICity;
}

export interface ISetCityOnChangeAction {
    type: 'SET_CITY_ON_CHANGE',
    payload: string
}

export interface ISetCitySuggAction {
    type: 'SET_CITY_SUGG',
    payload: ICity[]
}

export type Action = ISetCityAction | ISetCityOnChangeAction | ISetCitySuggAction;