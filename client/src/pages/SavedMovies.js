import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';

const SavedMovies = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);
    const userData = data?.me || {};

    const handleDeleteMovie = async (movieId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeMovie({
                variables: { movieId },
            });

            removeMovieId(movieId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>LOADING...</h2>;
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
                    {userData.savedMovies.length
                        ? `Viewing ${userData.savedMovies.length} saved ${userData.savedMovies.length === 1 ? 'movie' : 'movies'}:`
                        : 'You have no saved movies!'}
                </h2>
                <CardColumns>
                    {userData.savedMovies.map((movie) => {
                        return (
                            <Card key={movie.movieId} border='dark'>
                                {movie.poster ? (
                                    <Card.Img src={movie.poster} alt={`The cover for ${movie.title}`} variant='top' />
                                ) : (
                                    <div>No Poster Available</div>
                                )}
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