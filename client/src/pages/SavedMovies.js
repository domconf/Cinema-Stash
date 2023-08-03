import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';

const SavedMovies = (props) => {
    const savedMovies = undefined
    const handleDeleteMovie = undefined
    if (!savedMovies || savedMovies.length === 0) {
        return (
            <>
                <Jumbotron fluid className='text-light bg-dark'>
                    <Container>
                        <h1>Viewing saved movies!</h1>
                    </Container>
                </Jumbotron>
                <Container>
                    <h2>You have no saved movies!</h2>
                </Container>
            </>
        );
    }

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Viewing saved movies!</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {savedMovies.length
                        ? `Viewing ${savedMovies.length} saved ${savedMovies.length === 1 ? 'movie' : 'movies'}:`
                        : 'You have no saved movies!'}
                </h2>
                <CardColumns>
                    {savedMovies.map((movie) => {
                        return (
                            <Card key={movie.movieId} border='dark'>
                                {movie.poster ? <Card.Img src={movie.poster} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <p className='small'>Year: {movie.year}</p>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                                        Delete this Movie!
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SavedMovies;
