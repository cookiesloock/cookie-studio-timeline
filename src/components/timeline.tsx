/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';

import { TimelineRow } from './timeline-row';
import { TimelineItem } from './timeline-item';
import { updateTimelineData } from './utils';
import { DEFAULT_DATA } from './contants';

export function Timeline() {
  const [selected, setSelected] = useState<any | null>(null)
  const [rows, setRows] = useState(DEFAULT_DATA)

  const itemId = selected?.item?.id
  const oldRowId = selected?.row?.id

  const handleSetItem = (row: any, item: any) => setSelected({
    row: { id: row.id, main: row.main },
    item: item
  })

  function handleItemDropShort(nextRowId: any, nextPosition: any) {
    const nextRow = rows.find(({ id }) => id === nextRowId)

    if(nextPosition) {
      setRows(
        (oldRows) => updateTimelineData({
          offsetX: nextPosition,
          oldRows,
          oldRowId,
          nextRowId,
          selected,
          nextRow,
          itemId
        })
      )
      setSelected(null)
    }
  }

  function handleItemDrop(event: any) {
    const nextPosition = (selected.item.x + event.nativeEvent.offsetX) - (selected.item.elementX)

    setRows(
      (oldRows) => oldRows.map(
        (row) => ({
          ...row,
          items: row.items.map(
            (item) => item.id !== itemId 
              ? item 
              : ({ ...item, x: selected.row?.main ? 0 : nextPosition })
          )
        })
      )
    )
    setSelected(null)
  }

  function resizeItem(itemId: string, width: number) {
    setRows(
      (oldRows) => oldRows.map((row) => ({
        ...row,
        items: row.items.map((item) => item.id !== itemId ? item : ({
          ...item,
          width: width
        }))
      }))
    )
  }

  function handleRowDrop(event: any) {
    const nextRowId = event.target.id
    const nextRow = rows.find(({ id }) => id === nextRowId)

    if(event.nativeEvent.offsetX) {
      setRows(
        (oldRows) => updateTimelineData({
          offsetX: event.nativeEvent.offsetX,
          oldRows,
          oldRowId,
          nextRowId,
          selected,
          nextRow,
          itemId
        })
      )
      setSelected(null)
    }
  }

  return (
    <div className="p-5 m-5 mt-10 bg-black rounded-md">
      <div className="space-y-2 p-2 border w-full rounded-md">
        <div className="flex flex-col space-y-2">
          
          {/* show rows */}
          {rows.map((row: any) => (
            <TimelineRow
              key={row.id}
              data={row}
              handleRowDrop={handleRowDrop}
              selected={selected}
            >
              
              {/* show items */}
              {row.items.map((item: any) => (
                <TimelineItem
                  key={item.id}
                  data={item}
                  rowId={row.id}
                  selected={selected}
                  isMain={row.main}
                  handleItemDrop={handleItemDrop}
                  handleItemDropShort={handleItemDropShort}
                  setSelected={(e: any) => !e ? setSelected(null) : handleSetItem(row, e)}
                  resizeItem={resizeItem}
                />
              ))}

            </TimelineRow>
          ))}

        </div>
      </div>
    </div>
  )
}