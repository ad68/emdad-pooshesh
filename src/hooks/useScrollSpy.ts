import { useEffect, useState } from "react";

/** Returns the id of the section currently under the sticky header. */
export function useScrollSpy(ids: string[], offset = 140): string {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top - offset <= 0) current = id;
      }
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (reachedBottom) current = ids[ids.length - 1];
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, offset]);

  return activeId;
}
