/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react'
import { useState } from 'react';

export function TimelineRow({ children, selected, data, handleRowDrop }: any) {
  const [active, setActive] = useState(false)
  const [position, setPosition] = useState(0)

  const onDragOverCapture = (event: any) => {
    event.preventDefault();
    setActive(true)
    setPosition(event.nativeEvent.offsetX)
  }

  const onDragLeave = () => {
    setActive(false)
    setPosition(0)
  }

  const onDrop = (e: any) => {
    setActive(false)
    handleRowDrop(e)
  }

  const classes = {
    itemOverlay: `h-10 border-2 border-dashed`
  }

  const styles = {
    opacity: active ? 0.8 : 1,
    border: data.main ? 'solid 1px #777' : 'none'
  }

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      onDragOverCapture,
      onDragLeave
    })
  )

  const itemOverlay = {
    class: `absolute top-0 ${classes.itemOverlay}`,
    style: { width: selected?.item?.width, left: position-(selected?.item?.elementX), opacity: active ? 1 : 0 }
  }

  function renderOverlay(value: string) {
    if (value === 'absolute') {
      return (
        <>
          {!data.main && (
            <div className={itemOverlay.class} style={itemOverlay.style} />
          )}
        </>
      )
    }

    if(value === 'relative') {
      return (
        <>
          {active && (
            <div className="w-0 relative">
              <div className={itemOverlay.class} style={{ width: selected?.item?.width, zIndex:-1 }} />
            </div>
          )}
        </>
      )
    }

    return <div />
  }
  
  return (
    <div className="w-full h-10 relative bg-zinc-700" style={styles}>
      {renderOverlay('absolute')}
      <div
        id={data.id}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        onDragOverCapture={onDragOverCapture}
        className="absolute w-full h-full" 
      />
      <div className="absolute">
        {!data.main ? childrenWithProps : (
          <div className="flex w-full flex-1">
            {childrenWithProps}
            {renderOverlay('relative')}
          </div>
        )}
      </div>
    </div>
  )
}
