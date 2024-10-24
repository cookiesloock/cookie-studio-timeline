/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState, useRef } from "react";

function Resize({ children, active, data, resizeItem }: any) {
  const sidebarRef = useRef<any>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(data.width);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: { clientX: number; }) => {
      if (isResizing) {
        const width = mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left;
        setSidebarWidth(width);
        resizeItem(data?.id, width)
      }
    },
    [isResizing, data?.id, resizeItem]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="">
      <div
        ref={sidebarRef}
        className="app-sidebar h-10 bg-zinc-500 border-2 border-white rounded-sm"
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div className="app-sidebar-content relative overflow-hidden">
          <span className="opacity-0">.</span>
          <div className="absolute top-0 left-0 h-full w-full select-none">
            {children}
          </div>
        </div>
        {!active && (
          <div
            className="app-sidebar-resizer bg-zinc-600"
            onMouseDown={startResizing}
          />
        )}
      </div>
    </div>
  );
}

export default Resize;
