import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useQuoteStore from '../quoteStore';
import { Box, Button, Typography } from '@mui/material';
import '../Styles/QuoteDisplay.css';

const fetchQuotes = async () => {
    try {
        const response = await axios.get('http://localhost:3001/quotes');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching quotes');
    }
};

const QuoteDisplay = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['quotes'],
        queryFn: fetchQuotes,
    });
    const setQuotes = useQuoteStore((state) => state.setQuotes);
    const getRandomQuote = useQuoteStore((state) => state.getRandomQuote);
    const currentQuote = useQuoteStore((state) => state.currentQuote);
    const [rotate, setRotate] = useState(false);
    const [rotateContent, setRotateContent] = useState(false);

    useEffect(() => {
        if (data) {
            setQuotes(data);
            getRandomQuote();
            console.log(data);
        }
    }, [data, getRandomQuote, setQuotes]);

    const handleButton = () => {
        getRandomQuote();
        if (rotate) {
            setRotate(false);
            setRotateContent(false);
        }
        else {
            setRotate(true);
            setRotateContent(true);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching quotes</div>;

    return (
        <div className="total">
            <Box className={`quote-container ${rotate ? 'rotate' : ''}`}>
                {currentQuote && (
                    <Box mb={3} className={`quote ${rotateContent ? 'rotate' : ''}`}>
                        <Typography variant="h4" className="quote-text">"{currentQuote.text}"</Typography>
                        <Typography variant="subtitle1" className="quote-author">- {currentQuote.author}</Typography>
                    </Box>
                )}
                <Button variant="contained" className={`get-quote-button ${rotateContent ? 'rotate' : ''}`} color="secondary" onClick={handleButton}>
                    Get Quote
                </Button>
            </Box>
        </div>
    );
};

export default QuoteDisplay;
