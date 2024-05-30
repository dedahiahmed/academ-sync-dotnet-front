export const extensionChecker = (extension: string): string => {
    switch (extension) {
        case "pdf":
            return "pdf";
        case "doc":
        case "docx":
            return "word";
        case "xls":
        case "xlsx":
            return "excel";
        case "txt":
            return "txt";
        default:
            return "unknown";
    }
};