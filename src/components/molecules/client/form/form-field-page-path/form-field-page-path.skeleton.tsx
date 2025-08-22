"use client";

import classNames from "classnames";

import styles from "./form-field-page-path.module.scss";

type FormFieldPagePathSkeletonProps = {};

export const FormFieldPagePathSkeleton = ({}: FormFieldPagePathSkeletonProps) => {
    return (
        <>
            <li className={classNames(
                styles["form-field-page-path__suggestion"],
                styles["form-field-page-path__skeleton"]
            )}
            >
                <span />
            </li>
            <li className={classNames(
                styles["form-field-page-path__suggestion"],
                styles["form-field-page-path__skeleton"]
            )}
            >
                <span />
            </li>
            <li className={classNames(
                styles["form-field-page-path__suggestion"],
                styles["form-field-page-path__skeleton"]
            )}
            >
                <span />
            </li>
            <li className={classNames(
                styles["form-field-page-path__suggestion"],
                styles["form-field-page-path__skeleton"]
            )}
            >
                <span />
            </li>
            <li className={classNames(
                styles["form-field-page-path__suggestion"],
                styles["form-field-page-path__skeleton"]
            )}
            >
                <span />
            </li>
        </>
    );
};
