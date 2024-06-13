export interface GameScore {
    attempt: number;
    score: number;
    sequency: string;
}

interface TranslationDetails {
    [key: string]: string;
}

export interface Translations {
    [componentName: string]: TranslationDetails;
}