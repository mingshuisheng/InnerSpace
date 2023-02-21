import {useCallback, useEffect, useState} from "react";

type ThemeType = "light" | "dark" | ""

function toggleType(theme: ThemeType) {
  return theme == "dark" ? "light" : "dark"
}

export function useTheme() {
  let [theme, setTheme] = useState<ThemeType>("");

  useEffect(() => {
    if (!theme) return
    window.document.body.classList.remove(toggleType(theme))
    window.document.body.classList.add(theme)
    window.localStorage.setItem("theme", theme);
  }, [theme])

  useEffect(() => {
    if (window.localStorage.getItem("theme")) {
      return
    }
    const systemThem = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTimeout(() => {
      setTheme(window.localStorage.getItem("theme") as ThemeType || systemThem || "light")
    })
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(toggleType(theme))
  }, [theme])

  return {
    theme,
    toggleTheme
  }
}
