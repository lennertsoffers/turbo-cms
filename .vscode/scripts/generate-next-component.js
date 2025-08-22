import path from "path";
import fs from "fs";

const kebabToPascalCase = (snakeStr) =>
    snakeStr
        .toLowerCase()
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

const environment = process.argv.at(2);
const componentNameKebabCase = process.argv.at(3);
const outputDirName = process.argv.at(4);

if (!outputDirName) {
    console.error("Error: No output directory name provided");
    process.exit(1);
}

if (!fs.existsSync(outputDirName)) {
    console.error("Error: Output directory does not extist");
    process.exit(1);
}

if (!environment) {
    console.error("Error: No environment provided");
    process.exit(1);
}

if (!componentNameKebabCase) {
    console.error("Error: No component name provided");
    process.exit(1);
}

const componentNamePascalCase = kebabToPascalCase(componentNameKebabCase);

const nextContainerTemplate = path.join(
    __dirname,
    `templates/next.${environment}.container.tsx.txt`,
);
const nextComponentTemplate = path.join(
    __dirname,
    `templates/next.${environment}.component.tsx.txt`,
);
const nextStyleModuleTemplate = path.join(
    __dirname,
    `templates/next.${environment}.module.scss.txt`,
);

const templatePaths = [
    nextContainerTemplate,
    nextComponentTemplate,
    nextStyleModuleTemplate,
];

templatePaths.forEach((templatePath) => {
    if (!fs.existsSync(templatePath)) {
        console.error("Error: Template file not found", templatePath);
        process.exit(1);
    }
});

templatePaths.forEach((templatePath) => {
    const template = fs.readFileSync(templatePath, "utf-8");

    const renderedTemplate = template
        .replaceAll("{{component}}", componentNameKebabCase)
        .replaceAll("{{Component}}", componentNamePascalCase);

    const fileName = path
        .basename(templatePath, ".txt")
        .replace("next", componentNameKebabCase)
        .replace(`${environment}.`, "");

    const filePath = path.join(outputDirName, fileName);

    fs.writeFileSync(filePath, renderedTemplate, "utf-8");

    console.log(`Generated ${fileName}`);
});
