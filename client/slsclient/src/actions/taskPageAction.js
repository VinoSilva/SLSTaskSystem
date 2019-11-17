export const CHANGEPAGE = "CHANGEPAGE";
export const GET_PAGE_SUCCESSFUL = "GETPAGESUCCESSFUL";

export function changePage(){
    return {type: CHANGEPAGE};
}

export function getPageSuccessful(){
    return {type: GET_PAGE_SUCCESSFUL};
}