/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from 'react';
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

  // const xIntersecting = mouse.elementX > 0 && mouse.elementX < data.width;
  // const yIntersecting = mouse.elementY > 0 && mouse.elementY < 40;
  // const isIntersecting = xIntersecting && yIntersecting;

  const [isLeftHover, setLeftHver] = useState(false)
  const [isRightHover, setRightHver] = useState(false)
  const [hasSelected, setHasSelected] = useState(selected)

  useEffect(() => {
    if(!selected) {
      setLeftHver(false)
      setRightHver(false)
      setHasSelected(null)
    } else {
      setTimeout(() => {
        setHasSelected(selected)
      }, 100);
    }
  }, [selected])

  return (
    <div className={containerClass} style={styles}>
      <div className="relative" ref={ref as any}>
        <Resize data={data} active={active} resizeItem={resizeItem}>
          <div className="flex items-center space-x-2 h-full px-3">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            <span className='text-sm font-semibold'>Image</span>
            {/* <span className={isIntersecting ? '' : ''}>{data.x}</span> */}
          </div>
        </Resize>
        {hasSelected?.item?.id ? (
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
