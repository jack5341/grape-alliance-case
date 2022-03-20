import { Query, RequestHandlerParams, Request } from "express-serve-static-core";

export interface RelatedQuery extends Query {
    id?: string;
    page?: string;
    limit?: string;
}

export interface WineQuery extends Query {
    title?: string;
    country?: string;
    winery?: string;
    color?: string;
    page?: string;
    limit?: string;
}
