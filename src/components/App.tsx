import React, { useEffect, useState } from "react";
import useSound from 'use-sound';
import styled from 'styled-components';
import { ShadowButton } from '../styles/ButtonsStyle'; 
import { FlexColumnFullCenter } from '../styles/FlexStyles'; 
import MiniGame from './subComponents/MiniGame'
import TableResults from './subComponents/TableResults'
import {GameScore} from '../types/interfaces'

import clickSound from '../assets/sounds/click.mp3';
import { FaPlay } from "react-icons/fa";

import { useTranslation } from '../contexts/LanguageContext';

type DifficultyLevel = 'easy' | 'medium' | 'hard';


const difficulties: Record<DifficultyLevel, { numChars: number; time: number }> = {
  easy: { numChars: 6, time: 30 },
  medium: { numChars: 6, time: 20 },
  hard: { numChars: 6, time: 10 }
};

const possibleChars = 'abcdefghijklmnopqrstuvwxyz';


const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  display:flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items:center;
  background-color: ${props => props.theme.primaryBlueColor};
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
      width: 5px;
      display: auto;
  }

  &::-webkit-scrollbar-track {
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.149);
      background: rgba(255, 255, 255, 0.051);
  }

  &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.149);
      background: ${props => props.theme.whiteColor};
  }
`

const Main = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width: 100%; 
  padding:20px;
  box-sizing: border-box;
`;

const Controls = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom:30px;
`;

const CheckboxWrapper = styled.div`
  display:flex;
  flex-direction:row;
  color:${props => props.theme.whiteColor};
`;

const CheckboxLabel = styled.label<{active:boolean}>`
  margin: 0px 10px 20px 10px;
  cursor: pointer;
  color:${props => props.active ? props.theme.yellowColor : props.theme.whiteColor};
`;


const App: React.FC = () => {
  const { translations } = useTranslation();

  const [gameScores, setGameScores] = useState<GameScore[]>(() => {
    const localData = localStorage.getItem('gameScores');
    return localData ? JSON.parse(localData) : [];
  });

  const [attemptNumber, setAttemptNumber] = useState<number>(() => {
    const localData = localStorage.getItem('attemptNumber');
    return localData ? parseInt(localData, 10) : 0;
  });

  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('medium');
  const [characters, setCharacters] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const [clickPlay] = useSound(clickSound, { volume: 0.1 });
  
  const generateCharacters = (numChars: number): { characters: string, attempt: number } => {
    let characters = '';
    let attemptNumberCopy = attemptNumber
    for (let i = 0; i < numChars; i++) {
      characters += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return { characters, attempt: ++attemptNumberCopy };
  };

  useEffect(() => {
    localStorage.setItem('gameScores', JSON.stringify(gameScores));
  }, [gameScores]);

  useEffect(() => {
    localStorage.setItem('attemptNumber', attemptNumber.toString());
  }, [attemptNumber]);

  const handleGameEnd = (result:GameScore) => {
    setGameScores(prevScores => [...prevScores, { attempt: result.attempt, score: result.score, sequency:result.sequency }]);
  };

  const startGame = () => {
    const result = generateCharacters(difficulties[currentDifficulty].numChars);
    setCharacters(result.characters);
    setAttemptNumber(prev => prev + 1);
    setGameStarted(true);
  };

  const handleGenerateNewCharacters = () => {
    const result = generateCharacters(difficulties[currentDifficulty].numChars);
    setCharacters(result.characters);
    setAttemptNumber(prev => prev + 1);
  };

  const handleClose = () => {
    setGameStarted(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyPress = (event: KeyboardEvent) => {
    if (!gameStarted) {
        if (event.key === ' ') {
            startGame();
            return;
        }
    }
  };

  useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <Container>
        <Main>
          <Controls>
            <Logo src="https://cidadealtarp.com/imagens/challenge/cidade-alta.png" alt="Logo Cidade Alta" />
            <CheckboxWrapper>
              {Object.keys(difficulties).map(key => (
                <CheckboxLabel key={key}  active={currentDifficulty === key} 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentDifficulty(key as DifficultyLevel);
                    clickPlay(); 
                  }}
                >

                {translations.App[key]}
                </CheckboxLabel>
              ))}
            </CheckboxWrapper>
            <ShadowButton onClick={startGame}><FlexColumnFullCenter><FaPlay size={20} style={{marginBottom:'10px'}}/>{translations.App.start}</FlexColumnFullCenter></ShadowButton>
          </Controls>
          <TableResults gameScores={gameScores} />
        </Main>

      {gameStarted && (
        <MiniGame
          characters={characters}
          attemptNumber={attemptNumber}
          time={difficulties[currentDifficulty].time}
          possibleChars={possibleChars}
          onGameClose={handleClose}
          onGameEnd={handleGameEnd}
          onGenerateNewCharacters={handleGenerateNewCharacters}
        />
      )}
    </Container>
  );
};

export default App;
