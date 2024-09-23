"use client"


import {useState} from "react";
import {ITag} from "@/interfaces";
import {useMutation, useQueries, useQuery, useQueryClient} from "@tanstack/react-query";
import TagFetcher from "@/services/fetchers/TagFetcher";
import {toast} from "react-toastify";
import {Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const PaperProps = {
  style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
  },
};

interface IManageTagsBoxProps {
  productName: string
}


export default function ManageTagsBox(props: IManageTagsBoxProps) {
  const {productName} = props

  const mutateTags = useMutation({
    mutationFn: (foo: Function) => foo(),
    onError: () => toast.error("Щось сталося не так"),
    onSuccess: () => client.invalidateQueries({queryKey: ["related-tags", productName]}),
  })

  const client = useQueryClient();

  const [q_tags, q_related_tags] = useQueries({
    queries: [
      {
        queryKey: ["tags"],
        queryFn: async () => TagFetcher.getAllTags(),
      },
      {
        queryKey: ["related-tags", productName],
        queryFn: async () => TagFetcher.getTagsRelatedToProduct(productName),
      }
    ]
  })

  if (q_tags.isLoading || q_related_tags.isLoading) return (
    <>
      Loading...
    </>
  )

  if (!q_tags.data || !q_related_tags.data) return (
    <>
      Something is wrong
    </>
  )


  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      <div className="flex flex-wrap gap-2">
        {q_related_tags.data.items.map(item => (
          <Chip
            label={item.name}
            onDelete={() => mutateTags.mutate(() => TagFetcher.unpinTagFromProduct(item.name, productName))}
          />
        ))}
      </div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Теги</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(e) => {
            const value = e.target.value as string
            if (!q_related_tags.data.items.some(item => item.name === value)) {
              mutateTags.mutate(() => TagFetcher.attachTagToProduct(value, productName))
            } else {
              toast.warn(`Цей продукт вже пов'язаний з тегом ${value}`)
            }
          }}
          MenuProps={{disableScrollLock: true, PaperProps: PaperProps}}
        >
          {q_tags.data.items.map((tag, i) => (
            <MenuItem value={tag.name} key={tag.name}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}