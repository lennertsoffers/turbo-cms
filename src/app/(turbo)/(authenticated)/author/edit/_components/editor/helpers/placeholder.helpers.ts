import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { Id } from "@turbo-cms/types-models/id.types";

import { PLACEHOLDER_ID } from "../../../config";

import { removeById } from "./component.helpers";

type IsNotPlaceHolder = ({ id }: { id: Id; }) => boolean;
export const isNotPlaceholder: IsNotPlaceHolder = ({ id }) =>
    id !== PLACEHOLDER_ID;

type RemovePlaceholder = (
    component: ComponentModel
) => ComponentModel | undefined;
export const removePlaceholder: RemovePlaceholder = (component) =>
    removeById(component)(PLACEHOLDER_ID);
