declare type Intent = {
    tag: string;
    patterns: string[];
    responses: string[];
}

declare type IntentsData = {
    intents: Intent[]
}