import { compareItems, RankingInfo, rankItem } from "@tanstack/match-sorter-utils"
import { FilterFn, SortingFn, sortingFns } from "@tanstack/react-table"

declare module '@tanstack/react-table' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!,
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

const isWithinRange: FilterFn<any> = (row, columnId, value) => {
    const date = new Date(row.getValue(columnId))
    let [start, end] = value
    start = start ? new Date(start) : null
    end = end ? new Date(end) : null
    //If one filter defined and date is null filter it
    if ((start || end) && !date) return false
    if (start && !end) {
        return date.getTime() >= start.getTime()
    } else if (!start && end) {
        return date.getTime() <= end.getTime()
    } else if (start && end) {
        return date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
    } else return true
}

export { fuzzyFilter, fuzzySort, isWithinRange }