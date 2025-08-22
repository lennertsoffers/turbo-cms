"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    GridIcon,
    PaintBoardIcon,
    PlusSignSquareIcon,
    TextSquareIcon
} from "hugeicons-react";

import { IconButton } from "@turbo-cms/components-general/shared/button/icon-button";
import { Variable } from "@turbo-cms/config/payload/payload.types";
import {
    VariableType,
    VariableTypeEnum
} from "@turbo-cms/types-models/author/variable-type.enum";

import { useEditorContext } from "../../../../../../context/editor.context";

import { VariableTypeToDefaultVariableMap } from "./config/default-variable.config";
import { VariablesConfigFormComponent } from "./variables-config-form.component";
import {
    createVariable,
    deleteVariable,
    updateVariable
} from "./variables-config-form.queries";

import styles from "./variables-config-form.module.scss";

type VariablesConfigFormProps = {};

export const VariablesConfigForm = ({}: VariablesConfigFormProps) => {
    const queryClient = useQueryClient();

    const { variables } = useEditorContext();

    const { mutate: createVariableMutation } = useMutation(
        {
            mutationFn: createVariable,
            onMutate: async (newVariable) => {
                await queryClient.cancelQueries({
                    queryKey: [ "variables" ]
                });

                const previousItems = queryClient.getQueryData([ "variables" ]);

                queryClient.setQueryData<Partial<Variable>[]>(
                    [ "variables" ],
                    (oldVariables) => [
                        ...(oldVariables || []),
                        {
                            ...newVariable,
                            id: crypto.randomUUID()
                        }
                    ]
                );

                return {
                    previousItems
                };
            },
            onError: (_err, _newItem, context) => {
                queryClient.setQueryData(
                    [ "variables" ],
                    context?.previousItems
                );
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [ "variables" ]
                });
            }
        }
    );

    const { mutate: deleteVariableMutation } = useMutation(
        {
            mutationFn: deleteVariable,
            onMutate: async (deletedVariable) => {
                await queryClient.cancelQueries({
                    queryKey: [ "variables" ]
                });

                const previousItems = queryClient.getQueryData([ "variables" ]);

                queryClient.setQueryData<Variable[]>(
                    [ "variables" ],
                    (oldVariables) => oldVariables?.filter(({ id }) => id !== deletedVariable.id)
                );

                return {
                    previousItems
                };
            },
            onError: (_err, _newItem, context) => {
                queryClient.setQueryData(
                    [ "variables" ],
                    context?.previousItems
                );
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [ "variables" ]
                });
            }
        }
    );

    const { mutate: updateVariableMutation } = useMutation(
        {
            mutationFn: updateVariable,
            onMutate: async (updatedVariable) => {
                await queryClient.cancelQueries({
                    queryKey: [ "variables" ]
                });

                const previousItems = queryClient.getQueryData([ "variables" ]);

                queryClient.setQueryData<Variable[]>(
                    [ "variables" ],
                    (oldVariables) =>
                        oldVariables?.map(
                            (oldVariable) => oldVariable.id === updatedVariable.id
                                ? {
                                    ...oldVariable,
                                    ...updatedVariable
                                }
                                : oldVariable
                        )
                );

                return {
                    previousItems
                };
            },
            onError: (_error, _updatedItem, context) => {
                queryClient.setQueryData(
                    [ "variables" ],
                    () => context?.previousItems
                );
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [ "variables" ]
                });
            }
        }
    );

    const createCreateVariable =
        (type: VariableTypeEnum) =>
        () => createVariableMutation({
            ...VariableTypeToDefaultVariableMap[type],
            type: type,
            name: crypto.randomUUID()
        });

    return (
        <>
            <VariablesConfigFormComponent
                deleteVariable={deleteVariableMutation}
                updateVariable={updateVariableMutation}
                variables={variables}
            />

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <IconButton
                        Icon={PlusSignSquareIcon}
                        color={"primary"}
                        ghost={true}
                        title={"create variable"}
                    >
                        {"create variable"}
                    </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className={styles["variables-config-form__dropdown"]}>
                        <DropdownMenu.Item
                            className={styles["variables-config-form__dropdown__item"]}
                            onSelect={createCreateVariable(VariableType.COLOR)}
                        >
                            <PaintBoardIcon className={styles["variables-config-form__dropdown__item__icon"]} />
                            <span>
                                {"color"}
                            </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className={styles["variables-config-form__dropdown__item"]}
                            onSelect={createCreateVariable(VariableType.TEXT)}
                        >
                            <TextSquareIcon className={styles["variables-config-form__dropdown__item__icon"]} />
                            <span>
                                {"text"}
                            </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className={styles["variables-config-form__dropdown__item"]}
                            onSelect={createCreateVariable(VariableType.NUMBER)}
                        >
                            <GridIcon className={styles["variables-config-form__dropdown__item__icon"]} />
                            <span>
                                {"number"}
                            </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Arrow className={styles["variables-config-form__dropdown__arrow"]} />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </>
    );
};
