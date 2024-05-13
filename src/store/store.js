import {configureStore} from '@reduxjs/toolkit'
import MovieSlice from '../slice/MovieSlice'

export const store=configureStore({
    reducer:{
        allMovie:MovieSlice
    }
})