import { AxiosInstance } from "axios";

import { GlobalRef } from "@/utils/general/global.utils";
import { isDefined } from "@/utils/general/object.utils";

import {
    Create,
    createCreate
} from "./rest/create-where";
import {
    createDeleteById,
    DeleteById
} from "./rest/delete-by-id";
import {
    createFindById,
    FindById
} from "./rest/find-by-id";
import {
    createFindWhere,
    FindWhere
} from "./rest/find-where";
import {
    createUpdateById,
    UpdateById
} from "./rest/update-by-id";

class PayloadClientHolder {

    private _create: Create | undefined;

    private _deleteById: DeleteById | undefined;

    private _findById: FindById | undefined;

    private _findWhere: FindWhere | undefined;

    private _initialized: boolean;

    private _updateById: UpdateById | undefined;

    public constructor() {
        this._initialized = false;
    }

    public get create(): Create {
        if(!isDefined(this._create)) {
            throw new Error("PayloadClient is not initialized");
        }

        return this._create;
    }

    public get deleteById(): DeleteById {
        if(!isDefined(this._deleteById)) {
            throw new Error("PayloadClient is not initialized");
        }

        return this._deleteById;
    }

    public get findById(): FindById {
        if(!isDefined(this._findById)) {
            throw new Error("PayloadClient is not initialized");
        }

        return this._findById;
    }

    public get findWhere(): FindWhere {
        if(!isDefined(this._findWhere)) {
            throw new Error("PayloadClient is not initialized");
        }

        return this._findWhere;
    }

    public get updateById(): UpdateById {
        if(!isDefined(this._updateById)) {
            throw new Error("PayloadClient is not initialized");
        }

        return this._updateById;
    }

    public async init(axios: AxiosInstance) {
        if(this._initialized) return;

        this._findWhere = createFindWhere(axios);
        this._findById = createFindById(axios);
        this._create = createCreate(axios);
        this._updateById = createUpdateById(axios);
        this._deleteById = createDeleteById(axios);

        this._initialized = true;
    }

}

const PayloadClientRef = new GlobalRef<PayloadClientHolder>("PayloadClient");
if(!PayloadClientRef.value) {
    PayloadClientRef.value = new PayloadClientHolder();
}

export const PayloadClient = PayloadClientRef.value;
