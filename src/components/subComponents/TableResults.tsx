import React from 'react';
import styled from 'styled-components';
import { CharactersWrapper, CharacterContainer } from '../../styles/SequencyStyle';
import { H1 } from '../../styles/TextStyles';
import {GameScore} from '../../types/interfaces'
import { useTranslation } from '../../contexts/LanguageContext';

interface TableResultsProps {
    gameScores:GameScore[];
}

const TableWrapper = styled.div`
    width:fit-content;
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin-top:20px;
    background-color:${props => props.theme.secondBlueColor};
    -webkit-box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
    -moz-box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
    box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
    border-radius:1vh;

    @media (max-width: 600px) {
        width:90%
    }
`;

const Table = styled.table`
    display:flex;
    flex-direction:column;
    max-height:450px;
    padding:20px;
    color: ${props => props.theme.whiteColor};
`;

const Thead = styled.thead`
    width: 100%;
    border-bottom:1px solid ${props => props.theme.whiteColor};
    margin-bottom:10px;
`;

const Tbody = styled.tbody`
    width: 100%;
    overflow-y:auto;


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
`;

const Tr = styled.tr`
    display:flex;
    width: 100%;
    justify-content:left;
    align-items:center;
`;

const Th = styled.th`
    padding: 8px;
    text-align: center;

    &:nth-child(1) {
        min-width: 80px;
        max-width: 80px;
    }

    &:nth-child(2) {
        min-width: 120px;
        max-width: 120px;
    }

    &:nth-child(3) {
        min-width: fit-content;
        max-width: 500px;
    }
`;

const Td = styled.td`
    padding: 8px;
    text-align: center;

    &:nth-child(1) {
        min-width: 80px;
        max-width: 80px;
    }

    &:nth-child(2) {
        min-width: 120px;
        max-width: 120px;
    }

    &:nth-child(3) {
        min-width: fit-content;
        max-width: 500px;
    }
`;

const TableResults: React.FC<TableResultsProps> = ({ gameScores }) => {
    const { translations } = useTranslation();
    return (
        <>  
            <H1 style={{marginTop: '20px'}}>{translations.TableResults.title}</H1>
            <TableWrapper>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>{translations.TableResults.attempt}</Th>
                            <Th>{translations.TableResults.time}</Th>
                            <Th>{translations.TableResults.sequence}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {gameScores.sort((a, b) => a.score - b.score).map((score, index) => (
                            <Tr key={index}>
                                <Td>#{score.attempt}</Td>
                                <Td>{score.score} seg</Td>
                                <Td>
                                    <CharactersWrapper>
                                        {score.sequency.split('').map((char, index) => (
                                            <CharacterContainer key={index} active={true}>
                                                {char}
                                            </CharacterContainer>
                                        ))}
                                    </CharactersWrapper>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableWrapper>
        </>

    )
}

export default TableResults;