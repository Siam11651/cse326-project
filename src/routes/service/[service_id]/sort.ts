export enum SortMethod
{
    COST = 0,
    DISC = 1,
    RATE = 2,
    DIST =3
}

export const SORT_NAMES =
{
    0: "Cost",
    1: "Discount",
    2: "Rate",
    3: "Distance"
}

export const SORT_ROUTES = 
{
    0: "/api/sort/cost_sort",
    1: "/api/sort/discount_sort",
    2: "/api/sort/rating_sort",
    3: "/api/sort/locn_sort"
}