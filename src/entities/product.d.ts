export enum closureEnum {
    natureCork = "nature cork",
    syntheticCork = "synthetic cork",
    screwCork = "screw cork",
}

export enum sweetnessEnum {
    dry = "dry",
    medium = "medium",
    sweet = "sweet",
}

export enum storageTypeEnum {
    steelTank = "steel tank",
    barrel = "barrel",
}

export enum typeEnum {
    wine = "wine",
}

export enum statusEnum {
    pending = "pending",
    published = "published",
}

export interface Base {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    version: string;
}

export interface Wine extends Base {
    title: string;
    color: colorEnum;
    ean: string;
    type: typeEnum;
    country: string;
    region: string;

    currency?: string;
    status?: statusEnum = statusEnum.pending;
    imageUrl?: string;
    producer?: string;
    vintage?: number;
    rrp?: number;
    highestPrice?: number;
    lowestPrice?: number;
    gallery?: string[];
    description?: string;
    bottleSize?: number;
    category?: string[];
    grapes?: string[];
    closure?: closureEnum;
    alcoholPercentage?: number;
    sugarLevel?: number;
    sweetness?: sweetnessEnum;
    bio?: boolean;
    vegan?: boolean;
    storageType?: storageTypeEnum;
}
