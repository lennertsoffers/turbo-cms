import { Variable } from "@turbo-cms/config/payload/payload.types";
import { PayloadClient } from "@turbo-cms/payload/api/rest";
import { Id } from "@turbo-cms/types-models/id.types";

export type CreateVariable = (variable: Partial<Variable>) => Promise<Variable>;
export const createVariable: CreateVariable = (variable) =>
    PayloadClient.create("variables")(variable);

type DeleteVariable = (variable: Variable) => Promise<void>;
export const deleteVariable: DeleteVariable = async ({ id }) => {
    await PayloadClient.deleteById("variables")({
        id: id
    });
};

type UpdateVariable = (variable: { id: Id; } & Partial<Variable>) => Promise<Variable>;
export const updateVariable: UpdateVariable = (variable) =>
    PayloadClient.updateById("variables")(
        variable.id,
        variable
    );
