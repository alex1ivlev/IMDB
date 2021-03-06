import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const client = axios.create({
    baseURL: 'https://alex-imdb-server.herokuapp.com/api',
})

client.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token !== null) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

export const login = payload => client.post(`/users/login`, payload)
export const register = payload => client.post(`users`, payload)
export const addMovie = payload => client.post(`/movies`, payload)
export const getAllMovies = () => client.get(`/movies`)
export const updateMovieById = (id, payload) => client.put(`/movies/${id}`, payload)
export const deleteMovieById = id => client.delete(`/movies/${id}`)
export const getMovieById = id => client.get(`/movies/${id}`)
export const getMovieReviews = id => client.get(`/movies/${id}/reviews`)
export const addReview = (id, payload) => client.post(`movies/${id}/reviews`, payload)
export const getAllActors = () => client.get(`/actors`)
export const addActor = payload => client.post(`/actors`, payload)
export const updateActorById = (id, payload) => client.put(`/actors/${id}`, payload)
export const deleteActorById = id => client.delete(`/actors/${id}`)
export const getActorById = id => client.get(`/actors/${id}`)

const api = {
    login,
    register,
    addMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getMovieReviews,
    addReview,
    getAllActors,
    addActor,
    getActorById,
    updateActorById,
    deleteActorById
}

export function isLoggedIn() {
    if (localStorage.getItem('token') != null) {
        let token = localStorage.getItem('token')
        const {exp} = jwtDecode(token)
        // Refresh the token a minute early to avoid latency issues
        const expirationTime = (exp * 1000) - 60000
        if (Date.now() >= expirationTime) {
            localStorage.removeItem('token');
            return false
        }
        return true;
    }
    return false;
}

export function isAdmin() {
    if (localStorage.getItem('token') != null) {
        let token = localStorage.getItem('token')
        const {admin} = jwtDecode(token)
        return admin
    }
    return false
}

export default api;
