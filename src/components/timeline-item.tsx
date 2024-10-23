/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useState } from 'react';
import { useMouse } from "@uidotdev/usehooks";
import Resize from './resize';

export function TimelineItem(props: any) {
  const {
    data,
    setSelected,
    isMain,
    rowId,
    handleItemDrop,
    resizeItem,
    selected,
  }: any = props

  const [mouse, ref] = useMouse();

  const [active, setActive] = useState(false)
  const [isHover, setHover] = useState(false)

  const onDragStart = useCallback((_e: any) => {
    setSelected({ ...data, elementX: mouse.elementX })
    setActive(true)
  }, [data, mouse.elementX, setSelected])

  function onDragEnter(_e: any) {
    setHover(true)
  }

  // function onDragOverCapture(e: any) {
  //   props.onDragOverCapture({
  //     ...e,
  //     preventDefault: () => null,
  //     nativeEvent: {
  //       ...e.nativeEvent,
  //       offsetX: data.x+e.nativeEvent.offsetX
  //     }
  //   })
  // }

  function onDragOver(e: any) {
    e.preventDefault()
  }

  function onDragLeave() {
    setHover(false)
    props.onDragLeave()
  }

  function onDragEnd(e: any) {
    if (active && isHover) {
      handleItemDrop(e)
    }
    setSelected(null)
    setActive(false)
  }

  function onDrag(_e: any) {}

  const containerClass = isMain ? '' : 'absolute top-0'
  const styles = isMain ? {} : { left: data.x }



  const xIntersecting = mouse.elementX > 0 && mouse.elementX < data.width;
  const yIntersecting = mouse.elementY > 0 && mouse.elementY < 40;
  const isIntersecting = xIntersecting && yIntersecting;

  const [isLeftHover, setLeftHver] = useState(false)
  const [isRightHover, setRightHver] = useState(false)

  return (
    <div className={containerClass} style={styles}>
      <div className="relative" ref={ref as any}>
        <Resize data={data} active={active} resizeItem={resizeItem}>
          <div className="flex">
            <span className={isIntersecting ? '' : ''}>{data.x}</span>
          </div>
        </Resize>
        {selected?.item?.id ? (
          <>
            {isLeftHover ? <div
              style={{ width: selected?.item?.width, left: -selected?.item?.width }}
              className="absolute top-0 h-10 border-2 border-dashed"
            /> : null}
            <div
              onDragEnter={() => setLeftHver(true)}
              onDragLeave={() => setLeftHver(false)}
              onDrop={() => props.handleItemDropShort(rowId, data.x-selected?.item?.width+selected?.item?.elementX)}
              onDragOverCapture={(event) => event.preventDefault()}
              style={{ width: (selected?.item?.width-selected?.item?.elementX)+20, left: -((selected?.item?.width-selected?.item?.elementX)+20) }}
              className="absolute top-0 h-10 bg-blue-400 opacity-0"
            />
            {isRightHover ? <div
              style={{ width: selected?.item?.width, right: -selected?.item?.width }}
              className="absolute top-0 h-10 border-2 border-dashed"
            /> : null}
            <div
              onDragEnter={() => setRightHver(true)}
              onDragLeave={() => setRightHver(false)}
              onDrop={() => props.handleItemDropShort(rowId, data.x+selected?.item?.width+selected?.item?.elementX)}
              onDragOverCapture={(event) => event.preventDefault()}
              style={{ width: selected?.item?.elementX+20, right: -(selected?.item?.elementX+20) }}
              className="absolute top-0 h-10 bg-blue-400 opacity-0"
            />
          </>
        ) : null}
        <div
          id={rowId}
          className={active
            ? "absolute top-0 left-0 h-full w-full"
            : "absolute top-0 left-0 h-full w-[calc(100%-8px)]"
          }
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          // onDragOverCapture={onDragOverCapture}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
          draggable
        />
      </div>
    </div>
    
  )
}
