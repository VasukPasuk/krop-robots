"use client"
import {useQueries} from "@tanstack/react-query";
import CategoryFetcher from "@/services/fetchers/CategoryFetcher";
import TagFetcher from "@/services/fetchers/TagFetcher";
import FilterAside from "@/custom-components/ui/(client)/CatalogPage/Filter/Filter";

function CatalogFilter() {
  const [categories, tags] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => CategoryFetcher.getMany(),
      },
      {
        queryKey: ["tags"],
        queryFn: () => TagFetcher.getAllTags("limit=1000"),
      }
    ]
  })

  if (categories.isLoading || tags.isLoading) {
    return (
      <>
        Loading
      </>
    )
  }

  if (!categories.data || !tags.data) {
    return (
      <>
        Error
      </>
    )
  }

  return (
    <FilterAside>
      <FilterAside.Accordion>
        <FilterAside.Accordion.Item
          title={(
            <FilterAside.Accordion.Title>
              Категорії
            </FilterAside.Accordion.Title>
          )}
          body={(
            <FilterAside.Accordion.Body>
              {categories.data.items.map(category => (
                <FilterAside.Accordion.Option name={category.name}/>
              ))}
            </FilterAside.Accordion.Body>
          )}
        >
        </FilterAside.Accordion.Item>
        <FilterAside.Accordion.Item
          title={(
            <FilterAside.Accordion.Title>
              Теги
            </FilterAside.Accordion.Title>
          )}
          body={(
            <FilterAside.Accordion.Body>
              {tags.data.items.map(tag => (
                <FilterAside.Accordion.Option name={tag.name}/>
              ))}
            </FilterAside.Accordion.Body>
          )}
        >
        </FilterAside.Accordion.Item>
      </FilterAside.Accordion>
    </FilterAside>
  )
}

export default CatalogFilter;