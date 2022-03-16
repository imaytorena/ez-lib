import { Stack, Text, Flex } from "@chakra-ui/react";

import { PaginationItem } from "./PaginationItem";

type Link = {
  active: boolean;
  label: string;
  url: string;
}

interface PaginationProps {
  last_page?: number;
  current_page?: number;
  links?: Link[];
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(siblingsCount)].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0)
}

export function Pagination({
  last_page,
  current_page,
  links,
  onPageChange
}: PaginationProps) {

  const previousPages = current_page > 1
    ? generatePagesArray(current_page - 1 - siblingsCount, current_page - 1)
    : []

  const nextPages = current_page < last_page
    ? generatePagesArray(current_page, Math.min(current_page + siblingsCount + last_page))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Flex direction="row" ml="auto">
        {current_page > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {current_page > (2 + siblingsCount) && (
              <Text
                mr="4"
                color="gray.300"
                width="8"
                textAlign="center"
              >
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          )
        })}

        <PaginationItem
          onPageChange={onPageChange}
          number={current_page}
          isCurrent
        />

        {nextPages.length > 0 && nextPages.map(page => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          )
        })}

        {(current_page + siblingsCount) < last_page && (
          <>
            {(current_page + 1 + siblingsCount) < last_page && (
              <Text
                mr="4"
                color="gray.300"
                width="8"
                textAlign="center"
              >
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={last_page} />
          </>
        )}
      </Flex>
    </Stack>
  )
}