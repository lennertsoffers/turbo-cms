import {
    PayloadCollections,
    PayloadCollectionSlug
} from "./payload-collection.type";

export type BulkOperationResult<TCollection extends PayloadCollectionSlug> = {
    docs: PayloadCollections[TCollection][];
    errors: {
        id: PayloadCollections[TCollection]["id"];
        message: string;
    }[];
};
