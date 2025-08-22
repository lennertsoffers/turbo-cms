import {
    BasePayload,
    buildConfig,
    Config,
    deepMerge,
    getPayload,
    SanitizedConfig
} from "payload";

import BasePayloadConfig from "@/config/payload/payload.config";
import { logger } from "@/logger";
import { GlobalRef } from "@/utils/general/global.utils";
import { Resolve } from "@/utils/type/helper-types.utils";

type InitPayloadConfigs = (config: Config) => {
    unSanitizedConfig: Config;
    sanitizedConfig: Promise<SanitizedConfig>;
};
export const initPayloadConfigs: InitPayloadConfigs = (config) => {
    const finalConfig = deepMerge(
        BasePayloadConfig,
        config,
        {
            clone: true
        }
    );

    return {
        unSanitizedConfig: finalConfig,
        sanitizedConfig: buildConfig(finalConfig)
    };
};

class TurboHolder {

    private _initialized: boolean;

    private _payload: Promise<BasePayload>;

    private _payloadResolve: Resolve<BasePayload> | undefined;

    private _sanitizedPayloadConfig: Promise<SanitizedConfig>;

    private _sanitizedPayloadConfigResolve: Resolve<SanitizedConfig> | undefined;

    private _unSanitizedPayloadConfig: Promise<Config>;

    private _unSanitizedPayloadConfigResolve: Resolve<Config> | undefined;

    public constructor() {
        this._initialized = false;

        this._unSanitizedPayloadConfig = new Promise((resolve) => {
            this._unSanitizedPayloadConfigResolve = resolve;
        });

        this._sanitizedPayloadConfig = new Promise((resolve) => {
            this._sanitizedPayloadConfigResolve = resolve;
        });

        this._payload = new Promise((resolve) => {
            this._payloadResolve = resolve;
        });
    }

    public getPayload() {
        return this._payload;
    }

    public getSanitizedPayloadConfig() {
        return this._sanitizedPayloadConfig;
    }

    public getUnSanitizedPayloadConfig() {
        return this._unSanitizedPayloadConfig;
    }

    public async init(config: Config) {
        if(this._initialized) return;

        logger.info("Initialising Turbo...");

        if(
            !this._unSanitizedPayloadConfigResolve
            || !this._sanitizedPayloadConfigResolve
            || !this._payloadResolve
        ) {
            throw new Error("Turbo was not initialized correctly");
        }

        const { unSanitizedConfig, sanitizedConfig } = initPayloadConfigs(config);

        this._unSanitizedPayloadConfigResolve(unSanitizedConfig);
        this._sanitizedPayloadConfigResolve(await sanitizedConfig);

        this._payloadResolve(
            getPayload({
                config: await sanitizedConfig
            })
        );

        this._initialized = true;

        logger.info("Successfully initialised Turbo");
    }

}

const TurboRef = new GlobalRef<TurboHolder>("Turbo");
if(!TurboRef.value) {
    TurboRef.value = new TurboHolder();
}

export const Turbo = TurboRef.value;
