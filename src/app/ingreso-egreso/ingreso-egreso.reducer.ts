import { Action, createReducer, on } from '@ngrx/store';
import { setItems, UnSetItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[]; 
}

export interface AppsStateWithIngresoEgreso extends AppState{
    ingresoEgreso: State
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, {items}) => ({ ...state, items: [...items]})),
    on(UnSetItems, state => ({ ...state, items: []})),

);

export function ingresoEgresoReducer(state: State | undefined, action: Action) {
    return _ingresoEgresoReducer(state, action);
}