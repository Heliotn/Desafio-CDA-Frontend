import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import Lottie from 'react-lottie-player';
import styled, { useTheme } from 'styled-components';
import { CharactersWrapper, CharacterContainer } from '../../styles/SequencyStyle'; 
import { FlexRowFullCenter, FlexColumnFullCenter } from '../../styles/FlexStyles';
import { H1, Span } from '../../styles/TextStyles';
import { Button, CloseButton } from '../../styles/ButtonsStyle'; 
import {GameScore} from '../../types/interfaces'

import clickSound from '../../assets/sounds/click.mp3';
import applause from '../../assets/sounds/applause.mp3';
import glass from '../../assets/sounds/glass.mp3';


import confetti from '../../assets/animations/confetti.json';


import { useTranslation } from '../../contexts/LanguageContext';

import { MdOutlineReplay } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

interface MiniGameProps {
    characters:string;
    attemptNumber:number;
    time:number;
    possibleChars:string;
    onGameClose: () => void;
    onGameEnd: (result:GameScore) => void;
    onGenerateNewCharacters: () => void;
} 


interface boxsProp {
    isVisible: boolean;
}

const BoxContainer = styled.div<boxsProp>`
    position:absolute;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100vw;
    height:100vh;
    backdrop-filter: blur(2px);
    transition: opacity 1s ease, visibility .15s ease;
    opacity: ${props => props.isVisible ? 1 : 0};
    visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
`;

const Box = styled.div<boxsProp>`
    min-width:450px;
    max-width:700px;
    height:250px;
    background-color:${props => props.theme.secondBlueColor};
    -webkit-box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
    -moz-box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
    box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
    border-radius:1vh;
    transition: opacity .15s ease;
    opacity: ${props => props.isVisible ? 1 : 0};
`;

const BoxWrapper = styled.div`
    position:relative;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items:center;
    width:100%;
    height:100%;
    padding: 15px;
`;


const ProgressBarContainer = styled.div`
    align-self:center;
    position:relative;
    width: 100%;
    height: 5px;
    background-color: #eee;
    overflow: hidden;
    border-radius: 5px;
`;

const ProgressBar = styled.div<{ width: number }>`
    height: 5px;
    background-color: ${props => props.theme.yellowColor};
    width: ${props => props.width}%;
    position: absolute;
    left: 0;
    transition: width .1s ease;
    border-radius: 5px;
`;

const InfosWrapper = styled(FlexColumnFullCenter)`
    width:100%;
    height:100%;
    justify-content: space-around;
    align-items:center;
`;


const MiniGame: React.FC<MiniGameProps> = ({characters, attemptNumber, time, possibleChars, onGameEnd, onGameClose, onGenerateNewCharacters}) => {
    const theme = useTheme();
    const { translations } = useTranslation();

    const timeAjusted = (time * 10)
    const [isVisible, setIsVisible] = useState(false);
    const [charactersState, setCharacters] = useState(characters);
    const [activeIndices, setActiveIndices] = useState<boolean[]>(Array(charactersState.length).fill(false));
    const timerRef = useRef<number>(0);
    const [remainingTime, setRemainingTime] = useState(timeAjusted); 
    const [gameStatus, setGameStatus] = useState<'playing' | 'failed' | 'completed'>('playing');

    const [clickPlay] = useSound(clickSound, { volume: 0.1 });
    const [applausePlay, { stop }] = useSound(applause, { volume: 0.15 });
    const [glassPlay] = useSound(glass, { volume: 0.1 });

    const restartGame = () => {
        onGenerateNewCharacters();
        if (timerRef.current) clearInterval(timerRef.current);
        stop();
        setActiveIndices(Array(charactersState.length).fill(false));
        setRemainingTime(timeAjusted);
        setGameStatus('playing');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const closeGame = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        stop();
        setActiveIndices(Array(charactersState.length).fill(false));
        setGameStatus('playing');
        setIsVisible(false);
        setTimeout(() => {
            onGameClose();
        }, 150); 
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        setCharacters(characters);
    }, [characters]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyPress = (event: KeyboardEvent) => {

        if (event.key === 'Escape') {
            closeGame();
            return;
        } 

        if (gameStatus !== 'playing' || !possibleChars.includes(event.key.toLowerCase())) {
            if (event.key === ' ' && (gameStatus === 'failed' || gameStatus === 'completed')) {
                restartGame();
                return;
            }
            return;
        }

        const nextIndex = activeIndices.findIndex((active, index) => !active && index < charactersState.length);
        if (nextIndex !== -1 && event.key.toLowerCase() === charactersState[nextIndex].toLowerCase()) {
            const newActiveIndices = [...activeIndices];
            newActiveIndices[nextIndex] = true;
            setActiveIndices(newActiveIndices);
            clickPlay();
            if (newActiveIndices.every(Boolean)) {
                clearInterval(timerRef.current!);
                setGameStatus('completed');
                applausePlay();
                onGameEnd({attempt: attemptNumber, score: ((timeAjusted - remainingTime) / 10), sequency: charactersState});
            }
        } else { 
            glassPlay();          
            clearInterval(timerRef.current!);
            setGameStatus('failed');
        }
        
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => {
        if (gameStatus === 'playing') {
            timerRef.current = setInterval(() => {
                setRemainingTime(prevTime => {
                    const newTime = prevTime - 1;
                    if (newTime <= 0) {
                        clearInterval(timerRef.current!);
                        glassPlay();
                        setGameStatus('failed');
                    }
                    return newTime;
                });
            }, 100);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStatus]); 


    return (
        <BoxContainer isVisible={isVisible}>
            <Box isVisible={isVisible}>
                <BoxWrapper>
                    <CloseButton onClick={closeGame} style={{zIndex: '1' }}>X</CloseButton>

                    <H1>{translations.MiniGame.title}</H1>
                    {gameStatus === 'playing' && (
                        <>  
                            <Span>{translations.MiniGame.info} </Span>
                            <CharactersWrapper>
                                {charactersState.split('').map((char, index) => (
                                    <CharacterContainer key={index} active={activeIndices[index]}>
                                        {char}
                                    </CharacterContainer>
                                ))}
                            </CharactersWrapper>
                            
                            <ProgressBarContainer>
                                <ProgressBar width={(remainingTime / timeAjusted) * 100} />
                            </ProgressBarContainer>
                        </>
                    )}
                    {gameStatus === 'failed' && (
                        <InfosWrapper style={{zIndex: '1' }} >
                            <GiCancel size={50} style={{color: theme.redColor}}/>
                            <Span>{translations.MiniGame.fail}</Span>
                            <Button onClick={restartGame}><FlexRowFullCenter><MdOutlineReplay size={'1rem'} style={{marginRight:'5px'}} /> {translations.MiniGame.retry}</FlexRowFullCenter></Button>
                        </InfosWrapper>
                    )}
                    {gameStatus === 'completed' && (
                        <>  
                            <Lottie
                                loop={1}
                                animationData={confetti}
                                play
                                speed={1.5}
                                style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '0' }}
                            />

                            <InfosWrapper style={{zIndex: '1' }} >
                                <FaTrophy size={50} style={{color: theme.yellowColor}}/>
                                <Span>{translations.MiniGame.success}</Span>
                                <Button onClick={restartGame}><FlexRowFullCenter> <MdOutlineReplay size={'1rem'} style={{marginRight:'5px'}}/> {translations.MiniGame.playtry}</FlexRowFullCenter></Button>
                            </InfosWrapper>
                        </>
                    )}
                </BoxWrapper>
            </Box>

        </BoxContainer>
    )
}

export default MiniGame;