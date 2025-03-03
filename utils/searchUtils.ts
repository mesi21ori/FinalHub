export interface Content {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    contentType: string;
    accessLevel: string;
}

/**
 * Filters content based on search term and criteria
 * @param contentList List of content to search from
 * @param searchTerm The search input from the user
 * @param searchFields The fields to search in (title, description, etc.)
 * @returns Filtered content based on the search term
 */
export const filterContent = (
    contentList: Content[],
    searchTerm: string,
    searchFields: (keyof Content)[]
): Content[] => {
    if (!searchTerm) return contentList;

    return contentList.filter(content =>
        searchFields.some(field =>
            content[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
};
