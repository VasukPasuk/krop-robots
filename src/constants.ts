const CategoriesCheckBoxData = [
  {name: "All", label: "Всі"},
  {name: "Accessories", label: "Аксесуари"},
  {name: "Puzzles", label: "Головоломки"},
  {name: "Toys", label: "Іграшки"}
]

const CategoriesCheckBoxDataObj = {
  "All": {
    label: "Всі"
  },
  "Accessories": {
    label: "Аксесуари"
  },
  "Puzzles": {
    label: "Головоломки"
  },
  "Toys": {
    label: "Іграшки"
  }
}


export enum BASIC_CATEGORIES {
  "All" = "Всі"
}

export enum URLS {
  ADMIN_ROOT_URL = "/d033e22ae348aeb5660fc2140aec35850c4da997"
}


export const MAX_ITEMS_TO_VIEW_IN_CATALOG: number = 30;


export {
  CategoriesCheckBoxData,
  CategoriesCheckBoxDataObj
}