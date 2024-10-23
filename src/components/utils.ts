/* eslint-disable @typescript-eslint/no-explicit-any */

export function verifyWhatsNeed({ oldRowId, nextRowId, row }: any) {
  const isDiferentRow = oldRowId !== nextRowId
  const isOldRow = row.id === oldRowId
  const isNextRow = row.id === nextRowId

  const needRemoveFromRow = isOldRow && isDiferentRow
  const needAddToRow = isNextRow && isDiferentRow
  const needMoveInRow = isNextRow

  return {
    needRemoveFromRow,
    needAddToRow,
    needMoveInRow
  }
}

export function updateTimelineData({
  offsetX,
  oldRows,
  oldRowId,
  nextRowId,
  selected,
  nextRow,
  itemId
}: any) {
  return oldRows.map(
    (row: any) => {
      const {
        needRemoveFromRow,
        needAddToRow,
        needMoveInRow
      } = verifyWhatsNeed({ oldRowId, row, nextRowId })

      if (needRemoveFromRow) {
        return {
          ...row,
          items: row.items.filter(({ id }: any) => id !== itemId)
        }
      }

      if (needAddToRow) {
        return {
          ...row,
          items: [
            ...row.items,
            {
              ...selected.item,
              x: nextRow?.main ? 0 : offsetX-(selected.item.elementX)
            }
          ]
        }
      }

      if (needMoveInRow) {
        return {
          ...row,
          items: row.items.map(
            (item: any) => item.id !== itemId ? item : ({
              ...item,
              x: nextRow?.main ? 0 : offsetX-(selected.item.elementX)
            })
          )
        }
      }

      return row
    }
  )
}