import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Row, Form, Button, Card, CardColumns } from 'react-bootstrap';
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
        saveMovieIds(savedMovieIds);
    }, [savedMovieIds]);

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
            <Container>
                <Row>
                    {/* Search Bar on the Left */}
                    <Col xs={12} md={4} className="bg-dark" style={{ minHeight: '100vh' }}>
                        <Jumbotron fluid className="text-light bg-dark" style={{ background: 'black' }}>
                            <Container>
                                <h1 style={{ color: '#8B0000', textShadow: '2px 2px black' }}>Search for Movies Here!</h1>
                                <Form onSubmit={handleFormSubmit}>
                                    <Form.Row>
                                        <Col xs={12}>
                                            <Form.Control
                                                name="searchInput"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                type="text"
                                                size="lg"
                                                placeholder="Enter a movie"
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Button type="submit" variant="danger" size="lg" style={{ marginTop: '10px' }}>
                                                Search
                                            </Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Container>
                        </Jumbotron>
                    </Col>

                    {/* Results on the Right */}
                    <Col xs={12} md={8}>
                        <h2>
                            {searchedMovies.length
                                ? `Viewing ${searchedMovies.length} results:`
                                : 'Search for a movie to begin...'}
                        </h2>
                        <CardColumns>
                            {searchedMovies.map((movie) => (
                                <Card key={movie.movieId} border="dark">
                                    {movie.poster ? (
                                        <Card.Img src={movie.poster} alt={`The poster for ${movie.title}`} variant="top" />
                                    ) : null}
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <p className="small">Year: {movie.year}</p>
                                        {/* Add other relevant movie data here */}
                                        {Auth.loggedIn() && (
                                            <Button
                                                disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                                                className="btn-block"
                                                style={{
                                                    backgroundColor: savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId) ? 'black' : 'red',
                                                    color: savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId) ? 'red' : 'white',
                                                    border: '1px solid red',
                                                }}
                                                onClick={() => handleSaveMovie(movie.movieId)}
                                            >
                                                {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                                                    ? 'Movie has been saved!'
                                                    : 'Save this Movie!'}
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            ))}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SearchMovies;
