import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from '../utils/mutations';

const SearchMovies = () => {
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

    const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

    useEffect(() => {
        return () => saveMovieIds(savedMovieIds);
    });

    const apiKey = '50dee6b6';

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}&type=movie`);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            if (data.Error) {
                throw new Error(data.Error);
            }

            const movieData = data.Search.map((movie) => ({
                movieId: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster,
            }));

            setSearchedMovies(movieData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveMovie = async (movieId) => {
        const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await saveMovie({
                variables: { newMovie: { ...movieToSave } },
            });

            setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Search for Movies!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a movie'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h2>
                    {searchedMovies.length
                        ? `Viewing ${searchedMovies.length} results:`
                        : 'Search for a movie to begin'}
                </h2>
                <CardColumns>
                    {searchedMovies.map((movie) => {
                        return (
                            <Card key={movie.movieId} border='dark'>
                                {movie.poster ? (
                                    <Card.Img src={movie.poster} alt={`The poster for ${movie.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <p className='small'>Year: {movie.year}</p>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveMovie(movie.movieId)}>
                                            {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                                                ? 'This movie has already been saved!'
                                                : 'Save this Movie!'}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchMovies;
